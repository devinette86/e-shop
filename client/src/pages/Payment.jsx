import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../context/cartContext.jsx";

const Payment = () => {
  const { cart } = useCart();

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OqzGPLDbOQk1AFrQjfs2GP5I5eZhjWTC3g1P6Zaip3yJSVmo6imBKL2QYJ89PVxIiPrTJc14jLoVqQhQ8Y4ISVH00e2NqyVi3"
    );

    // Structure the body object with an array of items
    const body = {
      products: cart,
    };

    const headers = { "Content-Type": "application/json" };

    const response = await fetch(
      `http://localhost:3102/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    console.log("session from Payment", session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return <button onClick={makePayment}>Checkout</button>;
};

export default Payment;
