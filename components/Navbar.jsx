import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { showCart, setShowCart, cartItemsQuantity } = useAppContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">HB</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(!showCart)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{cartItemsQuantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar