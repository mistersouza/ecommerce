import React, { useRef } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import getStripe from '../lib/getStripe';

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useAppContext } from '../context/AppContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const cartRef = useRef();
  const { cartTotalValue, cartItemsQuantity, cartItems, setShowCart, handleCartItemQuantityClick, handleRemoveFromCartClick } = useAppContext();
  
  const handleCheckOut =  async() => {
    const stripe = await getStripe();

    const response = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
    });

    if(!response.ok) return; 

    const session = await response.json();

    toast.loading('Redirecting to Stripe Checkout...');

    stripe.redirectToCheckout({ sessionId: session.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button className="cart-heading" type="button" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({cartItemsQuantity} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button className="btn" type="button" onClick={() => setShowCart(false)}>Continue Shopping</button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length > 0 && cartItems.map(item => (
              <div className="product" key={item._id}>
                <img
                  className='cart-product-image'
                  src={urlFor(item?.image[0])}
                  alt={item.name}
                />
                <div className='item-desc'>

                    <div className='flex top'>
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className='flex bottom'>
                      <div>
                        <p className='quantity-desc'>
                          <span className="minus" onClick={() => handleCartItemQuantityClick(item._id, 'decrease')}><AiOutlineMinus /></span>
                          <span className="num">{item.quantity}</span>
                          <span className="plus" onClick={() => handleCartItemQuantityClick(item._id, 'increase')}><AiOutlinePlus /></span>
                        </p>
                      </div>
                      <button
                        className='remove-item'
                        type='button'
                        onClick={() => handleRemoveFromCartClick(item._id)}  
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
            ))}
        </div>
        {cartItems.length > 0 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${cartTotalValue}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckOut}>Pay with Stripe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart