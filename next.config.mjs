/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    /*
     * I PNG sorgente restano lossless, mentre Next/Image consegna varianti
     * WebP ridimensionate. Una TTL esplicita evita di riconvalidare a ogni
     * visita immagini che non cambiano durante il deploy.
     */
    formats: ["image/webp"],
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
