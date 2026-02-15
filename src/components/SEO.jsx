import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'ShinVerse - Baca Komik Gratis Bahasa Indonesia Terbaru',
  description = 'Baca komik online gratis di ShinVerse. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!',
  keywords = 'komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia, komik terbaru, komik trending',
  image = 'https://juju-manhwa-2-0.vercel.app/vite.svg',
  url = 'https://juju-manhwa-2-0.vercel.app/',
  type = 'website',
  structuredData = null
}) => {
  const siteTitle = 'ShinVerse';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
