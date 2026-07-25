'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';

const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Other'];
const STATUS_OPTIONS = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

const getDefaultValues = (lead, mode) => ({
  name: lead?.name || '',
  email: lead?.email || '',
  phone: lead?.phone || '',
  company: lead?.company || '',
  source: lead?.source || '',
  status: lead?.status || 'New',
  assignedTo: lead?.assignedTo?._id || lead?.assignedTo || '',
  ...(mode === 'create' ? { status: 'New' } : {}),
});

const LeadForm = ({ isOpen, mode = 'create', lead = null, users = [], onClose, onSuccess }) => {
  const { isAdmin } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: getDefaultValues(lead, mode) });

  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues(lead, mode));
      clearErrors();
    }
  }, [isOpen, lead, mode, reset, clearErrors]);

  if (!isOpen) return null;

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        assignedTo: values.assignedTo || null,
      };

      if (mode === 'edit') {
        await api.put(`/leads/${lead._id || lead.id}`, payload);
      } else {
        await api.post('/leads', payload);
      }

      onSuccess?.();
      onClose?.();
    } catch (error) {
      const response = error?.response;
      if (response?.status === 422 && response.data?.error?.fields) {
        Object.entries(response.data.error.fields).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
        return;
      }

      if (response?.status === 409 && response.data?.error?.message) {
        setError('email', { type: 'server', message: response.data.error.message });
        return;
      }

      setError('root', { type: 'server', message: response?.data?.error?.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {mode === 'edit' ? 'Edit Lead' : 'New Lead'}
            </h3>
            <p className="text-sm text-slate-500">Capture and update lead details from one place.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 px-6 py-5 md:grid-cols-2">
          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input {...register('name', { required: 'Name is required' })} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white" />
            {errors.name ? <span className="text-xs text-red-600">{errors.name.message}</span> : null}
          </label>

          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Valid email format required' },
              })}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white"
            />
            {errors.email ? <span className="text-xs text-red-600">{errors.email.message}</span> : null}
          </label>

          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-700">Phone</span>
            <input {...register('phone')} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white" />
          </label>

          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-700">Company</span>
            <input {...register('company', { required: 'Company is required' })} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white" />
            {errors.company ? <span className="text-xs text-red-600">{errors.company.message}</span> : null}
          </label>

          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm font-medium text-slate-700">Source</span>
            <select {...register('source')} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white">
              <option value="">Select source</option>
              {SOURCE_OPTIONS.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </label>

          {mode === 'edit' ? (
            <label className="flex flex-col gap-2 md:col-span-1">
              <span className="text-sm font-medium text-slate-700">Status</span>
              <select {...register('status', { required: 'Status is required' })} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white">
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.status ? <span className="text-xs text-red-600">{errors.status.message}</span> : null}
            </label>
          ) : null}

          {isAdmin ? (
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Assigned To</span>
              <select {...register('assignedTo')} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white">
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user._id || user.id} value={user._id || user.id}>{user.name}</option>
                ))}
              </select>
            </label>
          ) : null}

          {errors.root ? <p className="md:col-span-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{errors.root.message}</p> : null}

          <div className="md:col-span-2 flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === 'edit' ? 'Save Changes' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;