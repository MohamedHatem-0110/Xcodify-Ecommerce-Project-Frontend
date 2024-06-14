import axios from 'axios';

const fetchProducts = async (setProducts, number = 10) => {
  try {
    const response = await axios.post('/api/products/getProductsByNumber', {
      number,
    });

    setProducts(response.data);
    // console.log(response.data);
  } catch (error) {}
};

const getImage = (productImage) => {
  return productImage.dataString;
};

export { fetchProducts, getImage };
