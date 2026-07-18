import React, { useState } from 'react'
import '../styles/ImageCard.css'

function ImageCard({ image, onSelect, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(image.filename)
    setDeleting(false)
    setShowDeleteConfirm(false)
  }

  return (
    <div className="image-card">
      <div className="image-wrapper">
        <img
          src={image.url}
          alt={image.title}
          onClick={onSelect}
          className="image"
        />
        <div className="overlay">
          <button
            className="view-btn"
            onClick={onSelect}
          >
            👁️ Ver
          </button>
        </div>
      </div>

      <div className="card-info">
        <h3>{image.title}</h3>
        {image.artist && (
          <p className="artist">Por: {image.artist}</p>
        )}
      </div>

      <div className="card-actions">
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
          <button
            className="delete-btn"
            onClick={() => setShowDeleteConfirm(true)}
          >
            🗑️ Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default ImageCard
