const express = require("express")
const Product = require("../models/product.model.js")
const router = express.Router()

const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js")

router.get("/", getAllProducts)
router.get("/:id", getProduct)
router.post("/", addProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

module.exports = router
