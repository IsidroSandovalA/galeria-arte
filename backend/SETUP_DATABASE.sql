-- ============================================
-- Script de Configuración de Base de Datos
-- Galería de Arte - SQL Server
-- ============================================

-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'galeria_arte')
BEGIN
    CREATE DATABASE [galeria_arte];
    PRINT 'Base de datos "galeria_arte" creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'Base de datos "galeria_arte" ya existe.';
END
GO

-- Usar la base de datos
USE [galeria_arte];
GO

-- Crear la tabla Images si no existe
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Images')
BEGIN
    CREATE TABLE [dbo].[Images]
    (
        [id] INT PRIMARY KEY IDENTITY(1,1),
        [filename] NVARCHAR(255) UNIQUE NOT NULL,
        [title] NVARCHAR(255) NOT NULL DEFAULT 'Sin título',
        [description] NVARCHAR(MAX),
        [artist] NVARCHAR(255) DEFAULT 'Anónimo',
        [category] NVARCHAR(50) DEFAULT 'otro',
        [filepath] NVARCHAR(255) NOT NULL,
        [fileSize] BIGINT,
        [mimetype] NVARCHAR(100),
        [uploadDate] DATETIME DEFAULT GETDATE()
    );
    PRINT 'Tabla "Images" creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'Tabla "Images" ya existe.';
END
GO

-- Crear índices si no existen
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Images_Artist')
BEGIN
    CREATE INDEX [IX_Images_Artist] ON [dbo].[Images]([artist]);
    PRINT 'Índice IX_Images_Artist creado.';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Images_Category')
BEGIN
    CREATE INDEX [IX_Images_Category] ON [dbo].[Images]([category]);
    PRINT 'Índice IX_Images_Category creado.';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Images_UploadDate')
BEGIN
    CREATE INDEX [IX_Images_UploadDate] ON [dbo].[Images]([uploadDate] DESC);
    PRINT 'Índice IX_Images_UploadDate creado.';
END
GO

-- Verificar que la tabla se creó correctamente
SELECT * FROM [dbo].[Images];
GO

PRINT '';
PRINT '✅ Configuración de base de datos completada exitosamente.';
PRINT 'La tabla "Images" está lista para usar.';
