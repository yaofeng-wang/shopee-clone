import React from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div>
      <h3>Cart</h3>
      <Link to="/checkout">Check out</Link>
    </div>
  );
}
