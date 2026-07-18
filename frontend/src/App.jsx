import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import ArtistPage from './pages/ArtistPage'
import GalleryPage from './pages/GalleryPage'
import ImageDetailPage from './pages/ImageDetailPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/image/:filename" element={<ImageDetailPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
