import axios from "axios";
import { authService } from "./AuthService";

class UserService {
	async me() {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/me`, {
			headers: authService.getAuthHeader(),
		});
		return response.data;
	}

	async list() {
		const response = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/users`,
			{ headers: authService.getAuthHeader() },
		);
		return response.data;
	}

	async get(id) {
		const response = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/users/${id}`,
			{ headers: authService.getAuthHeader() },
		);
		return response.data;
	}

	async create(data) {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/users`,
			data,
			{ headers: authService.getAuthHeader() },
		);
		return response.data;
	}

	async update(id, data) {
		const response = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/users/${id}`,
			data,
			{ headers: authService.getAuthHeader() },
		);
		return response.data;
	}

	async delete(id) {
		const response = await axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/users/${id}`,
			{ headers: authService.getAuthHeader() },
		);
		return response.data;
	}
}

export const userService = new UserService();
