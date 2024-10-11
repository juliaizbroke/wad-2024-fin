import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true
  },
  interests: {
    type: [String], // Array of strings to represent multiple interests
    default: []
  }
});

const Customer = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;