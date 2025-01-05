require("dotenv").config()
const mongoose = require("mongoose")
const Post = require("./models/Post")

const dummyPosts = [
  {
    title: "Getting Started with the MERN Stack",
    body: "The MERN stack is a powerful combination of MongoDB, Express.js, React, and Node.js. In this post, we'll explore how to set up a basic MERN stack application and understand the role of each technology...",
    category: "Web Development",
    author: "Ralvy",
  },
  {
    title: "Understanding React Hooks",
    body: "React Hooks have revolutionized how we write React components. This comprehensive guide covers useState, useEffect, and custom hooks, with practical examples and best practices...",
    category: "React",
    author: "Ralvy",
  },
  {
    title: "MongoDB Best Practices",
    body: "Learn essential MongoDB best practices including schema design, indexing strategies, and query optimization. We'll cover real-world examples and common pitfalls to avoid...",
    category: "Database",
    author: "Ralvy",
  },
  {
    title: "Building RESTful APIs with Express",
    body: "A deep dive into creating robust RESTful APIs using Express.js. Topics include routing, middleware, error handling, and authentication...",
    category: "Backend",
    author: "Ralvy",
  },
  {
    title: "CSS Tips and Tricks",
    body: "Discover useful CSS techniques and tricks that can enhance your web development workflow. From flexbox to grid, animations to responsive design...",
    category: "CSS",
    author: "Ralvy",
  },
  {
    title: "JavaScript Array Methods",
    body: "Master JavaScript array methods like map, filter, reduce, and more. Includes practical examples and performance considerations...",
    category: "JavaScript",
    author: "Ralvy",
  },
  {
    title: "Introduction to TypeScript",
    body: "Learn why TypeScript is becoming increasingly popular and how it can improve your JavaScript development experience...",
    category: "TypeScript",
    author: "Ralvy",
  },
  {
    title: "Git Workflow Strategies",
    body: "Explore different Git workflow strategies and learn how to choose the right one for your team and project...",
    category: "Tools",
    author: "Ralvy",
  },
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to database")

    // Clear existing posts
    await Post.deleteMany({})
    console.log("Cleared existing posts")

    // Insert dummy posts
    await Post.insertMany(dummyPosts)
    console.log("Added dummy posts")

    console.log("Database seeded successfully")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
