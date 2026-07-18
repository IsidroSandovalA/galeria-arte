import React, { useState, useRef } from 'react'
import QRCode from 'qrcode.react'
import '../styles/ArtistImageCard.css'

function ArtistImageCard({ image, onDelete }) {
  const [showQR, setShowQR] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
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

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(image.filename)
    setDeleting(false)
    setShowDeleteConfirm(false)
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
        </div>
      </div>

      <div className="artist-card-info">
        <h3>{image.title}</h3>
        {image.artist && <p className="artist">Por: {image.artist}</p>}
      </div>

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

export default ArtistImageCard
