import React from "react"

import dynamic from "next/dynamic"

const NonSSRWrapper = props => <React.Fragment>{props.children}</React.Fragment>

export const NoSSR = dynamic(() => Promise.resolve(NonSSRWrapper), {
	ssr: false
})
