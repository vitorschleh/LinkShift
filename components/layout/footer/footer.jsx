import Link from 'next/link';
import useMediaQuery from '@/hooks/use-media-query';

const Footer = () => {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <footer className="mt-10 flex items-center justify-center">
        <p className="floating-chip text-center text-xs uppercase tracking-[0.2em]">
          Crafted by{' '}
          <Link target="_blank" href="https://twitter.com/NerdyProgramme2">
            @urdadx
          </Link>
        </p>
      </footer>
      {isMobile && <div className="h-[40px] mb-24" />}
    </>
  );
};

export default Footer;
