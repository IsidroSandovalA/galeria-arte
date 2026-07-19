import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config/api'
import { authHeaders, clearSession } from '../config/auth'
import '../styles/UploadForm.css'

function UploadForm({ onUpload }) {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [artist, setArtist] = useState('')
  const [category, setCategory] = useState('otro')
  const [uploadDate, setUploadDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError('Por favor selecciona una imagen')
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', title || 'Sin título')
    formData.append('description', description)
    formData.append('artist', artist || 'Anónimo')
    formData.append('category', category)
    formData.append('uploadDate', uploadDate)

    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/images/upload`, {
        method: 'POST',
        headers: authHeaders(),
        body: formData
      })

      if (response.status === 401) {
        clearSession()
        navigate('/login')
        return
      }

      if (!response.ok) {
        throw new Error('Error al subir la imagen')
      }

      const data = await response.json()
      onUpload(data.image)

      setFile(null)
      setTitle('')
      setDescription('')
      setArtist('')
      setCategory('otro')
      setUploadDate(new Date().toISOString().slice(0, 10))
      setPreview(null)
      setError('')
    } catch (err) {
      setError(err.message || 'Error al subir la imagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit}>
        <h2>Subir Nueva Obra</h2>

        {preview && (
          <div className="preview">
            <img src={preview} alt="Preview" />
            <button
              type="button"
              className="clear-preview"
              onClick={() => {
                setFile(null)
                setPreview(null)
              }}
            >
              ✕
            </button>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="image">Seleccionar Imagen</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nombre de la obra"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist">Artista</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Tu nombre"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            <option value="pintura">Pintura</option>
            <option value="fotografía">Fotografía</option>
            <option value="escultura">Escultura</option>
            <option value="digital">Digital</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="uploadDate">Fecha de Publicación</label>
          <input
            type="date"
            id="uploadDate"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Cuéntanos sobre tu obra"
            disabled={loading}
            rows="3"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Subiendo...' : '📤 Subir Obra'}
        </button>
      </form>
    </div>
  )
}

export default UploadForm
