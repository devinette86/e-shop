import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    addresses : [
      {
        name: {
          type: String,
          required: true,
        },
        surname: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        zipCode: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
