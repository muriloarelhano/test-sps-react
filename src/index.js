import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import router from "./routes";
import { Notifications } from "@mantine/notifications";
import { setupAxiosInterceptors } from "./utils/axiosInterceptors";

setupAxiosInterceptors();

const theme = createTheme({
	primaryColor: "blue",
	defaultRadius: "md",
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<MantineProvider theme={theme}>
			<Notifications />
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
);
