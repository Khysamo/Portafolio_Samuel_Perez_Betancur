/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Reemplaza 'Portafolio_Samuel_Perez_Betancur' por el nombre de tu repositorio en GitHub
  basePath: '/Portafolio_Samuel_Perez_Betancur',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
