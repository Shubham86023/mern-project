import React from "react";
import Alert from "react-bootstrap/Alert";

const Notify = ({type, message}) => {
  return (
    <Alert key={type} variant={type}>
      {message}
    </Alert>
  );
};

export default Notify;
