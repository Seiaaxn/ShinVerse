import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlay, faBookOpen, faClock, faStar, faFire } from '@fortawesome/free-solid-svg-icons'
import SkeletonLoader from '../SkeletonLoader'

const DetailComic = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const location = useLocation()
    const { comic, processedLink } = location.state || {}
    const [comicDetail, setComicDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [history, setHistory] = useState(null)
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        const fetchComicDetail = async () => {
            try {
                const cleanProcessedLink = processedLink?.startsWith('/') ? processedLink.substring(1) : processedLink
                const response = await axios.get(`https://www.sankavollerei.com/comic/comic/${cleanProcessedLink}`)

                if (!response.data) throw new Error('Data tidak ditemukan')

                setComicDetail(response.data)
                setLoading(false)
            } catch (err) {
                console.error("Error fetching detail:", err)
                setError(err.message || 'Gagal mengambil data')
                setLoading(false)
            }
        }

        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('https://www.sankavollerei.com/comic/recommendations');
                const processed = response.data.recommendations.map(item => ({
                    ...item,
                    slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
                    processedLink: item.link.replace('/manga/', '').replace('/detail-komik/', ''),
                    image: item.image.includes('lazy.jpg') ? 'https://via.placeholder.com/300x450?text=No+Cover' : item.image,
                }));
                setRecommendations(processed.filter(r => r.slug !== slug).slice(0, 6));
            } catch (err) {
                console.error("Error recommendations:", err);
            }
        };

        if (processedLink) fetchComicDetail()
        fetchRecommendations();

        const historyData = JSON.parse(localStorage.getItem('comicHistory'))
        if (historyData && historyData[slug]) setHistory(historyData[slug])
        
    }, [processedLink, slug])

    const handleReadComic = (chapterData = null) => {
        let chapterToRead = chapterData || (comicDetail?.chapters?.[0]);
        if (!chapterToRead) return;
        
        navigate(`/read-comic/${slug}/chapter-${chapterToRead.chapter}`, { 
            state: { 
                chapterLink: chapterToRead.link,
                comicTitle: comic.title,
                chapterNumber: chapterToRead.chapter,
                comicDetailState: { comic, processedLink }, 
            } 
        })
    }

    const handleRecommendationDetail = (item) => {
        navigate(`/detail-comic/${item.slug}`, { 
            state: { 
                comic: { ...item, source: item.reason || 'Recommended' },
                processedLink: item.processedLink
            } 
        });
        window.scrollTo(0, 0);
    }

    if (loading) return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
            <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-3xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                    <div className="h-60 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                </div>
                <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pb-20">
            {/* Hero Section */}
            <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img src={comic.image} alt="" className="w-full h-full object-cover object-top blur-sm scale-110 opacity-30 dark:opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50 dark:via-[#0a0a0a]/50 dark:to-[#0a0a0a]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col md:flex-row items-center md:items-end gap-8 pb-10">
                    {/* Poster Image - Anti Gepeng */}
                    <div className="w-48 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 flex-shrink-0 bg-gray-200">
                        <img src={comic.image} alt={comic.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                                {comic.source || 'Manga'}
                            </span>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">
                                <FontAwesomeIcon icon={faStar} className="mr-1" /> {comic.popularity || 'N/A'}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight drop-shadow-sm">
                            {comic.title}
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button onClick={() => handleReadComic()} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 hover:scale-105 transition-transform flex items-center gap-2">
                                <FontAwesomeIcon icon={faPlay} /> Mulai Baca
                            </button>
                            <button onClick={() => navigate('/')} className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                                <FontAwesomeIcon icon={faHome} /> Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Synopsis */}
                        <section className="bg-white dark:bg-gray-800/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sinopsis</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg italic">
                                "{comicDetail?.synopsis || "Belum ada sinopsis untuk komik ini."}"
                            </p>
                        </section>

                        {/* Continue Reading */}
                        {history && (
                            <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <FontAwesomeIcon icon={faClock} className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Lanjutkan Membaca?</h3>
                                        <p className="text-white/80 text-sm font-medium">Terakhir di Chapter {history.lastChapter}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleReadComic({link: history.lastChapterLink, chapter: history.lastChapter})} className="w-full md:w-auto px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                                    Lanjut Chapter {history.lastChapter}
                                </button>
                            </div>
                        )}

                        {/* Chapters */}
                        <section className="bg-white dark:bg-gray-800/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Daftar Chapter</h2>
                                </div>
                                <span className="text-sm font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                                    {comicDetail?.chapters?.length || 0} Total
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                                {comicDetail?.chapters?.map((ch, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleReadComic(ch)}
                                        className={`p-4 rounded-xl font-bold text-sm transition-all duration-300 border-2 ${
                                            String(ch.chapter) === String(history?.lastChapter)
                                            ? 'bg-blue-600 border-blue-600 text-white scale-105 shadow-lg shadow-blue-500/30'
                                            : 'bg-gray-50 dark:bg-gray-900 border-transparent text-gray-700 dark:text-gray-300 hover:border-blue-500/50 hover:text-blue-600'
                                        }`}
                                    >
                                        Ch. {ch.chapter}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Recommendations */}
                    <aside className="space-y-6">
                        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-6">
                                <FontAwesomeIcon icon={faFire} className="text-orange-500" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rekomendasi</h3>
                            </div>
                            <div className="space-y-4">
                                {recommendations.map((item, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => handleRecommendationDetail(item)}
                                        className="group flex gap-4 p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all cursor-pointer"
                                    >
                                        <div className="w-20 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 shadow-md">
                                            <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1 py-1">
                                            <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                                                {item.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                                                <span className="text-blue-500">{item.chapter}</span>
                                                <span>•</span>
                                                <span className="text-cyan-500">{item.popularity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default DetailComic
