import {
	ActionIcon,
	Alert,
	Button,
	Container,
	Group,
	Loader,
	Modal,
	Paper,
	Table,
	Text,
	Title,
} from "@mantine/core";
import { AlertCircle, PenSquare, PlusCircle, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../components/GoBackButton";
import { userService } from "../services/UserService";
import { getUserTypeLabel } from "../utils/utils";
import { useApiErrors } from "../hooks/useApiErrors";

function Users() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const { errors, setApiError, clearApiErrors } = useApiErrors();
	const [userToDelete, setUserToDelete] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const data = await userService.list();
				setUsers(data);
				clearApiErrors();
			} catch (error) {
				console.error("Error fetching users:", error);
				setApiError(
					error.response?.data?.message ||
						"Falha ao carregar a lista de usuários.",
					error,
				);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const handleDeleteClick = (user) => {
		setUserToDelete(user);
		setDeleteModalOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!userToDelete) return;

		try {
			await userService.delete(userToDelete.id);
			setUsers(users.filter((user) => user.id !== userToDelete.id));
			setDeleteModalOpen(false);
			setUserToDelete(null);
		} catch (error) {
			console.error("Error deleting user:", error);
			setApiError(
				error.response?.data?.message || "Falha ao excluir o usuário.",
				error,
			);
		}
		setDeleteModalOpen(false);
	};

	return (
		<Container size="lg" py="xl">
			<Paper shadow="xs" p="md" withBorder>
				<Group justify="space-between" mb="md">
					<Title order={2}>Usuários</Title>
					<Group>
						<GoBackButton />

						<Button
							leftSection={<PlusCircle size={14} />}
							onClick={() => navigate("/users/new")}
						>
							Novo Usuário
						</Button>
					</Group>
				</Group>

				{errors && (
					<Alert
						icon={<AlertCircle size={16} />}
						title="Erro"
						color="red"
						mb="md"
					>
						{errors?.message || "Erro ao carregar os dados."}
					</Alert>
				)}

				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							padding: "2rem",
						}}
					>
						<Loader />
					</div>
				) : users.length === 0 ? (
					<Text c="dimmed" ta="center" py="xl">
						Nenhum usuário cadastrado.
					</Text>
				) : (
					<Table highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>ID</Table.Th>
								<Table.Th>Nome</Table.Th>
								<Table.Th>Email</Table.Th>
								<Table.Th>Tipo</Table.Th>
								<Table.Th style={{ width: "120px" }}>Ações</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{users.map((user) => (
								<Table.Tr key={user.id}>
									<Table.Td>{user.id}</Table.Td>
									<Table.Td>{user.name}</Table.Td>
									<Table.Td>{user.email}</Table.Td>
									<Table.Td>{getUserTypeLabel(user.type)}</Table.Td>
									<Table.Td>
										<Group gap={8}>
											<ActionIcon
												variant="light"
												color="blue"
												onClick={() => navigate(`/users/${user.id}`)}
											>
												<PenSquare size={16} />
											</ActionIcon>
											<ActionIcon
												variant="light"
												color="red"
												onClick={() => handleDeleteClick(user)}
											>
												<Trash2 size={16} />
											</ActionIcon>
										</Group>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				)}
			</Paper>

			<Modal
				opened={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				title="Confirmar exclusão"
				centered
			>
				<Text size="sm">
					Tem certeza que deseja excluir o usuário
					<Text span fw={500}>
						{" "}
						{userToDelete?.name}
					</Text>
					?
				</Text>
				<Group justify="flex-end" mt="md">
					<Button variant="default" onClick={() => setDeleteModalOpen(false)}>
						Cancelar
					</Button>
					<Button color="red" onClick={handleDeleteConfirm}>
						Excluir
					</Button>
				</Group>
			</Modal>
		</Container>
	);
}

export default Users;
