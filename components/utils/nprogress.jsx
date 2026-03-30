import { useNProgress } from '@tanem/react-nprogress';

const NProgress = ({ isRouteChanging }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  });

  return (
    <>
      <style jsx>{`
        .container {
          opacity: ${isFinished ? 0 : 1};
          pointer-events: none;
          transition: opacity ${animationDuration}ms linear;
        }

        .bar {
          background: linear-gradient(90deg, #6f563f 0%, #b69774 45%, #4e4147 100%);
          height: 4px;
          left: 0;
          margin-left: ${(-1 + progress) * 100}%;
          position: fixed;
          top: 0;
          transition: margin-left ${animationDuration}ms linear;
          width: 100%;
          z-index: 1031;
        }

        .spinner {
          display: block;
          height: 100%;
          opacity: 1;
          position: absolute;
          right: 0;
          transform: rotate(3deg) translate(0px, -4px);
          width: 100px;
          box-shadow: 0 0 30px rgba(167, 131, 91, 0.8);
        }
      `}</style>
      <div className="container">
        <div className="bar">
          <div className="spinner" />
        </div>
      </div>
    </>
  );
};

export default NProgress;
