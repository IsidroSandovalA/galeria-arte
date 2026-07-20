import React from 'react'
import '../styles/PublicImageCard.css'

function PublicImageCard({ image, onSelect }) {
  return (
    <div className="public-image-card" onClick={onSelect}>
      <div className="public-image-wrapper">
        <img
          src={image.url}
          alt={image.title}
          className="public-image"
        />
        <div className="public-overlay">
          <button className="view-btn">👁️ Ver Obra</button>
        </div>
      </div>

      <div className="public-card-info">
        <h3>{image.title}</h3>
        {image.artist && (
          <p className="artist">Por: {image.artist}</p>
        )}
        {image.dimensions && (
          <p className="dimensions">📏 {image.dimensions}</p>
        )}
      </div>
    </div>
  )
}

export default PublicImageCard
