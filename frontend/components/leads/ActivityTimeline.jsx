'use client';

import LoadingSkeleton from '@/components/shared/LoadingSkeleton';

const formatTimestamp = (value) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const summarize = (activity) => {
  const metadata = activity?.metadata || {};

  if (activity.action === 'Status Changed') {
    return `${metadata.previousStatus || 'Unknown'} → ${metadata.newStatus || 'Unknown'}`;
  }

  if (activity.action === 'Assigned User Changed') {
    return `${metadata.previousAssignee || 'Unassigned'} → ${metadata.newAssignee || 'Unassigned'}`;
  }

  if (activity.action === 'Note Added') {
    return 'Added a note';
  }

  return 'Updated the lead';
};

const ActivityTimeline = ({ activities = [], loading = false }) => {
  if (loading) {
    return <LoadingSkeleton variant="row" count={5} />;
  }

  if (!activities.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
        No activity recorded for this lead yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((activity) => {
          const actorName = activity.performedBy?.name || 'Team member';

          return (
            <article key={activity._id || `${activity.action}-${activity.createdAt}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-medium text-slate-900">{activity.action}</p>
                  <p className="mt-1 text-sm text-slate-500">{summarize(activity)} by {actorName}</p>
                </div>
                <time className="text-xs text-slate-400">{formatTimestamp(activity.createdAt)}</time>
              </div>
            </article>
          );
        })}
    </div>
  );
};

export default ActivityTimeline;