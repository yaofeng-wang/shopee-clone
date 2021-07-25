import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const Product = ({ product }) => {
  return (
    <>
      <Card style={{ flex: "1 0 21%" }}>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Price : S${product.price}</Card.Text>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
