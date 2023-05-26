import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavbarApp from "../components/navbar";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <>
      <NavbarApp />
      <Outlet />
      <Footer />
    </>
  );
}
export default RootLayout;
