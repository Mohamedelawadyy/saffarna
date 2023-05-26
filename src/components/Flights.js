import { Avatar } from "@mui/material";
import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Flights({ data }) {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("username"));

  let container = [];
  const selectHandler = async (item) => {
    if (JSON.parse(sessionStorage.getItem("userData"))) {
      let selectItem = { ...item, quantaty: 1 };

      const findItem = container.find((product) => product.id === item.id);
      if (findItem) {
        findItem.quantaty += 1;
        toast.success("update quantaty successful");
        const data = { flight_Booking: container };
        axios
          .patch(`http://localhost:9000/users/${user}`, data)
          .then((response) => {
            console.log(response.data);
            sessionStorage.setItem(
              "bookingUser",
              JSON.stringify(response.data)
            );
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(container);
      } else {
        container = [...container, selectItem];
        const data = { flight_Booking: container };
        axios
          .patch(`http://localhost:9000/users/${user}`, data)
          .then((response) => {
            console.log(response.data);
            toast.success("Booking successful");
            sessionStorage.setItem(
              "bookingUser",
              JSON.stringify(response.data)
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>
            {item.company}
            <Avatar alt={item.company} src={item.logo} loading="lazy" />
          </td>
          <td>{item.departureTime}</td>
          <td>{item.arrivalTime}</td>
          <td>{item.destinationFrom}</td>
          <td>{item.destinationTo}</td>
          <td>{item.price} $</td>
          <td>
            <Button onClick={() => selectHandler(item)}>BookNow</Button>
          </td>
        </tr>
      ))}
      <ToastContainer />
    </>
  );
}
