import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import closeSVG from '@/public/close_button.svg';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { isValidUrl, signalIframe } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCurrentUser from '@/hooks/useCurrentUser';

const EditLinkModal = ({ id, title, url, close }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newUrl, setNewUrl] = useState(url);

  const [urlError, setUrlError] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const userId = currentUser?.id ?? null;

  const editMutation = useMutation(
    async ({ newTitle, newUrl }) => {
      await axios.patch(`/api/links/${id}`, {
        newTitle,
        newUrl,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links', userId] });
        signalIframe();
      },
    }
  );

  const handleEditLink = async () => {
    if (newTitle.trim() === '' || newUrl.trim() === '') {
      close();
      toast.error('Please fill the form');
      return;
    }
    close(); // close drawer
    await toast.promise(editMutation.mutateAsync({ newTitle, newUrl }), {
      loading: 'Editing link',
      success: 'Link edited successfully',
      error: 'An error occured',
    });
  };

  const handleUrlChange = (event) => {
    const urlValue = event.target.value;
    const URL = isValidUrl(urlValue);

    setNewUrl(urlValue);
    setUrlError(!URL);
  };

  return (
    <>
      <div>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content contentShow w-[350px] sm:w-[500px] md:max-w-lg lg:max-w-3xl max-md:max-w-lg focus:outline-none"
          >
            <div className="mb-5 flex flex-row items-center justify-between">
              <Dialog.Title className="font-display text-3xl leading-none text-slate-900">
                Edit Link
              </Dialog.Title>
              <Dialog.Close className="flex flex-end justify-end">
                <div
                  onClick={close}
                  className="surface-card flex items-center justify-center rounded-full p-2"
                >
                  <Image priority src={closeSVG} alt="close" />
                </div>
              </Dialog.Close>
            </div>
            <form name="edit-link-form" className="mb-6">
              <div className="relative mb-4">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-shell"
                  id="name"
                  type="text"
                  placeholder="Title"
                />
              </div>
              <div className="relative">
                <input
                  value={newUrl}
                  onChange={handleUrlChange}
                  className={`input-shell ${urlError ? 'border-red-500' : ''}`}
                  id="name"
                  type="url"
                  placeholder="URL"
                />
                {urlError && (
                  <small className="text-red-500 text-sm">
                    Enter a valid url
                  </small>
                )}
              </div>

              <Dialog.Close asChild>
                <button
                  onClick={handleEditLink}
                  className="action-primary mt-2 inline-flex w-full justify-center 
                        			text-lg mt-2 text-white bg-slate-800 hover:bg-slate-900 rounded-3xl 
                        			focus:outline-none focus:shadow-outline-blue"
                >
                  Edit link{' '}
                  <span role="img" aria-label="sparkling star">
                    ✨
                  </span>
                </button>
              </Dialog.Close>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </>
  );
};

export default EditLinkModal;
