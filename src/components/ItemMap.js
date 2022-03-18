
import React from 'react'
import PropTypes from 'prop-types'
import Items from './Items'


const ItemMap = ({ products }) => {

  return (
    
    <div className='itemsMap'>
      { products.map((product) =>(
            <Items
              key={product.id}
              product={product}
              
            />
          ))}

    
    </div>
  )  
}
ItemMap.propTypes = {
  products: PropTypes.array,
};


export default ItemMap