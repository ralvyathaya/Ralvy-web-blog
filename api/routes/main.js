import express from "express"
import Post from "../models/Post.js"

const router = express.Router()

// GET /api/posts
router.get("/posts", async (req, res) => {
  try {
    const perPage = 6
    const page = parseInt(req.query.page) || 1

    // Fetch sorted posts with pagination
    const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec()

    const count = await Post.countDocuments()

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(count / perPage),
      hasNextPage: page < Math.ceil(count / perPage),
      hasPrevPage: page > 1,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// GET /api/posts/:id
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    res.json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// POST /api/search
router.post("/search", async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    })

    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

export default router
