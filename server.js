const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/product.model.js")
const productRoute = require("./routes/product.route.js")
const app = express()
const PORT = 3000

// Built-in middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/products", productRoute)

//-  EARLIER
// See homepage
// app.get("/", (req, res) => {
//   res.send("Hello from Node API")
// })

// See all products
// app.get("/api/products",)

// See a spcific product
// app.get("/api/products/:id",)

// Add a product
// app.post("/api/products",)

// Update a product
// app.put("/api/products/:id",)

// Delete a product
// app.delete("/api/products/:id",)

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
