import React, { useState, useEffect } from 'react'
import UploadForm from '../components/UploadForm'
import Gallery from '../components/Gallery'
import { API_URL } from '../config/api'
import '../styles/Home.css'

function Home() {
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
    <div className="home">
      <header className="header">
        <h1>🎨 Galería ISG</h1>
        <p>Sube y comparte tus obras maestras</p>
      </header>

      <div className="container">
        <UploadForm onUpload={handleImageUpload} />
        {loading ? (
          <div className="loading">Cargando imágenes...</div>
        ) : (
          <Gallery images={images} onDelete={handleImageDelete} />
        )}
      </div>
    </div>
  )
}

export default Home
