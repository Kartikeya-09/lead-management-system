'use client';

const statusConfig = {
  'New':           { bg: 'bg-slate-100',    text: 'text-slate-700',   dot: 'bg-slate-500' },
  'Contacted':     { bg: 'bg-blue-100',     text: 'text-blue-700',    dot: 'bg-blue-500' },
  'Qualified':     { bg: 'bg-amber-100',    text: 'text-amber-700',   dot: 'bg-amber-500' },
  'Proposal Sent': { bg: 'bg-violet-100',   text: 'text-violet-700',  dot: 'bg-violet-500' },
  'Won':           { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Lost':          { bg: 'bg-red-100',     text: 'text-red-700',     dot: 'bg-red-500' },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} transition-all`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
