import Link from 'next/link';
import Form from '@/components/shared/form/form';
import Head from 'next/head';
import BrandMark from '@/components/ui/brand-mark';

export default function Register() {
  return (
    <>
      <Head>
        <title>LinkShift | Create account</title>
      </Head>
      <div className="ambient-page flex min-h-screen items-center justify-center px-4 py-10">
        <div className="surface-card-strong w-full max-w-md overflow-hidden rounded-[2.5rem]">
          <div className="border-b border-black/5 px-6 py-8 text-center sm:px-10">
            <BrandMark href="/" showTagline className="justify-center" />
            <h3 className="mt-8 font-display text-4xl leading-none text-ink">
              Create your LinkShift signature
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
              Start for free, choose a premium style and publish a calmer link
              in bio experience.
            </p>
            <p className="mt-4 text-sm text-ink/50">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-ink">
                Sign in
              </Link>
            </p>
          </div>
          <Form type="register" />
        </div>
      </div>
    </>
  );
}
