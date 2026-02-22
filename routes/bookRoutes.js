import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", authMiddleware, createBook);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

export default router;