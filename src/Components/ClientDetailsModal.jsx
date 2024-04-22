import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Container, Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import { FaEdit } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { fetchUserName, updateUserDoc } from "../Services/UserServices/User";
import toast from "react-hot-toast";
import { storage } from "../Firebase/firebase.config";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  sellerDetails,
  updateClientDoc,
} from "../Services/ClientServices/ClientServices";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ClientDetailsModal = ({ handleClose, currentUser, open }) => {
  const [currentUsers, setCurrentUser] = React.useState(currentUser);
  const [seller, setSeller] = React.useState();
  const findSellerById = () => {
    fetchUserName(currentUsers?.data?.serviceProviderId).then((data) => {
      console.log(data, "seller");
      setSeller(data);
    });
  };
  const handleChnage = (key, val) => {
    setCurrentUser({
      ...currentUsers,
      data: {
        ...currentUsers.data,
        [key]: val,
      },
    });
  };
  const updateDoc = () => {
    updateClientDoc(currentUsers)
      .then(() => {
        toast.success("User Updated Successfully");
        handleClose();
      })
      .catch((err) => {
        toast.error("User Not Updated");
      });
  };
  React.useEffect(() => {
    findSellerById();
    setCurrentUser(currentUser);
  }, []);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Client Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingY: "2rem" }}>
        <Container sx={{ maxWidth: { lg: "1450px" } }}>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 700,
              fontFamily: "Poppins",
              marginBottom: "1rem",
              color: "black",
            }}
          >
            Edit Client Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <TextField
                sx={{ width: "100%" }}
                value={currentUsers?.data?.firstName}
                label="First Name"
                onChange={(e) => {
                  handleChnage("firstName", e.target.value);
                }}
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                sx={{ width: "100%" }}
                label="Last Name"
                value={currentUsers?.data?.lastName}
                onChange={(e) => {
                  handleChnage("lastName", e.target.value);
                }}
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                sx={{ width: "100%" }}
                label="Phone"
                value={currentUsers?.data?.phoneNumber}
                onChange={(e) => {
                  handleChnage("phoneNumber", e.target.value);
                }}
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                sx={{ width: "100%" }}
                label="Address"
                value={currentUsers?.data?.address}
                onChange={(e) => {
                  handleChnage("address", e.target.value);
                }}
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                sx={{ width: "100%" }}
                label="City"
                value={currentUsers?.data?.city}
                onChange={(e) => {
                  handleChnage("city", e.target.value);
                }}
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                value={currentUsers?.data?.email}
                disabled
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                sx={{ width: "100%" }}
                label="Zip Code"
                value={currentUsers?.data?.zipCode}
                onChange={(e) => {
                  handleChnage("zipCode", e.target.value);
                }}
              />
            </Grid>
            <Grid item lg={12}>
              <Button variant="contained" onClick={updateDoc}>
                UPDATE
              </Button>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 700,
              fontFamily: "Poppins",
              marginY: "1rem",
              color: "black",
            }}
          >
            Seller Name :
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontFamily: "Poppins",
              color: "black",
            }}
          >
            {seller && seller}
          </Typography>
        </Container>
      </Box>
    </Dialog>
  );
};

export default ClientDetailsModal;
