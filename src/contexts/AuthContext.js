import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		// Check authentication status on initial load
		const user = authService.getCurrentUser();
		const isAuth = authService.isAuthenticated();
		
		// Only set the current user if we have both user data and a valid token
		if (user && isAuth) {
			setCurrentUser(user);
		}
		setLoading(false);
	}, []);

	const login = async (email, password) => {
		const data = await authService.login(email, password);
		setCurrentUser(data.user);
		return data;
	};

	const logout = () => {
		authService.logout();
		setCurrentUser(null);
		navigate("/signin");
	};

	const value = {
		currentUser,
		isAuthenticated: authService.isAuthenticated(),
		login,
		logout,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
