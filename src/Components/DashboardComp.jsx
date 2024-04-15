import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Grid, TextField } from "@mui/material";
import { BsJustify } from "react-icons/bs";
import img from "../assets/comhiclipartqrhfw.jpg";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function DashboardComp({ name, bool, num }) {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "20px",
        boxShadow: 3,
        height: bool && "300px",
        // background: "#0573E3",
        background: bool ? "#03389D" : "#0573E3",
        "&::after": {
          position: "absolute",
          backgroundImage: `url(${img})`,
          top: 50,
          height: "200px",
          width: "200px",
        },
      }}
    >
      <Box sx={styles.absoluteBox}></Box>
      <Box sx={styles.absoluteBox2}></Box>
      <CardContent>
        <Box sx={styles.flex}>
          <Typography sx={[styles.typo, { fontSize: bool && "35px" }]}>
            {name}
          </Typography>
          <Typography sx={[styles.num, { fontSize: bool && "30px" }]}>
            {num}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
export default DashboardComp;
const styles = {
  typo: {
    fontFamily: "'poppins'",
    fontSize: "25px",
    color: "white",
    fontWeight: 600,
  },
  num: {
    fontFamily: "'poppins'",
    fontSize: "20px",
    color: "white",
    fontWeight: 500,
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
  flex: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingY: "40px",
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
    width: "210px",
    height: "210px",
    borderRadius: "100%",
    position: "absolute",
    top: "-85px",
    right: "-95px",
    opacity: 0.5,
  },
  absoluteBox2: {
    background: "#1976D2",
    width: "210px",
    height: "210px",
    borderRadius: "100%",
    position: "absolute",
    top: "-125px",
    right: "-15px",
    opacity: 0.5,
  },
};
