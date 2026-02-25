import Book from "../models/Book.js";
import mongoose from "mongoose";

export const createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    if (!title || !author || !genre || price === undefined || inStock === undefined) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      price,
      inStock
    });

    res.status(201).json(book);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};