import React, {useState} from 'react'

import PropTypes from 'prop-types';
import { BsCart4 } from 'react-icons/bs';

import { FaRegTimesCircle } from 'react-icons/fa';
import Cart from './Cart';

const CartNav = ({cart, onUpdateCartQty, onRemoveFromCart }) => {
  const [isCartVisible, setCartVisible] = useState(false)

  const renderOpenButton = () => {
    <button className='nav-cart-btn--open'>
      <BsCart4 size="2x" color="#292B83" />
      {cart!==null ? <span>{cart.total_items}</span> : ''}
    </button>
  }
  const renderCloseButton = () => (
    <button>
      <FaRegTimesCircle size="1x" color='red' />
    </button>

  )
  return (
    <div>
      <div className='cart-nav' onClick={() => setCartVisible(!isCartVisible)}>
        {!isCartVisible ? renderOpenButton() : renderCloseButton() }

      </div>
      { isCartVisible &&
        <Cart
          cart={cart}
          onUpdateCartQty={onUpdateCartQty}
        />
        
      }
    </div>
  )
}

export default CartNav