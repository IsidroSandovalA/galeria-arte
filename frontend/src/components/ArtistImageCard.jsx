import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeCanvas as QRCode } from 'qrcode.react'
import { API_URL } from '../config/api'
import { authHeaders, clearSession } from '../config/auth'
import '../styles/ArtistImageCard.css'

function ArtistImageCard({ image, onDelete, onUpdate }) {
  const navigate = useNavigate()
  const [showQR, setShowQR] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editError, setEditError] = useState('')
  const [form, setForm] = useState({
    title: image.title || '',
    artist: image.artist || '',
    category: image.category || 'otro',
    description: image.description || '',
    uploadDate: image.uploadDate ? String(image.uploadDate).slice(0, 10) : ''
  })
  const qrRef = useRef()

  const imageDetailUrl = `${window.location.origin}/image/${image.filename}`

  const handleDownloadQR = () => {
    const qrElement = qrRef.current
    if (qrElement) {
      const canvas = qrElement.querySelector('canvas')
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `qr-${image.filename}.png`
      link.click()
    }
  }

  const handleShareLink = async () => {
    const shareData = {
      title: image.title || 'Obra de arte',
      text: `Mira esta obra de arte: ${image.title}${image.artist ? ` por ${image.artist}` : ''}`,
      url: imageDetailUrl
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error al compartir:', err)
        }
      }
    } else {
      navigator.clipboard.writeText(imageDetailUrl)
      alert('Enlace copiado al portapapeles')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(image.filename)
    setDeleting(false)
    setShowDeleteConfirm(false)
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setEditError('')

    try {
      const response = await fetch(`${API_URL}/api/images/${image.filename}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders()
        },
        body: JSON.stringify(form)
      })

      if (response.status === 401) {
        clearSession()
        navigate('/login')
        return
      }

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar')
      }

      onUpdate(data.image)
      setEditing(false)
    } catch (err) {
      setEditError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="artist-image-card">
      <div className="artist-image-wrapper">
        <img src={image.url} alt={image.title} className="artist-image" />
        <div className="artist-overlay">
          <button
            className="qr-btn"
            onClick={() => setShowQR(!showQR)}
            title="Ver código QR"
          >
            📱 QR
          </button>
          <button
            className="share-btn"
            onClick={handleShareLink}
            title="Compartir enlace"
          >
            🔗 Compartir
          </button>
        </div>
      </div>

      {editing ? (
        <form className="edit-form" onSubmit={handleSaveEdit}>
          <label>Título</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <label>Artista</label>
          <input
            type="text"
            value={form.artist}
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
            required
          />

          <label>Categoría</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="pintura">Pintura</option>
            <option value="fotografía">Fotografía</option>
            <option value="escultura">Escultura</option>
            <option value="digital">Digital</option>
            <option value="otro">Otro</option>
          </select>

          <label>Fecha de Publicación</label>
          <input
            type="date"
            value={form.uploadDate}
            onChange={(e) => setForm({ ...form, uploadDate: e.target.value })}
          />

          <label>Descripción</label>
          <textarea
            rows="4"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {editError && <p className="edit-error">⚠️ {editError}</p>}

          <div className="edit-buttons">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Guardando...' : '💾 Guardar'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditing(false)}
              disabled={saving}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="artist-card-info">
          <h3>{image.title}</h3>
          {image.artist && <p className="artist">Por: {image.artist}</p>}
        </div>
      )}

      {showQR && (
        <div className="qr-container">
          <div ref={qrRef}>
            <QRCode
              value={imageDetailUrl}
              size={200}
              level="H"
              includeMargin={true}
              fgColor="#e2b457"
              bgColor="#101012"
            />
          </div>
          <button className="download-qr-btn" onClick={handleDownloadQR}>
            ⬇️ Descargar QR
          </button>
        </div>
      )}

      {!editing && (
        <div className="artist-card-actions">
          {showDeleteConfirm ? (
            <div className="delete-confirm">
              <p>¿Eliminar obra?</p>
              <div className="confirm-buttons">
                <button
                  className="confirm-yes"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  Sí
                </button>
                <button
                  className="confirm-no"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <div className="action-buttons">
              <button
                className="edit-btn"
                onClick={() => setEditing(true)}
              >
                ✏️ Editar
              </button>
              <button
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                🗑️ Eliminar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ArtistImageCard
