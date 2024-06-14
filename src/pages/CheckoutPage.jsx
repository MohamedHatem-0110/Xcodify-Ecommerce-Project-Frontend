import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

import axios from "axios";

import { useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51P2pztC7Ubp9FVBKSfZX89zgHEdMHb5x7dIgbnaLxsFh0irmMPyRwd5cKrymRD4BryPNNIn826vtCSvUl2YXYVdC00OLFgo0pA"
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const { cart, totalPrice, totalDiscount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    const itemNames = cart.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));
    axios
      .post("/api/orders/create-payment-intent", {
        // Move headers outside the data object
        headers: { "Content-Type": "application/json" },
        // Pass items and totalPrice directly as data
        items: itemNames,
        totalPrice: totalPrice,
      })
      .then((response) => {
        // Access the clientSecret from the response data
        const { clientSecret } = response.data;
        // Assuming setClientSecret is a state updater function
        setClientSecret(clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm items={cart} total_price={totalPrice} />
        </Elements>
      )}
    </div>
  );
}
