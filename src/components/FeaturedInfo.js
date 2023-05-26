import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import React from "react";
import "./../layouts/adminDash.css";
import { Col, Container, Row } from "react-bootstrap";

export default function Featuredinfo() {
  return (
    <div className="featured-info">
      <Container>
        <Row>
          <Col sm={"6"} lg={"4"}>
            <div className="featured-item">
              <span className="featured-title">Revanue</span>
              <div className="featured-money-container">
                <span className="featured-money">$2,415</span>
                <span className="featured-rate">
                  -11.4 <ArrowDownward className="featured-icon negative" />{" "}
                </span>
              </div>
              <span className="featured-sub">Compared to Last Month</span>
            </div>
          </Col>
          <Col sm={"6"} lg={"4"}>
            <div className="featured-item">
              <span className="featured-title">Sales</span>
              <div className="featured-money-container">
                <span className="featured-money">$4,415</span>
                <span className="featured-rate">
                  -3.4 <ArrowDownward className="featured-icon negative" />{" "}
                </span>
              </div>
              <span className="featured-sub">Compared to Last Month</span>
            </div>
          </Col>
          <Col sm={"6"} lg={"4"}>
            <div className="featured-item">
              <span className="featured-title">Cost</span>
              <div className="featured-money-container">
                <span className="featured-money">$2,415</span>
                <span className="featured-rate">
                  +2.4 <ArrowUpward className="featured-icon" />{" "}
                </span>
              </div>
              <span className="featured-sub">Compared to Last Month</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
