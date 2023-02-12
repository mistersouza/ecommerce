import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'

import { client } from '../lib/client'; 

const Home = ({ products, banners }) => {
  return (
    <>
      <HeroBanner banner={banners.length && banners[0]} />

      <div className='products-heading'>
        <h2>Featured Products</h2>
        <p>Best selling products</p>
      </div>
      <div className='products-container'>
        {products?.map(product => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={banners && banners[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const products = await client.fetch('*[_type == "product"]');
  const banners = await client.fetch('*[_type == "banner"]');

  return {
    props: { products, banners }
  }
}

export default Home
