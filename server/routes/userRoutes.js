import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import auth from "../middleware/auth.js"
import User from '../models/userModel.js';

const router = express.Router();

// CRUD
//const secret = "secret";

// 1-  Register a user
router.post('/register', async (req, res) => {
  const { name, surname, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, surname, email, password: hashPassword });
  await newUser.save();
  res.json(newUser);
});

// 2- Login a user

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("User does not exist");
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) throw new Error("Password is not correct");
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.json(token);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3- Get a user (/user/me)
router.get('/me', auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).populate("cart.product");
  res.json(user);
});

// Update user details
router.patch("/:userId/edit-details", async (req, res) => {
  const { userId } = req.params;
  const { name, surname, email, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (email) user.email = email;
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }

    await user.save();

    res.json({ message: "User details updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get user adresses
router.get('/:userId/addresses', async (req, res) => {
  const { userId } = req.params;
  console.log("Req.params from AddressBook:", req.params);

  try {
  const user = await User.findById(userId);
  console.log("User addresses:", user.addresses);
  res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new address
router.post('/:userId/addresses/add', async (req, res) => {
  const { userId } = req.params;
  const { name, surname, address, zipCode, city } = req.body;
  console.log("Req.body from New Address:", req.body);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Create a new address object
    const newAddress = {
      name,
      surname,
      address,
      zipCode,
      city,
    };
    // Add the new address to the addresses array
    user.addresses.push(newAddress);
    // Save the updated user with the new address
    await user.save();
    res.status(201).json({ message: 'Address added successfully', address: newAddress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user address
router.patch("/:userId/addresses/:addressId", async (req, res) => {
  const { userId, addressId } = req.params;
  const { name, surname, address, zipCode, city } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressIndex = user.addresses.findIndex(
      (addr) => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update the address fields if provided
    if (name) user.addresses[addressIndex].name = name;
    if (surname) user.addresses[addressIndex].surname = surname;
    if (address) user.addresses[addressIndex].address = address;
    if (zipCode) user.addresses[addressIndex].zipCode = zipCode;
    if (city) user.addresses[addressIndex].city = city;

    await user.save();

    res.json({ message: "Address updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an address
router.delete('/:userId/addresses/:addressId', async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out the address with the given addressId
    user.addresses = user.addresses.filter(address => address._id.toString() !== addressId);

    // Save the updated user without the deleted address
    await user.save();

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
