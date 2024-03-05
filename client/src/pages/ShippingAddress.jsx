import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShippingAddress.css";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddress = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAdress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // Create an object with the form data
    const shippingAddressData = {
      name,
      surname,
      address,
      zipCode,
      city,
    };

    // Convert the object to a JSON string and store it in localStorage
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(shippingAddressData)
    );
    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form onSubmit={submitHandler}>
        <h4>Shipping Address</h4>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter recipient's name"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            placeholder="Enter recipient's surname"
            id="surname"
            name="surname"
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Enter delivery adress"
            id="address"
            name="address"
            onChange={(e) => setAdress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipcode">Zip Code</label>
          <input
            type="text"
            placeholder="Enter zip code"
            id="zipcode"
            name="zipcode"
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            placeholder="Enter city name"
            id="city"
            name="city"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ShippingAddress;
