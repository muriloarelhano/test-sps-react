import axios from "axios";

class AuthService {
	async login(email, password) {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/login`,
				{
					email,
					password,
				},
			);

			if (response.data.token) {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem(
					"user",
					JSON.stringify({
						...response.data.user,
						token: undefined,
					}),
				);
			}

			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	}

	getToken() {
		return localStorage.getItem("token");
	}

	isAuthenticated() {
		return !!this.getToken();
	}

	getAuthHeader() {
		const token = this.getToken();

		if (token) {
			return { Authorization: `Bearer ${token}` };
		}

		return {};
	}
}

export const authService = new AuthService();
