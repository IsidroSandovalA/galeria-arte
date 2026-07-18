import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicImageCard from './PublicImageCard'
import '../styles/PublicGallery.css'

function PublicGallery({ images }) {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)

  if (images.length === 0) {
    return (
      <div className="empty-public-gallery">
        <div className="empty-icon">🖼️</div>
        <h3>Galería vacía</h3>
        <p>No hay obras disponibles en este momento</p>
      </div>
    )
  }

  return (
    <>
      <div className="public-gallery">
        {images.map((image) => (
          <PublicImageCard
            key={image.filename}
            image={image}
            onSelect={() => {
              setSelectedImage(image)
              navigate(`/image/${image.filename}`)
            }}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          className="modal"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
            />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              {selectedImage.artist && (
                <p className="artist">Por: {selectedImage.artist}</p>
              )}
              {selectedImage.description && (
                <p className="description">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PublicGallery
