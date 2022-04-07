import React from 'react'
import PropTypes from 'prop-types'
import stripHtml  from 'cli-strip-html'
import '../css/items.css'
import { Button, Row, Col } from 'react-bootstrap'

const Items = ({ product, onAddToCart }) => {


  const result  = stripHtml(product.description)
//call back function
//create handle function for prop
const handleAddToCart = () => {
  onAddToCart(product.id, 1);
}
  return (

    <Row>
      <Col>
      <div className='itemCard'>
        <img className='itemImg' src={product.image.url} alt={product.name} />
        <h4 className='productName'>{product.name}</h4>
        <p className='productDiscription'>{result}</p> 
        <p className='productPrice'>{product.price.formatted_with_symbol}</p>
        
          <Col style={{ textAlign: "right" }}>
            <Button
               variant='primary'
               onClick={handleAddToCart}
            >Buy
            </Button>
          </Col>
   
      </div>
      </Col>
    </Row>
  )
}

Items.propTypes = {
  product: PropTypes.object,
};

export default Items