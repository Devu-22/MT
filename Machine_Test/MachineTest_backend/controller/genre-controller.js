const Genre = require('../model/genre');
const { getAll } = require('./plan-controller');



// Create genre
const createGenre = async (req, res) => {
    try {
      const genre = new Genre(req.body);
      await genre.save();
      res.status(201).json(genre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all genres
  const getAllGenre = async (req, res) => {
    try {
      const genres = await Genre.find().populate('books');
      res.json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get genre by ID
  const getByGenreId = async (req, res) => {
    try {
      const id = req.params.id;
      const genre = await Genre.findById(id).populate('books');
      if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.json(genre);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get genre by Name
  const getByGenreName = async (req, res) => {
    try {
      const name = req.params.name;
      const genre = await Genre.findOne({ name: name }).populate('books');
      if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.json(genre);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update genre
  const updateByGenreId = async (req, res) => {
    try {
      const id = req.params.id;
      const genre = await Genre.findByIdAndUpdate(id, req.body, { new: true });
      if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.json(genre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update genre by Name
  const updateByGenreName = async (req, res) => {
    try {
      const name = req.params.name;
      const genre = await Genre.findOneAndUpdate({ name: name }, req.body, { new: true });
      if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.json(genre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete genre
  const deleteGenre = async (req, res) => {
    try {
      const id = req.params.id;
      await Genre.findByIdAndRemove(id);
      res.status(204).json({ message: 'Genre deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete genre by Name
  const deleteByGenreName = async (req, res) => {
    try {
      const name = req.params.name;
      await Genre.findOneAndRemove({ name: name });
      res.status(204).json({ message: 'Genre deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.createGenre = createGenre;
exports.getAllGenre = getAllGenre;
exports.getByGenreId = getByGenreId;
exports.getByGenreName = getByGenreName;
exports.updateByGenreId = updateByGenreId;
exports.updateByGenreName = updateByGenreName
exports.deleteGenre = deleteGenre;
exports.deleteByGenreName = deleteByGenreName;



  