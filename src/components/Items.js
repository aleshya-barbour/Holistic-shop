import React from 'react'
import PropTypes from 'prop-types'
import stripHtml  from 'cli-strip-html'
import '../css/items.css'

const Items = ({ product }) => {

  const result  = stripHtml(product.description)
  
  return (

    <div className='items'>
      <div className='itemCard'>
        <img className='itemImg' src={product.image.url} alt={product.name} />
        <h4 className='productName'>{product.name}</h4>
        <p className='productDiscription'>{result}</p> 
        <p className='productPrice'>{product.price.formatted_with_symbol}</p>
        <button className='buyButton'>Buy</button>
      </div>
    </div>
  )
}

Items.propTypes = {
  product: PropTypes.object,
};

export default Items