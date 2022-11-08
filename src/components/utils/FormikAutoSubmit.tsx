import { useEffect } from "react"

import { useDebounce } from "@scientisst/react-ui/hooks"
import { useFormikContext } from "formik"

export interface FormikAutoSubmitProps {
	delay: number
}

const FormikAutoSubmit: React.FC<FormikAutoSubmitProps> = ({ delay }) => {
	const { values, submitForm } = useFormikContext()
	const debouncedValues = useDebounce(values, delay)

	useEffect(() => {
		submitForm()
	}, [debouncedValues, submitForm])

	return <></>
}

export default FormikAutoSubmit
