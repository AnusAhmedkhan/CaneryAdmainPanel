import * as React from "react";
import PropTypes from "prop-types";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Box, Button, TextField, Typography } from "@mui/material";

import toast from "react-hot-toast";
import {
  createRemainder,
  getAllClients,
  getAllUsers,
} from "../Services/UserServices/User";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, open } = props;
  const [clientId, setClientId] = React.useState("");
  const [sellerId, setSellerId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [clients, setClients] = React.useState([]);
  const getData = async () => {
    const data = await getAllUsers();
    const data2 = await getAllClients();

    setUsers(data);
    setClients(data2);
  };
  const handleChangeSeller = (event) => {
    setSellerId(event.target.value);
    console.log(event.target.value, "sellerId");
  };
  const handleChangeClient = (event) => {
    setClientId(event.target.value);
    console.log(event.target.value, "clientId");
  };
  const handleAdd = async () => {
    if (!sellerId.trim() || !clientId.trim() || !description.trim()) {
      toast.error("Select or Fill all");
      return;
    }
    try {
      const form = { sellerId, clientId, description };
      const res = await createRemainder(form);
      toast.success("Remainder Add Succcesfully");
      setSellerId("");
      setClientId("");
      onClose();
    } catch (error) {
      toast.error("Errro");
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        ".MuiDialog-paper": {
          backgroundColor: "white",
          paddingY: "50px",
          paddingX: "40px",
          borderRadius: "10px",
          width: "50%",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "'poppins'",
          fontSize: "25px",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Add Remainder
      </DialogTitle>
      <Typography
        sx={{ fontSize: "17px", fontFamily: "'poppins'", paddingX: "10px" }}
      >
        Select Seller Name
      </Typography>
      <FormControl sx={{ mt: 1, minWidth: 120 }} size="large">
        <InputLabel id="demo-select-small-label">Seller</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={sellerId}
          label="Seller"
          onChange={handleChangeSeller}
        >
          {users?.map(({ id, data }, index) => {
            return (
              <MenuItem value={id} key={index}>
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/* // client */}
      <Typography
        sx={{ fontSize: "17px", fontFamily: "'poppins'", paddingX: "10px" }}
      >
        Select Client Name
      </Typography>
      <FormControl sx={{ mt: 1, minWidth: 120 }} size="large">
        <InputLabel id="demo-select-small-label">Clients</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={clientId}
          label="Clients"
          onChange={handleChangeClient}
        >
          {clients?.map(({ id, data }, index) => {
            return (
              <MenuItem value={id} key={index}>
                {data.firstName + data.lastName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        rows={4}
        multiline
        sx={{ mt: 2 }}
        label=" Add Description"
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
      />

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          size="small"
          sx={styles.btn}
          onClick={() => {
            handleAdd();
          }}
        >
          Add Remainder
        </Button>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function GroupsDialog({ open, onClose }) {
  return (
    <div>
      <SimpleDialog open={open} onClose={onClose} />
    </div>
  );
}

const styles = {
  btn: {
    fontFamily: "'poppins'",
    marginTop: "10px",
    background:
      "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    color: "white",
    paddingY: "10px",
    paddingX: "30px",
    fontSize: "15px",
  },
};
