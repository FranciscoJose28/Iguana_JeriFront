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
    output: "standalone",
    images: {
        remotePatterns: [
            ...(imageStoragePattern ? [imageStoragePattern] : []),
            {
                protocol: 'https',
                hostname: 'api.iguanajeri.com.br',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: 'api.iguanajeri.com.br',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'ciamaritima.vtexassets.com',
                pathname: '/**',
            },
            // ... mantenha o resto (onrender, localhost, 127.0.0.1)
        ],
    },
};

export default nextConfig;
