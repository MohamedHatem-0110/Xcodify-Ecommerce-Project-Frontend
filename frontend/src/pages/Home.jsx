import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchProducts } from "../functions/productFunctions";
import Carousel from "../components/Carousel";
import Section from "../components/Section";

import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [products, setProducts] = useState(null);
  let number = 10;

  const images = [
    "https://picsum.photos/1080/300?random=1",
    "https://picsum.photos/1080/300?random=2",
    "https://picsum.photos/1080/300?random=3",
  ];
  useEffect(() => {
    fetchProducts(setProducts, number);
    console.log("products: ", products);
  }, []);

  return (
    <div>
      <div className="mt-20 flex flex-col gap-10">
        {images && <Carousel images={images} />}

        <div className="p-4 rounded-lg bg-white">
          <h1 className="font-bold text-3xl mb-4">Products</h1>
          <div className="flex flex-wrap gap-5 justify-center items-center">
            {products ? (
              products
                .slice(0, 10)
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    productName={product.name}
                    productImage={product.image}
                    price={product.price}
                    discountPrice={product.discount}
                    productId={product._id}
                    productDesc={product.desc}
                  />
                ))
            ) : (
              <div className="justify-self-center">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
