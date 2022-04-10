import React from 'react'
import PropTypes from 'prop-types'
import stripHtml  from 'cli-strip-html'
import '../css/items.css'
import { Button, Row, Col, Card, Container } from 'react-bootstrap'

const Items = ({ product, onAddToCart }) => {


  const result  = stripHtml(product.description)
//call back function
//create handle function for prop
const handleAddToCart = () => {
  onAddToCart(product.id, 1);
}
  return (

    <Container fluid>
    <Row>
      <Col>
      <div className='itemCard'>
        <Card style={{ width: '18rem'}}>
          <Card.Img variant='top' src={product.image.url} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{result}</Card.Text>
            <Card.Text>{product.price.formatted_with_symbol}</Card.Text>
            <Col style={{ textAlign: "right" }}>
            <Button
               variant='primary'
               onClick={handleAddToCart}
            >Buy
            </Button>
          </Col>
          </Card.Body>
        </Card>

        

   
        </div>
      </Col>
    </Row>
    </Container>
  )
}

Items.propTypes = {
  product: PropTypes.object,
};

export default Items