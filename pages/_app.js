import React from 'react'

import { AppContext } from '../context/AppContext';

import { Toaster } from 'react-hot-toast';

import Layout from '../components/Layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </AppContext>
  ); 
}

export default MyApp
