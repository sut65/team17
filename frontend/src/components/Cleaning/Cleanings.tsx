import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CleaningInterface } from "../../models/ICleaning";
import moment from "moment";

import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Cleanings() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [cleanings, setCleanings] = useState<CleaningInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const getCleanings = async () => {
    fetch(`${apiUrl}/cleanings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCleanings(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const DeleteCleanings = async (id: string | number | undefined) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/cleanings/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          console.log("ยกเลิกสำเร็จ");
          setErrorMessage("");
        } else {
          setErrorMessage(res.error);
          setError(true);
          console.log("ยกเลิกไม่สำเร็จ");
        }
        getCleanings();
      });
  };

  useEffect(() => {
    getCleanings();
  }, []);

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://images.hdqwalls.com/download/white-cube-pattern-4k-bu-1920x1080.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "80%",
          mt: "60px",
          bgcolor: "rgba(190, 190, 190, 0.8)",
          borderRadius: "30px",
          boxShadow: 20,
          // display: "table-column-group",
          // justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            mt: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="warning">
              ลบข้อมูลเรียบร้อย
            </Alert>
          </Snackbar>
          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
              ลบข้อมูลผิดพลาด
            </Alert>
          </Snackbar>

          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: 30,
                marginX: "50px",
              }}
            >
              <b>ระบบจองบริการทำความความสะอาด</b>
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/cleaning/create"
              variant="contained"
              color="primary"
              sx={{
                fontFamily: "PK Krung Thep Medium",
                marginX: "50px",
              }}
            >
              จองทำความสะอาด
            </Button>
          </Box>
        </Box>

        <TableContainer
          sx={{
            ml: "auto",
            mr: "auto",
            width: "90%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    marginTop: 2,
                    fontFamily: "PK Krung Thep Medium",
                    fontWeight: "bold",
                  }}
                  align="center"
                  width="2%"
                >
                  ลำดับ
                </TableCell>
                <TableCell
                  sx={{
                    marginTop: 2,
                    fontFamily: "PK Krung Thep Medium",
                    fontWeight: "bold",
                  }}
                  align="center"
                  width="13%"
                >
                  ชื่อ - นามสกุล
                </TableCell>
                <TableCell
                  sx={{
                    marginTop: 2,
                    fontFamily: "PK Krung Thep Medium",
                    fontWeight: "bold",
                  }}
                  align="center"
                  width="7%"
                >
                  เบอร์โทร
                </TableCell>
                <TableCell
                  sx={{
                    marginTop: 2,
                    fontFamily: "PK Krung Thep Medium",
                    fontWeight: "bold",
                  }}
                  align="center"
                  width="8%"
                >
                  ห้องพัก
                </TableCell>
                <TableCell
                  sx={{
                    marginTop: 2,
                    fontFamily: "PK Krung Thep Medium",
                    fontWeight: "bold",
                  }}
                  align="center"
                  width="18%"
                >
                  ประเภทการทำความสะอาด
                </TableCell>
                <TableCell
                  sx={{
                    marginTop: 2,
                    fontFamily: "PK Krung Thep Medium",
                    fontWeight: "bold",
                  }}
                  align="center"
                  width="22%"
                >
                  บริเวณที่ต้องการทำความสะอาด
                </TableCell>
                <TableCell
                  sx={{
                    marginTop: 2,
                    fontFamily: "PK Krung Thep Medium",
                    fontWeight: "bold",
                  }}
                  align="center"
                  width="13%"
                >
                  เพิ่มเติม
                </TableCell>
                <TableCell
                  sx={{
                    marginTop: 2,
                    fontFamily: "PK Krung Thep Medium",
                    fontWeight: "bold",
                  }}
                  align="center"
                  width="25%"
                >
                  วันที่และเวลา
                </TableCell>
                <TableCell sx={{}} align="center" width="10%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cleanings.map((item: CleaningInterface) => (
                <TableRow key={item.ID}>
                  <TableCell
                    sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                    align="center"
                  >
                    {item.ID}
                  </TableCell>
                  <TableCell
                    sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                    align="center"
                  >
                    {item.User.Name}
                  </TableCell>
                  <TableCell
                    sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                    align="center"
                  >
                    {item.User.Tel}
                  </TableCell>
                  <TableCell
                    sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                    align="center"
                  >
                    {item.Room.Number}
                  </TableCell>
                  <TableCell
                    sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                    align="center"
                  >
                    {item.Kind.Kind}
                  </TableCell>
                  <TableCell
                    sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                    align="center"
                  >
                    {item.Area.Area}
                  </TableCell>
                  <TableCell
                    sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                    align="center"
                  >
                    {item.Detail}
                  </TableCell>
                  <TableCell
                    sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                    align="center"
                  >
                    {moment(item.CleaningTime).format("DD MMMM yyyy hh:mm")}
                  </TableCell>
                  <TableCell align="center" sx={{ mt: 2, display: "flex" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SaveAsOutlinedIcon />}
                      sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 10,
                        borderRadius: 20,
                        fontWeight: "bold",
                        color: "black",
                        width: "auto",
                        // marginTop: "50%",
                        // marginBottom: "4px",
                        borderColor: "black",
                        "&:hover": {
                          background: "rgba(0, 208, 132, 0.5)",
                          borderColor: "rgba(0, 208, 132, 0.4)",
                        },
                      }}
                      onClick={() => navigate(`${item.ID}`)}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      sx={{
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 10,
                        borderRadius: 20,
                        fontWeight: "bold",
                        color: "black",
                        width: "auto",
                        borderColor: "black",
                        "&:hover": {
                          background: "rgba(205, 92, 92, 1)",
                          borderColor: "rgba(205, 92, 92, 1)",
                        },
                      }}
                      onClick={() => DeleteCleanings(`${item.ID}`)}
                    >
                      ลบ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
//dw
export default Cleanings;
