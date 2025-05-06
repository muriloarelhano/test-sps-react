import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<MantineProvider>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
);
