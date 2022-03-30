import React from 'react'
import PropTypes from 'prop-types';
import { BsTrash } from 'react-icons/bs';
import '../css/cartitem.css'

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {

  const handleUpdateCartQty = (lineItemId, quantity) => {
    onUpdateCartQty(lineItemId, quantity)
  }

  const handleRemoveFromCart = () => {
    onRemoveFromCart(item.id)
  }

  return (
    
    <div className='cart-item'>
      <img style={{width: '6em'}} src={item.image.url} alt={item.name} />

      <div>
        <h4 >{item.name}</h4>
        <div className='plus-minus'>
          <button 
            className='minus'
            onClick={() => handleUpdateCartQty(
            item.id, item.quantity -1
            )}>
              -
            </button>
          <p >{item.quantity}</p>
          <button 
            className='minus'
            onClick={() => handleUpdateCartQty(
            item.id, item.quantity + 1)}
            >+
            </button>
        </div>
        <div>{item.line_total_formatted_with_symbol}</div>
      </div>
      <button
        className='cart-item-remove'
        onClick= { handleRemoveFromCart }
        >
        <BsTrash
         size='17px'
         color='blue'
        />
      </button>
    </div>

  )
}

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem