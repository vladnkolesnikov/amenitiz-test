import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://images.chesscomfiles.com/uploads/v1/user/**'),
    ],
  },
}

export default nextConfig
