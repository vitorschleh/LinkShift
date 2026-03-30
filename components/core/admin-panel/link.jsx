import { GripVertical, BarChart, Copy } from 'lucide-react';
import PopoverDesktop from '../../shared/popovers/popover-desktop';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getApexDomain, timeAgo } from '@/utils/helpers';
import { GOOGLE_FAVICON_URL } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArchiveSVG } from '@/components/utils/archive-svg';
import TooltipWrapper from '@/components/utils/tooltip';

const LinkCard = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const apexDomain = getApexDomain(props.url);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(props.url);
    toast.success('Copied URL to clipboard!');
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="surface-card my-4 flex items-center gap-3 rounded-[1.8rem] p-3 sm:p-4"
      >
        <div
          className="rounded-full p-2 text-sm text-gray-400 transition hover:bg-white/70"
          {...attributes}
          {...listeners}
        >
          <GripVertical color="grey" size={17} />
        </div>
        {!props.archived ? (
          <Image
            src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
            alt={apexDomain}
            className="h-10 w-10 rounded-[1rem] object-cover sm:h-12 sm:w-12"
            unoptimized
            width={20}
            height={20}
            priority
          />
        ) : (
          <TooltipWrapper
            title="This link has been archived by you"
            component={<ArchiveSVG />}
          />
        )}
        <div className="relative flex-1">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 pr-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate-soft max-w-[180px] text-sm font-semibold text-ink sm:max-w-[280px]">
                  {props.title}
                </p>
                <span className="rounded-full bg-white/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-ink/50">
                  {apexDomain}
                </span>
              </div>
              <a
                target="_blank"
                href={props.url}
                className="mt-2 inline-flex max-w-full rounded-[2px] outline-2 outline-offset-2"
              >
                <p className="truncate-soft w-[220px] text-sm font-medium text-ink/50 lg:w-[360px]">
                  {props.url}
                </p>
              </a>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  onClick={handleCopyLink}
                  href="#"
                  className="surface-card flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-ink/55"
                >
                  <Copy size={14} />
                  Copy
                </Link>

                <Link
                  href="/admin/analytics"
                  className="surface-card flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-ink/55"
                >
                  <BarChart size={14} />
                  {props.clicks} clicks
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 lg:justify-end">
              <small className="whitespace-nowrap text-xs uppercase tracking-[0.18em] text-ink/45 sm:block">
                Added {timeAgo(props.createdAt, true)}
              </small>
              <PopoverDesktop {...props} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkCard;
