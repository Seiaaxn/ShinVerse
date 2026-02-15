import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import TerbaruPage from './Pages/TerbaruPage'
import TrendingPage from './Pages/TrendingPage'
import PustakaPage from './Pages/PustakaPage'
import UnlimitedPage from './Pages/UnlimitedPage'
import DetailComic from './Pages/page-detail'
import ReadComic from './Pages/read-comic'
import StatisticsPage from './Pages/StatisticsPage'
import HistoryPage from './Pages/HistoryPage'
import { usePageTracking } from './hooks/usePageTracking' // Pastikan import sesuai path

function AppContent() {
  // Tracking otomatis setiap kali URL berubah
  usePageTracking()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terbaru" element={<TerbaruPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/pustaka" element={<PustakaPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/unlimited" element={<UnlimitedPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/detail-comic/:slug" element={<DetailComic />} />
          <Route path="/read-comic/:slug/:chapterSlug" element={<ReadComic />} />
          
          {/* Fallback 404 - Opsional */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-[60vh] text-center">
              <div>
                <h1 className="text-4xl font-black text-blue-600">404</h1>
                <p className="text-gray-500">Halaman tidak ditemukan.</p>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
