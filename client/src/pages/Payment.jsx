import { PayPalButtons } from "@paypal/react-paypal-js";
import CheckoutSteps from "../components/CheckoutSteps";

export default function Payment() {
  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h4>Payment</h4>
      <PayPalButtons />
    </>
  );
}
