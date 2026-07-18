import React, { useState } from 'react'
import ImageCard from './ImageCard'
import '../styles/Gallery.css'

function Gallery({ images, onDelete }) {
  const [selectedImage, setSelectedImage] = useState(null)

  if (images.length === 0) {
    return (
      <div className="empty-gallery">
        <div className="empty-icon">🖼️</div>
        <h3>No hay obras aún</h3>
        <p>¡Sube tu primera obra de arte!</p>
      </div>
    )
  }

  return (
    <>
      <div className="gallery">
        {images.map((image) => (
          <ImageCard
            key={image.filename}
            image={image}
            onSelect={() => setSelectedImage(image)}
            onDelete={onDelete}
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

export default Gallery
