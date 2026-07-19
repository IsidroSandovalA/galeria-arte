import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicGallery from '../components/PublicGallery'
import { API_URL } from '../config/api'
import '../styles/GalleryPage.css'

function GalleryPage() {
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/images`)
      const data = await response.json()
      setImages(data.images || [])
    } catch (error) {
      console.error('Error al obtener imágenes:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <div className="header-content">
          <h1>🎨 Galería ISG</h1>
          <p>Explora obras maestras de artistas</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Volver al inicio
        </button>
      </header>

      <div className="gallery-container">
        {loading ? (
          <div className="loading">Cargando galería...</div>
        ) : (
          <PublicGallery images={images} />
        )}
      </div>
    </div>
  )
}

export default GalleryPage
