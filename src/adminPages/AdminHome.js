import React from "react";
import Featuredinfo from "../components/FeaturedInfo";
import Chart from "../components/chart/Chart";

export default function AdminHome() {
  return (
    <main className="mt-5">
      <Featuredinfo />
      <Chart />
    </main>
  );
}
