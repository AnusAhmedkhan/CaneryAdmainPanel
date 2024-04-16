import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Grid, TextField } from "@mui/material";
const RemainderCard = ({ clientName, sellerName, date, description }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

    // Format the date
    const formattedDate = date.toLocaleString("en-US", {
      timeZone: "UTC",
      timeZoneName: "short",
    });

    return formattedDate;
  };
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "20px",
        boxShadow: 3,
        background:
          "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
      }}
    >
      <Box sx={styles.absoluteBox}></Box>
      <CardContent>
        <Typography sx={[styles.typo]} gutterBottom>
          Seller Name: {sellerName}
        </Typography>
        <Typography sx={[styles.typo]} gutterBottom>
          Client Name: {clientName}
        </Typography>

        <Typography
          sx={[styles.typo, { color: "white", fontWeight: 600 }]}
          gutterBottom
        >
          Date: {formatDate(date).split(",")[0]}
        </Typography>
        <Typography sx={[styles.typo, { minHeight: "80px" }]} gutterBottom>
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RemainderCard;
const styles = {
  typo: {
    fontFamily: "'poppins'",
    fontSize: "20px",
    color: "white",
  },
  appointBtn: {
    marginTop: "10px",
    width: "100%",
    fontFamily: "'poppins'",

    background:
      "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    color: "white",

    fontSize: "15px",
  },
  typo2: {
    fontFamily: "'poppins'",
    fontSize: "15px",
    marginTop: "5px",
    fontWeight: 600,
    fontSize: "20px",
  },
  absoluteBox: {
    background: "#02298A",
    width: "200px",
    height: "200px",
    borderRadius: "100%",
    position: "absolute",
    bottom: -40,
    left: -100,
    opacity: 0.5,
  },
};
