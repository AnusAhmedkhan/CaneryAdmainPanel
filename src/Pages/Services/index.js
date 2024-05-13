import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ServiceCard from "../../Components/ServiceCard";
import { getServices } from "../../Services/UserServices/User";
import Lottie from "lottie-react";
import Loading from "../../Lottie/loading.json";

const Services = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);
  const getData = async () => {
    const data1 = await getServices();
    console.log(data1, "services");
    setData(data1);
    setOriginalUsers(data1);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    // Reset users to originalUsers when val becomes empty
    if (val === "") {
      setData(originalUsers);
    } else if (val && originalUsers.length > 0) {
      const filteredUsers = originalUsers?.filter((user) => {
        const searchVal = val.toLowerCase().trim();
        const category = user?.category?.toLowerCase();
        const username = user?.username?.toLowerCase();
        const service = user?.service?.toLowerCase();
        const firstName = user?.firstName?.toLowerCase();

        return (
          firstName?.includes(searchVal) ||
          service?.includes(searchVal) ||
          category?.includes(searchVal) ||
          username?.includes(searchVal)
        );
      });
      setData(filteredUsers);
    }
  }, [val, originalUsers]);
  return (
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
          <Typography sx={styles.heading}>Services</Typography>
          <TextField
            id="outlined-basic"
            label="Search Services..."
            variant="outlined"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
        </Box>
        <Grid
          container
          columnSpacing={3}
          rowSpacing={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2px",
            width: "100%",
          }}
        >
          {data && data.length > 0 ? (
            data?.map((items, index) => {
              return (
                <Grid item lg={4} xl={4} md={12} sm={12} xs={12} key={index}>
                  <ServiceCard data={items} getData={getData} />
                </Grid>
              );
            })
          ) : (
            <Lottie
              animationData={Loading}
              loop={true}
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
const styles = {
  main: { marginTop: "5rem", width: "100%", overFlow: "hidden" },

  cont: {
    maxWidth: { lg: "1300px" },
  },
  btnParent: {
    width: "100%",
    display: "flex",

    alignItems: "center",
  },
  typo: {
    color: "#036DDD",
    fontFamily: "'poppins'",
    fontWeight: "bold",
    fontSize: "32px",
    marginLeft: "5px",
  },
  heading: {
    textAlign: "left",
    paddingY: "14px",
    fontWeight: 700,
    fontSize: "28px",
    fontFamily: "Poppins",
  },
};
