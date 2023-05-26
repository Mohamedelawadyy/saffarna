import React, { useEffect } from "react";
import Featuredinfo from "../components/FeaturedInfo";
import Chart from "../components/chart/Chart";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const username = JSON.parse(sessionStorage.getItem("username"));
  const navigate = useNavigate();
  useEffect(() => {
    if (username === null) {
      navigate("/");
    } else if (username && username.toLowerCase().includes("admin")) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <main className="mt-5">
      <Featuredinfo />
      <Chart />
    </main>
  );
}
