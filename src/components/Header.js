import {
	Button,
	Container,
	Flex,
	Group,
	Paper,
	Text,
	Title,
} from "@mantine/core";
import { LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { UserTypeBadge } from "./UserTypeBadge";

export function Header() {
	const { currentUser, logout, isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return null;
	}

	return (
		<Container size="lg" pt="xl">
			<Paper shadow="sm" p="md" withBorder mb="lg">
				<Group justify="space-between" align="center">
					<div>
						<Title order={2}>SPS REACT TEST</Title>
						{currentUser && (
							<Flex gap={"xs"} align="center">
								<Text size="sm" c="dimmed">
									Bem-vindo, {currentUser.name || currentUser.email}
								</Text>
								<UserTypeBadge />
							</Flex>
						)}
					</div>

					<Button
						color="red"
						variant="light"
						onClick={logout}
						leftSection={<LogOut size={16} />}
					>
						Sair
					</Button>
				</Group>
			</Paper>
		</Container>
	);
}
