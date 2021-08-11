import React, { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";

const cartContext = createContext();

export const useCart = () => {
  return useContext(cartContext);
};

export const ProvideCart = ({ children }) => {
  const cart = useProvideCart();
  return <cartContext.Provider value={cart}>{children}</cartContext.Provider>;
};

const useProvideCart = () => {
  const loadCartFromStorage = () => {
    const toBeLoaded = new Map();
    if (!sessionStorage.getItem("cart")) {
      return toBeLoaded;
    }
    for (const obj of JSON.parse(sessionStorage.getItem("cart"))) {
      const newObj = { ...obj };
      const quantity = newObj["quantity"];
      delete newObj["quantity"];
      toBeLoaded.set(newObj.id, [newObj, quantity]);
    }
    return toBeLoaded;
  };
  const [cart, setCart] = useState(loadCartFromStorage());

  const saveCartInStorage = (cart) => {
    const toBeStored = [];
    for (const [, v] of cart.entries()) {
      toBeStored.push({ ...v[0], quantity: v[1] });
    }
    if (toBeStored.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(toBeStored));
    } else if (sessionStorage.getItem("cart")) {
      sessionStorage.removeItem("cart");
    }
  };

  const addToCart = (newProduct) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      if (newCart.has(newProduct.id)) {
        const prevCount = newCart.get(newProduct.id)[1];
        newCart.set(newProduct.id, [newProduct, prevCount + 1]);
      } else {
        newCart.set(newProduct.id, [newProduct, 1]);
      }
      saveCartInStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      newCart.set(product.id, [product, newCart.get(product.id)[1] - 1]);
      if (newCart.get(product.id)[1] === 0) {
        newCart.delete(product.id);
      }
      saveCartInStorage(newCart);
      return newCart;
    });
  };
  return {
    cart,
    addToCart,
    removeFromCart,
  };
};

ProvideCart.propTypes = {
  children: PropTypes.any,
};
