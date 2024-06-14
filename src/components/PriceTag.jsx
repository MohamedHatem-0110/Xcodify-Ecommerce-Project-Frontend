const PriceTag = ({ price, discount }) => {
  price = parseFloat(price);
  if (discount === null || discount === undefined) {
    return (
      <div>
        <p className="text-gray-500">
          <span className="text-base">{price.toFixed(2)} EGP</span>
        </p>
      </div>
    );
  }
  discount = parseFloat(discount);
  const discountPercentage = ((price - discount) / price) * 100;
  return (
    <div>
      <p className="text-gray-500">
        <span className="text-base text-red-500 line-through">
          {price.toFixed(2)} EGP
        </span>{' '}
        <span className="text-base text-green-500">
          {discount.toFixed(2)} EGP
        </span>{' '}
        <span className="text-base text-green-500">
          ({discountPercentage.toFixed(0)}% off)
        </span>
      </p>
    </div>
  );
};

export default PriceTag;
