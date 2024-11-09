const Book = require('../model/book');
const Author = require('../model/author');
const Publication = require('../model/publication');
const Genre = require('../model/genre');

// Create book
exports.createBook = async (req, res) => {
    try {
      const book = new Book(req.body);
      await book.save();
  
      // Update author document with book ID
      const author = await Author.findById(book.author);
      if (author) {
        author.books.push(book._id);
        await author.save();
      }
  
      // Update genre document with book ID
      const genre = await Genre.findById(book.genre);
      if (genre) {
        genre.books.push(book._id);
        await genre.save();
      }
  
      // Update publication document with book ID
      const publication = await Publication.findById(book.publication);
      if (publication) {
        publication.books.push(book._id);
        await publication.save();
      }
  
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author')
      .populate('publication')
      .populate('genre');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id)
      .populate('author')
      .populate('publication')
      .populate('genre');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book by Title
exports.getBookByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const book = await Book.findOne({ title: title })
      .populate('author')
      .populate('publication')
      .populate('genre');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchByTitle = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/book/title/${title}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        // If response is a single object, wrap it in an array
        const booksData = Array.isArray(response.data) ? response.data : [response.data];
        setBooks(booksData);
        setError(null); // Clear previous errors
    } catch (err) {
        setError('Failed to fetch books by title.');
    }
};


// Update book
exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    await Book.findByIdAndRemove(id);
    res.status(204).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rent book
exports.rentBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (!book.isAvailable) {
      return res.status(400).json({ message: 'Book is not available' });
    }
    book.isAvailable = false;
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return book
exports.returnBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.isAvailable = true;
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};