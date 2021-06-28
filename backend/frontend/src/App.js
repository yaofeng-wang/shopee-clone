import './App.css';
import Container from 'react-bootstrap/Container';
import React, {useEffect, useState} from 'react';
import ProductSummaryList from './components/ProductSummaryList.js';
import NavigationBar from './components/NavigationBar.js';

export default function App() {

  const [products, setProducts] = useState([])
  
  useEffect(() => {
    fetch('http://localhost/api/products')
    .then(response => response.json())
    .then(data => {
      setProducts(data)
    })

  }, [])

    
  return (
        <>
          <NavigationBar/ >;
          <ProductSummaryList products={products} />;
        </>
  );
}
