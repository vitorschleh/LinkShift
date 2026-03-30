import { siteConfig } from '@/config/site';
import closeSVG from '@/public/close_button.svg';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useCurrentUser from '@/hooks/useCurrentUser';
import { getCurrentBaseURL } from '@/utils/helpers';

const ShareModal = () => {
  const { data: currentUser } = useCurrentUser();
  const baseURL = getCurrentBaseURL();
  const userProfileLink =
    baseURL && currentUser?.handle ? `${baseURL}/${currentUser.handle}` : '';

  const [isCopied, setIsCopied] = useState(false);

  const goTo = siteConfig.redirects;

  const handleCopyLink = () => {
    if (!userProfileLink) {
      toast.error('Profile link unavailable');
      return;
    }

    navigator.clipboard.writeText(userProfileLink);
    setIsCopied(true);
    toast.success('Copied URL to clipboard!');
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code');
    if (!canvas) {
      return;
    }
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = currentUser?.handle
      ? `${currentUser?.handle}.png`
      : 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <div>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content contentShow w-[350px] sm:w-[500px] md:max-w-lg lg:max-w-3xl max-md:max-w-lg focus:outline-none"
          >
            <div className="mb-3 flex flex-row items-center justify-between">
              <Dialog.Title className="font-display text-3xl leading-none text-slate-900">
                Share your Link
              </Dialog.Title>

              <Dialog.Close className="flex flex-end justify-end">
                <div className="surface-card flex items-center justify-center rounded-full p-2">
                  <Image priority src={closeSVG} alt="close" />
                </div>
              </Dialog.Close>
            </div>

            <Tabs.Root defaultValue="url" className="w-full rounded-md mt-4">
              <Tabs.List className="surface-card flex h-12 items-center rounded-full p-1 text-slate-900">
                <Tabs.Trigger
                  value="url"
                  className="flex-1 rounded-full px-4 py-2 text-center text-gray-600 data-[state=active]:bg-white data-[state=active]:font-medium data-[state=active]:text-slate-900"
                >
                  URL
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="QR"
                  className="flex-1 rounded-full px-4 py-2 text-center text-gray-600 data-[state=active]:bg-white data-[state=active]:font-medium data-[state=active]:text-slate-900"
                >
                  QR Code
                </Tabs.Trigger>
              </Tabs.List>

              <div className="p-4">
                <Tabs.Content value="url">
                  <div className="mb-6">
                    <div className="mt-2 mb-4">
                      <p className="text-sm">
                        Add this link to your{' '}
                        <a
                          target="_blank"
                          href={goTo.twitter}
                          className="underline"
                        >
                          Twitter
                        </a>
                        ,{' '}
                        <a
                          target="_blank"
                          href={goTo.instagram}
                          className="underline"
                        >
                          Instagram
                        </a>{' '}
                        or{' '}
                        <a
                          target="_blank"
                          href={goTo.linkedin}
                          className="underline"
                        >
                          LinkedIn
                        </a>{' '}
                        bio{' '}
                        <span aria-label="rocket">
                          to make it accessible from anywhere.
                        </span>
                      </p>
                    </div>
                    <div className="relative mb-4">
                      <div className="surface-card flex h-6 w-full items-center justify-between rounded-[1.6rem] px-4 py-[28px] text-gray-700">
                        <h2 className="truncate w-[250px] lg:w-full">
                          {userProfileLink}
                        </h2>
                        <button
                          onClick={handleCopyLink}
                          className="action-primary w-[88px]"
                        >
                          {isCopied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </Tabs.Content>

                <Tabs.Content value="QR">
                  <QRCodeCanvas
                    className="mx-auto w-full"
                    id="qr-code"
                    size={256}
                    includeMargin={true}
                    level="H"
                    value={userProfileLink}
                    imageSettings={{
                      src: `${currentUser?.image}`,
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />

                  <p className="mt-4 text-center text-gray-700">
                    Share this QR code with your audience to provide access to
                    your profile.
                  </p>
                  <button
                    onClick={downloadQRCode}
                    className="action-primary mt-4 flex w-full justify-center"
                  >
                    Download QR Code
                  </button>
                </Tabs.Content>
              </div>
            </Tabs.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </>
  );
};

export default ShareModal;
