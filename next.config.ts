import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para imagens do Sanity
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },

  // Configurações para o Sanity Studio
  transpilePackages: ["sanity"],

  // Headers de segurança (opcional)
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
