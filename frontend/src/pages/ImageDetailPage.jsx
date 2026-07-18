import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API_URL } from '../config/api'
import '../styles/ImageDetailPage.css'

function ImageDetailPage() {
  const { filename } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchImage()
  }, [filename])

  const fetchImage = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/images`)
      const data = await response.json()
      const foundImage = data.images?.find(img => img.filename === filename)

      if (foundImage) {
        setImage(foundImage)
      } else {
        setError('Obra no encontrada')
      }
    } catch (err) {
      console.error('Error al obtener imagen:', err)
      setError('Error al cargar la imagen')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="image-detail-page loading-page">
        <div className="loading-spinner">Cargando obra...</div>
      </div>
    )
  }

  if (error || !image) {
    return (
      <div className="image-detail-page error-page">
        <div className="error-container">
          <h2>⚠️ {error || 'Obra no encontrada'}</h2>
          <button onClick={() => navigate('/gallery')} className="error-btn">
            Volver a la galería
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="image-detail-page">
      <button className="back-button" onClick={() => navigate('/gallery')} title="Volver">
        ← Volver
      </button>

      <div className="detail-container">
        <div className="detail-image-section">
          <img src={image.url} alt={image.title} className="detail-image" />
        </div>

        <div className="detail-info-section">
          <h1>{image.title}</h1>

          {image.artist && (
            <div className="info-item">
              <label>Artista</label>
              <p>{image.artist}</p>
            </div>
          )}

          {image.category && (
            <div className="info-item">
              <label>Categoría</label>
              <p className="category-badge">{image.category}</p>
            </div>
          )}

          {image.description && (
            <div className="info-item full-width">
              <label>Descripción</label>
              <p>{image.description}</p>
            </div>
          )}

          <div className="info-item">
            <label>Fecha de Publicación</label>
            <p>{new Date(image.uploadDate).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>

          <button onClick={() => navigate('/gallery')} className="gallery-btn">
            📸 Ver más obras
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageDetailPage
