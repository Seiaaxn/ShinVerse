import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faFire, faBookOpen, faChartLine, faHistory, faInfinity } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: 'Home', path: '/', icon: faHome },
        { name: 'Terbaru', path: '/terbaru', icon: faNewspaper },
        { name: 'Trending', path: '/trending', icon: faFire },
        { name: 'Pustaka', path: '/pustaka', icon: faBookOpen },
        { name: 'Unlimited', path: '/unlimited', icon: faInfinity },
        { name: 'Statistics', path: '/statistics', icon: faChartLine },
        { name: 'History', path: '/history', icon: faHistory },
    ].filter(link => {
        const isProduction = import.meta.env.PROD; 
        if (isProduction && link.path === '/statistics') return false;
        return true; 
    });

    const isActive = (path) => location.pathname === path

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo Area */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                            ShinVerse
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                                    relative px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group
                                    ${isActive(link.path)
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                    }
                                `}
                            >
                                <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={link.icon} className={`text-sm ${isActive(link.path) ? 'scale-110' : 'opacity-70 group-hover:opacity-100'}`} />
                                    {link.name}
                                </span>
                                {isActive(link.path) && (
                                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Actions Area */}
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block">
                             <ThemeToggle />
                        </div>
                        
                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center gap-1.5 items-center">
                                <span className={`h-0.5 w-5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`h-0.5 w-5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-2xl animate-in slide-in-from-top-4 duration-300">
                    <div className="px-4 py-4 space-y-2">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Menu Utama</span>
                            <ThemeToggle />
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all
                                    ${isActive(link.path)
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }
                                `}
                            >
                                <FontAwesomeIcon icon={link.icon} className="w-5" />
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
