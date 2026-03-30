import {useRouter} from 'next/router';
import Preview from '../shared/profile-preview/preview';
import PreviewBtn from '../shared/profile-preview/preview-btn';
import Navbar from './navbar/navbar';

const Layout = ({children}) => {
  const router = useRouter();

  return (
    <section className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <Navbar showName={false} isHomePage={false} />
        <main className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="surface-card-strong min-h-[calc(100vh-8rem)] overflow-hidden rounded-[2.5rem]">
            {children}
          </div>
          {router.pathname != '/admin/analytics' && (
            <div className="hidden lg:block">
              <Preview />
            </div>
          )}
        </main>
        <PreviewBtn />
      </div>
    </section>
  );
};

export default Layout;
