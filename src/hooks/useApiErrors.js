import { useState } from "react";

export function useApiErrors() {
	const [errors, setErrors] = useState(undefined);

	const setApiError = (message, error) => {
		setErrors({
			message,
			errors: Array.isArray(error?.errors) ? error.errors : undefined,
		});
	};

	const clearApiErrors = () => {
		setErrors();
	};

	return {
		errors,
		setApiError,
		clearApiErrors,
	};
}
