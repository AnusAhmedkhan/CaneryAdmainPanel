import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import UserDetailsModal from "./UserDetailsModal";
import { deleteUserByUid } from "../Services/UserServices/User";
import Lottie from "lottie-react";
import Loading from "../Lottie/loading.json";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function UserDataTable({ users, deleteUser, setIsChanges }) {
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleModal = (user) => {
    setOpen(true);
    setCurrentUser(user);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={style.cellHead}>Profile Image</TableCell>
              <TableCell sx={style.cellHead} align="left">
                Full Name
              </TableCell>
              <TableCell align="left" sx={style.cellHead}>
                Email
              </TableCell>
              <TableCell sx={style.cellHead} align="left">
                City / State
              </TableCell>
              <TableCell sx={style.cellHead} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users?.map((row) => (
                <TableRow
                  key={row?.data?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar alt={row?.data?.name} src={row?.data?.imageURL} />
                  </TableCell>
                  <TableCell align="left">{row?.data?.name}</TableCell>
                  <TableCell align="left">{row?.data?.email}</TableCell>
                  <TableCell align="left">
                    {row?.data?.city} / {row?.data?.state}
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { lg: "row", xs: "column" },
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <Button
                        sx={{ width: "100%" }}
                        variant="contained"
                        onClick={() => {
                          handleModal(row);
                        }}
                      >
                        View Details
                      </Button>
                      {row?.data?.isShow && row?.data?.isShow === true ? (
                        <Button
                          variant="contained"
                          onClick={() => {
                            deleteUser(row?.id, false);
                          }}
                          sx={{
                            backgroundColor: "red",
                            width: "100%",
                            ":hover": {
                              backgroundColor: "red",
                            },
                          }}
                        >
                          Delete
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => {
                            deleteUser(row?.id, true);
                          }}
                          sx={{
                            backgroundColor: "red",
                            width: "100%",
                            ":hover": {
                              backgroundColor: "red",
                            },
                          }}
                        >
                          Blocked
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 25,
                    margin: "10px",
                    textAlign: "left",
                  }}
                >
                  Loading...
                </Typography>
              </Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <UserDetailsModal
        open={open}
        handleClose={handleClose}
        currentUser={currentUser}
        setIsChanges={setIsChanges}
      />
    </>
  );
}
const style = {
  cellHead: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: 600,
  },
};
