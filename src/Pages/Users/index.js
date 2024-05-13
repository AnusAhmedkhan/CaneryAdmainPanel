import React, { useEffect, useState } from "react";
import { deleteUserByUid, getAllUsers } from "../../Services/UserServices/User";
import { Box, TextField, Typography } from "@mui/material";
import UserDataTable from "../../Components/UserDataTable";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import Loading from "../../Lottie/loading.json";
const Index = () => {
  const [users, setUsers] = useState();
  const [val, setVal] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);
  const [isChanges, setIsChanges] = React.useState(false);
  const allUsers = () => {
    getAllUsers().then((data) => {
      setUsers(data);
      setOriginalUsers(data);
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
    console.log(users, "ser");
  }, []);
  useEffect(() => {
    // Reset users to originalUsers when val becomes empty
    if (val === "") {
      setUsers(originalUsers);
    } else if (val && originalUsers.length > 0) {
      const filteredUsers = originalUsers?.filter((user) => {
        const searchVal = val.toLowerCase().trim();
        const fullName = user?.data?.name?.toLowerCase();
        const email = user?.data?.email?.toLowerCase();

        return fullName?.includes(searchVal) || email?.includes(searchVal);
      });
      setUsers(filteredUsers);
    }
  }, [val, originalUsers]);
  useEffect(() => {
    allUsers();
  }, [isChanges]);

  return (
    <>
      <Box sx={{ marginX: "7rem", marginTop: "7rem", width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={style.heading}>ALL USERS</Typography>
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
        {users ? (
          <UserDataTable
            users={users}
            deleteUser={deleteUser}
            setIsChanges={setIsChanges}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lottie
              animationData={Loading}
              loop={true}
              style={{ width: "200px", height: "200px" }}
            />
          </Box>
        )}
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
