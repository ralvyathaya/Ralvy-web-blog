import "dotenv/config"
import express from "express"
import methodOverride from "method-override"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import path from "path"
import { fileURLToPath } from "url"

import connectDB from "./api/config/db.js"
import mainRoutes from "./api/routes/main.js"
import adminRoutes from "./api/routes/admin.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
