import { useState } from 'react';

interface Props {
  buttonText?: string;
  className?: string;
}

export default function WaitlistForm({ buttonText = 'Join Waitlist', className = '' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center gap-2 px-5 py-3 glass-strong rounded-xl">
          <svg className="w-5 h-5 text-champagne" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 10l3.5 3.5L15 7" />
          </svg>
          <span className="text-text-primary font-medium">You're on the list!</span>
        </div>
        <p className="text-text-muted text-sm mt-2">We'll email you when it's time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="waitlist-email" className="sr-only">Email address</label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3.5 bg-[#39FF14] text-[#09090B] font-bold rounded-xl transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14] min-h-[44px] whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Joining...' : buttonText}
        </button>
        <input
          type="email"
          id="waitlist-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@email.com"
          disabled={status === 'loading'}
          autoComplete="email"
          className="flex-1 px-5 py-3.5 bg-transparent border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F5F0EB] placeholder:text-[#5C5852] focus:outline-none focus:border-[#C9A87C] focus:ring-1 focus:ring-[#C9A87C] transition-colors duration-200 min-h-[44px] disabled:opacity-50"
        />
      </div>
      {status === 'error' && (
        <p className="text-[#39FF14] text-sm mt-2">{errorMsg}</p>
      )}
    </form>
  );
}
