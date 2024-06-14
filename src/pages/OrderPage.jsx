import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";

const OrderPage = () => {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    console.log(user);

    axios.get("/api/orders/ById/" + user._id).then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg">
      {orders &&
        orders.map((order) => <OrderCard order={order} key={order.id} />)}
    </div>
  );
};

export default OrderPage;
