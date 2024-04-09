import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../Services/UserServices/User";
import { Box, Typography } from "@mui/material";
import UserDataTable from "../../Components/UserDataTable";

const Index = () => {
  const [users, setUsers] = useState();

  const allUsers = () => {
    getAllUsers().then((data) => {
      setUsers(data);
      console.log(data, "data");
    });
  };
  useEffect(() => {
    allUsers();
  }, []);
  return (
    <>
      <Box sx={{ marginX: "7rem", marginTop: "7rem", width: "100%" }}>
        <Typography sx={style.heading}>ALL USERS</Typography>
        <UserDataTable users={users} />
      </Box>
    </>
  );
};

export default Index;
const style = {
  heading: {
    textAlign: "left",
    paddingY: "14px",
    fontWeight: 700,
    fontSize: "28px",
    fontFamily: "Poppins",
  },
};
