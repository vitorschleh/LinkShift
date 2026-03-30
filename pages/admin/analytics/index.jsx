import { AnalyticsDashboard } from '@/components/core/profile-analytics/dashboard';
import Layout from '@/components/layout/Layout';
import Footer from '@/components/layout/footer/footer';
import Head from 'next/head';

const Analytics = () => {
  return (
    <>
      <Head>
        <title>LinkShift | Analytics</title>
      </Head>
      <Layout>
        <div className="h-full overflow-auto px-4 py-6 sm:px-6">
          <div className="mx-auto my-6 max-w-[820px]">
            <AnalyticsDashboard />
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Analytics;
