import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TinyLoader } from '@/components/utils/tiny-loader';
import { useRouter } from 'next/router';
import Confetti from 'react-dom-confetti';
import Balancer from 'react-wrap-balancer';
import BrandMark from '@/components/ui/brand-mark';

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [handle, setHandle] = useState('');
  const [handleTaken, setHandleTaken] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const router = useRouter();

  const handleAddHandle = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      if (!handle || handle.trim() === '') {
        toast.error('Please fill the form');
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.patch('/api/edit', { handle: handle });
        setIsLoading(false);
        if (response.status === 200) {
          setIsExploding(true);
          toast.success(`${handle} is yours 🎉`);
          setTimeout(() => {
            router.push('/admin');
          }, 1500);
        }
      } catch (error) {
        setHandleTaken(true);
        setTimeout(() => {
          setHandleTaken(false);
        }, 2500);
        setIsLoading(false);
      }
    },
    [handle, router]
  );

  const config = {
    angle: '109',
    spread: '284',
    startVelocity: 40,
    elementCount: '113',
    dragFriction: '0.19',
    duration: '4080',
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    setHandle(value);
    setHandleTaken(false);
  };
  return (
    <div className="ambient-page flex min-h-screen items-center justify-center px-4 py-10">
      <div className="surface-card-strong w-full max-w-md rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10">
        <div className="text-center">
          <BrandMark href="/" showTagline className="justify-center" />
          <span className="section-kicker mt-8 justify-center">
            Claim your handle
          </span>
          <h2 className="mt-6 font-display text-4xl leading-none text-ink">
            <Balancer>Make it unmistakably yours</Balancer>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            Choose the handle that will sit on your LinkShift page, QR codes
            and share links.
          </p>
        </div>
        <div className="mt-8">
          <form onSubmit={handleAddHandle}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="handle"
                  className="block text-sm font-medium leading-6 text-ink/70"
                >
                  Choose your public handle
                </label>
                <div className="mt-2 flex justify-center">
                  <input
                    id="handle"
                    placeholder="ex: atelier.links"
                    value={handle}
                    onChange={handleOnChange}
                    type="text"
                    required
                    className="input-shell"
                  />
                </div>
                {handleTaken && (
                  <small className="mt-2 block text-red-500">
                    {handle} is not available
                  </small>
                )}
              </div>
            </div>

            <div className="mt-5">
              <button
                disabled={isLoading}
                onClick={handleAddHandle}
                className="action-primary flex w-full"
              >
                {isLoading ? (
                  <div className="flex w-[100px] justify-center">
                    <TinyLoader color="white" size={20} stroke={2} />
                  </div>
                ) : (
                  <span className="text-md">Reserve handle</span>
                )}
              </button>
            </div>
            <div className="hidden h-full w-full justify-center lg:flex">
              <Confetti active={isExploding} config={config} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
