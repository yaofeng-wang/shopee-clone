import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Product = ({ product }) => {
  const id = product.id;
  const imageURL = product.image;
  const name = product.name;
  const price = product.price;

  const addToCart = (e) => {
    e.stopPropagation();
    console.log("add to card");
  };

  return (
    <Card>
      <Link to={`/products/${id}`}>
        <Card.Img variant="top" src={imageURL}></Card.Img>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Price : S${price}</Card.Text>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
        </Card.Body>
      </Link>
      <Button className="addToCartBtn" variant="light" onClick={addToCart}>
        Add to Cart
      </Button>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
