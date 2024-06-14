import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumb } from "../providers/breadcrumbProvider";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import PriceTag from "../components/PriceTag";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { toast } from "react-toastify";
const ProductPage = () => {
  const dispatch = useDispatch();
  const { updateBreadcrumbs, clearBreadcrumbs } = useBreadcrumb();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [seeAlsoProducts, setSeeAlsoProducts] = useState(null);

  const [size, setSize] = useState(0 || "Small");
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        // console.log(response);
        if (response.status !== 200) {
          // If product not found or any other error occurs
          throw new Error("Product not found");
        }
        setProduct(response.data);
        const seeAlsoResponse = await axios.get(
          `/api/products/productsByCategory/${response.data.category_id}`
        );
        if (seeAlsoResponse.status == 200) {
          let availableProducts = seeAlsoResponse.data;
          // If product not found or any other error occurs
          if (availableProducts.length > 0) {
            availableProducts = availableProducts.filter(
              (prod) => prod._id != productId
            );
          }
          setSeeAlsoProducts(availableProducts);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/");
      }
    };

    if (!productId) {
      navigate("/");
    } else {
      getProductDetails();
    }

    return () => clearBreadcrumbs();
  }, [productId]);
  return (
    <div className="w-100% py-4 px-2 min-h-full">
      {product && (
        <>
          <div className="flex gap-2 w-100% min-h-72">
            <div className="w-1/2 flex justify-center items-center border border-gray-300 rounded-sm p-2">
              <img src={product.image} className="h-64" alt={product.name} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 w-1/2 flex flex-col gap-1">
              <div className="text-2xl font-bold">{product.name}</div>
              <div className="flex items-center gap-2 my-2 ">
                <i className="fas fa-star text-xs text-yellow-400"></i>
                <span className="font-semibold ">{product.rating}</span>·
                <i className="fa-solid fa-basket-shopping text-xs"></i>
                {product.order_count} ·<i className="fa-solid fa-box-open"></i>
                {product.order_count + " orders"} ·
                <span className="italic font-medium text-green-400">
                  in-stock
                </span>
              </div>
              <PriceTag price={product.price} discount={product.discount} />
              <div className="text-gray-600 mb-6">{product.desc}</div>
              {/*
                 <div className="flex items-center mb-2">
                <div className="text-sm font-semibold">Type:</div>
                <div className="text-xs text-gray-500 ml-2">123</div>
              </div>
              <div className="text-sm font-semibold"></div>
                */}

              <hr className="mt-4" />
              <div className="flex items-center mt-4 mb-6">
                {product.has_sizes && (
                  <>
                    <div className="text-sm font-semibold mr-2">Size:</div>
                    <select
                      value={size}
                      onChange={handleSizeChange}
                      className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-1 px-2 mr-4"
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="X-Large">X-Large</option>
                    </select>
                  </>
                )}

                <div className="text-sm font-semibold mr-2">Quantity:</div>
                <button
                  onClick={decreaseQuantity}
                  className="bg-gray-200 text-gray-800 font-semibold py-1 px-2 rounded mr-2"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="border-gray-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-1 px-2 w-10 mr-4"
                />
                <button
                  onClick={increaseQuantity}
                  className="bg-gray-200 text-gray-800 font-semibold py-1 px-2 rounded"
                >
                  +
                </button>
              </div>
              <div className="flex items-center mt-6">
                <button
                  onClick={() => {
                    toast.success("Successfully Added to Cart!");
                    dispatch(
                      addToCart({
                        id: productId,
                        quantity: quantity,
                        name: product.name,
                        image: product.image,
                        desc: product.desc ?? "",
                        price: product.price ?? 1000,
                        discount: product.discount ?? 0,
                      })
                    );
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-2 w-full my-2">
        <div>
          <h3 className="text-2xl">See Also</h3>
          <hr />
        </div>
        {
          // TODO: Add products based on category of the current object
        }
        <div className="flex gap-2 w-full">
          {seeAlsoProducts &&
            seeAlsoProducts.length > 0 &&
            seeAlsoProducts.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  productName={product.name}
                  productImage={product.image}
                  price={product.price}
                  discountPrice={product.discount}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
