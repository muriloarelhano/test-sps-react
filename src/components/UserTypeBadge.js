import { Badge } from "@mantine/core";
import { useAuth } from "../contexts/AuthContext";

export function UserTypeBadge() {
	const { currentUser } = useAuth();

	const userTypeData = {
		admin: { color: "red", label: "Administrador" },
		user: { color: "blue", label: "Usuário" },
	};

	const { color, label } = userTypeData[currentUser.type] || {
		color: "gray",
		label: "Desconhecido",
	};

	return (
		<Badge size="xs" color={color} variant="outline">
			{label}
		</Badge>
	);
}
