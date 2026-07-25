'use client';

import { formatDistanceToNow } from 'date-fns';
import { Activity, ArrowRightLeft, CirclePlus, MessageSquare, PencilLine } from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';
import LoadingSkeleton from '@/components/shared/LoadingSkeleton';

const actionMeta = {
  'Lead Created': { icon: CirclePlus, accent: 'bg-emerald-100 text-emerald-700' },
  'Lead Updated': { icon: PencilLine, accent: 'bg-blue-100 text-blue-700' },
  'Status Changed': { icon: ArrowRightLeft, accent: 'bg-violet-100 text-violet-700' },
  'Assigned User Changed': { icon: Activity, accent: 'bg-amber-100 text-amber-700' },
  'Note Added': { icon: MessageSquare, accent: 'bg-sky-100 text-sky-700' },
};

const summarizeMetadata = (activity) => {
  const metadata = activity?.metadata || {};

  if (activity?.action === 'Status Changed') {
    return `${metadata.previousStatus || 'Unknown'} → ${metadata.newStatus || 'Unknown'}`;
  }

  if (activity?.action === 'Assigned User Changed') {
    return `${metadata.previousAssignee || 'Unassigned'} → ${metadata.newAssignee || 'Unassigned'}`;
  }

  if (activity?.action === 'Note Added') {
    return metadata.text ? metadata.text : 'New note added';
  }

  return metadata.summary || 'Lead activity recorded';
};

const RecentActivity = ({ activities = [], loading = false }) => {
  if (loading) {
    return <LoadingSkeleton variant="row" count={6} />;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          <p className="text-sm text-slate-500">Latest actions across your workspace</p>
        </div>
      </div>

      {activities.length === 0 ? (
        <EmptyState
          title="No recent activity"
          description="Activity will appear here once leads are created, updated, or assigned."
        />
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 10).map((activity) => {
            const config = actionMeta[activity.action] || actionMeta['Lead Updated'];
            const Icon = config.icon;
            const actorName = activity?.performedBy?.name || activity?.performedByName || 'Team member';
            const timestamp = activity?.createdAt
              ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })
              : 'just now';

            return (
              <div key={activity._id || `${activity.action}-${activity.createdAt}`} className="flex gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                <div className={`mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl ${config.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <span className="text-xs text-slate-400">by</span>
                    <p className="text-sm text-slate-600">{actorName}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{summarizeMetadata(activity)}</p>
                </div>
                <time className="whitespace-nowrap text-xs text-slate-400">{timestamp}</time>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentActivity;