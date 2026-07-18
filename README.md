# 🎨 Galería de Arte - Aplicación Web

Una aplicación web moderna para subir y mostrar imágenes como si fuera una galería de arte profesional.

## 📋 Características

- ✅ Subir imágenes (JPEG, PNG, WebP, GIF)
- ✅ Vista de galería con grid responsivo
- ✅ Modal para visualizar imágenes en detalle
- ✅ Información de obra (título, artista, descripción, categoría)
- ✅ Eliminar imágenes
- ✅ Interfaz moderna con gradientes y efectos
- ✅ Responsive design para móvil, tablet y desktop

## 🏗️ Estructura del Proyecto

```
proyecto_reac_nodejs/
├── backend/                 # Servidor Node.js + Express
│   ├── src/
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── middleware/     # Middleware personalizado
│   │   ├── models/         # Modelos de datos
│   │   └── routes/         # Rutas de API
│   ├── uploads/            # Carpeta para imágenes
│   ├── server.js           # Punto de entrada
│   └── package.json
│
└── frontend/                # Aplicación React + Vite
    ├── public/             # Archivos estáticos
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── pages/          # Páginas
    │   ├── styles/         # Estilos CSS
    │   ├── App.jsx
    │   └── index.jsx       # Punto de entrada
    └── package.json
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn

### Backend

1. Navega a la carpeta backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=10485760
```

4. Inicia el servidor:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### Frontend

1. En otra terminal, navega a la carpeta frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📡 API Endpoints

### GET `/api/images`
Obtiene todas las imágenes de la galería.

**Response:**
```json
{
  "images": [
    {
      "id": "filename",
      "filename": "filename",
      "title": "Título",
      "description": "Descripción",
      "artist": "Nombre del artista",
      "url": "http://localhost:5000/filename",
      "uploadDate": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST `/api/images/upload`
Sube una nueva imagen.

**Form Data:**
- `image` (File): Archivo de imagen
- `title` (String): Título de la obra
- `description` (String): Descripción
- `artist` (String): Nombre del artista
- `category` (String): pintura, fotografía, escultura, digital, otro

**Response:**
```json
{
  "message": "Imagen subida exitosamente",
  "image": { ... }
}
```

### DELETE `/api/images/:filename`
Elimina una imagen.

## 🎨 Estilos y Temas

La aplicación cuenta con:
- Fondo gradiente oscuro y moderno
- Colores cyan/azul (#00d4ff, #0099ff)
- Efectos glassmorphism en componentes
- Animaciones suaves en elementos
- Diseño completamente responsive

## 🔧 Tecnologías Utilizadas

### Backend
- **Express.js**: Framework web
- **Multer**: Manejo de carga de archivos
- **CORS**: Control de acceso entre orígenes
- **Dotenv**: Variables de entorno

### Frontend
- **React**: Librería de UI
- **Vite**: Bundler y servidor de desarrollo
- **Axios**: Cliente HTTP (opcional)
- **CSS3**: Estilos modernos

## 📱 Responsive Design

- **Desktop**: Grid de 3-4 columnas
- **Tablet**: Grid de 2 columnas
- **Móvil**: Grid de 1 columna adaptativa

## 🐛 Troubleshooting

### Puerto ya en uso
Si el puerto 5000 o 5173 ya está en uso, cambia en:
- **Backend**: `.env` → `PORT=5001`
- **Frontend**: `vite.config.js` → `port: 5174`

### Error CORS
Asegúrate de que `CORS_ORIGIN` en el backend coincida con la URL del frontend.

### Las imágenes no se cargan
1. Verifica que la carpeta `uploads/` existe en backend
2. Comprueba que el servidor backend está corriendo
3. Revisa la consola del navegador para más detalles

## 📝 Desarrollo

Para agregar nuevas funcionalidades:

1. **Componentes**: Agregar en `frontend/src/components/`
2. **Rutas**: Agregar en `backend/src/routes/`
3. **Controladores**: Agregar en `backend/src/controllers/`
4. **Estilos**: Crear archivo `.css` correspondiente

## 🚢 Producción

### Build Frontend
```bash
cd frontend
npm run build
```

Los archivos compilados estarán en `frontend/dist/`

## 📄 Licencia

MIT

## 👨‍💻 Autor

Proyecto scaffolding para galería de arte

---

¡Disfruta compartiendo tu arte! 🎨✨
