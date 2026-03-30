import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

const BrandMark = ({
  href = '/',
  showWordmark = true,
  showTagline = false,
  tone = 'dark',
  className = '',
}) => {
  const textTone = tone === 'light' ? 'text-white' : 'text-ink';
  const mutedTone = tone === 'light' ? 'text-white/70' : 'text-ink/50';
  const iconTone = tone === 'light' ? 'text-white' : 'text-[#6f563f]';

  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`}>
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/60 bg-white/40 shadow-float backdrop-blur-xl">
        <span className="absolute inset-[3px] rounded-[1.05rem] bg-gradient-to-br from-white/95 via-white/35 to-[#d6bea4]/60" />
        <Sparkles className={`relative z-10 h-4 w-4 ${iconTone}`} />
      </span>
      {showWordmark && (
        <span className="flex flex-col">
          <span className={`font-display text-3xl leading-none ${textTone}`}>
            {siteConfig.name}
          </span>
          {showTagline && (
            <span
              className={`text-[0.68rem] uppercase tracking-[0.26em] ${mutedTone}`}
            >
              quiet luxury link atelier
            </span>
          )}
        </span>
      )}
    </Link>
  );
};

export default BrandMark;
