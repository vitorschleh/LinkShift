import { Share2, GithubIcon } from 'lucide-react';
import Link from 'next/link';
import useMediaQuery from '@/hooks/use-media-query';
import { siteConfig } from '@/config/site';

const ShareButton = () => {
  const { isMobile } = useMediaQuery();
  return (
    <div className="flex items-center gap-2">
      <button className="surface-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink hover:-translate-y-0.5">
        <Share2 size={17} />
        <h3 className="hidden sm:block">Share</h3>
      </button>
      <Link
        href={siteConfig.links.github}
        target="_blank"
        className="surface-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink hover:-translate-y-0.5"
      >
        <GithubIcon size={isMobile ? 18 : 17} />
        <h3 className="hidden lg:block">Star</h3>
      </Link>
    </div>
  );
};

export default ShareButton;
