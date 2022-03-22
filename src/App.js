import React, { useState, useEffect} from 'react';
import { commerce } from './lib/commerce';
import ItemMap from './components/ItemMap';
import CartNav from './components/CartNav';

const App = () => {
  //create stateful component
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  //create a function that fetches
  //products and makes request to product endpoint

  const fetchProducts = () => {
    commerce.products.list().then((products) =>{
      setProducts(products.data);
    }).catch((error) => {
      console.log('Error while fetching the products', error)
    })
  }

  const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => {
      setCart(cart)
    }).catch((error) => {
      console.log('There was an error while retrieving cart', error)
    })
  }

  const handleAddToCart =(productId,quantity) => {
    commerce.cart.add(productId, quantity).then ((item) => {
      setCart(item.cart)
    }).catch((error) => {
      console.error('There was an error while adding items to cart', error)
    })
  }

  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart.update(lineItemId, { quantity}).then((resp) => {
      setCart(resp.cart)
    }).catch((error) => {
      console.log('There was an error while updating your cart items', error)
    })
  }


    return (
      <div className="app">
        <ItemMap
          products={products}
          onAddToCart={handleAddToCart} 
          />

        <CartNav
          cart={cart}
          onUpdateCartQty={handleUpdateCartQty}
        />
      </div>
    );
  

 
};



export default App;
