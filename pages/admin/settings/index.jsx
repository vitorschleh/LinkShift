/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import UploadModal from '@/components/shared/modals/upload-modal';
import { TinyLoader } from '@/components/utils/tiny-loader';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Balancer } from 'react-wrap-balancer';
import useUser from '@/hooks/useUser';
import { UserAvatarSetting } from '@/components/utils/avatar';
import { signalIframe } from '@/utils/helpers';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import CustomAlert from '@/components/shared/alerts/custom-alert';
import useMediaQuery from '@/hooks/use-media-query';
import { signOut } from 'next-auth/react';
import Head from 'next/head';

const Settings = () => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [handle, setHandle] = useState('');

  const { isMobile } = useMediaQuery();

  const queryClient = useQueryClient();
  const { data: fetchedUser } = useUser(currentUser?.handle);

  useEffect(() => {
    setUsername(fetchedUser?.name);
    setBio(fetchedUser?.bio);
    setImage(fetchedUser?.image);
    setHandle(fetchedUser?.handle);
  }, [
    fetchedUser?.name,
    fetchedUser?.bio,
    fetchedUser?.image,
    fetchedUser?.handle,
  ]);

  // edit profile details
  const editMutation = useMutation(
    async ({ bio, username, image, handle }) => {
      await axios.patch('/api/edit', {
        bio,
        username,
        image,
        handle,
      });
    },
    {
      onError: () => {
        toast.error('An error occurred');
      },
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        toast.success('Changes applied');
        signalIframe();
      },
    }
  );

  const handleSubmit = async () => {
    toast.loading('Applying changes');
    await editMutation.mutateAsync({ bio, username, image, handle });
  };

  // delete profile picture
  const handleDeletePfp = async () => {
    if (image === '') {
      toast.error('There is nothing to delete');
      return;
    } else {
      toast.loading('Applying changes');
      await editMutation.mutateAsync({ bio, username, image: '', handle });
    }
  };

  // delete user's account
  const deleteMutation = useMutation(
    async () => {
      await axios.delete('/api/edit');
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        router.push('/register');
      },
    }
  );

  const handleDeleteUser = async () => {
    await toast.promise(deleteMutation.mutateAsync(), {
      loading: 'Deleting your account',
      success: 'So long partner 🫡',
      error: 'An error occured',
    });
    await signOut();
  };

  const deleteAlertProps = {
    action: handleDeleteUser,
    title: 'Are you absolutely sure?',
    desc: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    confirmMsg: 'Yes, delete account',
  };

  return (
    <>
      <Head>
        <title>LinkShift | Settings</title>
      </Head>
      <Layout>
        <div className="h-full overflow-auto px-4 py-6 sm:px-6">
          <div className="mx-auto my-6 max-w-[760px]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-4xl leading-none text-ink">
                  Profile
                </h3>
                <p className="mt-2 text-sm text-ink/60">
                  Refine your presence, image and the public details people see
                  first.
                </p>
              </div>
            </div>
            <div className="surface-card-strong mt-4 w-full rounded-[2rem] p-6 pb-8">
              <div className="flex flex-col gap-x-6 gap-y-6 lg:flex-row lg:p-4">
                <div className="mx-auto flex h-[100px] w-[100px] items-center rounded-full pb-0 lg:pb-6">
                  {fetchedUser ? (
                    <UserAvatarSetting />
                  ) : (
                    <TinyLoader color="black" stroke={1} size={100} />
                  )}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="relative overflow-hidden">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button className="action-primary w-full lg:w-[490px]">
                          Pick an image
                        </button>
                      </Dialog.Trigger>
                      <UploadModal
                        value={image}
                        onChange={(image) => setImage(image)}
                        submit={handleSubmit}
                      />
                    </Dialog.Root>
                  </div>
                  <button
                    onClick={handleDeletePfp}
                    className="action-secondary w-full lg:w-[490px]"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="mx-auto flex max-w-[640px] flex-col gap-4 px-1 lg:px-4">
                <input
                  value={username ?? ''}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={handleSubmit}
                  placeholder="@Username"
                  className="input-shell"
                />

                <textarea
                  value={bio ?? ''}
                  onChange={(e) => setBio(e.target.value)}
                  onBlur={handleSubmit}
                  placeholder="@Bio"
                  className="textarea-shell"
                />
              </div>
            </div>
          </div>

          <div className="mx-auto my-10 max-w-[760px]">
            <h3 className="font-display text-4xl leading-none text-ink">
              Danger Zone
            </h3>
            <h3 className="mb-4 mt-2 text-sm text-gray-600">
              <Balancer>
                Deleting your account permanently deletes your page and all your
                data.
              </Balancer>
            </h3>
            <div className="surface-card-strong h-auto w-full rounded-[2rem] p-6">
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <button
                    className="inline-flex w-full justify-center rounded-full bg-red-600 px-4 py-3 text-white transition hover:bg-red-500 lg:w-[220px]"
                  >
                    Delete Account
                  </button>
                </AlertDialog.Trigger>
                <CustomAlert {...deleteAlertProps} />
              </AlertDialog.Root>
            </div>
          </div>
          {isMobile ? (
            <div className="h-[100px] mb-24" />
          ) : (
            <div className="h-[40px] mb-12" />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Settings;
