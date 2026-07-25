'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/context/AuthContext';

const pageSizeOptions = [10, 25, 50];

const LeadFilters = ({ filters, onChange, users = [] }) => {
  const { isAdmin } = useAuth();
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    onChange?.({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  useEffect(() => {
    setSearchInput(filters.search || '');
  }, [filters.search]);

  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-5">
      <label className="flex flex-col gap-2 lg:col-span-2">
        <span className="text-sm font-medium text-slate-700">Search</span>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Name, email, or company"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300 focus:bg-white"
          />
        </div>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">Status</span>
        <select
          value={filters.status || ''}
          onChange={(event) => onChange?.({ status: event.target.value, page: 1 })}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-primary-300 focus:bg-white"
        >
          <option value="">All statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </label>

      {isAdmin ? (
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Assigned To</span>
          <select
            value={filters.assignedTo || ''}
            onChange={(event) => onChange?.({ assignedTo: event.target.value, page: 1 })}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-primary-300 focus:bg-white"
          >
            <option value="">All assignees</option>
            <option value="unassigned">Unassigned</option>
            {users.map((user) => (
              <option key={user._id || user.id} value={user._id || user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">Page size</span>
        <select
          value={filters.limit}
          onChange={(event) => onChange?.({ limit: Number(event.target.value), page: 1 })}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-primary-300 focus:bg-white"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option} / page
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default LeadFilters;