import {
	Alert,
	Button,
	Container,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SignIn() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
		setError("");
		setLoading(true);

		try {
			await login(data.email, data.password);
			navigate("/");
		} catch (error) {
			setError(
				error.response?.data?.message ||
					"Falha ao fazer login. Verifique suas credenciais.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container size={420} my={40}>
			<Title ta="center">Bem-vindo!</Title>
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Digite seu e-mail e senha para acessar o sistema
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack>
						{error && (
							<Alert icon={<AlertCircle size={16} />} title="Erro" color="red">
								{error}
							</Alert>
						)}
						<TextInput
							label="Email"
							placeholder="seu@email.com"
							error={errors.email?.message}
							{...register("email", {
								required: "Email é obrigatório",
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: "Email inválido",
								},
							})}
						/>

						<PasswordInput
							label="Senha"
							placeholder="Sua senha"
							error={errors.password?.message}
							{...register("password", {
								required: "Senha é obrigatória",
							})}
						/>
					</Stack>

					<Button fullWidth mt="xl" type="submit" loading={loading}>
						Entrar
					</Button>
				</form>
			</Paper>
		</Container>
	);
}

export default SignIn;
