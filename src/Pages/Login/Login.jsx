import React, { useContext, useEffect, useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { Navigate, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { adminLogin } from "../../Services/AuthServices/Auth";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {

  const { user, setUser } = useContext(AuthContext);
  let initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Fill all the Fields");
      return;
    }
    const res = await adminLogin(email, password);
    if (res === true) {
      toast.success("Login Successful");
      setUser(true);
      navigate("/")
    } else {
      toast.error("Invalid Credentials");
    }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <Box sx={styles.mainScreen}>
      <Box sx={styles.LoginBox}>
        <Typography sx={styles.font}>Login</Typography>
        <Grid container rowSpacing={3} columnSpacing={4}>
          <Grid item xs={12} lg={12}>
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleForm}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleForm}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button sx={styles.btn} onClick={handleSubmit}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

const styles = {
  mainScreen: {
    height: "100vh",
    width: "100%",

    background:
      "linear-gradient(180deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  SignupBox: {
    paddingY: "40px",
    paddingX: "30px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "40%" },
    borderRadius: "7px",
    boxShadow: 3,
  },
  LoginBox: {
    paddingY: "40px",
    paddingX: "30px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "20%" },
    borderRadius: "7px",
    boxShadow: 3,
  },

  font: {
    fontFamily: "'poppins'",
    color: "black",
    fontSize: "30px",
    marginBottom: "30px",
    fontWeight: 600,
  },
  btn: {
    fontFamily: "'poppins'",
    width: "100%",
    background:
      "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    color: "white",
    paddingY: "10px",
    fontSize: "15px",
  },
  flex: {
    display: "flex",
    gap: "5px",
    fontFamily: "'poppins'",
  },

  logIn: {
    fontFamily: "'poppins'",
    color: "rgb(5,117,230,1)",
    fontWeight: 600,
    cursor: "pointer",
  },
};
