'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import api from '@/lib/axios';

const NoteForm = ({ leadId, onCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { text: '' } });

  useEffect(() => {
    reset({ text: '' });
  }, [leadId, reset]);

  const onSubmit = async (values) => {
    try {
      await api.post(`/leads/${leadId}/notes`, values);
      reset({ text: '' });
      onCreated?.();
    } catch (error) {
      const message = error?.response?.data?.error?.message || 'Unable to add note.';
      setError('root', { type: 'server', message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Add Note</h3>
        <p className="text-sm text-slate-500">Capture a quick reminder or next step.</p>
      </div>

      <textarea
        rows={4}
        {...register('text', {
          required: 'Note text is required',
          validate: (value) => value.trim().length > 0 || 'Note text cannot be empty',
        })}
        placeholder="Write a note about this lead..."
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300 focus:bg-white"
      />
      {errors.text ? <p className="mt-2 text-xs text-red-600">{errors.text.message}</p> : null}
      {errors.root ? <p className="mt-2 text-xs text-red-600">{errors.root.message}</p> : null}

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Add Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;