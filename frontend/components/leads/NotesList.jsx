'use client';

import { formatDistanceToNow } from 'date-fns';
import EmptyState from '@/components/shared/EmptyState';

const NotesList = ({ notes = [] }) => {
  if (!notes.length) {
    return (
      <EmptyState
        title="No notes yet"
        description="Add the first note to capture context for this lead."
      />
    );
  }

  return (
    <div className="space-y-3">
      {notes
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((note) => {
          const authorName = note.author?.name || 'Team member';
          const initial = authorName.charAt(0).toUpperCase();

          return (
            <article key={note._id || `${note.createdAt}-${note.text}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="font-medium text-slate-900">{authorName}</p>
                    <span className="text-xs text-slate-400">{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{note.text}</p>
                </div>
              </div>
            </article>
          );
        })}
    </div>
  );
};

export default NotesList;