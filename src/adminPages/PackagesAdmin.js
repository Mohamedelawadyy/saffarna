import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PackagesAdmin() {
  const [packages, setPackages] = useState([]);
  const [filterId, setFilterId] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`https://json-server-dbsaffarna.onrender.com/package`)
        .then((response) => {
          setPackages(response.data);
          console.log(response.data);
        });
    } catch (error) {
      alert(error);
    }
  }, [setPackages]);

  const handleDelete = (packagee) => {
    const delData = packages.filter((item) => item.id !== packagee.id);
    setPackages(delData);
    console.log(delData);
    try {
      axios
        .delete(
          `https://json-server-dbsaffarna.onrender.com/package/${packagee.id}`
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Deleted success");
        });
    } catch (error) {
      toast.error(error);
      alert(error);
    }
  };

  function handleFilterById(event) {
    setFilterId(event.target.value);
  }
  const filteredById = packages.filter((item) => {
    const idMatch = item.id.includes(filterId);
    return idMatch;
  });
  return (
    <main className="packages-admin">
      <Container>
        <Row>
          <h1 className="text-center p-2 mb-3 mt-3">Packages</h1>
          <Col>
            <div className="w-100 text-center  p-4 d-flex justify-content-center">
              <input
                type="text"
                placeholder="Filter by ID:"
                id="companyFilter"
                value={filterId}
                onChange={handleFilterById}
              />
              <Button
                className=" p-2"
                onClick={() => navigate("/admin/add-package")}
              >
                <p className="m-auto">
                  {" "}
                  Add Package <StorefrontIcon />
                </p>
              </Button>
            </div>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Package Country</th>
                  <th>Package Description</th>
                  <th>Package Days</th>
                  <th>Package Nights</th>
                  <th>Package Image</th>
                  <th>Package price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterId
                  ? filteredById.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td> {item.country}</td>
                        <td> {item.description}</td>
                        <td> {item.days}</td>
                        <td> {item.nights}</td>
                        <td>
                          <img
                            style={{ width: "50px" }}
                            src={item.image}
                            alt={item.country}
                          />
                        </td>
                        <td> {item.price}</td>
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
                  : packages.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td> {item.country}</td>
                        <td> {item.description}</td>
                        <td> {item.days}</td>
                        <td> {item.nights}</td>
                        <td>
                          <img
                            style={{ width: "50px" }}
                            src={item.image}
                            alt={item.country}
                          />
                        </td>
                        <td> {item.price}</td>
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
                    ))}
              </tbody>
            </Table>
            <ToastContainer />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
