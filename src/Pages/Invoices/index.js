import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getAllInvoices,
  getAllRemainders,
} from "../../Services/UserServices/User";
import RemainderCard from "../../Components/RemainderCard";
import GroupsDialog from "../../Components/Dialog";
import InvoiceCard from "../../Components/InvoiceCard";
import Lottie from "lottie-react";
import Loading from "../../Lottie/loading.json";

const Invoices = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const getData = async () => {
    const data1 = await getAllInvoices();
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
        const fullName = user?.clientName?.toLowerCase();
        const email = user?.sellerName?.toLowerCase();
        const service = user?.service?.toLowerCase();
        const serviceCat = user?.serviceCategory?.toLowerCase();

        return (
          serviceCat?.includes(searchVal) ||
          fullName?.includes(searchVal) ||
          email?.includes(searchVal)
        );
      });
      setData(filteredUsers);
    }
  }, [val, originalUsers]);
  return (
    <Box sx={styles.main}>
      <Container sx={styles.cont}>
        <Box sx={styles.btnParent}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={styles.typo}>Invoices</Typography>
            <TextField
              id="outlined-basic"
              label="Search Users..."
              variant="outlined"
              value={val}
              onChange={(e) => {
                setVal(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Grid
          container
          sx={{ wisth: "100%" }}
          columnSpacing={3}
          rowSpacing={3}
          marginTop={2}
        >
          {data && data.length > 0 ? (
            data?.map((items, index) => {
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
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2px",
                width: "100%",
              }}
            >
              <Lottie
                animationData={Loading}
                loop={true}
                style={{ width: "200px", height: "200px" }}
              />
            </Box>
          )}
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
