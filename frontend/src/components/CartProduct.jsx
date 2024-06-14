import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/actions";
import { toast } from "react-toastify";
import { getImage } from "../functions/productFunctions";
const CartProduct = ({
  productId,
  productName,
  productImage,
  productDesc,
  productPrice,
  prodQuantity = 1,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(prodQuantity);
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity(productId, newQuantity));
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      dispatch(updateQuantity(productId, newQuantity));
    }
  };
  return (
    <div className="w-full py-1 flex gap-2">
      {console.log(productImage)}
      <img
        src={productImage}
        alt={productName + " image"}
        className="w-20 h-20 object-cover rounded-sm"
      />
      <div className="flex justify-between w-full px-2">
        <div className="h-full flex flex-col gap-1">
          <h2 className="text-lg3">{productName}</h2>
          <p className="text-sm">{productDesc}</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-200 text-gray-800 font-semibold py-1 px-2 rounded"
            >
              -
            </button>
            <input
              type="number"
              readOnly
              value={quantity}
              className="border-gray-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-1 px-2 w-10 mx-1"
            />
            <button
              onClick={increaseQuantity}
              className="bg-gray-200 text-gray-800 font-semibold py-1 px-2 rounded"
            >
              +
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl">{productPrice * prodQuantity} EGP</h3>
            <h4 className="text-sm font-light">{productPrice} EGP / Piece</h4>
          </div>
          <button
            onClick={() => {
              toast.success("Successfuly removed from cart!");
              dispatch(removeFromCart(productId));
            }}
            className="bg-red-500 p-2 rounded-sm flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
          >
            <i className="fa-solid fa-trash text-lg text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
