const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Post = require("../models/Post")
const User = require("../models/User")

const router = express.Router()
const jwtSecret = process.env.JWT_SECRET

// Middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1d" })
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({ message: "Login successful" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// GET /api/admin/posts
router.get("/admin/posts", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// POST /api/admin/posts
router.post("/admin/posts", authMiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      category: req.body.category,
    })

    await Post.create(newPost)
    res.json({ message: "Post created successfully", post: newPost })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// PUT /api/admin/posts/:id
router.put("/admin/posts/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        updatedAt: Date.now(),
      },
      { new: true }
    )

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json({ message: "Post updated successfully", post })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// DELETE /api/admin/posts/:id
router.delete("/admin/posts/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    res.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// POST /api/register (admin only)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const user = await User.create({ username, password: hashedPassword })
      res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "Username already exists" })
      }
      throw error
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// POST /api/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({ message: "Logged out successfully" })
})

module.exports = router
