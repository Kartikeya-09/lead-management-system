'use client';
import { useAuth } from '@/context/AuthContext';
import { Menu } from 'lucide-react';

const TopBar = ({ title, onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {user.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
            user.role === 'Admin' ? 'bg-primary-100 text-primary-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {user.role}
          </span>
        </div>
      )}
    </header>
  );
};

export default TopBar;
