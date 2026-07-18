# 🗄️ Configuración de Base de Datos SQL Server

## Pasos a seguir:

### 1️⃣ Abre SQL Server Management Studio (SSMS)

### 2️⃣ Conecta a tu servidor local
- **Server:** `localhost` o `.\MSSQLSERVER` o tu nombre de servidor
- **Authentication:** Windows Authentication

### 3️⃣ Abre una ventana de New Query
- Clic en **New Query**

### 4️⃣ Copia y ejecuta el script
- Abre el archivo: `backend/SETUP_DATABASE.sql`
- Copia TODO el contenido
- Pégalo en la ventana de Query de SSMS
- Presiona **F5** o clic en **Execute**

### 5️⃣ Verifica que se creó correctamente
Deberías ver estos mensajes:
```
Base de datos "galeria_arte" creada exitosamente.
Tabla "Images" creada exitosamente.
Índice IX_Images_Artist creado.
Índice IX_Images_Category creado.
Índice IX_Images_UploadDate creado.
✅ Configuración de base de datos completada exitosamente.
```

### 6️⃣ Inicia el backend
En la terminal, desde la carpeta del proyecto:
```bash
cd backend
npm install
npm run dev
```

Deberías ver:
```
✅ Conectado a SQL Server - galeria_arte
🎨 Servidor corriendo en puerto 5000
```

### 7️⃣ Inicia el frontend
En otra terminal:
```bash
cd frontend
npm run dev
```

---

## 📊 Estructura de la tabla Images

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INT (PK) | ID único (auto incrementa) |
| filename | NVARCHAR(255) | Nombre del archivo (único) |
| title | NVARCHAR(255) | Título de la obra |
| description | NVARCHAR(MAX) | Descripción completa |
| artist | NVARCHAR(255) | Nombre del artista |
| category | NVARCHAR(50) | Categoría (pintura, fotografía, etc) |
| filepath | NVARCHAR(255) | Ruta del archivo guardado |
| fileSize | BIGINT | Tamaño en bytes |
| mimetype | NVARCHAR(100) | Tipo MIME (image/jpeg, etc) |
| uploadDate | DATETIME | Fecha de subida (default: GETDATE()) |

---

## ✅ Listo!

Una vez ejecutado el script SQL y iniciados ambos servidores, la aplicación debería funcionar completamente con la BD.

Todas las imágenes y su información (título, descripción, artista, categoría) se guardarán en la BD.
