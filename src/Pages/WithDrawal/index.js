import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import WithdrawalDataTable from "./WithdrawalDataTable";
import { getAllRequests } from "../../Services/UserServices/User";

const Withdrawal = () => {
  const [data, setData] = useState();

  const getData = async () => {
    const allRequests = await getAllRequests();
    const pendingRequests = allRequests.filter(
      (request) => request.data.status === "pending"
    );
    setData(pendingRequests);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Box sx={styles.main}>
        <Container sx={styles.cont}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { md: "row", sm: "column", xs: "row" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={styles.heading}>Withdrawal Requests</Typography>
            {/* <TextField
            id="outlined-basic"
            label="Search Clients..."
            variant="outlined"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          /> */}
          </Box>
          <WithdrawalDataTable requests={data} getData={getData} />
        </Container>
      </Box>
    </>
  );
};

export default Withdrawal;
const styles = {
  main: { marginTop: "5rem", width: "100%" },

  cont: {
    maxWidth: { lg: "1300px" },
  },
  heading: {
    textAlign: "left",
    paddingY: "14px",
    fontWeight: 700,
    fontSize: "28px",
    fontFamily: "Poppins",
  },
};
