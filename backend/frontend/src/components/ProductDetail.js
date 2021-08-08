import useFetch from "./useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const { isLoading } = useFetch(
    `http://localhost/api/products/${id}`,
    setProduct
  );

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Container>
          <Row>
            <Col>
              <img style={{ width: "100%" }} src={product.image}></img>
            </Col>
            <Col>
              <div>
                <h3 className="text-center">Name: {product.name}</h3>
                <h3 className="text-center">Price: S${product.price}</h3>
              </div>
              <Button variant="light" style={{ width: "100%" }}>
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
