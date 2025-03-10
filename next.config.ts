import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    loader: 'custom',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 's-maxage=86400',
        },
      ],
    },
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|svg)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024,
        },
      },
    })

    return config
  },
}

export default nextConfig
