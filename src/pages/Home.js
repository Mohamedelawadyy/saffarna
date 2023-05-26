import React from "react";

import Slider from "../components/slider";
import TabsBooking from "../components/TabsBooking";
import About from "../components/About";
import "../App.css";
import Contact from "../components/contact";
import PopularTourPackage from "../components/PopularTourPackage";

export default function Home() {
  return (
    <main>
      <Slider />
      <TabsBooking />
      <About />
      <PopularTourPackage />
      <Contact />
    </main>
  );
}
