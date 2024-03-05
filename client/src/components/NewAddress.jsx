import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

const NewAddress = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      address: e.target.address.value,
      zipCode: e.target.zipCode.value,
      city: e.target.city.value,
    };

    try {
      const response = await axios.post(
        `http://localhost:3102/user/${user._id}/addresses/add`,
        body
      );

      console.log("Address added successfully:", response.data);

      // Clear the input fields after successful submission
      setName("");
      setSurname("");
      setAddress("");
      setZipCode("");
      setCity("");
    } catch (error) {
      console.error("Error adding address:", error.message);
    }
  };

  return (
    <div>
      <h2>Add a New Address</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewAddress;
