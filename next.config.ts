import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https" as const,
                hostname: "tripay.co.id",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig);