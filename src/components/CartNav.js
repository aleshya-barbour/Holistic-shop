import React, {useState} from 'react'

import PropTypes from 'prop-types';
import { BsCart4 } from 'react-icons/bs';

import { FaRegTimesCircle } from 'react-icons/fa';
import Cart from './Cart';

const CartNav = ({cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const [isCartVisible, setCartVisible] = useState(false)

return (
  <div className='cart-nav'>
    <div className="nav__cart" onClick={() => setCartVisible(!isCartVisible)}>
      {!isCartVisible ? (
        <button className='nav-cart-btn--open'>
          <BsCart4 
          color='red' />
          {cart!== null ? <span>{cart.total_items}</span> : ''}
        </button>

      ) : (
        <button>
        <FaRegTimesCircle  />
      </button>

      )}

      </div>
      { isCartVisible &&
        <Cart
          cart={cart}
          onUpdateCartQty={onUpdateCartQty}
          onRemoveFromCart={onRemoveFromCart}
          onEmptyCart={onEmptyCart}
        />
        
      }
    </div>
   
)
}


export default CartNav

// CartNav.propTypes = {
//   cart: PropTypes.object,
//   onUpdateCartQty: PropTypes.func,
//   onRemoveFromCart: PropTypes.func,
//   onEmptyCart: PropTypes.func,
// };