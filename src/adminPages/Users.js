import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, ToastContainer } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../layouts/adminDash.css";
import axios from "axios";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [updateUser, setUpdateUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleUpdate = (user) => {
    setShow(true);
    setUpdateUser(user);
  };
  const handleDelete = (user) => {
    const delData = users.filter((item) => item.id !== user.id);
    setUpdateUser(delData);
    console.log(delData);
    try {
      axios
        .delete(`http://localhost:9000/users/${user.id}`)
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      alert(error);
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUpdateUser((prevupdateUser) => ({
      ...prevupdateUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    try {
      axios.get(`http://localhost:9000/users`).then((response) => {
        setUsers(response.data);
      });
    } catch (error) {
      alert(error);
    }
  }, [updateUser]);

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = updateUser.firstName;
    const lastName = updateUser.lastName;
    const email = updateUser.email;
    const password = updateUser.password;
    axios
      .patch(`http://localhost:9000/users/${updateUser.id}`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        setUpdateUser(response.data);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
    const errors = {};

    if (!updateUser.firstName) {
      errors.firstName = "Please enter your first name";
    }

    if (!updateUser.lastName) {
      errors.lastName = "Please enter your last name";
    }

    if (!updateUser.email) {
      errors.email = "Please enter an email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateUser.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!updateUser.password) {
      errors.password = "Please enter a password";
    } else if (updateUser.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
    }
    setShow(false);
  };
  function handleFilterByUsername(event) {
    setFilterUser(event.target.value);
  }
  const filteredByUsername = users.filter((user) => {
    const usernameMatch = user.id.includes(filterUser);
    return usernameMatch;
  });
  return (
    <main className="users-admin mt-4">
      <Container>
        <Row>
          <h1 className="text-center fw-bold p-3">Users Table</h1>
          <div className="w-100 text-center p-4 d-flex justify-content-center">
            <input
              type="text"
              placeholder="Filter by Username:"
              id="companyFilter"
              value={filterUser}
              onChange={handleFilterByUsername}
            />
            <Button
              className=" p-2"
              onClick={() => navigate("/admin/add-user")}
            >
              <p className="m-auto">
                {" "}
                Add User <AddIcon />
              </p>
            </Button>
          </div>
          <Col sm={"12"}>
            <Table
              responsive="sm"
              className="users-table"
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterUser
                  ? filteredByUsername.map((user) => (
                      <>
                        <tr key={user.id}>
                          <td>
                            <Avatar alt="Remy Sharp" src={user.profileImg} />
                          </td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.id}</td>
                          <td>{user.email}</td>
                          <td>{user.password}</td>
                          <td>
                            <Button
                              variant="danger"
                              className="me-2"
                              onClick={() => handleDelete(user)}
                            >
                              <DeleteIcon />
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleUpdate(user)}
                            >
                              <EditNoteIcon />
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))
                  : users.map((user) => (
                      <>
                        <tr key={user.id}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.id}</td>
                          <td>{user.email}</td>
                          <td>{user.password}</td>
                          <td>
                            <Button
                              variant="danger"
                              className="me-2"
                              onClick={() => handleDelete(user)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleUpdate(user)}
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))}
              </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
              <form className="w-100 update-form " onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-capitalize">
                    {" "}
                    update : {updateUser.id} account
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your First name"
                      value={updateUser.firstName}
                      onChange={handleInputChange}
                    />
                    {formErrors.firstName && (
                      <span className="error">{formErrors.firstName}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your Last name"
                      value={updateUser.lastName}
                      onChange={handleInputChange}
                    />
                    {formErrors.firstName && (
                      <span className="error">{formErrors.lastName}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      value={updateUser.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && (
                      <span className="error">{formErrors.email}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your Password"
                      value={updateUser.password}
                      onChange={handleInputChange}
                    />
                    {formErrors.password && (
                      <span className="error">{formErrors.password}</span>
                    )}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
                <ToastContainer />
              </form>
            </Modal>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
