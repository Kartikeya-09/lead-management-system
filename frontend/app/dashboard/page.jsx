'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, CalendarDays, CheckCircle2, Users } from 'lucide-react';
import { startOfDay, subDays } from 'date-fns';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import LoadingSkeleton from '@/components/shared/LoadingSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import StatCard from '@/components/dashboard/StatCard';
import StatusBreakdown from '@/components/dashboard/StatusBreakdown';
import RecentActivity from '@/components/dashboard/RecentActivity';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

const MAX_LEADS_FOR_DASHBOARD = 500;

const unwrapList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const unwrapEnvelope = (payload) => {
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) return payload;
  return {};
};

function DashboardContent() {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [leadEnvelope, setLeadEnvelope] = useState({ data: [], total: 0 });
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);

  const loadDashboard = async () => {
    setLoading(true);
    setError('');

    try {
      const leadPromise = api.get('/leads', { params: { page: 1, limit: MAX_LEADS_FOR_DASHBOARD } });
      const activityPromise = api.get('/activities', { params: { page: 1, limit: 10 } });
      const userPromise = isAdmin ? api.get('/users') : Promise.resolve(null);

      const [leadResult, activityResult, userResult] = await Promise.allSettled([leadPromise, activityPromise, userPromise]);

      if (leadResult.status === 'rejected') {
        throw leadResult.reason;
      }

      const leadPayload = unwrapEnvelope(leadResult.value?.data);
      const leadItems = unwrapList(leadPayload);
      setLeadEnvelope({
        data: leadItems,
        total: leadPayload.total ?? leadItems.length,
      });

      if (activityResult.status === 'fulfilled') {
        setActivities(unwrapList(activityResult.value?.data));
      } else {
        setActivities([]);
      }

      if (userResult && userResult.status === 'fulfilled' && userResult.value) {
        setUsers(unwrapList(userResult.value.data));
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [isAdmin]);

  const metrics = useMemo(() => {
    const leads = leadEnvelope.data || [];
    const wonLeads = leads.filter((lead) => lead.status === 'Won');
    const leadsThisWeek = leads.filter((lead) => {
      const createdAt = lead.createdAt ? new Date(lead.createdAt) : null;
      return createdAt && createdAt >= startOfDay(subDays(new Date(), 7));
    });

    const statusCounts = leads.reduce((acc, lead) => {
      const status = lead.status || 'New';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalLeads: leadEnvelope.total ?? leads.length,
      wonLeads: wonLeads.length,
      leadsThisWeek: leadsThisWeek.length,
      teamMembers: users.length,
      myLeads: leads.length,
      statusCounts,
    };
  }, [leadEnvelope, users]);

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={4} />
        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <LoadingSkeleton variant="block" count={1} />
          <LoadingSkeleton variant="block" count={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <EmptyState
          title="Dashboard unavailable"
          description={error}
          action={{ label: 'Retry', onClick: loadDashboard }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={metrics.totalLeads}
          icon={ArrowUpRight}
          tone="primary"
          subtitle="All active pipeline records"
        />
        <StatCard
          title="Won Leads"
          value={metrics.wonLeads}
          icon={CheckCircle2}
          tone="success"
          subtitle="Closed opportunities"
        />
        <StatCard
          title="Leads This Week"
          value={metrics.leadsThisWeek}
          icon={CalendarDays}
          tone="warning"
          subtitle="Created in the last 7 days"
        />
        <StatCard
          title={isAdmin ? 'Team Members' : 'My Leads'}
          value={isAdmin ? metrics.teamMembers : metrics.myLeads}
          icon={Users}
          tone="slate"
          subtitle={isAdmin ? 'Active users in the workspace' : 'Leads assigned to you'}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <StatusBreakdown counts={metrics.statusCounts} />
        <RecentActivity activities={activities} />
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppLayout title="Dashboard">
        <DashboardContent />
      </AppLayout>
    </ProtectedRoute>
  );
}