const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/auth/login — inicia sesión del artista
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!process.env.ARTIST_USER || !process.env.ARTIST_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'Autenticación no configurada en el servidor' });
  }

  if (username !== process.env.ARTIST_USER || password !== process.env.ARTIST_PASSWORD) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }

  const token = jwt.sign(
    { role: 'artist', username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, role: 'artist', username });
});

module.exports = router;
