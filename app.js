// Load environment variables from .env file
require("dotenv").config()

// Import required modules
const express = require("express")
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const path = require("path")
const cors = require("cors")

// Import custom modules for database connection and routes
const connectDB = require("./api/config/db")
const mainRoutes = require("./api/routes/main")
const adminRoutes = require("./api/routes/admin")

// Initialize express application
const app = express()
const PORT = process.env.PORT || 5000

// Connect to the database
connectDB()

// Middleware setup
app.use(cors()) // Enable CORS for all routes
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(express.json()) // Parse JSON bodies
app.use(cookieParser()) // Parse Cookie header and populate req.cookies
app.use(methodOverride("_method")) // Override HTTP methods

// Session configuration
app.use(
  session({
    secret: process.env.JWT_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
)

// Define API routes
app.use("/api", mainRoutes)
app.use("/api", adminRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// Serve static files from React app in production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"))
  })
} else {
  // Development environment - handle SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
  })
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
