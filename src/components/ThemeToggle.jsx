import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="group relative p-2.5 rounded-xl transition-all duration-300 
                       bg-gray-100 dark:bg-gray-800 
                       hover:ring-2 hover:ring-blue-500/50 dark:hover:ring-cyan-500/50
                       active:scale-90 shadow-sm"
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Sun Icon (Light Mode) */}
                <FontAwesomeIcon
                    icon={faSun}
                    className={`absolute transition-all duration-500 transform ${
                        theme === 'light'
                            ? 'opacity-100 rotate-0 scale-100 text-yellow-500'
                            : 'opacity-0 rotate-180 scale-0 text-gray-400'
                    }`}
                />
                
                {/* Moon Icon (Dark Mode) */}
                <FontAwesomeIcon
                    icon={faMoon}
                    className={`absolute transition-all duration-500 transform ${
                        theme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100 text-cyan-400'
                            : 'opacity-0 -rotate-180 scale-0 text-gray-500'
                    }`}
                />
            </div>

            {/* Subtle Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        </button>
    )
}

export default ThemeToggle
