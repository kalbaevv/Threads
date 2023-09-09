import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  usermame: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  Image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
})
