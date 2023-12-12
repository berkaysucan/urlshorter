/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        siteUrl: process.env.SITE_URL, // pulls from .env file
      },
}

module.exports = nextConfig
