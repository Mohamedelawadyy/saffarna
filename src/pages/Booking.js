import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Flights from "../components/Flights";
import "./booking.css";

export default function Booking() {
  const username = JSON.parse(sessionStorage.getItem("username"));
  const [userReq, setUserReq] = useState([]);
  const [data, setData] = useState([]);

  const [companyFilter, setCompanyFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const filteredFlightsByDateFrom = data.filter((flight) => {
    const filterfromDate = userReq.fromDate;
    const dateMatch = flight.departureTime.includes(filterfromDate);
    return dateMatch;
  });

  function handleCompanyFilterChange(event) {
    setCompanyFilter(event.target.value);
  }

  function handlePriceFilterChange(event) {
    setPriceFilter(event.target.value);
  }

  const filteredFlightsCompany = data.filter((flight) => {
    const companyMatch = flight.company
      .toLowerCase()
      .includes(companyFilter.toLowerCase());

    return companyMatch;
  });
  const filteredFlightsPrice = data.filter((flight) => {
    const priceMatch = flight.price
      .toLowerCase()
      .includes(priceFilter.toLowerCase());
    return priceMatch;
  });

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:9000/users/${username}`)
        .then((response) => {
          setUserReq(response.data.req);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:9000/flights")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userReq]);

  const handleRemoveReq = () => {
    setUserReq("");
    const req = { req: "" };
    axios
      .patch(`http://localhost:9000/users/${username}`, req)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="booking-section">
      <Container>
        <Row>
          <Col>
            <div className="w-100 text-center p-4">
              <input
                type="text"
                placeholder="Filter by company:"
                id="companyFilter"
                value={companyFilter}
                onChange={handleCompanyFilterChange}
              />

              <input
                type="number"
                placeholder="Filter by price:"
                id="priceFilter"
                value={priceFilter}
                onChange={handlePriceFilterChange}
              />
              {userReq ? (
                <Button
                  className="d-block m-auto mt-3"
                  onClick={handleRemoveReq}
                >
                  SHow All
                </Button>
              ) : null}
            </div>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>departure Time</th>
                  <th>arrivalTime</th>
                  <th>destination From</th>
                  <th>destination To</th>
                  <th>Price</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {userReq ? (
                  <>
                    <Flights data={filteredFlightsByDateFrom} />
                  </>
                ) : companyFilter.length !== 0 ? (
                  <Flights data={filteredFlightsCompany} />
                ) : (
                  <Flights data={filteredFlightsPrice} />
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
