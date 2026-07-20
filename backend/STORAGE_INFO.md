# 📸 Gestión de Almacenamiento de Imágenes

## ⚠️ Problema: Volumen Efímero en Railway

Railway reinicia el volumen de almacenamiento en cada **deploy**, lo que significa:
- Las imágenes subidas se **pierden** después de cada despliegue
- Los registros en la base de datos **persisten** (en PostgreSQL)
- Las imágenes sin archivo físico generan errores 404 en la galería

## ✅ Solución Actual: Seed Images

La carpeta `seed_images/` contiene imágenes que se **restauran automáticamente** en cada deploy:
- Solo las imágenes en `seed_images/` persisten entre deploys
- Al iniciar, `server.js` copia estas imágenes a `uploads/`
- Actualmente contiene: Noche Serena, Soledad en Blanco y Negro

## 🔧 Cómo Hacer Backup de Imágenes

### Opción 1: Copiar a seed_images (Recomendado)
```bash
cd backend
# Copiar imagen específica
cp uploads/nombre-archivo.jpg seed_images/

# O copiar todas las imágenes
cp uploads/* seed_images/
```

### Opción 2: Usar un servicio de almacenamiento externo
Para solución permanente, considera:
- **AWS S3** - Almacenamiento de objetos escalable
- **Azure Blob Storage** - Alternativa a S3
- **Cloudinary** - CDN especializado en imágenes
- **Google Cloud Storage** - Almacenamiento en la nube

## 📝 Workflow Recomendado

1. **Desarrollo Local**: Las imágenes se guardan en `uploads/`
2. **Antes de Deploy**: Copiar imágenes importantes a `seed_images/`
3. **Commit & Push**: Git almacena seed_images/
4. **Deploy en Railway**: Se restauran automáticamente desde seed_images/

## 📋 Checklist para Producción

- [ ] Identificar imágenes críticas/importantes
- [ ] Copiarlas a `seed_images/`
- [ ] Hacer commit y push
- [ ] Verificar en productivo que persistan después del deploy

## 🚀 Mejora Futura Sugerida

Implementar almacenamiento externo (S3) para:
- Imágenes permanentes sin límite de tamaño
- Mejor rendimiento con CDN
- Backups automáticos
- Escalabilidad
