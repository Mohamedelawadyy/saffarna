import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

export default function GetMessages() {
  const [messages, setMessages] = useState([]);
  const [updateMessages, setUpdateMessages] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:9000/messages`).then((response) => {
        setMessages(response.data);
        console.log(response.data);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleDelete = (item) => {
    const delData = messages.filter((item) => item.id !== messages.id);
    setUpdateMessages(delData);
    console.log(delData);
    try {
      axios
        .delete(`http://localhost:9000/messages/${item.id}`)
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      alert(error);
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
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <h1 className="text-center"> Empty</h1>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
