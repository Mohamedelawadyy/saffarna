import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user-booking.css";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserBooking() {
  const username = JSON.parse(sessionStorage.getItem("username"));
  const [data, setData] = useState([]);
  const [packageUser, setPackageUser] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`https://json-server-dbsaffarna.onrender.com/users/${username}`)
        .then((response) => {
          setData(response.data.flight_Booking);
          setPackageUser(response.data.booking_package);
        });
    } catch (error) {
      console.log(error);
    }
  }, [setData]);

  function handleRemoveData(username, data) {
    const bookingFlight = { flight_Booking: data };
    axios
      .patch(
        `https://json-server-dbsaffarna.onrender.com/users/${username}`,
        bookingFlight
      )
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("bookingUser", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRemovePackage(username, data) {
    const bookingpackage = { booking_package: data };
    axios
      .patch(
        `https://json-server-dbsaffarna.onrender.com/users/${username}`,
        bookingpackage
      )
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("packageUser", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteHandlerFlight = (id) => {
    const delData = data.filter((item) => item.id !== id);
    setData(delData);
    if (JSON.parse(sessionStorage.getItem("flightsInSession"))) {
      const flightsInSession = JSON.parse(
        sessionStorage.getItem("flightsInSession")
      );
      const delInSession = flightsInSession.filter((item) => item.id !== id);
      console.log(delInSession);
      sessionStorage.setItem("flightsInSession", JSON.stringify(delInSession));
    }
    sessionStorage.setItem("bookingUser", JSON.stringify(data));
    handleRemoveData(username, delData);
  };

  const deleteHandlerPackages = (id) => {
    const delData = packageUser.filter((item) => item.id !== id);
    setPackageUser(delData);
    if (JSON.parse(sessionStorage.getItem("packageInSession"))) {
      const packageInSession = JSON.parse(
        sessionStorage.getItem("packageInSession")
      );
      const delInSession = packageInSession.filter((item) => item.id !== id);
      console.log(delInSession);
      sessionStorage.setItem("packageInSession", JSON.stringify(delInSession));
    }
    sessionStorage.setItem("packageUser", JSON.stringify(data));
    handleRemovePackage(username, delData);
  };

  const handlePriceFlight = () => {
    let total = data.reduce((acc, item) => {
      acc += item.price * item.quantaty;
      return acc;
    }, 0);
    return <h3>total: $ {total} </h3>;
  };

  const handlePricePackages = () => {
    let total = packageUser.reduce((acc, item) => {
      acc += item.price * item.quantaty;
      return acc;
    }, 0);
    return <h3>total: $ {total} </h3>;
  };

  const handleQuantatyInFlight = (item) => {
    item.quantaty += 1;
    const dataWithNewQty = { flight_Booking: data };
    console.log(data);
    axios
      .patch(
        `https://json-server-dbsaffarna.onrender.com/users/${username}`,
        dataWithNewQty
      )
      .then((response) => {
        setData(response.data.flight_Booking);
        sessionStorage.setItem("bookingUser", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const minusHandlerInFlight = (item) => {
    if (item.quantaty > 1) {
      item.quantaty -= 1;
      console.log(item);
      const dataWithNewQty = { flight_Booking: data };
      console.log(data);
      axios
        .patch(
          `https://json-server-dbsaffarna.onrender.com/users/${username}`,
          dataWithNewQty
        )
        .then((response) => {
          setData(response.data.flight_Booking);
          sessionStorage.setItem("bookingUser", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const minusHandlerInPackage = (item) => {
    if (item.quantaty > 1) {
      item.quantaty -= 1;
      console.log(item);
      const dataWithNewQty = { booking_package: packageUser };
      axios
        .patch(
          `https://json-server-dbsaffarna.onrender.com/users/${username}`,
          dataWithNewQty
        )
        .then((response) => {
          setPackageUser(response.data.booking_package);
          sessionStorage.setItem("bookingUser", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleQuantatyInPackage = (item) => {
    item.quantaty += 1;
    const dataWithNewQty = { booking_package: packageUser };
    axios
      .patch(
        `https://json-server-dbsaffarna.onrender.com/users/${username}`,
        dataWithNewQty
      )
      .then((response) => {
        setPackageUser(response.data.booking_package);
        sessionStorage.setItem("bookingUser", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="user-booking">
      <Container>
        <Row>
          <Col>
            {data.length !== 0 ? (
              <>
                <h1 className="text-center p-3 text-uppercase">
                  {" "}
                  Fligth Board
                </h1>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>Booking Air Line</th>
                      <th>Departure Time</th>
                      <th>arrival Time</th>
                      <th>destination From</th>
                      <th>destination To</th>
                      <th>Price$</th>
                      <th>quantaty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={Math.random()}>
                        <td data-label="company">{item.company}</td>
                        <td data-label="Departure Time">
                          {item.departureTime}
                        </td>
                        <td data-label="arrival Time">{item.arrivalTime}</td>
                        <td data-label="destination From">
                          {item.destinationFrom}
                        </td>
                        <td data-label="destination To">
                          {item.destinationTo}
                        </td>
                        <td data-label="Price$">{item.price}</td>
                        <td data-label="quantaty">
                          <div className="group-btn d-flex fs-5 fw-bold gap-2 align-items-center">
                            <Button
                              onClick={() => handleQuantatyInFlight(item)}
                            >
                              +
                            </Button>
                            {item.quantaty}{" "}
                            <Button onClick={() => minusHandlerInFlight(item)}>
                              -
                            </Button>{" "}
                          </div>
                        </td>
                        <td data-label="Action">
                          <Button
                            variant="danger"
                            onClick={() => deleteHandlerFlight(item.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {handlePriceFlight()}
              </>
            ) : null}

            {packageUser.length !== 0 ? (
              <>
                <h2 className="text-center text-uppercase p-3">your Package</h2>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>country</th>
                      <th>days</th>
                      <th>nights</th>
                      <th>Price$</th>
                      <th>quantaty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageUser.map((item) => (
                      <tr key={Math.random()}>
                        <td data-label="country">{item.country}</td>
                        <td data-label="days">{item.days}</td>
                        <td data-label="nights">{item.nights}</td>
                        <td data-label="Price$">{item.price}</td>
                        <td data-label="quantaty">
                          <div className="group-btn d-flex fs-5 gap-2 fw-bold justify-content-between align-items-center w-100 h-100">
                            <Button
                              onClick={() => handleQuantatyInPackage(item)}
                            >
                              +
                            </Button>
                            {item.quantaty}{" "}
                            <Button onClick={() => minusHandlerInPackage(item)}>
                              -
                            </Button>
                          </div>
                        </td>
                        <td data-label="action">
                          <Button
                            variant="danger"
                            onClick={() => deleteHandlerPackages(item.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {handlePricePackages()}
              </>
            ) : null}

            <div className="text-center">
              {data.length !== 0 || packageUser.length !== 0 ? (
                <div className="text-center w-50 m-auto">
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AdFmgWKJ8tN-f_lgPO0ARPUG6POE1MciEyfJhSnhp-nlI49AVReFA9kzO5pLv8-OtNPB_0Rrm18Z-sHI",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: "10",
                              },
                            },
                          ],
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <h1 className="p-5">You Don't have Any Booking</h1>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
