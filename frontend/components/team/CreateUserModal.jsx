'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, X } from 'lucide-react';
import api from '@/lib/axios';

const CreateUserModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'Member',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ name: '', email: '', password: '', role: 'Member' });
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  if (!isOpen) return null;

  const onSubmit = async (values) => {
    try {
      await api.post('/users', values);
      onSuccess?.();
      onClose?.();
    } catch (error) {
      const response = error?.response;
      if (response?.status === 409) {
        setError('email', { type: 'server', message: response.data?.error?.message || 'Email already exists' });
        return;
      }

      if (response?.status === 422 && response.data?.error?.fields) {
        Object.entries(response.data.error.fields).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
        return;
      }

      const message = response?.data?.error?.message || 'Unable to create user';
      onError?.(message);
      setError('root', { type: 'server', message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Add Team Member</h3>
            <p className="text-sm text-slate-500">Create a new account for your CRM workspace.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 px-6 py-5 md:grid-cols-2">
          <label className="flex flex-col gap-2 md:col-span-2">
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
            <span className="text-sm font-medium text-slate-700">Role</span>
            <select {...register('role')} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white">
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white"
            />
            {errors.password ? <span className="text-xs text-red-600">{errors.password.message}</span> : null}
          </label>

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
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;