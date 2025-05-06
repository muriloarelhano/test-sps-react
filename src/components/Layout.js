import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { Header } from "./Header";

function Layout() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}

export default Layout;