import React, { useEffect, useState } from "react";
import { deleteUserByUid, getAllUsers } from "../../Services/UserServices/User";
import { Box, Typography } from "@mui/material";
import UserDataTable from "../../Components/UserDataTable";
import toast from "react-hot-toast";
const Index = () => {
  const [users, setUsers] = useState();
  const [isChanges, setIsChanges] = React.useState(false);
  const allUsers = () => {
    getAllUsers().then((data) => {
      setUsers(data);
    });
  };
  const deleteUser = (id, val) => {
    deleteUserByUid(id, val).then(() => {
      toast.success("User Deleted SuccessFully");
      allUsers();
    });
  };
  useEffect(() => {
    allUsers();
    console.log(users);
  }, []);
  useEffect(() => {
    allUsers();
  }, [isChanges]);
  return (
    <>
      <Box sx={{ marginX: "7rem", marginTop: "7rem", width: "100%" }}>
        <Typography sx={style.heading}>ALL USERS</Typography>
        <UserDataTable
          users={users}
          deleteUser={deleteUser}
          setIsChanges={setIsChanges}
        />
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
