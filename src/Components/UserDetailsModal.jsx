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
import { FaEdit } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { updateUserDoc } from "../Services/UserServices/User";
import toast from "react-hot-toast";
import { storage } from "../Firebase/firebase.config";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditDetails = ({ currentUsers, setIsChanges, handleClose }) => {
  const [currentUser, setCurrentUser] = React.useState(currentUsers);
  const normalizeAvailabilityData = (data) => {
    return Object.keys(data).map((day) => ({
      day,
      startTime: data[day].startTime,
      endTime: data[day].endTime,
    }));
  };

  const normalizedAvailabilityData = normalizeAvailabilityData(
    currentUser?.data?.availability
  );
  const handleImage = (e) => {
    let image = e.target.files[0];
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);

      //   const uploadTask = uploadBytes(storageRef, image);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setCurrentUser({
              ...currentUser,
              data: {
                ...currentUser.data,
                ["imageURL"]: downloadURL,
              },
            });
          });
        }
      );
    }
    console.log(image.name);
  };
  const handleChange = (e, key) => {
    setCurrentUser({
      ...currentUser,
      data: {
        ...currentUser.data,
        [key]: e.target.value,
      },
    });
  };

  const [editedAvailability, setEditedAvailability] = React.useState({});

  const handleInputChange = (day, field, value) => {
    const updatedAvailability = {
      ...currentUser.data.availability,
      [day]: {
        ...currentUser.data.availability[day],
        [field]: value,
      },
    };

    setCurrentUser({
      ...currentUser,
      data: {
        ...currentUser.data,
        availability: updatedAvailability,
      },
    });
  };
  const handleAddNewAvailability = () => {
    const newDay = prompt("Enter a new day (e.g., Monday)");

    if (newDay) {
      // Check if the entered day already exists in the current availability data
      if (currentUser.data.availability[newDay]) {
        alert(`"${newDay}" already exists. Please enter a different day.`);
        return;
      }

      // Add the new day with empty startTime and endTime
      setCurrentUser({
        ...currentUser,
        data: {
          ...currentUser.data,
          availability: {
            ...currentUser.data.availability,
            [newDay]: {
              startTime: "",
              endTime: "",
            },
          },
        },
      });
    }
  };

  const handleEdit = () => {
    updateUserDoc(currentUser)
      .then(() => {
        toast.success("User Updated Successfully");
        setIsChanges(true);
        handleClose();
      })
      .catch((err) => {
        toast.error("User Not Updated");
      });
  };
  React.useEffect(() => {
    console.log(currentUser, "current user");
  }, [currentUser]);

  return (
    <>
      <Box sx={style.detailBox}>
        <Container sx={style.container}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              sx={{
                flex: { lg: 1 },
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="input_wrapper">
                <label for="img">
                  Choose an image
                  <input
                    type="file"
                    name="img"
                    id="img"
                    onChange={(e) => handleImage(e)}
                  />
                </label>
              </div>
              <img
                src={currentUser?.data?.imageURL}
                alt="user"
                style={{
                  borderRadius: "20px",
                  marginBottom: "15px",
                  marginTop: "15px",
                  width: "250px",
                  height: "300px",
                }}
              />
            </Box>
            <Box sx={{ flex: { lg: 1 } }}>
              <TextField
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                value={currentUser?.data?.name}
                onChange={(e) => {
                  handleChange(e, "name");
                }}
                sx={{ marginY: "12px", width: "80%" }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={currentUser?.data?.email}
                onChange={(e) => {
                  handleChange(e, "email");
                }}
                sx={{ marginY: "12px", width: "80%" }}
              />
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e, "phoneNumber");
                }}
                value={currentUser?.data?.phoneNumber}
                sx={{ marginY: "12px", width: "80%" }}
              />
              <TextField
                id="outlined-basic"
                label="Bio"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e, "bio");
                }}
                value={currentUser?.data?.bio}
                sx={{ marginY: "12px", width: "80%" }}
              />
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e, "city");
                }}
                value={currentUser?.data?.city}
                sx={{ marginY: "12px", width: "80%" }}
              />
              <TextField
                id="outlined-basic"
                label="State"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e, "state");
                }}
                value={currentUser?.data?.state}
                sx={{ marginY: "12px", width: "80%" }}
              />
              <TextField
                id="outlined-basic"
                label="Bissuness Type"
                variant="outlined"
                value={currentUser?.data?.businessType}
                sx={{ marginY: "12px", width: "80%" }}
              />
            </Box>
            <Box sx={{ flex: { lg: 1 } }}>
              <Typography sx={style.key}>
                Availablity : <br />
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "start",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                {Object.keys(currentUser.data.availability).map((day) => (
                  <>
                    <div key={day}>
                      {console.log(Object.keys(currentUser.data.availability))}
                      <h3>
                        Day: {day}
                        {/* <input
                          type="text"
                          value={day}
                          onChange={(e) =>
                            handleInputChange(day, "day", e.target.value)
                          }
                          style={{
                            fontFamily: "Poppins",
                            marginLeft: "3px",
                            padding: "3px",
                            borderRadius: "5px",
                          }} */}
                      </h3>
                      <Typography sx={{ fontFamily: "Poppins" }}>
                        Start Time:
                      </Typography>
                      <input
                        type="text"
                        value={
                          editedAvailability.day?.startTime ||
                          currentUser.data.availability[day].startTime ||
                          ""
                        }
                        style={{
                          borderRadius: "5px",
                          padding: "3px",
                          fontFamily: "Poppins",
                        }}
                        onChange={(e) =>
                          handleInputChange(day, "startTime", e.target.value)
                        }
                      />

                      <Typography sx={{ fontFamily: "Poppins" }}>
                        End Time:
                      </Typography>
                      <input
                        type="text"
                        style={{
                          borderRadius: "5px",
                          padding: "3px",
                          fontFamily: "Poppins",
                        }}
                        value={
                          editedAvailability[day]?.endTime ||
                          currentUser.data.availability[day].endTime ||
                          ""
                        }
                        onChange={(e) =>
                          handleInputChange(day, "endTime", e.target.value)
                        }
                      />
                    </div>
                    <hr />
                  </>
                ))}
                <Button
                  variant="outlined"
                  onClick={handleAddNewAvailability}
                  sx={{ mt: 2 }}
                >
                  Add New Availability
                </Button>
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
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleEdit}
          >
            Save Edit
          </Button>
        </Container>
      </Box>
    </>
  );
};

const UserDetailsModal = ({ open, handleClose, currentUser, setIsChanges }) => {
  const [isEdit, setIsEdit] = React.useState(true);

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
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
            aria-label="close"
          >
            <Typography
              sx={{ ml: 2, flex: 1, fontFamily: "Poppins" }}
              variant="h6"
              component="div"
            >
              <FaEdit sx={{ color: "white" }} /> Edit
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      {isEdit ? (
        <Box sx={style.detailBox}>
          <Container sx={style.container}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ flex: { lg: 1 } }}>
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
              <Box sx={{ flex: { lg: 1 }, paddingLeft: "1rem" }}>
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
              <Box sx={{ flex: { lg: 1 } }}>
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
      ) : (
        <EditDetails
          currentUsers={currentUser}
          setIsChanges={setIsChanges}
          handleClose={handleClose}
        />
      )}
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
