// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: [
		"@scientisst/sense",
		"@scientisst/chakra-ui",
		"@scientisst/react-ui",
		"esptool-js"
	]
}

module.exports = nextConfig
