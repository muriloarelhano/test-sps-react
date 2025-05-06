import {
	Alert,
	Button,
	Container,
	Divider,
	Group,
	LoadingOverlay,
	Paper,
	PasswordInput,
	Select,
	Stack,
	TextInput,
	Title,
} from "@mantine/core";
import { AlertCircle, ArrowLeft, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useApiErrors } from "../hooks/useApiErrors";
import { userService } from "../services/UserService";
import { mapErrorsToString } from "../utils/utils";
import { notifications } from "@mantine/notifications";

function UserEdit() {
	const { userId } = useParams();
	const isNewUser = userId === "new";
	const navigate = useNavigate();

	const [loading, setLoading] = useState(!isNewUser);
	const [saving, setSaving] = useState(false);
	const { errors, setApiError, clearApiErrors } = useApiErrors();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors: formErrors },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			type: "user",
			password: "",
		},
	});

	useEffect(() => {
		(async () => {
			if (!isNewUser) {
				try {
					setLoading(true);
					const userData = await userService.get(userId);

					reset({
						name: userData.name,
						email: userData.email,
						type: userData.type || "user",
						password: "",
					});
				} catch (error) {
					console.error("Error fetching user:", error);
					setApiError(
						error.response?.data?.message ||
							"Não foi possível carregar os dados do usuário.",
						error,
					);
				} finally {
					setLoading(false);
				}
			}
		})();
	}, [userId, isNewUser]);

	const onSubmit = async (data) => {
		try {
			setSaving(true);

			if (isNewUser) {
				await userService.create(data);
			} else {
				await userService.update(userId, data);
			}

			notifications.show({
				message: "Usuário salvo com sucesso!",
				color: "green",
				autoClose: 2000,
			});

			navigate("/users");
		} catch (error) {
			console.error("Error saving user:", error);

			setApiError(
				error.response?.data?.message ||
					"Não foi possível salvar os dados do usuário.",
				error,
			);
		} finally {
			setSaving(false);
		}
	};

	return (
		<Container size="md" py="lg">
			<Paper shadow="xs" p="md" pos="relative" withBorder>
				<LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack>
						<Group justify="space-between" mb="md">
							<Title order={2}>
								{isNewUser ? "Novo Usuário" : "Editar Usuário"}
							</Title>
							<Button
								variant="light"
								leftSection={<ArrowLeft size={14} />}
								onClick={() => navigate("/")}
							>
								Voltar para Home
							</Button>
						</Group>

						{errors && (
							<Alert
								icon={<AlertCircle size={16} />}
								title={errors?.message || "Erro"}
								color="red"
								withCloseButton
								onClose={() => clearApiErrors()}
							>
								{errors?.errors ? mapErrorsToString(errors) : ""}
							</Alert>
						)}

						<TextInput
							label="Nome"
							placeholder="Nome do usuário"
							error={formErrors.name?.message}
							{...register("name", {
								required: "O nome é obrigatório",
							})}
						/>

						<TextInput
							label="Email"
							placeholder="email@exemplo.com"
							error={formErrors.email?.message}
							{...register("email", {
								required: "O email é obrigatório",
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: "Email inválido",
								},
							})}
						/>

						<Controller
							name="type"
							control={control}
							rules={{
								required: "O tipo é obrigatório",
							}}
							render={({ field }) => (
								<Select
									label="Tipo"
									placeholder="Selecione o tipo"
									data={[
										{ value: "user", label: "Usuário" },
										{ value: "admin", label: "Administrador" },
									]}
									{...field}
								/>
							)}
						/>

						{isNewUser && (
							<PasswordInput
								label={
									isNewUser
										? "Senha"
										: "Senha (deixe em branco para manter a atual)"
								}
								placeholder="Digite a senha"
								error={formErrors.password?.message}
								{...register("password", {
									required: isNewUser
										? "A senha é obrigatória para novos usuários"
										: false,
								})}
							/>
						)}

						<Divider my="sm" />

						<Group justify="flex-end">
							<Button variant="default" onClick={() => navigate("/users")}>
								Cancelar
							</Button>
							<Button
								type="submit"
								loading={saving}
								leftSection={<Check size={14} />}
							>
								{isNewUser ? "Criar" : "Atualizar"}
							</Button>
						</Group>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}

export default UserEdit;
