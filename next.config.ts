import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "arthurmartinhome.fr",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
