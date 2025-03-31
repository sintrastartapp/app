import { createRequire } from "module";

const require = createRequire(import.meta.url);
const json = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    version: json.version,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/getting-started",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.youtube.com",
      }, {
        protocol: "https",
        hostname: "**.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "*",
      }
    ],
  },
};

export default nextConfig;
