import mongoose from "mongoose"
import { preprocess } from "zod"

let isConnected = false //* переманная чтоб знать связан ли бд

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)
  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found")
  if (isConnected) return console.log("Alreadt conected to mongoDB")

  try {
    await mongoose.connect(process.env.MONGODB_URL)

    isConnected = true

    console.log("Conected to MongoDB")
  } catch (error) {
    console.log(error)
  }
}
