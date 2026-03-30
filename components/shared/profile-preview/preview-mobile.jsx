/* eslint-disable @next/next/no-img-element */
import Loader from '@/components/utils/loading-spinner';
import NotFound from '@/components/utils/not-found';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLinks from '@/hooks/useLinks';
import ProfileCanvas from './profile-canvas';

const PreviewMobile = ({ close }) => {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { data: userLinks } = useLinks(currentUser?.id);

  if (isUserLoading) {
    return <Loader message={'Loading...'} bgColor="black" textColor="black" />;
  }

  if (!currentUser?.id) {
    return <NotFound />;
  }

  return <ProfileCanvas user={currentUser} links={userLinks || []} close={close} />;
};

export default PreviewMobile;
