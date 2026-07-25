'use client';

import Link from 'next/link';
import { PencilLine, ArrowUpRight, User, CalendarDays } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';

const formatDate = (value) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
};

const getAssigneeLabel = (assignee) => {
  if (!assignee) return 'Unassigned';
  if (typeof assignee === 'string') return assignee;
  return assignee.name || assignee.email || 'Assigned user';
};

const LeadRow = ({ lead, onEdit }) => {
  const assignee = getAssigneeLabel(lead.assignedTo);
  const leadId = lead._id || lead.id;

  return (
    <tr className="transition-colors hover:bg-slate-50/80">
      <td className="px-4 py-4">
        <div className="space-y-1">
          <p className="font-medium text-slate-900">{lead.name}</p>
          <p className="text-sm text-slate-500">{lead.email || 'No email provided'}</p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600">{lead.company || '—'}</td>
      <td className="px-4 py-4">
        <StatusBadge status={lead.status || 'New'} />
      </td>
      <td className="px-4 py-4 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
            <User className="h-3.5 w-3.5" />
          </span>
          {assignee}
        </span>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          {formatDate(lead.createdAt)}
        </span>
      </td>
      <td className="px-4 py-4 text-right">
        <div className="inline-flex items-center gap-2">
          <Link
            href={`/leads/${leadId}`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
          >
            Open
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {onEdit ? (
            <button
              type="button"
              onClick={() => onEdit(lead)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <PencilLine className="h-4 w-4" />
              Edit
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );
};

export default LeadRow;