import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchComic = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([])
            setError(null)
            return
        }

        setLoading(true)
        setError(null)

        const debounceTimer = setTimeout(async () => {
            try {
                const response = await axios.get(`https://www.sankavollerei.com/comic/search?q=${encodeURIComponent(searchQuery)}`)
                
                const rawData = response.data.data || []
                const processedResults = rawData.map(comic => {
                    const slug = comic.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '')

                    return {
                        ...comic,
                        processedLink: comic.href,
                        slug: slug
                    }
                })

                setSearchResults(processedResults)
            } catch (err) {
                setError('Gagal mencari komik. Silakan coba lagi.')
            } finally {
                setLoading(false)
            }
        }, 500)

        return () => clearTimeout(debounceTimer)
    }, [searchQuery])

    const handleComicDetail = (comic) => {
        // Menangani ekstraksi slug link dengan lebih bersih
        const linkParts = comic.href.split('/').filter(Boolean)
        const cleanLink = linkParts[linkParts.length - 1]
        
        navigate(`/detail-comic/${comic.slug}`, {
            state: {
                comic: {
                    title: comic.title,
                    image: comic.thumbnail,
                    chapter: comic.description || 'Chapter Terbaru',
                    source: comic.type || 'Manga',
                    link: comic.href,
                    popularity: comic.genre || '-'
                },
                processedLink: cleanLink
            }
        })
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 py-10">
            {/* Hero Search Section */}
            <div className="relative mb-10">
                {/* Glow Background Effect */}
                <div className="absolute inset-x-0 -top-20 h-64 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-blue-400/10 blur-[100px] -z-10"></div>

                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent mb-4">
                        ShinVerse
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Cari manga, manhwa, dan manhua favoritmu</p>
                </div>

                {/* Modern Search Box */}
                <div className="relative max-w-2xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-300"></div>
                        <div className="relative flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
                            <div className="pl-5">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Masukkan judul komik..."
                                className="flex-1 px-4 py-4 md:py-5 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-base md:text-lg font-medium"
                            />
                            
                            {loading && (
                                <div className="pr-5">
                                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            
                            {searchQuery && !loading && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="pr-5 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Error UI */}
            {error && (
                <div className="max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-top-2">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-600 dark:text-red-400 text-center font-medium">
                        {error}
                    </div>
                </div>
            )}

            {/* Results Grid */}
            {searchResults.length > 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Hasil Pencarian
                            <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                                {searchResults.length}
                            </span>
                        </h2>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {searchResults.map((comic, index) => (
                            <div
                                key={comic.title + index}
                                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5"
                            >
                                <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
                                    <img
                                        src={comic.thumbnail}
                                        alt={comic.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Cover' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                        {comic.type}
                                    </div>
                                </div>

                                <div className="p-3 md:p-4">
                                    <h3 className="font-bold text-xs md:text-sm line-clamp-2 mb-1 text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors h-10 overflow-hidden">
                                        {comic.title}
                                    </h3>
                                    <p className="text-[10px] md:text-xs text-blue-500 dark:text-cyan-400 font-medium mb-3 truncate">
                                        {comic.genre || 'Action, Fantasy'}
                                    </p>
                                    <button
                                        onClick={() => handleComicDetail(comic)}
                                        className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-gray-900 dark:text-gray-100 py-2 rounded-lg transition-all duration-300 text-xs font-bold flex items-center justify-center gap-2"
                                    >
                                        Detail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchComic
