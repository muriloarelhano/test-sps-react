export function getUserTypeLabel(type) {
	switch (type) {
		case "admin":
			return "Administrador";
		case "user":
			return "Usuário";
		default:
			return "Desconhecido";
	}
}

export function mapErrorsToString(error) {
	if (!error) return "";

	if (Array.isArray(error?.errors)) {
		return error.errors.map((error) => error?.message || "").join(", ");
	}

	return error.message;
}
