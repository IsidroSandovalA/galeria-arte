# 🗄️ Configuración de Base de Datos SQL Server

## Pasos para crear la BD y tablas

### 1️⃣ Abre SQL Server Management Studio (SSMS)

### 2️⃣ Conecta a tu servidor local
- Server: `localhost` o `.` o `.\SQLEXPRESS`
- Authentication: **Windows Authentication**

### 3️⃣ Abre una ventana de Query Nueva
- Clic en **New Query**

### 4️⃣ Copia y pega el contenido del archivo `database.sql`
- Abre el archivo: `backend/database.sql`
- Copia TODO el contenido
- Pégalo en la ventana de Query de SSMS

### 5️⃣ Ejecuta el script
- Presiona **F5** o clic en **Execute**
- Deberías ver el mensaje: "Commands completed successfully"

### 6️⃣ Verifica que se creó la BD
En el Object Explorer deberías ver:
```
📁 Databases
  📁 galeria_arte
    📁 Tables
      📋 Images
```

---

## ✅ Tabla Images

La tabla tiene las siguientes columnas:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INT (PK) | ID único (auto incrementa) |
| filename | NVARCHAR(255) | Nombre del archivo (único) |
| title | NVARCHAR(255) | Título de la obra |
| description | NVARCHAR(MAX) | Descripción completa |
| artist | NVARCHAR(255) | Nombre del artista |
| category | NVARCHAR(50) | Categoría (pintura, foto, etc) |
| filepath | NVARCHAR(255) | Ruta del archivo guardado |
| fileSize | BIGINT | Tamaño en bytes |
| mimetype | NVARCHAR(100) | Tipo MIME (image/jpeg, etc) |
| uploadDate | DATETIME | Fecha de subida (default: GETDATE()) |

---

## 🚀 Inicia el servidor

Después de crear la BD, inicia el backend:

```bash
cd backend
npm run dev
```

El servidor debería mostrar:
```
✅ Conectado a SQL Server
🎨 Servidor corriendo en puerto 5000
```

---

## ⚠️ Si hay errores

Si ves errores de conexión:

1. **Verifica que SQL Server esté corriendo**
   ```powershell
   Get-Service -Name MSSQLSERVER | Select Status
   ```

2. **Verifica el nombre de tu instancia**
   - Si usas Express: `.\SQLEXPRESS`
   - Si usas otra: ajusta en `backend/src/config/database.js`

3. **Habilita Named Pipes y TCP/IP**
   - Abre SQL Server Configuration Manager
   - Ve a: SQL Server Network Configuration
   - Habilita: TCP/IP y Named Pipes

---

## ✅ La BD está lista cuando:

- ✅ Se crean la BD `galeria_arte`
- ✅ Se crea la tabla `Images`
- ✅ El servidor se conecta sin errores
- ✅ Puedes subir imágenes y ver artista + descripción en la galería
