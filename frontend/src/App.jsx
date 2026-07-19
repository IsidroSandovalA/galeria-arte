import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import ArtistPage from './pages/ArtistPage'
import GalleryPage from './pages/GalleryPage'
import ImageDetailPage from './pages/ImageDetailPage'
import LoginPage from './pages/LoginPage'
import { isLoggedIn } from './config/auth'

// Solo el artista con sesión puede entrar; el resto va al login
function RequireArtist({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/artist"
            element={
              <RequireArtist>
                <ArtistPage />
              </RequireArtist>
            }
          />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/image/:filename" element={<ImageDetailPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
