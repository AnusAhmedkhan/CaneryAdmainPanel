import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardComp from "../../Components/DashboardComp";
import { getAllDataDashboard } from "../../Services/UserServices/User";

const Dashboard = () => {
  const [data, setData] = useState({});
  const getData = async () => {
    const data1 = await getAllDataDashboard();
    console.log(data1, "dashboard");
    setData(data1);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box sx={styles.main}>
      <Container sx={styles.cont}>
        <Grid container columnSpacing={3} rowSpacing={5}>
          <Grid item lg={4} xl={4} md={6} sm={12} xs={12}>
            <DashboardComp name={" Total Clients"} num={data.client} />
          </Grid>
          <Grid item lg={4} xl={4} md={6} sm={12} xs={12}>
            <DashboardComp name={" Total Users"} num={data.users} />
          </Grid>
          <Grid item lg={4} xl={4} md={6} sm={12} xs={12}>
            <DashboardComp name={"Notification"} num={data.notification} />
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <DashboardComp name={"Invoices"} num={data.invoice} />
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <DashboardComp name={"Reminders"} num={data.remainder} />
          </Grid>
          <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
            <DashboardComp
              bool={true}
              name={" Total Orders"}
              num={data.service}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
const styles = {
  main: { marginTop: "5rem", width: "100%" },

  cont: {
    maxWidth: { lg: "1300px" },
  },
};
