import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./Profile.css";
import AddressBook from "../components/AddressBook";
import NewAddress from "../components/NewAddress";
import OrdersList from "../components/OrdersList";

function Profile() {
  return (
    <>
      <h2>Your Profile</h2>
      <div className="profile-container">
        <div className="left-column">
          <Link to="/profile/address-book">Address Book</Link>
          <Link to="/profile/new-address">Add a new address</Link>
        </div>
        <div className="right-column">
          <Routes>
            <Route path="/address-book" element={<AddressBook />} />
            <Route path="/new-address" element={<NewAddress />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Profile;
