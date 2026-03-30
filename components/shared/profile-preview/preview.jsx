import useCurrentUser from '@/hooks/useCurrentUser';
import { getCurrentBaseURL } from '@/utils/helpers';

const Preview = () => {
  const { data: currentUser } = useCurrentUser();
  const baseURL = getCurrentBaseURL();
  const url = `${baseURL}/${currentUser?.handle}?isIframe=true`;

  return (
    <div className="surface-card rounded-[2.4rem] p-4">
      <div className="mb-4 flex items-center justify-between px-2">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-ink/45">
            Live preview
          </p>
          <h3 className="font-display text-2xl leading-none text-ink">
            Mobile presence
          </h3>
        </div>
        <span className="floating-chip text-[0.68rem] uppercase tracking-[0.2em]">
          synced
        </span>
      </div>
      <div className="device-shell mx-auto w-[18rem] max-w-sm p-3 pt-12">
        <div className="overflow-hidden rounded-[2rem]">
          {currentUser && (
            <iframe
              seamless
              loading="lazy"
              title="preview"
              id="preview"
              className="h-[640px] w-full bg-transparent"
              src={url}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
