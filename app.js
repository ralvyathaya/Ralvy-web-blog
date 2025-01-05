// Load environment variables from .env file
require("dotenv").config()

// Import required modules
const express = require("express")
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const path = require("path")

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
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(express.json()) // Parse JSON bodies
app.use(cookieParser()) // Parse Cookie header and populate req.cookies
app.use(methodOverride("_method")) // Override HTTP methods

app.use(
  session({
    secret: "keyboard cat", // Session secret for signing the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save new sessions
    store: MongoStore.create({
      // Configure session store to use MongoDB
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

// Define API routes
app.use("/api", mainRoutes)
app.use("/api", adminRoutes)

// Serve static files from React app in production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")))

  app.get("*", (req, res) => {
    // Catch-all route for serving the React app
    res.sendFile(path.join(__dirname, "dist/index.html"))
  })
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Route for serving the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})
