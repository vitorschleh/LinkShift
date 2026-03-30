/* eslint-disable react-hooks/exhaustive-deps */
import useCurrentUser from '@/hooks/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signalIframe } from '@/utils/helpers';
import {
  buttonVariants,
  getButtonVariantStyles,
  normalizeButtonStyle,
  resolveThemeTokens,
} from '@/utils/themes';

const ButtonSelector = () => {
  const { data: currentUser } = useCurrentUser();
  const [buttonStyle, setButtonStyle] = useState('soft-solid');
  const buttonFromDB = currentUser?.buttonStyle;

  const queryClient = useQueryClient();
  const theme = resolveThemeTokens(currentUser?.themePalette);

  useEffect(() => {
    const storedButton = normalizeButtonStyle(
      buttonFromDB || localStorage.getItem('button-style')
    );
    if (storedButton) {
      setButtonStyle(storedButton);
    }
  }, [buttonFromDB]);

  const mutateButtonStyle = useMutation(
    async (buttonCSS) => {
      await axios.patch('/api/customize', {
        buttonStyle: buttonCSS,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        signalIframe();
      },
    }
  );

  const handleChangeBtn = async (buttonCSS) => {
    await toast.promise(mutateButtonStyle.mutateAsync(buttonCSS), {
      loading: 'Applying style',
      success: 'Style applied successfully',
      error: 'An error occured',
    });
    setButtonStyle(buttonCSS);
    localStorage.setItem('button-style', buttonCSS);
  };

  return (
    <div className="mx-auto my-6 max-w-[760px]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-4xl leading-none text-ink">Buttons</h3>
          <p className="mt-2 text-sm text-ink/60">
            Choose how your links should feel when they float into view.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {buttonVariants.map((variant) => {
          const preview = getButtonVariantStyles(variant.id, theme);
          const isSelected = buttonStyle === variant.id;

          return (
            <button
              key={variant.id}
              onClick={() => handleChangeBtn(variant.id)}
              className={`surface-card text-left rounded-[2rem] p-4 transition ${
                isSelected ? 'ring-2 ring-[#7d654c] ring-offset-2 ring-offset-transparent' : ''
              }`}
            >
              <div className="rounded-[1.5rem] bg-white/30 p-3">
                <div
                  className="flex h-[72px] items-center justify-between gap-3 rounded-[1.4rem] px-4"
                  style={preview.style}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-white/15 text-sm font-semibold">
                    A
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate-soft text-sm font-semibold">
                      Curated headline
                    </p>
                    <p className="truncate-soft text-xs opacity-70">
                      premium destination
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-ink">{variant.name}</h4>
                <p className="mt-2 text-sm text-ink/60">{variant.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonSelector;
