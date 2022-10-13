const joinClassNames = (...classNames: string[]) => {
	return classNames.filter(Boolean).join(" ")
}

export default joinClassNames
