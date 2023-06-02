import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FlightIcon from "@mui/icons-material/Flight";
import "./slider/index.css";
import { useState } from "react";
import { Location } from "./locationData";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsBooking() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [value, setValue] = React.useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [destinationFrom, setDestinationFrom] = useState("");
  const [destinationTo, setDestinationTo] = useState("");

  const handledestinationFrom = (event) => {
    setDestinationFrom(event.target.value);
  };
  const handledestinationTo = (event) => {
    setDestinationTo(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let values = { fromDate, toDate, destinationFrom, destinationTo };
    let username = JSON.parse(sessionStorage.getItem("username"));
    const data = { req: values };

    if (username) {
      axios
        .patch(`https://json-server-dbsaffarna.onrender.com/${username}`, data)
        .then((response) => {
          if (Object.keys(response.data) === 0) {
            toast.error("req failed");
          } else {
            sessionStorage.setItem(
              "userReq",
              JSON.stringify(response.data.req)
            );
            toast.success("req  success");
            navigate("/booking");
          }
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div data-aos="zoom-in" data-aos-duration="6500" className="tabs">
      <Container>
        <div className="row">
          <div className="col-12">
            <form onSubmit={submitHandler} className="p-3">
              <Box sx={{ width: "100%" }}>
                <Box
                  className=" d-flex justify-content-center text-center w-100"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tabs
                    className="text-center"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      className="w-100 p-4"
                      label={<FlightIcon />}
                      {...a11yProps(0)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <label htmlFor="from-date">Date From:</label>
                  <input
                    type="date"
                    id="from-date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    className="date-input me-2"
                  />
                  <label htmlFor="to-date">Date To:</label>
                  <input
                    type="date"
                    id="to-date"
                    value={toDate}
                    onChange={handleToDateChange}
                    className="date-input"
                  />
                </TabPanel>
                <TabPanel value={value} index={0}>
                  <select
                    className="me-5"
                    id="select-input"
                    value={destinationFrom}
                    onChange={handledestinationFrom}
                  >
                    <option value="">Distination From :</option>
                    {Location.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select
                    id="select-input"
                    value={destinationTo}
                    onChange={handledestinationTo}
                  >
                    <option value="">Distination To :</option>
                    {Location.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <Button
                  className="text-center d-block m-auto search-btn "
                  type="submit"
                >
                  Search
                </Button>
                <ToastContainer />
              </Box>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
