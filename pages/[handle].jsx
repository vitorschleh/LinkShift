/* eslint-disable @next/next/no-img-element */
import ProfileCanvas from '@/components/shared/profile-preview/profile-canvas';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUser from '@/hooks/useUser';
import Loader from '@/components/utils/loading-spinner';
import NotFound from '@/components/utils/not-found';
import useLinks from '@/hooks/useLinks';
import Head from 'next/head';

const ProfilePage = () => {
  const { query } = useRouter();
  const { handle } = query;

  const {
    data: fetchedUser,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useUser(handle);

  const { data: userLinks, isFetching: isLinksFetching } = useLinks(
    fetchedUser?.id
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (id) => {
      await axios.patch(`/api/analytics/clicks/${id}`);
    },
    {
      onError: (error) => {
        toast.error(
          (error.response && error.response.data.message) || 'An error occurred'
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links', fetchedUser?.id] });
        queryClient.invalidateQueries({ queryKey: ['users', fetchedUser?.id] });
      },
    }
  );

  const handleRegisterClick = async (id) => {
    await mutation.mutateAsync(id);
  };

  useEffect(() => {
    const invalidatePreview = () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    };

    window.addEventListener('message', invalidatePreview);

    return () => {
      window.removeEventListener('message', invalidatePreview);
    };
  }, [queryClient]);

  if (isUserLoading) {
    return <Loader message={'Loading...'} bgColor="black" textColor="black" />;
  }

  if (!fetchedUser?.id) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <title>@{handle} | LinkShift</title>
      </Head>
      <div className="relative">
        {(isLinksFetching || isUserFetching) && (
          <div className="absolute right-4 top-4 z-50">
            <Loader strokeWidth={7} width={15} height={15} bgColor="black" />
          </div>
        )}
        <div className="min-h-screen">
          <ProfileCanvas
            user={fetchedUser}
            links={userLinks || []}
            registerClicks={handleRegisterClick}
          />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
