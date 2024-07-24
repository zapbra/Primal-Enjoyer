/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    // experimental: {
    //   workerThreads: false,
    //   cpus: 1,
    // },
};

module.exports = {
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = {fs: false};

        return config;
    },
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    images: {
        domains: [
            "media.graphassets.com",
            "ufiovdgudizxehtjckna.supabase.co",
            "res.cloudinary.com",
            "i.imgur.com",
            "i.ibb.co",
            "ibb.co",
        ],
    },
    experimental: {
        workerThreads: false,
        cpus: 1,
        serverActions: true,
    },
    nextConfig,
};
