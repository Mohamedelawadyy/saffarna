import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GetMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`https://json-server-dbsaffarna.onrender.com/messages`)
        .then((response) => {
          setMessages(response.data);
          console.log(response.data);
        });
    } catch (error) {
      alert(error);
    }
  }, [setMessages]);

  const handleDelete = (message) => {
    const delData = messages.filter((item) => item.id !== message.id);
    setMessages(delData);
    console.log(delData);
    try {
      axios
        .delete(
          `https://json-server-dbsaffarna.onrender.com/messages/${message.id}`
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Deleted  success");
        });
    } catch (error) {
      alert(error);
      toast.error(error);
    }
  };
  return (
    <main className="flights">
      <Container>
        <Row>
          <Col sm={"12"}>
            <h1 className="text-center">Messages</h1>
            <Table responsive={"sm"} striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>name</th>
                  <th>email</th>
                  <th>subject</th>
                  <th>message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {messages ? (
                  messages.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td> {item.name}</td>
                      <td> {item.email}</td>
                      <td> {item.subject}</td>
                      <td> {item.message}</td>
                      <td>
                        {" "}
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(item)}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <h1 className="text-center"> Empty</h1>
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
