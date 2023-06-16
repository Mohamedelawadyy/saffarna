import React from "react";
import { Container } from "react-bootstrap";
import { Grid } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <Container className="d-flex justify-content-center">
      <Grid
        height="80"
        width="80"
        color="#f9461d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Container>
  );
}
