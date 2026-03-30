import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import Image from 'next/image';
import closeSVG from '@/public/close_button.svg';
import { isValidUrl, signalIframe } from '@/utils/helpers';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLinks from '@/hooks/useLinks';
import * as Switch from '@radix-ui/react-switch';
import TooltipWrapper from '@/components/utils/tooltip';

const AddLinkModal = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isSocial, setIsSocial] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.id ?? null;
  const { data: userLinks } = useLinks(userId);

  const queryClient = useQueryClient();

  const order = userLinks?.length;

  const addLinkMutation = useMutation(
    async ({ title, url, order }) => {
      await axios.post('/api/links', {
        title,
        url,
        order,
        isSocial,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links', userId] });
        setTitle('');
        setUrl('');
        setIsSocial(false);
        signalIframe();
      },
    }
  );

  const submitLink = async () => {
    if (title.trim() === '' || url.trim() === '') {
      toast.error('Please fill the form');
      return;
    }
    await toast.promise(addLinkMutation.mutateAsync({ title, url, order }), {
      loading: 'Adding link',
      success: 'Link added successfully',
      error: 'An error occured',
    });
  };

  const handleUrlChange = (event) => {
    const urlValue = event.target.value;
    const URL = isValidUrl(urlValue);

    setUrl(urlValue);
    setUrlError(!URL);
  };

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content contentShow w-[350px] sm:w-[500px] md:max-w-lg lg:max-w-3xl max-md:max-w-lg focus:outline-none">
          <div className="mb-5 flex flex-row items-center justify-between">
            <Dialog.Title className="font-display text-3xl leading-none text-slate-900">
              Create a new Link
            </Dialog.Title>
            <Dialog.Close className="flex flex-end justify-end">
              <div className="surface-card flex items-center justify-center rounded-full p-2">
                <Image priority src={closeSVG} alt="close" />
              </div>
            </Dialog.Close>
          </div>
          <form name="add-link-form" className="mb-6">
            <div className="relative mb-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-shell"
                id="name"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="relative">
              <input
                value={url}
                onChange={handleUrlChange}
                className={`input-shell ${urlError ? 'border-red-500' : ''}`}
                id="url"
                type="url"
                placeholder="URL"
              />
              {urlError && (
                <small className="text-red-500 text-sm">
                  Enter a valid URL (ex: https://hello.com)
                </small>
              )}
            </div>

            <div className="p-2 relative flex justify-between gap-2 text-gray-800 my-4">
              <TooltipWrapper
                title="Twitter, Instagram, LinkedIn, etc"
                component={
                  <h3 className="text-md lg:text-lg">
                    Add as a social media link?
                  </h3>
                }
              />
              <Switch.Root
                checked={isSocial}
                onCheckedChange={() => setIsSocial(!isSocial)}
                className="relative h-[21px] w-[39px] cursor-default rounded-full border border-slate-200 bg-[#E4E4E7] outline-none data-[state=checked]:bg-slate-900 lg:h-[25px] lg:w-[42px]"
              >
                <Switch.Thumb className="block w-[17px] h-[17px] bg-white rounded-full shadow-[0_2px_2px] transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px] lg:w-[21px] lg:h-[21px]" />
              </Switch.Root>
            </div>

            <Dialog.Close asChild>
              <button
                onClick={submitLink}
                disabled={urlError}
                className={`action-primary mt-2 inline-flex w-full justify-center 
                     			 text-lg mt-2 text-white rounded-3xl 
                      			${
                              !urlError
                                ? 'bg-slate-800 hover:bg-slate-900'
                                : 'bg-slate-500'
                            }`}
              >
                Create Link{' '}
                <span role="img" aria-label="sparkling star">
                  ✨
                </span>
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};

export default AddLinkModal;
