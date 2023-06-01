import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GetFlights() {
  const [flights, setFlights] = useState([]);
  const [updateFlights, setUpdateFlights] = useState([]);
  const [filterId, setFilterId] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:9000/flights`).then((response) => {
        setFlights(response.data);
        console.log(response.data);
      });
    } catch (error) {
      alert(error);
    }
  }, [updateFlights]);

  const handleDelete = (item) => {
    const delData = flights.filter((item) => item.id !== flights.id);
    setUpdateFlights(delData);
    console.log(delData);
    try {
      axios
        .delete(`http://localhost:9000/flights/${item.id}`)
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      alert(error);
    }
  };

  function handleFilterById(event) {
    setFilterId(event.target.value);
  }
  const filteredById = flights.filter((item) => {
    const idMatch = item.id.toString().includes(filterId);
    return idMatch;
  });
  return (
    <main className="flights">
      <h1 className="text-center p-3 fw-bold">Flights Table</h1>
      <div className="w-100 text-center p-4">
        <input
          type="text"
          placeholder="Filter by ID:"
          id="companyFilter"
          value={filterId}
          onChange={handleFilterById}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Flight company</th>
            <th>Flight departureTime</th>
            <th>Flight arrivalTime</th>
            <th>Flight destinationFrom</th>
            <th>Flight destinationTo</th>
            <th>Flight logo</th>
            <th>Flight price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterId
            ? filteredById.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td> {item.company}</td>
                  <td> {item.departureTime}</td>
                  <td> {item.arrivalTime}</td>
                  <td> {item.destinationFrom}</td>
                  <td> {item.destinationTo}</td>
                  <td>
                    <img
                      style={{ width: "50px" }}
                      src={item.logo}
                      alt={item.company}
                    />
                  </td>
                  <td> {item.price}</td>
                  <td>
                    {" "}
                    <Button variant="danger" onClick={() => handleDelete(item)}>
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))
            : flights.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td> {item.company}</td>
                  <td> {item.departureTime}</td>
                  <td> {item.arrivalTime}</td>
                  <td> {item.destinationFrom}</td>
                  <td> {item.destinationTo}</td>
                  <td>
                    <img
                      style={{ width: "50px" }}
                      src={item.logo}
                      alt={item.company}
                    />
                  </td>
                  <td> {item.price}</td>
                  <td>
                    {" "}
                    <Button variant="danger" onClick={() => handleDelete(item)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </main>
  );
}
