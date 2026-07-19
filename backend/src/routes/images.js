const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { requireAuth } = require('../middleware/authMiddleware');
const imageController = require('../controllers/imageController');

// Rutas públicas (Guest: solo lectura)
router.get('/', imageController.getAllImages);
router.get('/:filename', imageController.getImage);

// Rutas protegidas (solo Artista con sesión)
router.post('/upload', requireAuth, upload.single('image'), imageController.uploadImage);
router.put('/:filename', requireAuth, imageController.updateImage);
router.delete('/:filename', requireAuth, imageController.deleteImage);

module.exports = router;
