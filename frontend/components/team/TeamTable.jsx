'use client';

import { CalendarDays, Trash2, User } from 'lucide-react';
import LoadingSkeleton from '@/components/shared/LoadingSkeleton';
import EmptyState from '@/components/shared/EmptyState';

const formatDate = (value) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
};

const TeamTable = ({ users = [], loading = false, onDeactivate, onRefresh }) => {
  if (loading) {
    return <LoadingSkeleton variant="table" count={5} />;
  }

  if (!users.length) {
    return (
      <EmptyState
        title="No team members"
        description="Add the first user to start assigning leads and tracking activity."
        action={onRefresh ? { label: 'Refresh', onClick: onRefresh } : undefined}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Created</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const userId = user._id || user.id;
              const active = user.isActive !== false;

              return (
                <tr key={userId} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-4 py-4">
                    <div className="inline-flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-slate-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{user.email}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${user.role === 'Admin' ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                      {active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      {formatDate(user.createdAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    {active ? (
                      <button
                        type="button"
                        onClick={() => onDeactivate?.(user)}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Deactivate
                      </button>
                    ) : (
                      <span className="text-sm text-slate-400">No actions</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;