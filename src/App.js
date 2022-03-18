import React, { useState, useEffect} from 'react';
import { commerce } from './lib/commerce';
import ItemMap from './components/ItemMap';

const App = () => {
  //create stateful component
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
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


    return (
      <div className="app">
        <ItemMap
          products={products} />
      </div>
    );
  

 
};



export default App;
