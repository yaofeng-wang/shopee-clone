import useFetch from "./useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { useHistory } from "react-router-dom";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { djangoUserId, user } = useAuth();
  const history = useHistory();
  useFetch(`/api/products/${id}`, (data) => setProduct(data));

  return (
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
          <Button
            variant="light"
            style={{ width: "100%" }}
            disabled={djangoUserId === product.seller}
            onClick={() => {
              if (!user) {
                history.push("/sign-in");
                return;
              }
              addToCart(product);
            }}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

ProductDetail.propTypes = {
  addToCart: PropTypes.func,
};
