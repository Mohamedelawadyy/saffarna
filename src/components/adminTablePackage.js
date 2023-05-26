import React from "react";
import { Button } from "react-bootstrap";

export default function adminTablePackage({ item }) {
  return item.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td> {item.country}</td>
      <td> {item.description}</td>
      <td> {item.days}</td>
      <td> {item.nights}</td>
      <td>
        <img style={{ width: "50px" }} src={item.image} alt={item.country} />
      </td>
      <td> {item.price}</td>
      <td>
        {" "}
        <Button variant="danger" onClick={() => handleDelete(item)}>
          Delete
        </Button>
      </td>
    </tr>
  ));
}
