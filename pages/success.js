import React, { useEffect} from 'react'
import Link from 'next/link'

import { BsBagCheckFill } from 'react-icons/bs'
import { useAppContext } from '../context/AppContext'
import { setConfetti } from '../lib/utils'

const Success = () => {
    const { setCartItems, setCartTotalValue, setCartItemsQuantity } = useAppContext()

    useEffect(() => {
        localStorage.clear(); 
        setCartItems([])
        setCartTotalValue(0)
        setCartItemsQuantity(0)
        setConfetti()
    }, []);
    
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order</h2>
            <p className='email-msg'>Check your e-mail inbox for your receipt.</p>
            <p className='description'>
              If you have further questions, please contact us at
              <a className='email' href='mailto:order@hb.com'>order@hb.com</a>
            </p>
            <Link href='/'>
              <button type='button' width='300px' className='btn'>
                Continue Shopping
              </button>
            </Link>
        </div>
    </div>
  )
}

export default Success