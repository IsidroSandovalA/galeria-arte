const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const imageController = require('../controllers/imageController');

// Obtener todas las imágenes
router.get('/', imageController.getAllImages);

// Obtener una imagen específica
router.get('/:filename', imageController.getImage);

// Subir una imagen
router.post('/upload', upload.single('image'), imageController.uploadImage);

// Eliminar una imagen
router.delete('/:filename', imageController.deleteImage);

module.exports = router;
