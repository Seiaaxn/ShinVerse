import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCompass } from '@fortawesome/free-solid-svg-icons'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import CardUnlimitedComic from '../components/Home/CardUnlimitedComic'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <>
      <SEO
        title="ShinVerse - Baca Komik Gratis Bahasa Indonesia Terbaru"
        description="Baca komik online gratis di ShinVerse. Koleksi lengkap manga, manhwa, dan manhua terbaru dalam bahasa Indonesia. Update setiap hari!"
        keywords="komik indonesia, baca komik gratis, manga indo, manhwa indonesia, shinverse"
        url="https://shinverse.app/"
      />
      
      <div className="relative bg-gray-50 dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
        
        {/* Background Decorative Elements (ShinVerse Blue-Cyan Theme) */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-[80px]"></div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10">
          
          {/* 1. Hero & Search Section */}
          <section className="pt-6 md:pt-10">
            <SearchComic />
          </section>

          {/* 2. Trending Section (Biasanya ditaruh atas untuk menarik perhatian) */}
          <section className="py-4">
            <CardTrendingComic />
          </section>

          {/* 3. Terbaru Section */}
          <section className="py-4">
            <CardTerbaruComic />
          </section>

          {/* 4. Unlimited Collection (Pink-Rose Accent as a Special Collection) */}
          <section className="py-4">
            <CardUnlimitedComic />
          </section>

          {/* 5. Explorer / Quick Links Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="relative group">
              {/* Card Container */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-12 overflow-hidden text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    <FontAwesomeIcon icon={faCompass} className="text-4xl text-white" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                    Masih Kurang? <br />
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      Jelajahi Seluruh Pustaka
                    </span>
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                    Temukan ribuan judul komik dari berbagai genre. Petualangan tanpa batas menantimu di pustaka lengkap kami.
                  </p>
                  
                  <Link
                    to="/pustaka"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all active:scale-95"
                  >
                    <FontAwesomeIcon icon={faBookOpen} />
                    Buka Pustaka
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <footer className="mt-10 pb-12 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                    ShinVerse
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
                    Platform baca komik online terlengkap dengan pengalaman membaca yang bersih dan modern.
                  </p>
                </div>
                
                <div className="text-center md:text-right">
                  <div className="flex justify-center md:justify-end gap-6 mb-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                    <Link to="/" className="hover:text-blue-500">Home</Link>
                    <Link to="/pustaka" className="hover:text-blue-500">Pustaka</Link>
                    <Link to="/history" className="hover:text-blue-500">Riwayat</Link>
                  </div>
                  <p className="text-gray-400 dark:text-gray-600 text-xs">
                    &copy; 2026 ShinVerse. Dibuat dengan dedikasi untuk pembaca.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Home
