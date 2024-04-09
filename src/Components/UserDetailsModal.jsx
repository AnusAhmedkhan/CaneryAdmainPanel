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
import { Box, Container } from "@mui/material";
import Chip from "@mui/material/Chip";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserDetailsModal = ({ open, handleClose, currentUser }) => {
  const normalizeAvailabilityData = (data) => {
    if (data) {
      return Object.keys(data).map((day) => ({
        day,
        startTime: data[day].startTime,
        endTime: data[day].endTime,
      }));
    }
  };

  const normalizedAvailabilityData = normalizeAvailabilityData(
    currentUser?.data?.availability
  );
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
            {currentUser?.data?.name} Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={style.detailBox}>
        <Container sx={style.container}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ flex: 1 }}>
              <img
                src={currentUser?.data?.imageURL}
                alt="user"
                style={{
                  borderRadius: "20px",
                  marginBottom: "15px",
                  width: "350px",
                  height: "500px",
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={style.key}>
                Full Name : <br />
                <span style={{ opacity: 0.7, fontSize: "22px" }}>
                  {currentUser?.data?.name}
                </span>
              </Typography>
              <Typography sx={style.key}>
                Email : <br />
                <span style={{ opacity: 0.7, fontSize: "22px" }}>
                  {currentUser?.data?.email}
                </span>
              </Typography>
              <Typography sx={style.key}>
                Phone Number : <br />
                <span style={{ opacity: 0.7, fontSize: "22px" }}>
                  {currentUser?.data?.phoneNumber}
                </span>
              </Typography>
              <Typography sx={style.key}>
                Bio : <br />
                <span style={{ opacity: 0.7, fontSize: "22px" }}>
                  {currentUser?.data?.bio}
                </span>
              </Typography>
              <Typography sx={style.key}>
                City : <br />
                <span style={{ opacity: 0.7, fontSize: "22px" }}>
                  {currentUser?.data?.city}
                </span>
              </Typography>
              <Typography sx={style.key}>
                State : <br />
                <span style={{ opacity: 0.7, fontSize: "22px" }}>
                  {currentUser?.data?.state}
                </span>
              </Typography>
              <Typography sx={style.key}>
                Wallet Amount : <br />
                <span style={{ opacity: 0.7, fontSize: "22px" }}>
                  $ {currentUser?.data?.walletAmount}
                </span>
              </Typography>
              <Typography sx={style.key}>
                Bisuness Type : <br />
                <span style={{ opacity: 0.7, fontSize: "22px" }}>
                  {currentUser?.data?.businessType}
                </span>
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={style.key}>
                Availablity : <br />
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                {normalizedAvailabilityData &&
                  normalizedAvailabilityData?.map((dayData) => (
                    <Chip
                      key={dayData?.day}
                      label={`${dayData?.day}: ${dayData?.startTime} - ${dayData?.endTime}`}
                      variant="outlined"
                    />
                  ))}
              </Box>
              <Typography sx={style.key}>
                Bisuness Category : <br />
              </Typography>
              <ul>
                {currentUser?.data?.businessCategory &&
                  Object.entries(currentUser?.data?.businessCategory).map(
                    ([categoryName, services]) => (
                      <li key={categoryName}>
                        <strong style={{ fontFamily: "Poppins" }}>
                          {categoryName}
                        </strong>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "start",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginY: "5px",
                          }}
                        >
                          {Object.entries(services).map(
                            ([serviceName, value]) => (
                              <Chip
                                key={serviceName}
                                label={` ${serviceName}: ${value}`}
                                variant="outlined"
                              />
                            )
                          )}
                        </Box>
                      </li>
                    )
                  )}
              </ul>
            </Box>
          </Box>
        </Container>
      </Box>
    </Dialog>
  );
};

export default UserDetailsModal;
const style = {
  detailBox: {
    width: "100%",
    padding: "3rem",
  },
  container: {
    maxWidth: { lg: "1450px" },
  },
  key: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "19px",
    paddingBottom: "20px",
  },
};
