import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllRemainders } from "../../Services/UserServices/User";

const Remainder = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const data1 = await getAllRemainders();
    console.log(data1, "services");
    setData(data1);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box sx={styles.main}>
      <Container sx={styles.cont}>
        <Box sx={styles.btnParent}>
          <Button sx={styles.btn}>Add Remainder</Button>
        </Box>
        <Grid container sx={{ wisth: "100%" }}>
          <Grid item lg={4}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Remainder;
const styles = {
  main: { marginTop: "5rem", width: "100%", overFlow: "hidden" },

  cont: {
    maxWidth: { lg: "1300px" },
  },
  btnParent: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    fontFamily: "'poppins'",

    background:
      "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    color: "white",
    paddingY: "10px",
    paddingX: "10px",
    fontSize: "15px",
  },
};
