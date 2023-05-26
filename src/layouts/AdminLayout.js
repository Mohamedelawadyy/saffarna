import React from "react";

import "./adminDash.css";
import AsideForAdmin from "../components/AsideForAdmin";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
function AdminLayout() {
  return (
    <>
      <Container fluid={"false"} className="p-0 m-0">
        <Row className="m-0">
          <AsideForAdmin />
          <Col sm={"12"} md={"10"}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default AdminLayout;
