import { useEffect } from "react"

import { useFormikContext } from "formik"

import { useDebounce } from "../../../hooks"

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
