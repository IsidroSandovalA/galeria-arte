import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadForm from '../components/UploadForm'
import ArtistGallery from '../components/ArtistGallery'
import { API_URL } from '../config/api'
import '../styles/ArtistPage.css'

function ArtistPage() {
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

  const handleImageUpload = (newImage) => {
    setImages([newImage, ...images])
  }

  const handleImageDelete = async (filename) => {
    try {
      await fetch(`${API_URL}/api/images/${filename}`, {
        method: 'DELETE'
      })
      setImages(images.filter(img => img.filename !== filename))
    } catch (error) {
      console.error('Error al eliminar imagen:', error)
    }
  }

  return (
    <div className="artist-page">
      <header className="artist-header">
        <div className="header-content">
          <h1>🎭 Panel del Artista</h1>
          <p>Gestiona y comparte tus obras maestras</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Volver al inicio
        </button>
      </header>

      <div className="artist-container">
        <UploadForm onUpload={handleImageUpload} />
        {loading ? (
          <div className="loading">Cargando tus obras...</div>
        ) : (
          <ArtistGallery
            images={images}
            onDelete={handleImageDelete}
          />
        )}
      </div>
    </div>
  )
}

export default ArtistPage
