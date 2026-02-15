import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// FontAwesome Setup
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft, faChevronLeft, faChevronRight, faHome, faBookOpen,
  faExpand, faPlay, faClock, faFire, faStar, faNewspaper,
  faChartLine, faSun, faMoon, faHistory, faTrash, faInfinity, faBolt
} from '@fortawesome/free-solid-svg-icons';

// Inisialisasi Library Ikon (Agar bisa digunakan di seluruh aplikasi via string name)
library.add(
  faArrowLeft, faChevronLeft, faChevronRight, faHome, faBookOpen,
  faExpand, faPlay, faClock, faFire, faStar, faNewspaper,
  faChartLine, faSun, faMoon, faHistory, faTrash, faInfinity, faBolt
);

// Performance Monitoring
// Kita mematikan di production agar tidak membebani console user, 
// tapi tetap bisa diaktifkan jika Anda ingin debug di production.
if (import.meta.env.DEV) {
  import('./utils/performanceMonitor.js')
    .then(({ measureWebVitals }) => {
      measureWebVitals();
    })
    .catch(err => console.error('Gagal memuat Performance Monitor:', err));
}

// Render Aplikasi
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
