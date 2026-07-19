import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-header">
          <h1>🎨 Galería ISG</h1>
          <p>Una plataforma moderna para artistas y amantes del arte</p>
        </div>

        <div className="landing-cards">
          <div className="landing-card artist-card" onClick={() => navigate('/artist')}>
            <div className="card-icon">🎭</div>
            <h2>Modo Artista</h2>
            <p>Sube tus obras maestras y genera códigos QR para tus cuadros físicos</p>
            <button className="card-btn">Entrar como Artista</button>
          </div>

          <div className="landing-card visitor-card" onClick={() => navigate('/gallery')}>
            <div className="card-icon">👁️</div>
            <h2>Modo Galería</h2>
            <p>Explora obras de arte y accede a más información escaneando QR</p>
            <button className="card-btn">Ver Galería</button>
          </div>
        </div>

        <div className="landing-features">
          <div className="feature">
            <span className="feature-icon">📸</span>
            <h3>Sube Imágenes</h3>
            <p>Carga tus obras en alta calidad</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📱</span>
            <h3>Código QR</h3>
            <p>Genera QR para tus obras</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🌐</span>
            <h3>Compartir</h3>
            <p>Comparte tus obras fácilmente</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
