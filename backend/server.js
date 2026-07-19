require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 5000;
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const SEED_IMAGES_DIR = path.join(__dirname, 'seed_images');

// Restaurar imágenes iniciales si el volumen está vacío (primer arranque en Railway)
function restoreSeedImages() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  if (fs.existsSync(SEED_IMAGES_DIR)) {
    for (const file of fs.readdirSync(SEED_IMAGES_DIR)) {
      const dest = path.join(UPLOADS_DIR, file);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(path.join(SEED_IMAGES_DIR, file), dest);
        console.log(`📥 Imagen restaurada: ${file}`);
      }
    }
  }
}
restoreSeedImages();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.static(UPLOADS_DIR));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/images', require('./src/routes/images'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🎨 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

startServer();
