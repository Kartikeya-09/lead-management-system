'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import EmptyState from '@/components/shared/EmptyState';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import Toast from '@/components/shared/Toast';
import CreateUserModal from '@/components/team/CreateUserModal';
import TeamTable from '@/components/team/TeamTable';
import { useToast } from '@/hooks/useToast';
import api from '@/lib/axios';

export default function TeamPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [confirmUser, setConfirmUser] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const loadUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/users');
      setUsers(Array.isArray(response.data) ? response.data : response.data?.data || []);
    } catch (requestError) {
      setError(requestError?.response?.data?.error?.message || 'Unable to load team members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeactivate = async () => {
    if (!confirmUser) return;

    try {
      await api.delete(`/users/${confirmUser._id || confirmUser.id}`);
      addToast('success', `${confirmUser.name} has been deactivated.`);
      setConfirmUser(null);
      await loadUsers();
    } catch (requestError) {
      addToast('error', requestError?.response?.data?.error?.message || 'Unable to deactivate user.');
    }
  };

  const visibleToasts = toasts.slice(-5);

  return (
    <ProtectedRoute adminOnly>
      <AppLayout title="Team Members">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Team Members</h2>
              <p className="text-sm text-slate-500">Manage active accounts and workspace access.</p>
            </div>
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
            >
              <Plus className="h-4 w-4" />
              Add Member
            </button>
          </div>

          {error ? (
            <EmptyState
              title="Unable to load team"
              description={error}
              action={{ label: 'Retry', onClick: loadUsers }}
            />
          ) : (
            <TeamTable users={users} loading={loading} onDeactivate={setConfirmUser} onRefresh={loadUsers} />
          )}
        </div>

        <CreateUserModal
          isOpen={createOpen}
          onClose={() => setCreateOpen(false)}
          onSuccess={async () => {
            addToast('success', 'Team member created successfully.');
            await loadUsers();
          }}
          onError={(message) => addToast('error', message)}
        />

        <ConfirmDialog
          isOpen={!!confirmUser}
          title="Deactivate user"
          message={confirmUser ? `Deactivate ${confirmUser.name}? They will no longer be active in the workspace.` : ''}
          confirmLabel="Deactivate"
          onCancel={() => setConfirmUser(null)}
          onConfirm={handleDeactivate}
        />

        <Toast toasts={visibleToasts} onDismiss={removeToast} />
      </AppLayout>
    </ProtectedRoute>
  );
}