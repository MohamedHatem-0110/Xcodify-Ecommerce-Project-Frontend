// actions.js
/* User */
export const login = (userData) => ({
  type: "LOGIN",
  payload: userData,
});

export const logout = () => ({
  type: "LOGOUT",
});

/* Cart */
export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

export const removeAllFromCart = () => ({
  type: "REMOVE_ALL_FROM_CART",
});

export const updateQuantity = (productId, quantity) => ({
  type: "UPDATE_QUANTITY",
  payload: { productId, quantity },
});
