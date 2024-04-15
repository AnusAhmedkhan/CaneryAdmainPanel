import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ServiceCard from "../../Components/ServiceCard";
import { getServices } from "../../Services/UserServices/User";

const Services = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const data1 = await getServices();
    console.log(data1, "services");
    setData(data1);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box sx={styles.main}>
      <Container sx={styles.cont}>
        <Grid
          container
          columnSpacing={3}
          rowSpacing={7}
          sx={{
            display: "flex",
            justifyContent: "center",

            width: "100%",
          }}
        >
          {data?.map((items, index) => {
            return (
              <Grid item lg={4} xl={4} md={12} sm={12} xs={12} key={index}>
                <ServiceCard data={items} getData={getData} />
              </Grid>
            );
          })}
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
};