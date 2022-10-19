// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	images: {
		unoptimized: true
	}
}

module.exports = nextConfig
