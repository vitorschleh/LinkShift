import BrandMark from '@/components/ui/brand-mark';
import {
  ArrowRight,
  GithubIcon,
  LayoutDashboard,
  Palette,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { siteConfig } from '@/config/site';

const highlights = [
  {
    title: 'Live mobile preview',
    description:
      'Adjust links, theme and button feel while watching the profile update instantly.',
    icon: Smartphone,
  },
  {
    title: 'Curated customization',
    description:
      'Choose premium palettes and tactile button treatments without touching code.',
    icon: Palette,
  },
  {
    title: 'Quiet analytics',
    description:
      'Understand visits, devices and top links inside a calmer, more editorial dashboard.',
    icon: LayoutDashboard,
  },
];

const Home = () => {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <>
      <Head>
        <title>LinkShift | Quiet luxury link in bio</title>
        <meta
          name="description"
          content="LinkShift is a premium link in bio studio with refined themes, live preview and elegant analytics."
        />
        <meta property="og:url" content="https://librelinks.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LinkShift" />
        <meta property="og:title" content="LinkShift" />
        <meta
          property="og:description"
          content="A premium link in bio studio with quiet luxury aesthetics, live preview and elegant analytics."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://librelinks.vercel.app/api/og"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@urdadx" />
        <meta name="twitter:creator" content="@urdadx" />
        <meta
          property="twitter:domain"
          content="https://librelinks.vercel.app/"
        />
        <meta property="twitter:url" content="https://librelinks.vercel.app/" />
        <meta name="twitter:title" content="LinkShift" />
        <meta
          name="twitter:description"
          content="A premium link in bio studio with quiet luxury aesthetics, live preview and elegant analytics."
        />
        <meta
          name="twitter:image"
          content="https://librelinks.vercel.app/api/og"
        />
        <meta
          data-rh="true"
          name="twitter:image:alt"
          content="A premium link in bio studio with quiet luxury aesthetics, live preview and elegant analytics."
        />
      </Head>
      <div className="ambient-page relative min-h-screen">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <header className="surface-card flex items-center justify-between rounded-full px-4 py-3 sm:px-5">
            <BrandMark showTagline />
            <div className="flex items-center gap-3">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                className="action-secondary hidden sm:inline-flex"
              >
                <GithubIcon size={16} />
                Star on GitHub
              </Link>
              <Link
                href={isAuthenticated ? '/admin' : '/login'}
                className="action-primary"
              >
                {isAuthenticated ? 'Open Studio' : 'Enter Studio'}
              </Link>
            </div>
          </header>

          <main className="grid gap-12 pb-10 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
            <section className="max-w-2xl">
              <span className="section-kicker">Premium link atelier</span>
              <h1 className="section-title mt-6 text-ink">
                The link in bio that feels designed, not assembled.
              </h1>
              <p className="muted-copy mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                LinkShift turns your links, socials and analytics into a calm,
                luxurious mobile presence with live customization and refined
                motion.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className="action-primary">
                  Create your page
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  className="action-secondary"
                >
                  Explore the repo
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="surface-card rounded-[1.75rem] p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-ink/45">
                    Crafted
                  </p>
                  <p className="mt-3 font-display text-3xl leading-none text-ink">
                    8
                  </p>
                  <p className="mt-2 text-sm text-ink/60">
                    curated premium themes
                  </p>
                </div>
                <div className="surface-card rounded-[1.75rem] p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-ink/45">
                    Synced
                  </p>
                  <p className="mt-3 font-display text-3xl leading-none text-ink">
                    Live
                  </p>
                  <p className="mt-2 text-sm text-ink/60">
                    preview while you edit
                  </p>
                </div>
                <div className="surface-card rounded-[1.75rem] p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-ink/45">
                    Ready
                  </p>
                  <p className="mt-3 font-display text-3xl leading-none text-ink">
                    Calm
                  </p>
                  <p className="mt-2 text-sm text-ink/60">
                    analytics and sharing
                  </p>
                </div>
              </div>
            </section>

            <section className="relative">
              <div className="surface-card-strong rounded-[2.75rem] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between px-2">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-ink/45">
                      Mobile showcase
                    </p>
                    <h2 className="font-display text-3xl leading-none text-ink">
                      Quiet luxury UI
                    </h2>
                  </div>
                  <span className="floating-chip text-[0.72rem] uppercase tracking-[0.2em]">
                    iOS glass
                  </span>
                </div>
                <div className="device-shell mx-auto max-w-[23rem] p-3 pt-12">
                  <div className="overflow-hidden rounded-[2rem]">
                    <Image
                      className="h-auto w-full rounded-[2rem] object-cover"
                      src="/assets/new_shot.png"
                      alt="LinkShift mobile studio preview"
                      height={900}
                      width={720}
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>

          <section className="mt-10 grid gap-4 lg:grid-cols-3">
            {highlights.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="surface-card rounded-[2rem] px-5 py-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white/70 shadow-halo">
                  <Icon size={20} className="text-[#6f563f]" />
                </div>
                <h3 className="mt-5 font-display text-3xl leading-none text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60 sm:text-base">
                  {description}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-16">
            <div className="surface-card-strong rounded-[2.5rem] px-6 py-8 text-center sm:px-10 sm:py-10">
              <span className="section-kicker justify-center">Signature feel</span>
              <h2 className="section-title mt-6 text-ink">
                Build a page that feels like a brand, not a list.
              </h2>
              <p className="muted-copy mx-auto mt-5 max-w-2xl text-base leading-relaxed">
                LinkShift brings together premium themes, link management and a
                preview-first editor so every touchpoint feels intentionally
                designed.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/register" className="action-primary">
                  Start free
                </Link>
                <Link href="/login" className="action-secondary">
                  Sign in
                </Link>
              </div>
            </div>
          </section>

          <footer className="mt-14 flex flex-col items-center gap-4 pb-4 text-center">
            <div className="floating-chip">
              <Sparkles size={14} />
              Designed by @urdadx
            </div>
            <p className="text-sm text-ink/50">
              LinkShift keeps the original open-source spirit and wraps it in a
              more refined interface system.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
