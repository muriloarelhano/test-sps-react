import axios from "axios";
import { authService } from "../services/AuthService";

export function setupAxiosInterceptors() {
	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response && error.response.status === 401) {
				console.log("Unauthorized access detected, redirecting to login");
				authService.logout();
			}

			return Promise.reject(error);
		},
	);
}
