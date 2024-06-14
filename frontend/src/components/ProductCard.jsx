import React from "react";
import PriceTag from "./PriceTag";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { toast } from "react-toastify";
const ProductCard = ({
  productName,
  productImage,
  price,
  discountPrice,
  productId,
  productDesc = "",
  isURL = false,
}) => {
  const dispatch = useDispatch();
  return (
    <Link to={`/products/${productId}`}>
      <div className="w-64 h-80 border border-gray-300 rounded-lg overflow-hidden">
        <div className="relative h-40 bg-gray-100 group">
          <img
            src={productImage}
            alt={productName}
            className="object-contain w-full h-full group-hover:brightness-50 transition-brightness duration-300"
          />

          <button
            onClick={(e) => {
              toast.success("Successfuly added to cart!");
              e.preventDefault();
              dispatch(
                addToCart({
                  id: productId,
                  quantity: 1,
                  name: productName,
                  image: productImage,
                  desc: productDesc,
                  price: price,
                  discount: discountPrice,
                })
              );
            }}
            className="absolute inset-16 flex items-center justify-center bg-blue-300 hover:bg-blue-400 transition-opacity duration-300 text-white font-bold text-lg opacity-0 group-hover:opacity-100"
          >
            Add to cart
          </button>
        </div>
        <div className="w-full h-full hover:bg-slate-100">
          <div className="p-4 text-lg font-bold">
            <p className="mb-1">{productName}</p>
            <PriceTag price={price} discount={discountPrice} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
