const Publication = require('../model/publication');

// Create publication
exports.createPublication = async (req, res) => {
  try {
    const publication = new Publication(req.body);
    await publication.save();
    res.status(201).json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all publications
exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate('books');
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get publication by ID
exports.getByPublicationId = async (req, res) => {
  try {
    const id = req.params.id;
    const publication = await Publication.findById(id).populate('books');
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get publication by Name
exports.getByPublicationByName = async (req, res) => {
  try {
    const name = req.params.name;
    const publication = await Publication.findOne({ name: name }).populate('books');
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update publication
exports.updatePublicationById = async (req, res) => {
  try {
    const id = req.params.id;
    const publication = await Publication.findByIdAndUpdate(id, req.body, { new: true });
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update publication by Name
exports.updateByPublicationName = async (req, res) => {
  try {
    const name = req.params.name;
    const publication = await Publication.findOneAndUpdate({ name: name }, req.body, { new: true });
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete publication
exports.deleteByPublicationId = async (req, res) => {
  try {
    const id = req.params.id;
    await Publication.findByIdAndRemove(id);
    res.status(204).json({ message: 'Publication deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete publication by Name
exports.deleteByPublicationName = async (req, res) => {
  try {
    const name = req.params.name;
    await Publication.findOneAndRemove({ name: name });
    res.status(204).json({ message: 'Publication deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
