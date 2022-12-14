import React from "react";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const Heading = ({ children }) => {
  const HeadBox = styled(Box)({
    width: "100%",
    textAlign: "center",
    fontSize: "30px",
    fontFamily: "Inter",
    fontWeight: "bold",
    margin: "75px 0",
  });

  return <HeadBox component="h2">{children}</HeadBox>;
};

export default Heading;
