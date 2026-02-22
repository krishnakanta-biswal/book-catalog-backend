import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid data"
    });
  }
};

export const getAllBooks = async (req, res) => {
  const books = await Book.find();

  res.status(200).json({
    success: true,
    data: books
  });
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.status(200).json({
    success: true,
    data: book
  });
};

export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Book updated",
    data: book
  });
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Book deleted"
  });
};