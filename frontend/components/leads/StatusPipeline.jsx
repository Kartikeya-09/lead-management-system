'use client';

import { useMemo } from 'react';

const pipeline = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

const StatusPipeline = ({ currentStatus = 'New', onStatusChange, canEdit = false }) => {
  const currentIndex = Math.max(0, pipeline.indexOf(currentStatus));

  const statusMeta = useMemo(() => {
    return pipeline.map((status, index) => ({
      status,
      active: index <= currentIndex,
      clickable: canEdit && index !== currentIndex,
    }));
  }, [currentIndex, canEdit]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Status Pipeline</h3>
          <p className="text-sm text-slate-500">Track the lead through the sales flow.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{currentStatus}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {statusMeta.map(({ status, active, clickable }) => (
          <button
            key={status}
            type="button"
            disabled={!clickable}
            onClick={() => onStatusChange?.(status)}
            className={`rounded-2xl border px-4 py-3 text-left transition-all ${
              active
                ? 'border-primary-200 bg-primary-50 text-primary-800'
                : 'border-slate-200 bg-slate-50 text-slate-500'
            } ${clickable ? 'hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800' : 'cursor-default opacity-90'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">{status}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusPipeline;