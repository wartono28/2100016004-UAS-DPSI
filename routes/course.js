const express = require("express");
const router = express.Router();
const Course = require("../models/course");
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
      const courseData = req.body;
      if (req.file) {
        courseData.file_materi = req.file.path;
      }
      const newCourse = await Course.create(courstData);
      res.status(201).json(newCourse);
    } catch (err) {
      res.json(err)
      console.error(err);
      next(err);
    }
  }
);
// Endpoint untuk menampilkan semua course
router.get("/", authenticate, async (req, res, next) => {
  try {
    const course = await Course.findAll();
    res.json(course);
  } catch (err) {
    next(err);
  }
});
// Endpoint untuk menampilkan course berdasarkan ID
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (err) {
    next(err);
  }
});
// Endpoint untuk memperbarui course berdasarkan ID
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  upload.single("file_materi"),
  async (req, res, next) => {
    try {
      const product = await Course.findByPk(req.params.id);
      if (course) {
        for (const key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            course[key] = req.body[key];
          }
        }
        if (req.file) {
        courseData.file_materi = req.file.path;
        }
        await course.save();
        res.json(course);
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);
// Endpoint untuk menghapus course berdasarkan ID
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res, next) => {
    try {
      const product = await Course.findByPk(req.params.id);
      if (course) {
        await course.destroy();
        res.json({ message: "Course deleted" });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
