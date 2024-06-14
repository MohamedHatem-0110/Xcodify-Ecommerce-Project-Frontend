import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductsPage = () => {
  const { word } = useParams();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    price1: "",
    price2: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          word
            ? axios.get("/api/products/search/" + word)
            : axios.post("/api/products/getProductsByNumber", {
                number: 10,
              }),
          axios.get("/api/categories/get"),
        ]);
        console.log("Products: ", productsResponse.data);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false); // Set loading to false when all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [word]);

  const handleFilter = () => {
    console.log(selectedFilters);
    if (
      selectedFilters.category ||
      selectedFilters.price1 ||
      selectedFilters.price2
    ) {
      const filteredProducts = products.filter((product) => {
        // Check if the product's category matches the selected category
        const categoryMatch = product.category_id === selectedFilters.category;

        // Check if the product's price falls within the specified price range
        const price1 = parseFloat(selectedFilters.price1);
        const price2 = parseFloat(selectedFilters.price2);
        const priceInRange =
          isNaN(price1) ||
          isNaN(price2) || // If either price1 or price2 is not a valid number, consider all products
          (parseFloat(product.price) >= price1 &&
            parseFloat(product.price) <= price2);

        // Return true only if both category and price criteria are met
        return categoryMatch && priceInRange;
      });
      setFilteredProducts(filteredProducts);
    }
  };

  const removeFilters = () => {
    setSelectedFilters({
      category: "",
      price1: "",
      price2: "",
    });
    setFilteredProducts(products);
  };

  return (
    <div className="grid grid-cols-[1fr,2fr] items-start md:grid-cols-[1fr,3fr] lg:grid-cols-[1fr,4fr] py-4 px-2 gap-8">
      <div className="bg-white rounded-lg py-4 px-2 flex flex-col gap-2">
        <span className="font-bold">Category</span>
        {categories &&
          categories.map((category) => (
            <div key={category._id}>
              <input
                type="radio"
                id={category._id}
                name="category"
                value={category._id}
                checked={selectedFilters.category === category._id}
                onClick={() =>
                  setSelectedFilters({
                    ...selectedFilters,
                    category: category._id,
                  })
                }
              />
              <label
                className="cursor-pointer"
                htmlFor={category}
                onClick={() =>
                  setSelectedFilters({
                    ...selectedFilters,
                    category: category._id,
                  })
                }
              >
                {category.name}
              </label>
            </div>
          ))}

        <div className="cursor-pointer flex flex-col gap-1 sm:flex-row">
          Price
          <input
            className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-700"
            name="price1"
            value={selectedFilters.price1}
            type="number"
            onChange={(e) =>
              setSelectedFilters((prevState) => ({
                ...prevState,
                price1: e.target.value,
              }))
            }
          />
          -
          <input
            className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-700"
            name="price2"
            value={selectedFilters.price2}
            type="number"
            onChange={(e) =>
              setSelectedFilters((prevState) => ({
                ...prevState,
                price2: e.target.value,
              }))
            }
          />
        </div>

        <button
          className=" bg-blue-500 text-white py-2 px-1 rounded-md hover:bg-blue-600 md:mt-auto"
          onClick={() => handleFilter()}
        >
          Apply Filters
        </button>

        <button
          className=" bg-gray-500 text-white py-2 px-1 rounded-md hover:bg-gray-600 md:mt-auto"
          onClick={() => removeFilters()}
        >
          Remove Filters
        </button>
      </div>
      {loading ? ( // Show loading indicator if data is being fetched
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-white rounded-lg grid gap-8 justify-items-center md:flex-wrap xl:grid-cols-3 p-6">
          {console.log(filteredProducts)}
          {filteredProducts &&
            filteredProducts.map((product, index) => (
              <ProductCard
                key={product._id || index} // Use a unique identifier from product object as the key
                price={product.price}
                productName={product.name}
                discountPrice={product.discountPrice}
                productImage={product.image}
                productId={product._id}
                productDesc={product.desc}
                isURL
              />
            ))}
          {filteredProducts.length === 0 && (
            <h1 className="font-bold">No Products found</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
