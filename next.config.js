// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	images: {
		unoptimized: true
	},
	experimental: {
		esmExternals: "loose"
	}
}

module.exports = nextConfig
