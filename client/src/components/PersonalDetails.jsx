import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";

const PersonalDetails = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user ? user.name : "");
  const [surname, setSurname] = useState(user ? user.surname : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");

  const handleEdit = async (field) => {
    try {
      setEditing(true);
      let updatedValue = "";
      if (field === "password") {
        updatedValue = prompt(`Enter new ${field}:`);
        if (updatedValue !== null) {
          setPassword(updatedValue);
        }
      } else {
        updatedValue = prompt(`Enter new ${field}:`, user[field]);
      }

      if (updatedValue !== null) {
        const data = { [field]: updatedValue };
        if (field === "password") data.password = updatedValue;
        await axios.patch(
          `http://localhost:3102/user/${user._id}/edit-details`,
          data
        );
        // Update the local state after successful update
        if (field === "name") setName(updatedValue);
        if (field === "surname") setSurname(updatedValue);
        if (field === "email") setEmail(updatedValue);
      }
    } catch (error) {
      console.error("Error updating personal details:", error.message);
    } finally {
      setEditing(false);
    }
  };

  if (!user) {
    // Render loading or redirect to login page if user is null
    return null;
  }

  return (
    <div>
      <h4>Your personal details</h4>
      <div>
        <label>Name: </label>
        {editing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p>{name}</p>
        )}
        <button onClick={() => handleEdit("name")} disabled={editing}>
          Edit
        </button>
      </div>
      <div>
        <label>Surname: </label>
        {editing ? (
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        ) : (
          <p>{surname}</p>
        )}
        <button onClick={() => handleEdit("surname")} disabled={editing}>
          Edit
        </button>
      </div>
      <div>
        <label>Email: </label>
        {editing ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <p>{email}</p>
        )}
        <button onClick={() => handleEdit("email")} disabled={editing}>
          Edit
        </button>
      </div>
      <div>
        <label>Password: </label>
        {editing ? (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <p>******</p>
        )}
        <button onClick={() => handleEdit("password")} disabled={editing}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
