import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'default' | 'neutral';
  className?: string;
}

const variants = {
  success: 'bg-green-100 text-green-700 ring-green-600/20',
  warning: 'bg-yellow-100 text-yellow-700 ring-yellow-600/20',
  error: 'bg-red-100 text-red-700 ring-red-600/10',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-500/10',
  default: 'bg-indigo-100 text-indigo-700 ring-indigo-700/10',
};

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  return (
    <span className={clsx(
      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;