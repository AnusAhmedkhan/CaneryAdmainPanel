import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Box, Typography, Chip } from "@mui/material";
import { handleRequest } from "../../Services/UserServices/User";
import toast from "react-hot-toast";

export default function WithdrawalDataTable({ requests, getData }) {
  console.log(requests, "request");

  const handleWithdrawalRequest = async (
    amount,
    userId,
    docId,
    rejectRequest
  ) => {
    const response = await handleRequest(amount, userId, docId, rejectRequest);
    console.log(response, "response");

    if (response.statusCode === 200) {
      toast.success(response.message, { duration: 70000 });
      getData();
    } else {
      toast.error(response.message);
      getData();
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={style.cellHead}>Name</TableCell>
              <TableCell sx={style.cellHead} align="center">
                Amount
              </TableCell>
              <TableCell align="center" sx={style.cellHead}>
                Status
              </TableCell>

              <TableCell sx={style.cellHead} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests ? (
              requests?.map((row) => (
                <TableRow
                  key={row?.data?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row?.data?.name}</TableCell>
                  <TableCell align="center">{row?.data?.price}</TableCell>
                  <TableCell align="center">
                    <Chip label={row?.data?.status} />
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { lg: "row", xs: "column" },
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        gap: "14px",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleWithdrawalRequest(
                            row?.data?.price,
                            row?.data?.uid,
                            row?.data?.id,
                            false
                          )
                        }
                      >
                        Accept
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "red",
                          ":hover": {
                            backgroundColor: "red",
                          },
                        }}
                        onClick={() =>
                          handleWithdrawalRequest(
                            row?.data?.price,
                            row?.data?.uid,
                            row?.data?.id,
                            true
                          )
                        }
                      >
                        Reject
                      </Button>
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
    </>
  );
}
const style = {
  cellHead: {
    fontFamily: "'Poppins'",
    fontSize: 18,
    fontWeight: 600,
  },
};
