import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.terresdecafe.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
