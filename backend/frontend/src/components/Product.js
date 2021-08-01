import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const id = product.id;
  const imageURL = product.image;
  const name = product.name;
  const price = product.price;

  return (
    <Link
      to={`/products/${id}`}
      style={{ flex: "1 0 21%", textDecoration: "none" }}
    >
      <Card>
        <Card.Img variant="top" src={imageURL}></Card.Img>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Price : S${price}</Card.Text>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
