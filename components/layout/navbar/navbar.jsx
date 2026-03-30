import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import {
  BarChart3,
  CircleDot,
  Link2,
  Settings2,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import UserAccountNavDesktop from '@/components/utils/usernavbutton-desktop';
import ShareButton from '@/components/utils/share-button';
import SiteHeader from './main-nav';
import ShareModal from '@/components/shared/modals/share-modal';
import React from 'react';
import { useRouter } from 'next/router';

const items = [
  {
    title: 'Links',
    href: '/admin',
    icon: Link2,
  },

  {
    title: 'Customize',
    href: '/admin/customize',
    icon: CircleDot,
  },

  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings2,
  },
];

const Navbar = ({ showName = false, isHomePage = true }) => {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="sticky top-4 z-40">
      <header className="surface-card-strong rounded-[2rem] px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <SiteHeader />
            <div className="hidden md:flex md:items-center md:gap-2">
              {!showName &&
                items.map((item) => {
                  const isActive = router.pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-[#171411] text-white shadow-float'
                          : 'text-ink/60 hover:bg-white/60 hover:text-ink'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {session.status === 'authenticated' && (
              <div className="flex items-center gap-2">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <ShareButton />
                  </Dialog.Trigger>
                  <ShareModal />
                </Dialog.Root>
                <UserAccountNavDesktop />
              </div>
            )}
          </div>
        </div>
      </header>
      {session.status === 'authenticated' && !isHomePage && (
        <nav className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full border border-white/60 bg-[#fbf7f0]/90 p-2 shadow-float backdrop-blur-xl md:hidden">
          {items.map((item) => {
            const isActive = router.pathname === item.href;
            const Icon = item.icon;

            return (
              <React.Fragment key={item.title}>
                <Link
                  href={item.href}
                  className={`flex min-w-[72px] flex-col items-center gap-1 rounded-full px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition ${
                    isActive
                      ? 'bg-[#171411] text-white'
                      : 'text-ink/55 hover:bg-white/70'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.title}</span>
                </Link>
              </React.Fragment>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
