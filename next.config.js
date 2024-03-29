/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost','res.cloudinary.com'],
  },
  env:{
    GOOGLE_MAP_KEY:process.env.GOOGLE_MAP_KEY,
    REACT_APP_ACCESS_TOKEN:process.env.REACT_APP_ACCESS_TOKEN,
    LOCAL_BACKEND_URL:process.env.LOCAL_BACKEND_URL,
    REMOTE_BACKEND_URL:process.env.REMOTE_BACKEND_URL,
    USER_INFO:process.env.USER_INFO,
    DEFAULT_API:process.env.DEFAULT_API
  }
}

module.exports = nextConfig
