import LinksEditor from '../../components/core/admin-panel/links-editor';
import Layout from '@/components/layout/Layout';
import useMediaQuery from '@/hooks/use-media-query';
import Head from 'next/head';

const Admin = () => {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Head>
        <title>LinkShift | Links</title>
      </Head>
      <Layout>
        <div className="h-full overflow-auto px-4 py-6 sm:px-6">
          <LinksEditor />
          {isMobile && <div className="h-[40px] mb-24" />}
        </div>
      </Layout>
    </>
  );
};

export default Admin;
