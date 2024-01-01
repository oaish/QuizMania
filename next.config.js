/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/eti/unit_test',
                destination: '/eti',
                permanent: false,
            },
            {
                source: '/man/unit_test',
                destination: '/eti',
                permanent: false,
            },
        ];
    },
}

module.exports = nextConfig
