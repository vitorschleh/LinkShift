import { Drawer } from 'vaul';
import Link from 'next/link';
import { ArrowUpRight, LogOut, MessageCircle, User } from 'lucide-react';

const UserNavButtonMobile = ({ data, logout }) => {
  return (
    <>
      <Drawer.Portal>
        <Drawer.Overlay className="dialog-overlay" />
        <Drawer.Content className="slideBottom fixed bottom-0 left-0 right-0 mt-24 rounded-t-[2rem] bg-[#fbf6ee] p-4 shadow-float">
          <div className="mx-auto mb-4 mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
          <Link
            href="/admin/settings"
            className="surface-card mb-2 flex w-full items-center gap-3 rounded-[1.4rem] p-4 text-sm font-medium text-ink/70"
          >
            <User size={17} />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg text-ink">{data.user.name}</h3>
              <p className="truncate text-xs uppercase tracking-[0.18em] text-ink/45">
                @{data.user.handle}
              </p>
            </div>
            <ArrowUpRight size={16} />
          </Link>
          <Link
            target="_blank"
            href="https://github.com/urdadx/librelinks/issues/new/choose"
            className="surface-card mb-2 flex w-full items-center gap-3 rounded-[1.4rem] p-4 text-sm font-medium text-ink/70"
          >
            <MessageCircle size={17} />
            <h3 className="text-lg">Feedback</h3>
          </Link>
          <button
            onClick={logout}
            className="surface-card flex w-full items-center gap-3 rounded-[1.4rem] p-4 text-sm font-medium text-red-500"
          >
            <LogOut size={17} />
            <h3 className="text-lg">Sign out</h3>
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </>
  );
};

export default UserNavButtonMobile;
