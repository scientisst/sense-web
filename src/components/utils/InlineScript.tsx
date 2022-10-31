export interface InlineScriptProps {
	code: string
}

const InlineScript: React.FC<InlineScriptProps> = ({ code }) => {
	return <script dangerouslySetInnerHTML={{ __html: code }} />
}

export default InlineScript
