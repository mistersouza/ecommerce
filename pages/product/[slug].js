import React from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { useAppContext } from '../../context/AppContext';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = React.useState(0);
  
  const { handleDecreaseClick, handleIncreaseClick, handleAddToCartClick, itemQuantity, setShowCart } = useAppContext();
  const { image, name, details, price } = product;

  const handleBuyNowClick = () => {
    handleAddToCartClick(product, itemQuantity);
    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={handleDecreaseClick}><AiOutlineMinus /></span>
              <span className="num">{itemQuantity}</span>
              <span className="plus" onClick={handleIncreaseClick}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => handleAddToCartClick(product, itemQuantity)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={() => handleBuyNowClick()}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }`;

    const products = await client.fetch(query);

    const paths = products.map(product => ({
      params: { 
        slug: product.slug.current
      }
    }));

    return {
      paths,
      fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const product = await client.fetch(`*[_type == "product" && slug.current == '${slug}'][0]`);
  const products = await client.fetch('*[_type == "product"]');

  return {
    props: { products, product }
  }
}

export default ProductDetails