import { UserAvatar } from './avatar';
import * as Popover from '@radix-ui/react-popover';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { ArrowUpRight, LogOut, MessageCircle, User } from 'lucide-react';
import useMediaQuery from '@/hooks/use-media-query';
import { Drawer } from 'vaul';
import UserNavButtonMobile from './usernavbutton-mobile';

const UserAccountNavDesktop = () => {
  const session = useSession();
  const { data } = session;
  const router = useRouter();

  const { isMobile } = useMediaQuery();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('You logged out');
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      router.push('/login');
    }
  };

  return (
    <>
      <Popover.Root>
        {isMobile ? (
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger>
              <UserAvatar size={35} />
            </Drawer.Trigger>
            <UserNavButtonMobile data={data} logout={handleLogout} />
          </Drawer.Root>
        ) : (
          <Popover.Trigger className="">
            <UserAvatar size={35} />
          </Popover.Trigger>
        )}

        <Popover.Portal>
          <Popover.Content
            className="surface-card-strong z-50 mr-2 w-[220px] rounded-[1.5rem] p-2 md:block"
            sideOffset={4}
          >
            <Link
              href="/admin/settings"
              className="group flex w-full items-center gap-3 rounded-[1.1rem] p-3 text-sm font-medium text-ink/70 transition hover:bg-white/60"
            >
              <User size={17} />
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-ink">{data.user.name}</h4>
                <p className="truncate text-xs text-ink/45">@{data.user.handle}</p>
              </div>
              <ArrowUpRight size={15} />
            </Link>
            <Link
              target="_blank"
              href="https://github.com/urdadx/librelinks/issues/new/choose"
              className="group flex w-full items-center gap-3 rounded-[1.1rem] p-3 text-sm font-medium text-ink/70 transition hover:bg-white/60"
            >
              <MessageCircle size={17} />
              <h4>Send feedback</h4>
            </Link>
            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 rounded-[1.1rem] p-3 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              <LogOut size={17} />
              <h4>Sign out</h4>
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default UserAccountNavDesktop;
