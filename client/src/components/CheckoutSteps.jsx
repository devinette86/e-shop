export default function CheckoutSteps(props) {
  return (
    <div className="checkout-steps" style={{ display: "flex" }}>
      <div className={props.step1 ? "active" : ""}>1. Cart</div>
      <div className={props.step2 ? "active" : ""}>2. Shipping Address</div>
      <div className={props.step3 ? "active" : ""}>3. Payment</div>
      <div className={props.step4 ? "active" : ""}>
        4. Place Order/Confirmation
      </div>
    </div>
  );
}
