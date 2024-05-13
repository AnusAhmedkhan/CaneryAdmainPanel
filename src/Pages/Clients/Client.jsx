import React, { useEffect, useState } from "react";
import { getAllClients } from "../../Services/UserServices/User";
import { Box, TextField, Typography } from "@mui/material";
import ClientDataTable from "../../Components/ClientDataTable";
import toast from "react-hot-toast";
import { deleteClientByUid } from "../../Services/ClientServices/ClientServices";

const Client = () => {
  const [clients, setClients] = useState();
  const [val, setVal] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);
  useEffect(() => {
    getAllClients().then((data) => {
      console.log(data);
      setClients(data);
      setOriginalUsers(data);
    });
  }, []);
  const deleteClient = (id, val) => {
    deleteClientByUid(id, val).then(() => {
      toast.success("User Deleted SuccessFully");
      getAllClients().then((data) => {
        console.log(data);
        setClients(data);
      });
    });
  };
  useEffect(() => {
    // Reset users to originalUsers when val becomes empty
    if (val === "") {
      setClients(originalUsers);
    } else if (val && originalUsers.length > 0) {
      const filteredUsers = originalUsers?.filter((user) => {
        const searchVal = val.toLowerCase().trim();
        const fullName = user?.data?.firstName?.toLowerCase();
        const lastName = user?.data?.lastName?.toLowerCase();
        const email = user?.data?.email?.toLowerCase();

        return (
          lastName?.includes(searchVal) ||
          fullName?.includes(searchVal) ||
          email?.includes(searchVal)
        );
      });
      setClients(filteredUsers);
    }
  }, [val, originalUsers]);
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
          <Typography sx={style.heading}>ALL CLIENTS</Typography>
          <TextField
            id="outlined-basic"
            label="Search Clients..."
            variant="outlined"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
        </Box>

        <ClientDataTable clients={clients} deleteClient={deleteClient} />
      </Box>
    </>
  );
};

export default Client;
const style = {
  heading: {
    textAlign: "left",
    paddingY: "14px",
    fontWeight: 700,
    fontSize: "28px",
    fontFamily: "Poppins",
  },
};
