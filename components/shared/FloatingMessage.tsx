'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { useTheme } from 'next-themes';

type FloatingMessageProps = {
  duration?: number;
  message: string;
  onClose: () => void;
  title?: string;
  type?: 'success' | 'error';
};

export const FloatingMessage = ({
  duration = 4000,
  message,
  onClose,
  title,
  type = 'success',
}: FloatingMessageProps) => {
  const { resolvedTheme, theme } = useTheme();
  const isDark = (resolvedTheme ?? theme ?? 'dark') === 'dark';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = window.requestAnimationFrame(() => setIsVisible(true));
    const closeTimer = window.setTimeout(() => {
      setIsVisible(false);
      window.setTimeout(onClose, 250);
    }, duration);

    return () => {
      window.cancelAnimationFrame(showTimer);
      window.clearTimeout(closeTimer);
    };
  }, [duration, message, onClose, type]);

  const closeMessage = () => {
    setIsVisible(false);
    window.setTimeout(onClose, 250);
  };

  const isSuccess = type === 'success';
  const Icon = isSuccess ? CheckCircle2 : ShieldAlert;
  const messageClassName = isSuccess
    ? isDark
      ? 'border-emerald-400/30 bg-emerald-950/90 text-emerald-100 shadow-emerald-950/30'
      : 'border-emerald-500/30 bg-emerald-50/95 text-emerald-800 shadow-emerald-900/10'
    : isDark
      ? 'border-red-400/30 bg-red-950/90 text-red-100 shadow-red-950/30'
      : 'border-red-500/30 bg-red-50/95 text-red-800 shadow-red-900/10';
  const progressClassName = isSuccess
    ? isDark
      ? 'bg-emerald-300'
      : 'bg-emerald-500'
    : isDark
      ? 'bg-red-300'
      : 'bg-red-500';

  return (
    <div
      role='status'
      aria-live='polite'
      className={`fixed right-4 top-6 z-50 w-[calc(100%-2rem)] max-w-sm transition-all duration-300 ease-out md:right-6 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      <div
        className={`overflow-hidden rounded-xl border shadow-2xl backdrop-blur-xl ${messageClassName}`}
      >
        <div className='flex items-start gap-3 p-4'>
          <Icon
            className='mt-0.5 shrink-0'
            size={19}
          />
          <div className='min-w-0 flex-1'>
            {title && <p className='font-semibold'>{title}</p>}
            <p className={title ? 'mt-1 text-sm leading-5 opacity-90' : 'text-sm leading-5 opacity-90'}>{message}</p>
          </div>
          <button
            type='button'
            aria-label='Tutup message'
            onClick={closeMessage}
            className={`rounded-lg p-1 opacity-70 transition hover:opacity-100 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
          >
            <X size={16} />
          </button>
        </div>

        <div className={isDark ? 'h-1 bg-white/10' : 'h-1 bg-black/10'}>
          <div
            className={`h-full origin-left ${progressClassName}`}
            style={{
              transform: isVisible ? 'scaleX(0)' : 'scaleX(1)',
              transition: isVisible ? `transform ${duration}ms linear` : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};
