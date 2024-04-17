import React, { useEffect, useState } from "react";
import { getAllClients } from "../../Services/UserServices/User";
import { Box, Typography } from "@mui/material";
import ClientDataTable from "../../Components/ClientDataTable";
import toast from "react-hot-toast";
import { deleteClientByUid } from "../../Services/ClientServices/ClientServices";

const Client = () => {
  const [clients, setClients] = useState();
  useEffect(() => {
    getAllClients().then((data) => {
      console.log(data);
      setClients(data);
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
  return (
    <>
      <Box sx={{ marginX: "7rem", marginTop: "7rem", width: "100%" }}>
        <Typography sx={style.heading}>ALL CLIENTS</Typography>
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
