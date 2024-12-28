const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/product.model.js")
const app = express()
const PORT = 3000

// Built-in middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// See homepage
app.get("/", (req, res) => {
  res.send("Hello from Node API")
})

// See all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// See a spcific product
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add a product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update a product
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndUpdate(id, req.body)

    if (!product) {
      res.status(404).json({ mesaage: "Product not found" })
    }

    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ mesaage: error.message })
  }
})

// Delete a product
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json({
      message: "Product deleted successfully",
      "Deleted Product": product,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

mongoose
  .connect(
    "mongodb+srv://jareer:Pakistan@backenddb.flx4s.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server started at PORT: ${PORT}`)
    })
  })
  .catch(() => {
    console.log("Failed to connect with MongoDB")
  })
