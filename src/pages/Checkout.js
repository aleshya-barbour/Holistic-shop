import React, {useState} from 'react'
import { useEffect } from 'react';
import { commerce } from '../lib/commerce';


const Checkout = () => {
  const [checkoutToken, setCheckoutToken] = useState([]);

  useEffect(() => {
    fetchgenerateCheckoutToken()
  }, [])

  const fetchgenerateCheckoutToken =() => {
    commerce.checkout.generateToken('cart', commerce.cart.id)
    .then(response => console.log(response.id))
    
  }
  return (
    <div className='form'>
      <form>
        <label>Full Name
          <input type='text' />
        </label>
      </form>
    </div>
  )
}

export default Checkout