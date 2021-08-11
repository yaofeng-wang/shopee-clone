import useFetch from "./useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthContext";
import { useHistory } from "react-router-dom";
import { useCart } from "./CartContext";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { djangoUserId, user } = useAuth();
  const history = useHistory();
  const { isLoading } = useFetch(`/api/products/${id}`, (data) =>
    setProduct(data)
  );

  return (
    <>
      {isLoading || !product ? (
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
      )}
    </>
  );
};

export default ProductDetail;
