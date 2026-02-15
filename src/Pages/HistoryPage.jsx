import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHistory, faPlay, faClock } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/SEO'

const HistoryPage = () => {
    const [historyList, setHistoryList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadHistory()
    }, [])

    const loadHistory = () => {
        try {
            const storedHistory = localStorage.getItem('comicHistory')
            if (storedHistory) {
                const parsedHistory = JSON.parse(storedHistory)
                const sortedHistory = Object.entries(parsedHistory)
                    .map(([slug, data]) => ({ slug, ...data }))
                    .sort((a, b) => new Date(b.readDate) - new Date(a.readDate))
                
                setHistoryList(sortedHistory)
            }
        } catch (e) {
            console.error("Gagal memuat riwayat", e)
        }
    }

    const clearHistory = () => {
        if (window.confirm('Hapus semua riwayat bacaan Anda?')) {
            localStorage.removeItem('comicHistory')
            setHistoryList([])
        }
    }

    const handleComicClick = (item) => {
        navigate(`/detail-comic/${item.slug}`, {
            state: item.comicDataForDetail
        })
    }

    const handleContinueReading = (e, item) => {
        e.stopPropagation() 
        navigate(`/read-comic/${item.slug}/${item.lastChapterSlug}`, {
            state: {
                chapterLink: item.lastChapterLink,
                comicTitle: item.title,
                chapterNumber: item.lastChapter,
                comicDetailState: item.comicDataForDetail
            }
        })
    }

    return (
        <>
            <SEO
                title="Riwayat Bacaan - ShinVerse"
                description="Lanjutkan petualangan membaca komik Anda di ShinVerse."
                url="https://shinverse.app/history"
            />
            
            <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300 py-12">
                {/* Decorative Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/20">
                                <FontAwesomeIcon icon={faHistory} className="text-white text-xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Riwayat Bacaan
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    {historyList.length} Komik tersimpan di perangkat ini
                                </p>
                            </div>
                        </div>
                        
                        {historyList.length > 0 && (
                            <button
                                onClick={clearHistory}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-red-500 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm font-bold shadow-sm"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                Bersihkan Semua
                            </button>
                        )}
                    </div>

                    {/* Content Section */}
                    {historyList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[450px] bg-white dark:bg-gray-800/40 backdrop-blur-md rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-6">
                                <FontAwesomeIcon icon={faClock} className="text-4xl text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Jejak Bacaan Kosong</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
                                Sepertinya Anda belum mulai membaca komik apapun. Ayo temukan cerita seru sekarang!
                            </p>
                            <button 
                                onClick={() => navigate('/')}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
                            >
                                Jelajahi Komik
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {historyList.map((item, index) => (
                                <div
                                    key={`${item.slug}-${index}`}
                                    onClick={() => handleComicClick(item)}
                                    className="group relative bg-white dark:bg-gray-800/60 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer flex h-44"
                                >
                                    {/* Thumbnail - Anti Gepeng */}
                                    <div className="w-28 h-full flex-shrink-0 relative overflow-hidden bg-gray-200 dark:bg-gray-900">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150x225?text=No+Cover' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                                    </div>

                                    {/* Info Content */}
                                    <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
                                        <div className="relative">
                                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm md:text-base leading-tight">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-2">
                                                <span className="text-blue-500">Chapter {item.lastChapter}</span>
                                                <span>•</span>
                                                <span>{new Date(item.readDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => handleContinueReading(e, item)}
                                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-md active:scale-95"
                                        >
                                            <FontAwesomeIcon icon={faPlay} className="text-[10px]" />
                                            LANJUT BACA
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default HistoryPage
