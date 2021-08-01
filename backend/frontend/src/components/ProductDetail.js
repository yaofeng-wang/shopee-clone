import { Container, Row, Col } from "react-bootstrap";
import useFetch from "./useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const { isLoading } = useFetch(`/api/products/${id}`, setProduct);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">{!isLoading && product.name}</h1>
        </Col>
      </Row>
    </Container>
  );
}
