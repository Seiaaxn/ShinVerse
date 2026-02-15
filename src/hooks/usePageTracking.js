import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Gunakan fallback URL yang konsisten dengan API utama jika diperlukan
const API_URL = import.meta.env.VITE_API_URL || 'https://backend-comic.antidonasi.web.id';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Kita ambil judul terbaru tepat saat pengiriman agar sinkron dengan perubahan di komponen
        const currentTitle = document.title;

        await axios.post(`${API_URL}/api/track`, {
          pagePath: location.pathname + location.search, // Sertakan query params (?q=...)
          pageTitle: currentTitle,
          referrer: document.referrer,
          screenResolution: `${window.innerWidth}x${window.innerHeight}`,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        // Silently fail di produksi, tampilkan di dev mode jika perlu
        if (import.meta.env.DEV) {
          console.debug('Tracking info:', error.message);
        }
      }
    };

    // Delay 1000ms untuk memastikan React Helmet atau title manual sudah ter-update
    const timer = setTimeout(trackPageView, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]); // Trigger ulang jika path atau query search berubah
};

export default usePageTracking;
