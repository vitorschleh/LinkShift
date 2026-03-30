import React from 'react';
import Layout from '@/components/layout/Layout';
import Footer from '@/components/layout/footer/footer';
import ButtonSelector from '@/components/core/custom-buttons/buttons-selector';
import ThemesPicker from '@/components/core/custom-page-themes/themes-picker';
import Head from 'next/head';

const Customize = () => {
  return (
    <>
      <Head>
        <title>LinkShift | Customize</title>
      </Head>
      <Layout>
        <div className="h-full overflow-auto px-4 py-6 sm:px-6">
          <ThemesPicker />
          <ButtonSelector />
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Customize;
