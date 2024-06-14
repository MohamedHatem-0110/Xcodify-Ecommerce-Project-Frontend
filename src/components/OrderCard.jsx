import React from "react";

const OrderCard = ({ order }) => {
  console.log(order);
  return (
    <div className="p-4 min-h-20">
      <div className="border-2 border-blue-900">
        <h1 className="font-bold text-2xl mb-2">Order ID: {order._id}</h1>
        <div className="flex flex-col mb-2">
          {order.items.map((item) => (
            <div id={item.id}>
              <span className="font-bold">{item.quantity}x</span> {item.name}
            </div>
          ))}
        </div>
        <h1 className="font-bold text-2xl">Total Price: {order.total_price}</h1>
      </div>
    </div>
  );
};

export default OrderCard;
