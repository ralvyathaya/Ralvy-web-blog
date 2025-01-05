require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const path = require("path")

const connectDB = require("./api/config/db")
const mainRoutes = require("./api/routes/main")
const adminRoutes = require("./api/routes/admin")

const app = express()
const PORT = process.env.PORT || 5000

// Connect to DB
connectDB()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride("_method"))

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

// API Routes
app.use("/api", mainRoutes)
app.use("/api", adminRoutes)

// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})
