import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import useFetch from "./useFetch";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FilteredProductList() {
  const [products, setProducts] = useState();
  const query = useQuery();
  const { isLoading } = useFetch(
    `/api/products-filter/?search=${query.get("search")}`,
    setProducts
  );

  return (
    <>
      {!isLoading ? (
        <div className="cards">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
