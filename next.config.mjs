/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://eaut-blog.vercel.app"},
          { key: "Access-Control-Allow-Origin", value: "*"},
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "krkztdl9g4rhvs2w.public.blob.vercel-storage.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "firebasestorage.googleapis.com"
      }
    ],
  },
};

export default nextConfig;
