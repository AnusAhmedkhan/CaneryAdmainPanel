import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaFirstOrderAlt } from "react-icons/fa";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase.config";
import toast from "react-hot-toast";
// import { getDatabase } from "firebase/database";
const ServiceCard = ({ data, getData }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

    // Format the date
    const formattedDate = date.toLocaleString("en-US", {
      timeZone: "UTC",
      timeZoneName: "short",
    });

    return formattedDate;
  };
  const handleDelete = async (id) => {
    const docRef = doc(db, "service", id);
    try {
      await deleteDoc(docRef);
      toast.success("Delete Successfuly");
      getData();
    } catch (error) {}
  };
  return (
    <Box
      sx={{
        maxWidth: 400,
        minHeight: 500,
        position: "relative",
        boxShadow: 5,
        borderRadius: "10px",
        backgroundColor: "#F9F9F9",
        paddingY: "25px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Box sx={{ minHeight: "120px" }}>
          <Typography
            variant="h6"
            component="div"
            mb={2}
            sx={{
              fontFamily: "'poppins', sans-serif",
              color: "#022D8F",
              fontWeight: 600,
              fontSize: "22px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {data.service} - {data.category}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={1}
            sx={{
              fontFamily: "'poppins', sans-serif",
              color: "#022D8F",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Seller: <strong>{data.username}</strong>
          </Typography>
        </Box>
        <Divider />
        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
          sx={{ fontFamily: "'poppins', sans-serif" }}
        >
          <strong style={{ fontSize: "18px", color: "black" }}>
            Description:
          </strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "'poppins', sans-serif" }}
        >
          {data.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "'poppins', sans-serif" }}
        >
          <strong>Client:</strong> {data.firstName} {data.lastName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "'poppins', sans-serif" }}
        >
          <strong>Payment Type:</strong> {data.paymentType}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "'poppins', sans-serif" }}
        >
          <strong>Payment:</strong> ${data.payment}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "'poppins', sans-serif" }}
        >
          <strong>Date:</strong> {formatDate(data.datetime)}
        </Typography>
      </CardContent>
      <IconButton
        onClick={() => {
          handleDelete(data.id);
        }}
        aria-label="delete"
        sx={{
          position: "absolute",
          top: 0,
          right: 5,
          backgroundColor: "#fff",
          color: "#f44336",
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Box sx={styles.absoluteBox}>
        <FaFirstOrderAlt color="#FFF" size={"30px"} />
      </Box>
    </Box>
  );
};

export default ServiceCard;
const styles = {
  main: {
    backgroundColor: "#F9F9F9",
    height: "200px",
    padddingX: "20px",
  },
  absoluteBox: {
    background: "#023BA0",
    width: "70px",
    height: "70px",
    borderRadius: "100%",
    position: "absolute",
    top: "-34px",
    left: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
};
