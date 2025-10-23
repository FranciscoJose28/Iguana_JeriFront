/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ciamaritima.vtexassets.com',
            },
        ],
    },
};

export default nextConfig;
