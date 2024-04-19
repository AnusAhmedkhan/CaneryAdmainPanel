import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getAllInvoices,
  getAllRemainders,
} from "../../Services/UserServices/User";
import RemainderCard from "../../Components/RemainderCard";
import GroupsDialog from "../../Components/Dialog";
import InvoiceCard from "../../Components/InvoiceCard";

const Invoices = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const getData = async () => {
    const data1 = await getAllInvoices();
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
          <Typography sx={styles.typo}>Invoices</Typography>
        </Box>
        <Grid
          container
          sx={{ wisth: "100%" }}
          columnSpacing={3}
          rowSpacing={3}
          marginTop={2}
        >
          {data?.map((items, index) => {
            return (
              <>
                <Grid item lg={4} xl={4} md={6} sm={12} xs={12} key={index}>
                  <InvoiceCard
                    sellerName={items.sellerName}
                    clientName={items.clientName}
                    service={items.service}
                    serviceCategory={items.serviceCategory}
                    price={items.price}
                    paymentType={items.paymentType}
                  />
                </Grid>
              </>
            );
          })}
        </Grid>
        {open && (
          <GroupsDialog
            open={open}
            onClose={() => {
              setOpen(false);
              getData();
            }}
          />
        )}
      </Container>
    </Box>
  );
};

const styles = {
  main: { marginTop: "5rem", width: "100%", overFlow: "hidden" },

  cont: {
    maxWidth: { lg: "1400px" },
  },
  btnParent: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
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
  typo: {
    color: "#036DDD",
    fontFamily: "'poppins'",
    fontWeight: "bold",
    fontSize: "35px",
    marginLeft: "5px",
  },
};

export default Invoices;
