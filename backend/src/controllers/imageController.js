const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

// URL pública del backend (en Railway se define BASE_URL; local usa localhost)
function baseUrl() {
  const url = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
  return url.replace(/\/+$/, '');
}

// Normaliza la fecha de publicación recibida del formulario.
// Una fecha pura (YYYY-MM-DD) se fija a mediodía para que no se
// recorra un día al mostrarse en otras zonas horarias.
function parseUploadDate(value) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value} 12:00:00`;
  }
  return value;
}

class ImageController {
  // Obtener todas las imágenes
  getAllImages = async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT id, filename, title, description, artist, category, upload_date
         FROM images
         ORDER BY upload_date DESC`
      );

      const images = result.rows.map(img => ({
        id: img.id,
        filename: img.filename,
        title: img.title || 'Sin título',
        description: img.description || '',
        artist: img.artist || 'Anónimo',
        category: img.category || 'otro',
        url: `${baseUrl()}/${img.filename}`,
        uploadDate: img.upload_date
      }));

      res.json({ images });
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
      res.status(500).json({ error: 'Error al obtener imágenes' });
    }
  };

  // Subir una imagen
  uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No se proporcionó archivo' });
      }

      const { title, description, artist, category, uploadDate } = req.body;

      const result = await pool.query(
        `INSERT INTO images (filename, title, description, artist, category, filepath, file_size, mimetype, upload_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9::timestamp, NOW()))
         RETURNING id, upload_date`,
        [
          req.file.filename,
          title || 'Sin título',
          description || '',
          artist || 'Anónimo',
          category || 'otro',
          req.file.path,
          req.file.size,
          req.file.mimetype,
          parseUploadDate(uploadDate)
        ]
      );

      const imageData = {
        id: result.rows[0].id,
        filename: req.file.filename,
        title: title || 'Sin título',
        description: description || '',
        artist: artist || 'Anónimo',
        category: category || 'otro',
        url: `${baseUrl()}/${req.file.filename}`,
        fileSize: req.file.size,
        uploadDate: result.rows[0].upload_date
      };

      res.status(201).json({
        message: 'Imagen subida exitosamente',
        image: imageData
      });
    } catch (error) {
      console.error('Error al subir imagen:', error);
      res.status(500).json({ error: 'Error al subir imagen' });
    }
  };

  // Actualizar los campos de una obra
  updateImage = async (req, res) => {
    try {
      const { filename } = req.params;
      const { title, description, artist, category, uploadDate } = req.body;

      const result = await pool.query(
        `UPDATE images
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             artist = COALESCE($3, artist),
             category = COALESCE($4, category),
             upload_date = COALESCE($5::timestamp, upload_date)
         WHERE filename = $6
         RETURNING id, filename, title, description, artist, category, upload_date`,
        [title, description, artist, category, parseUploadDate(uploadDate), filename]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Imagen no encontrada' });
      }

      const img = result.rows[0];
      res.json({
        message: 'Obra actualizada exitosamente',
        image: {
          id: img.id,
          filename: img.filename,
          title: img.title,
          description: img.description || '',
          artist: img.artist,
          category: img.category,
          url: `${baseUrl()}/${img.filename}`,
          uploadDate: img.upload_date
        }
      });
    } catch (error) {
      console.error('Error al actualizar imagen:', error);
      res.status(500).json({ error: 'Error al actualizar imagen' });
    }
  };

  // Eliminar una imagen
  deleteImage = async (req, res) => {
    try {
      const { filename } = req.params;
      const filepath = path.join(UPLOADS_DIR, filename);

      const found = await pool.query(
        'SELECT id FROM images WHERE filename = $1',
        [filename]
      );

      if (found.rows.length === 0) {
        return res.status(404).json({ error: 'Imagen no encontrada' });
      }

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }

      await pool.query('DELETE FROM images WHERE filename = $1', [filename]);

      res.json({ message: 'Imagen eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      res.status(500).json({ error: 'Error al eliminar imagen' });
    }
  };

  // Obtener una imagen por nombre de archivo
  getImage = async (req, res) => {
    try {
      const { filename } = req.params;
      const filepath = path.join(UPLOADS_DIR, filename);

      if (!fs.existsSync(filepath)) {
        return res.status(404).json({ error: 'Imagen no encontrada' });
      }

      res.sendFile(filepath);
    } catch (error) {
      console.error('Error al obtener imagen:', error);
      res.status(500).json({ error: 'Error al obtener imagen' });
    }
  };
}

module.exports = new ImageController();
