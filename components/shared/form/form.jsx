import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import LoadingDots from '@/components/utils/loading-dots';
import Link from 'next/link';
import GoogleIcon from '@/components/utils/google-icon';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Form({ type }) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const next = searchParams?.get('next');

  useEffect(() => {
    const error = searchParams?.get('error');
    error && toast.error(error);
  }, [searchParams]);

  return (
    <div className="flex flex-col space-y-5 bg-white/10 px-6 py-8 sm:px-10">
      <button
        onClick={() => {
          setIsLoading(true);
          signIn('google', {
            ...(next && next.length > 0 ? { callbackUrl: next } : {}),
          });
        }}
        className={`${
          isLoading
            ? 'cursor-not-allowed border-black/5 bg-white/60 text-ink/40'
            : 'border-black/5 bg-[#171411] text-white hover:-translate-y-0.5 hover:bg-[#211b17]'
        } flex h-14 w-full items-center justify-center rounded-full border text-sm transition-all focus:outline-none`}
      >
        {isLoading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="flex gap-2 items-center font-semibold">
            <GoogleIcon /> Continue with Google
          </p>
        )}
      </button>

      {type === 'login' ? (
        <p className="text-center text-sm text-ink/55">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-ink">
            Sign up
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-ink/55">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-ink">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
