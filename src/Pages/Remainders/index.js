import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllRemainders } from "../../Services/UserServices/User";
import RemainderCard from "../../Components/RemainderCard";
import GroupsDialog from "../../Components/Dialog";
import Lottie from "lottie-react";
import Loading from "../../Lottie/loading.json";

const Remainder = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const getData = async () => {
    const data1 = await getAllRemainders();
    console.log(data1, "services");
    setData(data1);
    setOriginalUsers(data1);
  };
  useEffect(() => {
    // Reset users to originalUsers when val becomes empty
    if (val === "") {
      setData(originalUsers);
    } else if (val && originalUsers.length > 0) {
      const filteredUsers = originalUsers?.filter((user) => {
        const searchVal = val.toLowerCase().trim();
        const fullName = user?.clientName?.toLowerCase();
        const email = user?.sellerName.toLowerCase();

        return fullName?.includes(searchVal) || email?.includes(searchVal);
      });
      setData(filteredUsers);
    }
  }, [val, originalUsers]);
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box sx={styles.main}>
      <Container sx={styles.cont}>
        <Box sx={styles.btnParent}>
          <Typography sx={styles.typo}>Remainders</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Button sx={styles.btn} onClick={() => setOpen(true)}>
              Add Remainder
            </Button>
            <TextField
              id="outlined-basic"
              label="Search Reminders..."
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
                    <RemainderCard
                      sellerName={items.sellerName}
                      clientName={items.clientName}
                      date={items.date}
                      description={items.description}
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

export default Remainder;
const styles = {
  main: { marginTop: "5rem", width: "100%", overFlow: "hidden" },

  cont: {
    maxWidth: { lg: "1400px" },
  },
  btnParent: {
    width: "100%",
    display: "flex",
    flexDirection: { md: "row", xs: "column" },
    justifyContent: "space-between",
    alignItems: "center",
  },
  typo: {
    color: "#036DDD",
    fontFamily: "'poppins'",
    fontWeight: "bold",
    fontSize: "32px",
    marginLeft: "5px",
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
