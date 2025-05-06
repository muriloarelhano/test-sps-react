import {
	Box,
	Button,
	Container,
	Flex,
	Group,
	Paper,
	SimpleGrid,
	Text,
	ThemeIcon,
	Title,
	rem,
} from "@mantine/core";
import { LogOut, UserPlus, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserTypeBadge } from "../components/UserTypeBadge";

const features = [
	{
		icon: UserPlus,
		title: "Novo Usuário",
		description: "Cadastre novos usuários no sistema.",
		link: "/users/new",
	},
	{
		icon: Users,
		title: "Gerenciar Usuários",
		description: "Visualize, edite e exclua usuários cadastrados no sistema.",
		link: "/users",
	},
];

function Home() {
	const { currentUser, logout } = useAuth();

	return (
		<Container size="lg" py="xl">
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

			<SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
				{features.map((feature) => (
					<Paper
						key={feature.title}
						withBorder
						p="md"
						radius="md"
						component={Link}
						to={feature.link}
						style={{ textDecoration: "none", color: "inherit" }}
					>
						<Group wrap="nowrap">
							<ThemeIcon size={70} radius="md" variant="light">
								<feature.icon style={{ width: rem(30), height: rem(30) }} />
							</ThemeIcon>

							<div>
								<Text fw={700} size="lg" mt="xs">
									{feature.title}
								</Text>
								<Text c="dimmed" size="sm">
									{feature.description}
								</Text>
							</div>
						</Group>
					</Paper>
				))}
			</SimpleGrid>
		</Container>
	);
}

export default Home;
