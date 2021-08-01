import { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddProductForm = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  const getCookie = (name) => {
    if (!document.cookie) {
      return null;
    }
    const token = document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((c) => c.startsWith(name + "="));

    if (token.length === 0) {
      return null;
    }
    return decodeURIComponent(token[0].split("=")[1]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrftoken = getCookie("csrftoken");
    let data = new FormData();
    data.append("seller", "1");
    data.append("name", nameRef.current.value);
    data.append("price", priceRef.current.value);
    data.append(
      "image",
      imageRef.current.files[0],
      imageRef.current.files[0].name
    );

    await fetch("/api/products/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        document.getElementById("add-product-form").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
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
        Submit
      </Button>
    </Form>
  );
};

export default AddProductForm;
