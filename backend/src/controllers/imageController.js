const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');
const s3Service = require('../services/s3Service');

// URL de S3 (las imágenes ahora se sirven desde S3)
function getImageUrl(filename) {
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${filename}`;
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
        `SELECT id, filename, title, description, artist, category, dimensions, upload_date
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
        dimensions: img.dimensions || '',
        url: getImageUrl(img.filename),
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

      const { title, description, artist, category, dimensions, uploadDate } = req.body;

      // Generar nombre único para el archivo
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = req.file.originalname.split('.').pop();
      const filename = `${uniqueSuffix}.${ext}`;

      // Crear objeto de archivo temporal para S3
      const fileToUpload = {
        filename: filename,
        path: null,
        buffer: req.file.buffer,
        mimetype: req.file.mimetype,
        size: req.file.size
      };

      // Subir a S3
      console.log(`📤 Iniciando upload a S3 para: ${filename}`);
      const s3Url = await s3Service.uploadFile(fileToUpload);
      console.log(`✅ Upload completado. URL: ${s3Url}`);

      const result = await pool.query(
        `INSERT INTO images (filename, title, description, artist, category, dimensions, filepath, file_size, mimetype, upload_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, COALESCE($10::timestamp, NOW()))
         RETURNING id, upload_date`,
        [
          filename,
          title || 'Sin título',
          description || '',
          artist || 'Anónimo',
          category || 'otro',
          dimensions || '',
          s3Url,
          req.file.size,
          req.file.mimetype,
          parseUploadDate(uploadDate)
        ]
      );

      const imageUrl = getImageUrl(filename);
      console.log(`🖼️ URL generada para ${filename}: ${imageUrl}`);

      const imageData = {
        id: result.rows[0].id,
        filename: filename,
        title: title || 'Sin título',
        description: description || '',
        artist: artist || 'Anónimo',
        category: category || 'otro',
        dimensions: dimensions || '',
        url: imageUrl,
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
      const { title, description, artist, category, dimensions, uploadDate } = req.body;

      const result = await pool.query(
        `UPDATE images
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             artist = COALESCE($3, artist),
             category = COALESCE($4, category),
             dimensions = COALESCE($5, dimensions),
             upload_date = COALESCE($6::timestamp, upload_date)
         WHERE filename = $7
         RETURNING id, filename, title, description, artist, category, dimensions, upload_date`,
        [title, description, artist, category, dimensions, parseUploadDate(uploadDate), filename]
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
          dimensions: img.dimensions || '',
          url: getImageUrl(img.filename),
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

      const found = await pool.query(
        'SELECT id FROM images WHERE filename = $1',
        [filename]
      );

      if (found.rows.length === 0) {
        return res.status(404).json({ error: 'Imagen no encontrada' });
      }

      // Eliminar de S3
      await s3Service.deleteFile(filename);

      await pool.query('DELETE FROM images WHERE filename = $1', [filename]);

      res.json({ message: 'Imagen eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      res.status(500).json({ error: 'Error al eliminar imagen' });
    }
  };

  // Obtener una imagen por nombre de archivo (redirigir a S3)
  getImage = async (req, res) => {
    try {
      const { filename } = req.params;

      // Verificar que existe en BD
      const found = await pool.query(
        'SELECT id FROM images WHERE filename = $1',
        [filename]
      );

      if (found.rows.length === 0) {
        return res.status(404).json({ error: 'Imagen no encontrada' });
      }

      // Redirigir a URL de S3
      const s3Url = getImageUrl(filename);
      res.redirect(s3Url);
    } catch (error) {
      console.error('Error al obtener imagen:', error);
      res.status(500).json({ error: 'Error al obtener imagen' });
    }
  };
}

module.exports = new ImageController();
