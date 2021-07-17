import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("seller", "1");
    data.append("name", name);
    data.append("price", price);
    data.append("image", image, image.name);

    fetch("http://localhost/api/products/", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setName("");
    setPrice("");
    setImage(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddProductForm;
