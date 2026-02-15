import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // 1. Cek localStorage
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) return savedTheme

        // 2. Cek preferensi sistem
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })

    useEffect(() => {
        const root = window.document.documentElement
        
        // Update localStorage
        localStorage.setItem('theme', theme)
        
        // Update class pada tag <html> untuk Tailwind 'dark:'
        if (theme === 'dark') {
            root.classList.add('dark')
            root.style.colorScheme = 'dark' // Membantu styling scrollbar & form element bawaan
        } else {
            root.classList.remove('dark')
            root.style.colorScheme = 'light'
        }
        
        // Update atribut data-theme jika Anda menggunakan CSS variables tradisional
        root.setAttribute('data-theme', theme)
    }, [theme])

    // Listener untuk mendeteksi perubahan tema OS secara otomatis
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light')
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
