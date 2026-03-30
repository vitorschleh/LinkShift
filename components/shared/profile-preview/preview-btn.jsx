import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import PreviewMobile from './preview-mobile';

const PreviewBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden">
        <button
          onClick={toggleDrawer}
          className="surface-card flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink"
        >
          Open Preview
        </button>
      </div>

      <Drawer
        id="drawer"
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        size={'92vh'}
        className="overflow-auto h-[100vh]"
      >
        <PreviewMobile close={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default PreviewBtn;
