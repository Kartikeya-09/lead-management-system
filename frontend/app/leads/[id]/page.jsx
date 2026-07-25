'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, PencilLine } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import EmptyState from '@/components/shared/EmptyState';
import LoadingSkeleton from '@/components/shared/LoadingSkeleton';
import LeadForm from '@/components/leads/LeadForm';
import StatusPipeline from '@/components/leads/StatusPipeline';
import NotesList from '@/components/leads/NotesList';
import NoteForm from '@/components/leads/NoteForm';
import ActivityTimeline from '@/components/leads/ActivityTimeline';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const leadId = params?.id;
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);

  const isAdmin = user?.role === 'Admin';
  const isAssignedMember = user?.role === 'Member' && lead?.assignedTo?._id === user?.id;

  const loadLeadData = async () => {
    if (!leadId) return;

    setLoading(true);
    setError('');

    try {
      const [leadResponse, notesResponse, activitiesResponse] = await Promise.all([
        api.get(`/leads/${leadId}`),
        api.get(`/leads/${leadId}/notes`),
        api.get(`/leads/${leadId}/activities`),
      ]);

      setLead(leadResponse.data);
      setNotes(Array.isArray(notesResponse.data) ? notesResponse.data : notesResponse.data?.data || []);
      setActivities(Array.isArray(activitiesResponse.data) ? activitiesResponse.data : activitiesResponse.data?.data || []);
    } catch (requestError) {
      setError(requestError?.response?.data?.error?.message || 'Lead not available');
      setLead(null);
      setNotes([]);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeadData();
  }, [leadId]);

  const updateLeadStatus = async (nextStatus) => {
    if (!lead) return;

    const previousLead = lead;
    setLead((current) => (current ? { ...current, status: nextStatus } : current));

    try {
      await api.put(`/leads/${leadId}`, { status: nextStatus });
      await loadLeadData();
    } catch (requestError) {
      setLead(previousLead);
      setError(requestError?.response?.data?.error?.message || 'Unable to update lead status');
    }
  };

  const handleRefresh = async () => {
    await loadLeadData();
  };

  return (
    <ProtectedRoute>
      <AppLayout title="Lead Details">
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => router.push('/leads')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Leads
          </button>

          {loading ? (
            <div className="space-y-6">
              <LoadingSkeleton variant="block" count={1} />
              <LoadingSkeleton variant="row" count={3} />
            </div>
          ) : error ? (
            <EmptyState
              title="Lead unavailable"
              description={error}
              action={{ label: 'Back to Leads', onClick: () => router.push('/leads') }}
            />
          ) : lead ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Lead Overview</p>
                    <h2 className="mt-1 text-2xl font-semibold text-slate-900">{lead.name}</h2>
                    <p className="mt-2 text-sm text-slate-500">{lead.email} · {lead.company || 'No company provided'}</p>
                  </div>

                  {isAdmin ? (
                    <button
                      type="button"
                      onClick={() => setEditOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <PencilLine className="h-4 w-4" />
                      Edit Lead
                    </button>
                  ) : null}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</p>
                    <p className="mt-2 text-sm font-medium text-slate-900">{lead.status}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Source</p>
                    <p className="mt-2 text-sm font-medium text-slate-900">{lead.source || '—'}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Assigned To</p>
                    <p className="mt-2 text-sm font-medium text-slate-900">{lead.assignedTo?.name || 'Unassigned'}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Created By</p>
                    <p className="mt-2 text-sm font-medium text-slate-900">{lead.createdBy?.name || 'Unknown'}</p>
                  </div>
                </div>
              </div>

              {(isAdmin || isAssignedMember) ? (
                <StatusPipeline
                  currentStatus={lead.status}
                  canEdit={true}
                  onStatusChange={updateLeadStatus}
                />
              ) : null}

              <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
                    <p className="text-sm text-slate-500">All comments and context attached to this lead.</p>
                  </div>
                  <NotesList notes={notes} />
                </div>

                <div className="space-y-6">
                  {(isAdmin || isAssignedMember) ? (
                    <NoteForm leadId={leadId} onCreated={handleRefresh} />
                  ) : null}

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">Activity Timeline</h3>
                      <p className="text-sm text-slate-500">Recent lead changes and assignments.</p>
                    </div>
                    <ActivityTimeline activities={activities} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              title="Lead not found"
              description="This lead is unavailable or you do not have access to it."
              action={{ label: 'Back to Leads', onClick: () => router.push('/leads') }}
            />
          )}

          <LeadForm
            isOpen={editOpen}
            mode="edit"
            lead={lead}
            onClose={() => setEditOpen(false)}
            onSuccess={handleRefresh}
          />
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}