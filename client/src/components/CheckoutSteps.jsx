import { FaShoppingCart, FaRegAddressCard } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { TbShoppingBagCheck } from "react-icons/tb";

export default function CheckoutSteps(props) {
  return (
    <div
      className="checkout-steps"
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div className={props.step1 ? "active" : ""}>
        1. <FaShoppingCart /> Cart
      </div>
      <div className={props.step2 ? "active" : ""}>
        2. <FaRegAddressCard /> Shipping Address
      </div>
      <div className={props.step3 ? "active" : ""}>
        3. <MdOutlinePayment /> Order Review & Payment
      </div>
      <div className={props.step4 ? "active" : ""}>
        4. <TbShoppingBagCheck /> Order Confirmation
      </div>
    </div>
  );
}
