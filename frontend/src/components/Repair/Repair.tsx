import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Snackbar from "@mui/material/Snackbar";
import { RepairInterface } from "../../models/IRepair";
import { format } from 'date-fns'
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Repairs() {
  const [repairs, setRepairs] = useState<RepairInterface[]>([]);
  let navigate = useNavigate();
  const { id } = useParams();
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

  const getRepairs = async () => {
    fetch(`${apiUrl}/repairs`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRepairs(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const DeleteRepair = async (id: string | number | undefined) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/repairs/${id}`, requestOptions)
      .then((response) => response.json())
      .then(
        (res) => {
          if (res.data) {
            setSuccess(true)
            console.log("ยกเลิกสำเร็จ")
            setErrorMessage("")
          }
          else {
            setErrorMessage(res.error)
            setError(true)
            console.log("ยกเลิกไม่สำเร็จ")
          }
          getRepairs();
        }
      )

  }

  useEffect(() => {
    getRepairs();
  }, []);

  function moment(LeaseTime: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <Box sx={{
      backgroundImage:
      "url(https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg?w=1380&t=st=1677247672~exp=1677248272~hmac=de25a4fe6866a5104de56a8459541a0dda6f1bcea0aa2d0f1cf147ba4c5602a2)",
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
              <b>การแจ้งซ่อม</b>
            </Typography>
          </Box>

          <Box>
            <Button
              component={RouterLink}
              to="/repair/create"
              variant="contained"
              color="primary"
              sx={{
                fontFamily: "PK Krung Thep Medium",
                marginX: "50px",
              }}
            >
              <b>การแจ้งซ่อม</b>
            </Button>
          </Box>
        </Box>


        <TableContainer 
          sx={{
            mt: '20px',
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
                <TableCell align="center" width="2%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="18%">
                  ชื่อ - นามสกุล
                </TableCell>
                <TableCell align="center" width="10%">
                  ห้อง
                </TableCell>
                <TableCell align="center" width="15%">
                  เฟอร์นิเจอร์
                </TableCell>
                <TableCell align="center" width="20%">
                  ระบุรายละเอียดเพิ่มเติม
                </TableCell>
                <TableCell align="center" width="20%">
                  เวลาที่แจ้งซ่อม
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repairs.map((item: RepairInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.Resident.Manage.Room.Number}</TableCell>
                  <TableCell align="center">{item.Object.Name}</TableCell>
                  <TableCell align="center">{item.Detail}</TableCell>
                  <TableCell align="center">{format((new Date(item.Repairtime)), 'dd MMMM yyyy hh:mm')} </TableCell>

                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<SaveAsOutlinedIcon />}
                    sx={{
                      fontFamily: "PK Krung Thep Medium",
                      fontSize: 20,
                      borderRadius: 20,
                      fontWeight: "bold",
                      color: 'black',
                      width: '100px',
                      marginBottom: 1,
                      borderColor: 'black',
                      '&:hover': {
                        background: 'rgba(0, 208, 132, 0.5)',
                        borderColor: 'rgba(0, 208, 132, 0.4)',
                      },
                    }}
                    onClick={() => navigate(`${item.ID}`)}
                  >
                    แก้ไข
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<DeleteIcon />}
                    sx={{
                      fontFamily: "PK Krung Thep Medium",
                      fontSize: 20,
                      borderRadius: 20,
                      fontWeight: "bold",
                      marginTop: 1,
                      width: '100px',
                      color: 'black',
                      borderColor: 'black',
                      '&:hover': {
                        background: 'rgba(0, 208, 132, 0.5)',
                        borderColor: 'rgba(0, 208, 132, 0.4)',
                      },
                    }}
                    aria-label="delete"
                    onClick={() => DeleteRepair(item.ID)}
                  >
                    ลบ
                  </Button>




                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Repairs;