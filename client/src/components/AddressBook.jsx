import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddressBook.css";
import { useAuth } from "../context/auth";

const AddressBook = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3102/user/${user._id}/addresses`
        );
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (user) fetchAddresses();
  }, []);

  const addAddressHandler = () => {
    navigate("/profile/new-address");
  };

  const deleteAddressHandler = async (addressId) => {
    try {
      await axios.delete(
        `http://localhost:3102/user/${user._id}/addresses/${addressId}`
      );
      // Update the addresses state after deletion
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== addressId)
      );
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  };

  return (
    <>
      {addresses.length === 0 ? (
        <>
          <p>You have no saved addresses</p>
          {/* Add a button or Link to navigate to the "Add a new address" page */}
          <button onClick={addAddressHandler}>Add a new Address</button>
        </>
      ) : (
        <ul>
          {addresses.map((address, index) => (
            <li key={index}>
              {/* Display all address details */}
              <p>
                {address.name} {address.surname}
              </p>
              <p>{address.address}</p>
              <p>
                {address.zipCode} {address.city}
              </p>
              <button onClick={() => deleteAddressHandler(address._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AddressBook;
