const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false)
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`Database Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error("Database connection error:", error.message)
    process.exit(1)
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err)
  })

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected")
  })

  process.on("SIGINT", async () => {
    await mongoose.connection.close()
    process.exit(0)
  })
}

module.exports = connectDB
