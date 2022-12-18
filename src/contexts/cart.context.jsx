import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
  //finding the item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //checking if equal to one, then remove
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id != cartItemToRemove.id);
  }
  //
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem =(cartItems, itemToClear) =>{
  return (cartItems.filter((cartItem) => cartItem.id != itemToClear.id));
}


export const CartContext = createContext({
  isCartOpen: false,
  cartTotal: 0,
  setIsCartOpen: () => {},
  cartItems: [],
  addCartItem: () => {},
  cartCount: 0,
  removeCartItem: () => {},
  clearCartItem: ()=>{},
});

export const CartProivder = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => { //set the Count for items quantity
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => { // set the total at checkout
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + (cartItem.quantity*cartItem.price),
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (itemToClear) =>{
    setCartItems(clearCartItem(cartItems, itemToClear))
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
