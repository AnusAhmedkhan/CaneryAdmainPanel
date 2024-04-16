import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Grid, TextField } from "@mui/material";
const RemainderCard = () => {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "20px",
        boxShadow: 3,
        background: "#0573E3",
      }}
    >
      <Box sx={styles.absoluteBox}></Box>
      <CardContent>
        <Typography sx={[styles.typo]} gutterBottom>
          Client Name: {clientName}
        </Typography>
        <Typography sx={[styles.typo]} gutterBottom>
          Seller Name: {sellerName}
        </Typography>
        <Typography
          sx={[styles.typo, { color: "white", fontWeight: 600 }]}
          gutterBottom
        >
          Date: {date}
        </Typography>
        <Typography sx={[styles.typo, { minHeight: "100px" }]} gutterBottom>
          Description: {Description}
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
    right: -40,
    opacity: 0.5,
  },
};
