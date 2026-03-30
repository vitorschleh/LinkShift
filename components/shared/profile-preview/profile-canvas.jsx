import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';
import { X } from 'lucide-react';
import LinkCard from '@/components/core/user-profile/links-card';
import { SocialCards } from '@/components/core/user-profile/social-cards';
import { getInitials } from '@/utils/helpers';
import { resolveThemeTokens } from '@/utils/themes';

const ProfileCanvas = ({
  user,
  links = [],
  registerClicks = () => {},
  close,
}) => {
  const theme = resolveThemeTokens(user?.themePalette);
  const socialLinks = links.filter((link) => link.isSocial && !link.archived);
  const primaryLinks = links.filter((link) => !link.isSocial && !link.archived);
  const initials = user?.name ? getInitials(user.name).slice(0, 2) : '@';

  return (
    <section
      className="ambient-page no-scrollbar min-h-screen overflow-auto px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10"
      style={{ background: theme.heroBackground }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 0%, ${theme.accentSoft} 0%, transparent 28%),
            radial-gradient(circle at 100% 100%, ${theme.borderStrong} 0%, transparent 22%)
          `,
        }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <div
          className="surface-card-strong w-full max-w-2xl rounded-[2.5rem] px-5 py-6 sm:px-8 sm:py-9"
          style={{
            background: theme.panelStrong,
            borderColor: theme.border,
          }}
        >
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <span
              className="floating-chip text-[0.68rem] uppercase tracking-[0.24em]"
              style={{
                background: theme.badgeFill,
                borderColor: theme.badgeBorder,
                color: theme.textMuted,
              }}
            >
              @{user?.handle || 'linkshift'}
            </span>
            <Avatar.Root
              className="mt-5 inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-[2rem] border text-2xl font-semibold sm:h-28 sm:w-28"
              style={{
                background: theme.panelFill,
                borderColor: theme.badgeBorder,
                color: theme.text,
              }}
            >
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={user?.image}
                referrerPolicy="no-referrer"
                alt={user?.name || user?.handle || 'profile avatar'}
              />
              <Avatar.Fallback
                className="flex h-full w-full items-center justify-center font-display text-4xl"
                delayMs={100}
              >
                {initials}
              </Avatar.Fallback>
            </Avatar.Root>
            <h1
              className="mt-5 balance-text font-display text-4xl leading-none tracking-[-0.04em] sm:text-5xl"
              style={{ color: theme.text }}
            >
              {user?.name || user?.handle || 'Your signature page'}
            </h1>
            {user?.bio && (
              <p
                className="balance-text mt-3 max-w-xl text-sm leading-relaxed sm:text-base"
                style={{ color: theme.textMuted }}
              >
                {user.bio}
              </p>
            )}
            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {socialLinks.map(({ id, title, url }) => (
                  <SocialCards
                    key={id}
                    title={title}
                    url={url}
                    theme={theme}
                    registerClicks={() => registerClicks(id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 w-full max-w-2xl space-y-3 sm:space-y-4">
          {primaryLinks.map(({ id, ...link }) => (
            <LinkCard
              key={id}
              id={id}
              theme={theme}
              buttonStyle={user?.buttonStyle}
              registerClicks={() => registerClicks(id)}
              {...link}
            />
          ))}
          {primaryLinks.length === 0 && socialLinks.length === 0 && (
            <div
              className="surface-card rounded-[2rem] px-6 py-10 text-center"
              style={{
                background: theme.panelFill,
                borderColor: theme.border,
              }}
            >
              <p
                className="text-[0.72rem] uppercase tracking-[0.26em]"
                style={{ color: theme.textSoft }}
              >
                Quietly empty
              </p>
              <h2
                className="mt-4 font-display text-4xl leading-none"
                style={{ color: theme.text }}
              >
                This page is waiting for its first link
              </h2>
              <p
                className="balance-text mx-auto mt-3 max-w-md text-sm leading-relaxed sm:text-base"
                style={{ color: theme.textMuted }}
              >
                Come back soon. The owner has not published links or socials
                yet.
              </p>
            </div>
          )}
        </div>

        <footer
          className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]"
          style={{
            color: theme.textSoft,
            background: theme.badgeFill,
            border: `1px solid ${theme.badgeBorder}`,
          }}
        >
          Built with
          <Link href="/" className="font-semibold" style={{ color: theme.text }}>
            LinkShift
          </Link>
        </footer>
      </div>

      {close && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden">
          <button
            onClick={close}
            className="surface-card flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: theme.panelStrong,
              borderColor: theme.badgeBorder,
              color: theme.text,
            }}
          >
            <X size={22} />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProfileCanvas;
