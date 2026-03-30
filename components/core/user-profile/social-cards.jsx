/* eslint-disable @next/next/no-img-element */
import { getApexDomain, removeHashFromHexColor } from '@/utils/helpers';
import { hexToRgba } from '@/utils/themes';

export const SocialCards = ({ url, title, theme, registerClicks }) => {
  const iconColor = theme?.accent || theme?.text || '#171411';
  const validColor = removeHashFromHexColor(iconColor);

  // checking for website aliases: adding more soon
  const specialCases = {
    x: 'twitter',
    fb: 'facebook',
    pin: 'pinterest',
    discordapp: 'discord',
    t: 'telegram',
  };

  const getSocialMediaName = (url) => {
    const domainURL = getApexDomain(url);
    // Use a regular expression to match only the site name
    const siteName = domainURL.match(/^[^.]+/);

    if (siteName && !(siteName in specialCases)) {
      return siteName[0];
    } else {
      return specialCases[siteName[0]];
    }
  };

  const socialIcon = getSocialMediaName(url);

  return (
    <a
      onClick={registerClicks}
      target="_blank"
      href={url}
      className="group flex h-12 w-12 items-center justify-center rounded-[1.2rem] border transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
      style={{
        background: theme?.panelFill || hexToRgba(iconColor, 0.12),
        borderColor: theme?.badgeBorder || hexToRgba(iconColor, 0.12),
        boxShadow: `0 18px 46px ${hexToRgba(theme?.text || iconColor, 0.14)}`,
      }}
    >
      <img
        loading="lazy"
        src={`https://s2.svgbox.net/social.svg?color=${validColor}&ic=${socialIcon}`}
        className="h-5 w-5 sm:h-6 sm:w-6"
        alt={title}
      />
    </a>
  );
};
