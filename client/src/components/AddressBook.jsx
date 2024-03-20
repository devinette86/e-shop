import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddressBook.css";
import { useAuth } from "../context/auth";

const AddressBook = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [editedAddress, setEditedAddress] = useState({
    name: "",
    surname: "",
    address: "",
    zipCode: "",
    city: "",
  });

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

  const openEditModal = (addressId) => {
    const address = addresses.find((addr) => addr._id === addressId);
    if (address) {
      setEditedAddress(address);
      setEditAddressId(addressId);
      setEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditAddressId(null);
    setEditedAddress({
      name: "",
      surname: "",
      address: "",
      zipCode: "",
      city: "",
    });
  };

  const saveEditedAddress = async () => {
    try {
      await axios.patch(
        `http://localhost:3102/user/${user._id}/addresses/${editAddressId}`,
        editedAddress
      );
      // Update the addresses state after editing
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address._id === editAddressId ? editedAddress : address
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Error editing address:", error.message);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
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
              <button onClick={() => openEditModal(address._id)}>Edit</button>
              <button onClick={() => deleteAddressHandler(address._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>
              &times;
            </span>
            <h2>Edit Address</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editedAddress.name}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                Surname:
                <input
                  type="text"
                  name="surname"
                  value={editedAddress.surname}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={editedAddress.address}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                Zip Code:
                <input
                  type="text"
                  name="zipCode"
                  value={editedAddress.zipCode}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={editedAddress.city}
                  onChange={handleEditInputChange}
                />
              </label>
              <button type="button" onClick={saveEditedAddress}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressBook;
