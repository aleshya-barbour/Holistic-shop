
import React from 'react'
import PropTypes from 'prop-types'
import Items from './Items'


const ItemMap = ({ products, onAddToCart}) => {

  return (
    
    <div className='itemsMap' id='products'>
    
      { products.map((product) =>(
            <Items
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              
            />
          ))}

    
    </div>
  )  
}
ItemMap.propTypes = {
  products: PropTypes.array,
};


export default ItemMap