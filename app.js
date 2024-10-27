require("dotenv").config()

const express = require("express")
const expressLayout = require("express-ejs-layouts")
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const connectDB = require("./server/config/db")
const { isActiveRoute } = require("./server/helpers/routeHelpers")

const app = express()
const PORT = 5000 || process.env.PORT

//connect to DB
connectDB()

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

app.locals.isActiveRoute = isActiveRoute

//middleware isActiveRoute
app.use((req, res, next) => {
  res.locals.isActiveRoute = isActiveRoute
  res.locals.currentRoute = req.path
  next()
})

//public folder
app.use(express.static("public"))
app.use("/node_modules", express.static("node_modules"))

//templating engine
app.use(expressLayout)
app.set("layout", "./layouts/main")
app.set("view engine", "ejs")

app.use("/", require("./server/routes/main"))
app.use("/", require("./server/routes/admin"))

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
