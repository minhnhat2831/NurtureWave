import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/cn';

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ChangePasswordFormData) => void;
}

export const ChangePasswordModal = ({ isOpen, onClose, onSubmit }: ChangePasswordModalProps) => {
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordFormData>();

  const handleClose = () => {
    reset();
    setShowPasswords({ current: false, new: false, confirm: false });
    onClose();
  };

  if (!isOpen) return null;

  const fields = [
    { name: 'currentPassword' as const, label: 'Current Password', show: showPasswords.current, key: 'current' as const },
    { name: 'newPassword' as const, label: 'New Password', show: showPasswords.new, key: 'new' as const },
    { name: 'confirmPassword' as const, label: 'Confirm New Password', show: showPasswords.confirm, key: 'confirm' as const },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-6 pointer-events-auto">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          <p className="text-sm text-gray-500 mt-1">Setup your password to get started</p>
        </div>

        <form onSubmit={handleSubmit((data) => { onSubmit(data); handleClose(); })} className="space-y-4">
          {fields.map(({ name, label, show, key }) => (
            <div key={name}>
              <label className={cn('block text-sm font-medium mb-1.5', errors[name] ? 'text-red-600' : 'text-gray-700')}>
                {label}
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  {...register(name, { required: 'This field is required.' })}
                  placeholder="Password"
                  className={cn(
                    'w-full px-3 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {show ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]?.message}</p>}
            </div>
          ))}
          
          <div className="pt-2">
            <button type="submit" className="w-full bg-violet-700 text-white py-2.5 rounded-lg font-medium hover:bg-violet-800 transition-colors">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
