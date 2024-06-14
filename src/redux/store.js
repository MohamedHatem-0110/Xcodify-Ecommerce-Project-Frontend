import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

// Load cart state from localStorage

const savedCart = JSON.parse(localStorage.getItem("cart"));
if (savedCart) {
  store.dispatch({ type: "LOAD_CART", payload: savedCart });
}

const savedUser = JSON.parse(localStorage.getItem("user"));
if (savedUser) {
  store.dispatch({ type: "LOGIN", payload: savedUser });
}

// Cart Watching
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.cart));
});

export default store;
