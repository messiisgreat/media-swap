/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "unsplash.com" },
      { hostname: "media-swap-image-storage.s3.amazonaws.com" },
      { hostname: "media-swap-image-storage.s3.ap-northeast-1.amazonaws.com" },
      { hostname: "lh3.googleusercontent.com" },
      // デバッグ用のサンプル画像ジェネレーター
      { hostname: "picsum.photos" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

module.exports = nextConfig;
