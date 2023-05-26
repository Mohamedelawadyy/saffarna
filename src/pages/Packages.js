import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./packages.css";
import { useDispatch } from "react-redux";
import { fetchBooking } from "../rtk/slices/booking-slice";
import Aos from "aos";
import "aos/dist/aos.css";
import PackageCard from "../components/PackageCard";

export default function Packages() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooking());
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9000/package")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [countryFilter, setCountryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  function handleCompanyFilterChange(event) {
    setCountryFilter(event.target.value);
  }

  function handlePriceFilterChange(event) {
    setPriceFilter(event.target.value);
  }

  const filteredPackagesCountry = data.filter((packages) => {
    const countryMatch = packages.country
      .toLowerCase()
      .includes(countryFilter.toLowerCase());
    return countryMatch;
  });
  const filteredPackagesPrice = data.filter((item) => {
    const priceMatch = item.price.toString().includes(priceFilter);
    console.log(priceMatch);
    return priceMatch;
  });

  return (
    <section className="packages">
      <header>
        <h1 className="title-section text-center mb-5 pb-5 pt-5">Packages</h1>
      </header>
      <Container className="mt-3">
        <Row>
          <div className="w-100 text-center p-4">
            <input
              type="text"
              placeholder="Filter by company:"
              id="companyFilter"
              value={countryFilter}
              onChange={handleCompanyFilterChange}
            />

            <input
              type="text"
              placeholder="Filter by price:"
              id="priceFilter"
              value={priceFilter}
              onChange={handlePriceFilterChange}
            />
          </div>
          {countryFilter.length !== 0 ? (
            <PackageCard data={filteredPackagesCountry} />
          ) : (
            <PackageCard data={filteredPackagesPrice} />
          )}
        </Row>
      </Container>
    </section>
  );
}
