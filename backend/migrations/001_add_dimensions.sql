-- Agregar columna de dimensiones a la tabla images
ALTER TABLE images ADD COLUMN IF NOT EXISTS dimensions VARCHAR(100);
