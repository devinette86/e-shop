import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";
import "./ShippingAddress.css";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const fetchSavedAddresses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3102/user/${user._id}/addresses`
        );
        setSavedAddresses(response.data);
      } catch (error) {
        console.error("Error fetching saved addresses:", error.message);
      }
    };

    if (user) {
      // Initialize savedAddresses as an empty array
      setSavedAddresses([]);
      fetchSavedAddresses();
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Create an object with the form data
    const shippingAddressData = {};

    // Add the selectedAddress to shippingAddressData if it's not empty
    if (selectedAddress) {
      shippingAddressData.selectedAddress = selectedAddress;
    } else {
      // If no saved address is selected, include the manually entered data
      shippingAddressData.name = name;
      shippingAddressData.surname = surname;
      shippingAddressData.address = address;
      shippingAddressData.zipCode = zipCode;
      shippingAddressData.city = city;
    }

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

        {/* Check if there are saved addresses */}
        {savedAddresses.length > 0 ? (
          <>
            {/* List of radio buttons for saved addresses */}
            <div className="saved-addresses-container">
              <div className="saved-addresses">
                <h4>Select a saved address:</h4>
                {savedAddresses.map((savedAddress) => (
                  <div key={savedAddress._id} className="radio-option">
                    <input
                      type="radio"
                      id={savedAddress._id}
                      name="savedAddress"
                      value={savedAddress._id}
                      checked={selectedAddress === savedAddress._id}
                      onChange={() => setSelectedAddress(savedAddress._id)}
                    />
                    <label
                      htmlFor={savedAddress._id}
                      onClick={() => setSelectedAddress(savedAddress._id)}
                    >
                      {savedAddress.name} {savedAddress.surname},{" "}
                      {savedAddress.address}, {savedAddress.zipCode}{" "}
                      {savedAddress.city}
                    </label>
                  </div>
                ))}

                {/* Option to deselect a saved address */}
                <div className="radio-option">
                  <input
                    type="radio"
                    id="none"
                    name="savedAddress"
                    value=""
                    checked={!selectedAddress}
                    onChange={() => setSelectedAddress("")}
                  />
                  <label htmlFor="none" onClick={() => setSelectedAddress("")}>
                    None of these
                  </label>
                </div>
              </div>
              {/* Form inputs for manual entry */}
              <div className="address-form">
                <div className="form-group">
                  <h4>Or enter another address just for this shipment:</h4>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter recipient's name"
                    id="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    disabled={selectedAddress !== ""}
                    required={selectedAddress === ""}
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
                    disabled={selectedAddress !== ""}
                    required={selectedAddress === ""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    placeholder="Enter delivery address"
                    id="address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={selectedAddress !== ""}
                    required={selectedAddress === ""}
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
                    disabled={selectedAddress !== ""}
                    required={selectedAddress === ""}
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
                    disabled={selectedAddress !== ""}
                    required={selectedAddress === ""}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* If no saved addresses, display form for manual entry */}
            <div className="form-group">
              <h4>Enter address for this shipment:</h4>
              {/* Form inputs for manual entry */}
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
                placeholder="Enter delivery address"
                id="address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
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
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ShippingAddress;
