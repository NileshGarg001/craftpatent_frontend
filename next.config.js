/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://craftpatent-176187988301.us-central1.run.app'
  }
}

module.exports = nextConfig
