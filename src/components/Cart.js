import React from 'react'
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import { Link } from "react-router-dom";


const Cart = ({cart, onEmptyCart, onUpdateCartQty, onRemoveFromCart }) => {


  const handleEmptyCart = () => {
    onEmptyCart();
  }

  const renderEmptyMessage = () => {
    if (cart.total_unique_items > 0) {
      return;
    }

    return(
      <p className='none-cart'>
        Add items to be able to complete checkout

      </p>
    )
  }



  const renderItems = () => (
    cart.line_items.map((lineItem) => (
      <CartItem
        item={lineItem}
        onUpdateCartQty={onUpdateCartQty}
        onRemoveFromCart={onRemoveFromCart}
        key={lineItem.id}

        className="cart-inner"
      />
    ))
  )

  const renderTotal = () => {
    <div className="total">
    <p className="cartTotal-title">Subtotal:</p>
    <p className="cartTotal-price">{cart.subtotal.formatted_with_symbol}  </p>
  </div>

  }

  return (
    <div className='cart'>
      
    <h4 className='cart-heading'>Shopping Cart</h4>
    { renderItems () }
    { renderEmptyMessage () }
    { renderTotal () }

    <div className='cart-footer'>
      <button className='cart-btn-empty'onClick={handleEmptyCart}>Empty Cart</button>
        <Link
          to='checkout'
        >
          Checkout
        </Link>
    </div>
  

  
      
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.object,
  onEmptyCart: () => {},
};

export default Cart