/** @type {import('next').NextConfig} */
const imageStoragePattern = process.env.NEXT_IMAGE_REMOTE_BASE_URL
    ? (() => {
        const imageStorageUrl = new URL(process.env.NEXT_IMAGE_REMOTE_BASE_URL);
        if (!['http:', 'https:'].includes(imageStorageUrl.protocol) || imageStorageUrl.search || imageStorageUrl.hash) {
            throw new Error('NEXT_IMAGE_REMOTE_BASE_URL must be an HTTP(S) URL without a query or fragment.');
        }
        return {
            protocol: imageStorageUrl.protocol.slice(0, -1),
            hostname: imageStorageUrl.hostname,
            ...(imageStorageUrl.port ? { port: imageStorageUrl.port } : {}),
            pathname: `${imageStorageUrl.pathname.replace(/\/+$/, '')}/**`,
        };
    })()
    : null;

const nextConfig = {
    output: "export",
    images: {
        remotePatterns: [
            ...(imageStoragePattern ? [imageStoragePattern] : []),
            {
                protocol: 'https',
                hostname: 'ciamaritima.vtexassets.com',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'iguana-jeriapi.onrender.com',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'iguana-jeriapi.onrender.com',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**',
            },
            {
                // also allow 127.0.0.1 in case some services use the loopback IP
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
