import * as Avatar from '@radix-ui/react-avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';

export const UserAvatar = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(currentUser?.handle);

  return (
    <>
      <Avatar.Root
        className="inline-flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-[1.1rem] border align-middle shadow-float lg:h-[46px] lg:w-[46px]"
        style={{
          background: 'rgba(255,255,255,0.5)',
          borderColor: 'rgba(255,255,255,0.62)',
        }}
      >
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src={fetchedUser && fetchedUser?.image}
          referrerPolicy="no-referrer"
          alt="avatar"
        />
        <Avatar.Fallback
          className="leading-1 flex h-full w-full items-center justify-center bg-white/70 font-display text-[18px] text-slate-900"
          delayMs={100}
        >
          @
        </Avatar.Fallback>
      </Avatar.Root>
    </>
  );
};

export const UserAvatarSetting = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(currentUser?.handle);

  return (
    <>
      <Avatar.Root
        className="inline-flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-[2rem] border align-middle shadow-float"
        style={{
          background: 'rgba(255,255,255,0.52)',
          borderColor: 'rgba(255,255,255,0.62)',
        }}
      >
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src={fetchedUser && fetchedUser?.image}
          referrerPolicy="no-referrer"
          alt="avatar"
        />
        <Avatar.Fallback
          className="leading-1 flex h-full w-full items-center justify-center bg-white/70 font-display text-[35px] text-slate-900"
          delayMs={100}
        >
          @
        </Avatar.Fallback>
      </Avatar.Root>
    </>
  );
};
