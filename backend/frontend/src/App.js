import './App.css';
import Container from 'react-bootstrap/Container';
import React, {useEffect, useState} from 'react';

function App() {

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
          <Container>
            <h1 className="header">
            navigation with search!!
            </h1>
          </Container>
          <Container>
            <h1 className="header">
              flash deals
            </h1>
          </Container>
          <Container>
            <h1 className="header">
            daily discovered / recommendations
            </h1>
          </Container>
          <ul>
            {
              products.map((item,index) => 
              <li key={index}>{item.name}</li>)
            }
          </ul>
        </>
  );
}

export default App;
