import { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";
import fetchData from "./fetchData";

const AddProductForm = ({ addProduct }) => {
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const { djangoUserId } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("seller", djangoUserId);
    data.append("name", nameRef.current.value);
    data.append("price", priceRef.current.value);
    data.append(
      "image",
      imageRef.current.files[0],
      imageRef.current.files[0].name
    );

    fetchData(
      "/api/products/",
      "POST",
      (data) => {
        addProduct(data);
        document.getElementById("add-product-form").reset();
      },
      data
    );
  };

  return (
    <>
      <Form id="add-product-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            ref={nameRef}
            placeholder="Enter product name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            ref={priceRef}
            placeholder="Enter product price"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" ref={imageRef} required />
        </Form.Group>

        <Button className="w-100" variant="light" type="submit">
          Add Product
        </Button>
      </Form>
    </>
  );
};

AddProductForm.propTypes = {
  addProduct: PropTypes.func,
};

export default AddProductForm;
