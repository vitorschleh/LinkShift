/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from 'lucide-react';
import { getApexDomain } from '@/utils/helpers';
import {
  getButtonVariantStyles,
  hexToRgba,
  resolveThemeTokens,
} from '@/utils/themes';

const LinkCard = (props) => {
  if (props.archived) {
    return null;
  }

  const theme =
    props.theme?.background && props.theme?.text
      ? props.theme
      : resolveThemeTokens(props.theme);
  const { variant, style } = getButtonVariantStyles(props.buttonStyle, theme);
  const domain = getApexDomain(props.url) || props.url;
  const detailColor =
    variant === 'soft-solid'
      ? hexToRgba(theme.background, 0.72)
      : theme.textMuted;
  const accentFill =
    variant === 'soft-solid'
      ? hexToRgba(theme.background, 0.14)
      : theme.accentSoft;
  const accentColor = variant === 'soft-solid' ? theme.background : theme.accent;

  return (
    <a
      href={props.url}
      onClick={props.registerClicks}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-4 overflow-hidden rounded-[1.8rem] px-4 py-4 sm:px-5 sm:py-5 transition-all duration-300 hover:-translate-y-1"
      style={style}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] border"
        style={{
          background: variant === 'soft-solid' ? accentFill : theme.badgeFill,
          borderColor:
            variant === 'soft-solid'
              ? hexToRgba(theme.background, 0.18)
              : theme.badgeBorder,
        }}
      >
        {props.image ? (
          <img
            className="h-full w-full object-cover"
            alt={props.title}
            src={props.image}
          />
        ) : (
          <span className="font-display text-2xl" style={{ color: accentColor }}>
            {props.title?.charAt(0)?.toUpperCase() || 'L'}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h2
          className="truncate-soft text-sm font-semibold sm:text-base"
          style={{ color: style.color }}
        >
          {props.title}
        </h2>
        <p
          className="truncate-soft mt-1 text-xs font-medium sm:text-sm"
          style={{ color: detailColor }}
        >
          {domain}
        </p>
      </div>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{
          background: accentFill,
          color: accentColor,
        }}
      >
        <ArrowUpRight size={18} />
      </span>
    </a>
  );
};

export default LinkCard;
