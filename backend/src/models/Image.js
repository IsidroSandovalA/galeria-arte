const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  filename: {
    type: String,
    required: true,
    unique: true
  },
  filepath: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['pintura', 'fotografía', 'escultura', 'digital', 'otro'],
    default: 'otro'
  },
  fileSize: {
    type: Number
  },
  mimetype: {
    type: String
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', imageSchema);
