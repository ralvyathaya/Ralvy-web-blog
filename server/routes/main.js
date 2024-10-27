const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

//routes
// GET
// HOME
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Ralvy NodeJs blog",
      description: "A blog built with Node, Express, and MongoDB",
    }

    const perPage = 6
    const page = parseInt(req.query.page) || 1

    // Fetch sorted posts with pagination
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec()

    const count = await Post.countDocuments()

    const nextPage = page + 1
    const prevPage = page - 1
    const hasNextPage = nextPage <= Math.ceil(count / perPage)
    const hasPrevPage = prevPage >= 1

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: hasPrevPage ? prevPage : null,
      currentRoute: "/",
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

//routes
// GET
// Post: id
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id

    const data = await Post.findById({ _id: slug })

    const locals = {
      title: data.title,
      description: "A blog built with Node, Express, and MongoDB",
    }

    res.render("post", {
      locals,
      data,
      currentRoute: `/post/${slug}`,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

//routes
// Post
// Post: searchTerm
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "search",
      description: "A blog built with Node, Express, and MongoDB",
    }
    let searchTerm = req.body.searchTerm
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    })

    res.render("search", {
      data,
      locals,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

router.get("/about", (req, res) => {
  res.render("about", {
    currentRoute: "/about",
  })
})

router.get("/contact", (req, res) => {
  res.render("contact", {
    currentRoute: "/contact",
  })
})

module.exports = router
