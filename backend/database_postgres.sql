-- ============================================
-- Esquema PostgreSQL - Galería de Arte
-- Ejecutar en la BD de Railway (Fase 3)
-- ============================================

CREATE TABLE IF NOT EXISTS images (
    id          SERIAL PRIMARY KEY,
    filename    VARCHAR(255) UNIQUE NOT NULL,
    title       VARCHAR(255) NOT NULL DEFAULT 'Sin título',
    description TEXT,
    artist      VARCHAR(255) DEFAULT 'Anónimo',
    category    VARCHAR(50) DEFAULT 'otro',
    filepath    VARCHAR(255) NOT NULL,
    file_size   BIGINT,
    mimetype    VARCHAR(100),
    upload_date TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_images_artist ON images(artist);
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_images_upload_date ON images(upload_date DESC);

-- ============================================
-- Datos migrados desde SQL Server local
-- ============================================

INSERT INTO images (filename, title, description, artist, category, filepath, file_size, mimetype, upload_date)
VALUES
  ('1784366518055-860892447.jpg',
   'Noche Serena',
   'Una composición de óleo que captura la esencia de una noche tranquila con la luna reflejada en aguas tranquilas. La técnica del artista enfatiza los contrastes entre luz y sombra, creando una atmósfera contemplativa y misteriosa.',
   'Isidro Sandoval',
   'pintura',
   'uploads/1784366518055-860892447.jpg',
   220643,
   'image/jpeg',
   '2026-07-18T03:33:24.270'),
  ('1784367750760-127870965.jpg',
   'Soledad en Blanco y Negro',
   'Una obra que explora los temas de aislamiento y esperanza a través de la paleta en escala de grises. La composición minimalista enfatiza la geometría natural del paisaje.',
   'Isidro Sandoval',
   'pintura',
   'uploads/1784367750760-127870965.jpg',
   345087,
   'image/jpeg',
   '2026-07-18T03:33:24.270')
ON CONFLICT (filename) DO NOTHING;
