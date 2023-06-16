import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";

export default function AdminUsersBooking() {
  const [users, setUsers] = useState([]);
  const [packages, setpackages] = useState([]);
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`https://json-server-dbsaffarna.onrender.com/users`)
        .then((response) => {
          setUsers(response.data);
        });
    } catch (error) {
      alert(error);
    }
  }, [flights, packages]);

  const deleteFlightHandler = (username, item) => {
    try {
      axios
        .get(`https://json-server-dbsaffarna.onrender.com/users/${username}`)
        .then((response) => {
          const delData = response.data.flight_Booking.filter(
            (flight) => flight.id !== item.id
          );
          console.log(delData);
          setFlights(delData);
          const bookingFlight = { flight_Booking: delData };
          axios
            .patch(
              `https://json-server-dbsaffarna.onrender.com/users/${username}`,
              bookingFlight
            )
            .then((response) => {
              console.log(response.data.flight_Booking);
              setFlights(response.data.flight_Booking);
              toast.success("Canceled Succsessfuly");
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } catch (error) {
      console.log(error);
      toast.error("req Faild");
    }
  };
  const deletePackageHandler = (username, item) => {
    try {
      axios
        .get(`https://json-server-dbsaffarna.onrender.com/users/${username}`)
        .then((response) => {
          const delData = response.data.booking_package.filter(
            (userPackage) => userPackage.id !== item.id
          );
          console.log(delData);
          setFlights(delData);
          const bookingPackage = { booking_package: delData };
          axios
            .patch(
              `https://json-server-dbsaffarna.onrender.com/users/${username}`,
              bookingPackage
            )
            .then((response) => {
              console.log(response.data.flight_Booking);
              setpackages(response.data.flight_Booking);
              toast.success("Canceled Succsessfuly");
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } catch (error) {
      console.log(error);
      toast.error("req Faild");
    }
  };

  return (
    <main className="users-admin mt-4">
      <Container>
        <Row>
          <h1 className="text-center fw-bold p-3">All Requests</h1>
          <Col sm={"12"}>
            <Table responsive className="Request-table" striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Flights-req</th>
                  <th>Packages-req</th>
                </tr>
              </thead>
              <tbody>
                {users ? (
                  users.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.id}</td>
                        <td>
                          {user.flight_Booking.length !== 0 ? (
                            user.flight_Booking.map((item) => (
                              <React.Fragment key={Math.random()}>
                                <div className="border-bottom">
                                  <p>
                                    <b>FlightID:</b> {item.id}
                                  </p>
                                  <p>
                                    <b>Flight_company:</b> {item.company}
                                  </p>

                                  <Button
                                    variant="danger"
                                    className="p-0 mb-1 me-2 fs-6"
                                    onClick={() =>
                                      deleteFlightHandler(user.id, item)
                                    }
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </div>
                              </React.Fragment>
                            ))
                          ) : (
                            <p key={Math.random()}>Nothing</p>
                          )}
                        </td>
                        <td>
                          {user.booking_package.length !== 0 ? (
                            user.booking_package.map((item) => (
                              <React.Fragment key={Math.random()}>
                                <div className="border-bottom">
                                  <p>
                                    <b>PackageID:</b> {item.id}
                                  </p>
                                  <p>
                                    <b>Package_Country:</b> {item.country}
                                  </p>
                                  <Button
                                    variant="danger"
                                    className="p-0 mb-1 me-2 fs-6"
                                    onClick={() =>
                                      deletePackageHandler(user.id, item)
                                    }
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </div>
                              </React.Fragment>
                            ))
                          ) : (
                            <p>Nothing</p>
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <h2 className="text-center">Loading</h2>
                )}
              </tbody>
            </Table>
            <ToastContainer />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
