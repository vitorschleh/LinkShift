import { useEffect, useState } from 'react';
import {
  getThemePreviewStyle,
  normalizeThemePalette,
  themes,
} from '@/utils/themes';
import { CheckMark } from '@/components/utils/checkmark';
import useCurrentUser from '@/hooks/useCurrentUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signalIframe } from '@/utils/helpers';

const ThemesPicker = () => {
  const { data: currentUser } = useCurrentUser();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const themeFromDB = currentUser?.themePalette.name;

  const queryClient = useQueryClient();

  useEffect(() => {
    const storedTheme = themeFromDB
      ? themeFromDB
      : localStorage.getItem('selectedTheme');
    if (storedTheme) {
      const theme = themes.find((t) => t.name === storedTheme);
      if (theme) {
        setSelectedTheme(theme);
        return;
      }
    }
    const normalizedTheme = normalizeThemePalette(currentUser?.themePalette);
    const fallbackTheme = themes.find((theme) => theme.name === normalizedTheme.name);
    setSelectedTheme(fallbackTheme || themes[0]);
  }, [currentUser?.themePalette, themeFromDB]);

  const mutateTheme = useMutation(
    async (theme) => {
      await axios.patch('/api/customize', {
        themePalette: theme,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        signalIframe();
      },
    }
  );

  const handleThemeSelect = async (theme) => {
    await toast.promise(mutateTheme.mutateAsync(theme), {
      loading: 'Changing theme',
      success: 'New theme applied',
      error: 'An error occured',
    });
    setSelectedTheme(theme);
    localStorage.setItem('selectedTheme', theme.name);
  };

  return (
    <div className="mx-auto my-6 max-w-[760px]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-4xl leading-none text-ink">Themes</h3>
          <p className="mt-2 text-sm text-ink/60">
            Curated palettes tuned for glass, softness and readable typography.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {themes.map((theme) => {
          const isSelected = selectedTheme?.name === theme.name;
          const previewStyle = getThemePreviewStyle(theme);

          return (
            <button
              key={theme.name}
              onClick={() => handleThemeSelect(theme)}
              className={`surface-card relative overflow-hidden rounded-[2rem] p-3 text-left transition ${
                isSelected ? 'ring-2 ring-[#7d654c] ring-offset-2 ring-offset-transparent' : ''
              }`}
            >
              <div className="rounded-[1.5rem] p-3" style={previewStyle}>
                <div className="surface-card rounded-[1.2rem] p-4" style={{ background: theme.palette[1] }}>
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className="h-10 w-10 rounded-[1rem]"
                      style={{ background: theme.palette[3] }}
                    />
                    {isSelected && (
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full"
                        style={{
                          background: theme.palette[0],
                          color: theme.palette[2],
                        }}
                      >
                        <CheckMark />
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div
                      className="h-3 w-24 rounded-full"
                      style={{ background: theme.palette[2] }}
                    />
                    <div
                      className="h-2 w-16 rounded-full opacity-60"
                      style={{ background: theme.palette[2] }}
                    />
                  </div>
                </div>
              </div>
              <div className="px-2 pb-2 pt-4">
                <h4 className="text-lg font-semibold text-ink">{theme.name}</h4>
                <p className="mt-2 text-sm text-ink/55">
                  {theme.palette[0]} · {theme.palette[3]}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemesPicker;
