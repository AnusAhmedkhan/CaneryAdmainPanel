import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllRemainders } from "../../Services/UserServices/User";
import RemainderCard from "../../Components/RemainderCard";
import GroupsDialog from "../../Components/Dialog";

const Remainder = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
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
          <Button sx={styles.btn} onClick={() => setOpen(true)}>
            Add Remainder
          </Button>
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
                <Grid item lg={4} key={index}>
                  <RemainderCard
                    sellerName={items.sellerName}
                    clientName={items.clientName}
                    date={items.date}
                    description={items.description}
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

export default Remainder;
const styles = {
  main: { marginTop: "5rem", width: "100%", overFlow: "hidden" },

  cont: {
    maxWidth: { lg: "1400px" },
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
