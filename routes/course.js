const express = require("express");
const router = express.Router();
const Products = require("../models/course");
const { authenticate, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");
// Endpoint untuk menambahkan produk baru

/*
Disini pada bagian authorize(["admin"]) 
memiliki akses yang dimana pengguna harus memiliki akses sebagai role admin
ini bertujuan untuk memberikan seperti akses tertinggi untuk dapat memanipulasi data 
*/
router.post(
  "/",
  authenticate,
  authorize(["admin"]), // sebagai contoh admin saja
  upload.single("file_materi"),
  async (req, res, next) => {
    try {
      const productData = req.body;
      if (req.file) {
        productData.img = req.file.path;
      }
      console.log(productData);
      const newProduct = await Products.create(productData);
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);
// Endpoint untuk menampilkan semua produk
router.get("/", authenticate, async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});
// Endpoint untuk menampilkan produk berdasarkan ID
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    next(err);
  }
});
// Endpoint untuk memperbarui produk berdasarkan ID
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  upload.single("img"),
  async (req, res, next) => {
    try {
      const product = await Products.findByPk(req.params.id);
      if (product) {
        for (const key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            product[key] = req.body[key];
          }
        }
        if (req.file) {
          product.img = req.file.path;
        }
        await product.save();
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);
// Endpoint untuk menghapus produk berdasarkan ID
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res, next) => {
    try {
      const product = await Products.findByPk(req.params.id);
      if (product) {
        await product.destroy();
        res.json({ message: "Product deleted" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
