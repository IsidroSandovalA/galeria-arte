import React, { useState } from 'react'
import ArtistImageCard from './ArtistImageCard'
import '../styles/ArtistGallery.css'

function ArtistGallery({ images, onDelete }) {
  if (images.length === 0) {
    return (
      <div className="empty-gallery">
        <div className="empty-icon">🖼️</div>
        <h3>No hay obras aún</h3>
        <p>¡Sube tu primera obra de arte desde el formulario!</p>
      </div>
    )
  }

  return (
    <div className="artist-gallery-section">
      <h2>Mis Obras ({images.length})</h2>
      <div className="artist-gallery">
        {images.map((image) => (
          <ArtistImageCard
            key={image.filename}
            image={image}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default ArtistGallery
