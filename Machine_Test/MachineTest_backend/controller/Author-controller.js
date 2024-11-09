const Author = require('../model/author');


// Create author
const createAuthor = async (req, res) => {
    try {
      const author = new Author(req.body);
      await author.save();
      res.status(201).json(author);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all authors
  const getAllAuthors = async (req, res) => {
    try {
      const authors = await Author.find().populate('books');
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get author by ID
  const getByAuthorId = async (req, res) => {
    try {
      const id = req.params.id;
      const author = await Author.findById(id).populate('books');
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get author by Name
  const getByAuthorName = async (req, res) => {
    try {
      const name = req.params.name;
      const author = await Author.findOne({ name: name }).populate('books');
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update author
  const updateByAuthorId = async (req, res) => {
    try {
      const id = req.params.id;
      const author = await Author.findByIdAndUpdate(id, req.body, { new: true });
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json(author);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update author by Name
  const updateByAuthorName = async (req, res) => {
    try {
      const name = req.params.name;
      const author = await Author.findOneAndUpdate({ name: name }, req.body, { new: true });
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json(author);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete author
  const deleteByAuthorId = async (req, res) => {
    try {
      const id = req.params.id;
      await Author.findByIdAndRemove(id);
      res.status(204).json({ message: 'Author deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete author by Name
  const deleteByAuthorName = async (req, res) => {
    try {
      const name = req.params.name;
      await Author.findOneAndRemove({ name: name });
      res.status(204).json({ message: 'Author deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  exports.createAuthor = createAuthor;
  exports.getAllAuthors = getAllAuthors;
  exports.getByAuthorId = getByAuthorId;
  exports.getByAuthorName = getByAuthorName;
  exports.updateByAuthorId = updateByAuthorId;
  exports.updateByAuthorName = updateByAuthorName;
  exports.deleteByAuthorId = deleteByAuthorId;
  exports.deleteByAuthorName = deleteByAuthorName;