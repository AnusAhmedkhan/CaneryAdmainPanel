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
import ClientDetailsModal from "./ClientDetailsModal";

const ClientDataTable = ({ clients, deleteClient }) => {
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
              <TableCell sx={style.cellHead} align="left">
                Full Name
              </TableCell>
              <TableCell align="left" sx={style.cellHead}>
                Email
              </TableCell>
              <TableCell sx={style.cellHead} align="left">
                City
              </TableCell>
              <TableCell sx={style.cellHead} align="left">
                Zip
              </TableCell>
              <TableCell sx={style.cellHead} align="left">
                Address
              </TableCell>
              <TableCell sx={style.cellHead} align="left">
                Phone
              </TableCell>
              <TableCell sx={style.cellHead} align="left">
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients && clients.length > 0 ? (
              clients?.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    {row?.data?.firstName} {row?.data?.lastName}
                  </TableCell>
                  <TableCell align="left">{row?.data?.email}</TableCell>
                  <TableCell align="left">{row?.data?.city}</TableCell>
                  <TableCell align="left">{row?.data?.zipCode}</TableCell>
                  <TableCell align="left">{row?.data?.address}</TableCell>
                  <TableCell align="left">{row?.data?.phoneNumber}</TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <Button
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
                            deleteClient(row?.id, false);
                          }}
                          sx={{
                            backgroundColor: "red",
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
                            deleteClient(row?.id, true);
                          }}
                          sx={{
                            backgroundColor: "red",
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
      <ClientDetailsModal
        open={open}
        handleClose={handleClose}
        currentUser={currentUser}
      />
    </>
  );
};

export default ClientDataTable;
const style = {
  cellHead: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: 600,
  },
};
