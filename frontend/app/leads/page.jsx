'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import EmptyState from '@/components/shared/EmptyState';
import LeadsTable from '@/components/leads/LeadsTable';
import { useLeads } from '@/hooks/useLeads';
import { useAuth } from '@/context/AuthContext';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadForm from '@/components/leads/LeadForm';
import api from '@/lib/axios';

const DEFAULT_LIMIT = 10;

function LeadsPageContent() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    search: '',
    status: '',
    assignedTo: '',
    sortBy: 'createdAt:desc',
  });
  const [formState, setFormState] = useState({ isOpen: false, mode: 'create', lead: null });

  const queryParams = useMemo(() => ({
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
    status: filters.status,
    assignedTo: filters.assignedTo,
    sortBy: filters.sortBy,
  }), [filters]);

  const { data, total, page: currentPage, limit: currentLimit, totalPages, loading, error, refetch } = useLeads(queryParams);

  useEffect(() => {
    if (!isAdmin) return;

    const loadUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(Array.isArray(response.data) ? response.data : response.data?.data || []);
      } catch {
        setUsers([]);
      }
    };

    loadUsers();
  }, [isAdmin]);

  const updateFilters = (patch) => {
    setFilters((current) => ({ ...current, ...patch }));
  };

  const openCreateLead = () => {
    setFormState({ isOpen: true, mode: 'create', lead: null });
  };

  const openEditLead = (lead) => {
    setFormState({ isOpen: true, mode: 'edit', lead });
  };

  const closeLeadForm = () => {
    setFormState({ isOpen: false, mode: 'create', lead: null });
  };

  const handlePageChange = (nextPage) => {
    updateFilters({ page: nextPage });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Leads</h2>
          <p className="text-sm text-slate-500">A first look at the active lead pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <button
              type="button"
              onClick={openCreateLead}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
            >
              <Plus className="h-4 w-4" />
              New Lead
            </button>
          ) : null}
        </div>
      </div>

      <LeadFilters
        filters={filters}
        users={users}
        onChange={(patch) => {
          updateFilters(patch);
          if (patch.page === 1 || patch.page === undefined) {
            updateFilters({ page: 1 });
          }
        }}
      />

      {error ? (
        <EmptyState
          title="Unable to load leads"
          description={error}
          action={{ label: 'Retry', onClick: refetch }}
        />
      ) : (
        <LeadsTable
          leads={data}
          loading={loading}
          total={total}
          page={currentPage || filters.page}
          limit={currentLimit || filters.limit}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onRetry={refetch}
          onEdit={openEditLead}
        />
      )}

      <LeadForm
        isOpen={formState.isOpen}
        mode={formState.mode}
        lead={formState.lead}
        users={users}
        onClose={closeLeadForm}
        onSuccess={refetch}
      />
    </div>
  );
}

export default function LeadsPage() {
  return (
    <ProtectedRoute>
      <AppLayout title="Leads">
        <LeadsPageContent />
      </AppLayout>
    </ProtectedRoute>
  );
}