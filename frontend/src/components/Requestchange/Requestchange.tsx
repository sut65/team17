import React, { useEffect, useState } from "react";
import { Link as RouterLink,useNavigate, } from "react-router-dom";
import { useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Grid from '@mui/material/Unstable_Grid2';
import { deepOrange, deepPurple, green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { RequestchangeInterface } from "../../models/IRequestchange";



import { format } from 'date-fns'
import moment from "moment";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Requestchange() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [requestchanges, setRequestchanges] = useState<RequestchangeInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getRequestchanges = async () => {
    fetch(`${apiUrl}/requestchanges`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setRequestchanges(res.data);
        } else {
          console.log("else");
        }
      });
  };


  const DeleteRequestchange = async (id: string | number | undefined) => {
    const requestOptions = {
       method: "DELETE",
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
       },
    };

    fetch(`${apiUrl}/requestchanges/${id}`, requestOptions)
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
             getRequestchanges();
          }
       )

 }


  useEffect(() => {
    getRequestchanges();
  }, []);

  return (
    <div>

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

    <Container sx={{ marginTop: 2 }} maxWidth="md">
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            ข้อมูลการแจ้งย้ายห้อง
          </Typography>
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to="/requestchange/create"
            variant="contained"
            color="primary"
          >
            เพิ่มข้อมูล
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ minWidth: 650 }}>
        <Table sx={{ marginTop: 2 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="center" width="2%">
                ลำดับ
              </TableCell>
              <TableCell align="center" width="15%">
                ชื่อ
              </TableCell>
              <TableCell align="center" width="10%">
                ห้องพัก
              </TableCell>
              <TableCell align="center" width="20%">
                สาเหตุ
              </TableCell>
              <TableCell align="center" width="20%">
                รายละเอียด
              </TableCell>
              
              <TableCell align="center" width="20%">
                แก้ไข
              </TableCell>
              <TableCell align="center" width="20%">
                Delete
              </TableCell>
        
            </TableRow>
          </TableHead>
          <TableBody>
            {requestchanges.map((item: RequestchangeInterface) => (
              <TableRow key={item.ID}>
              <TableCell align="center">{item.ID}</TableCell>
                <TableCell align="center">{item.User.Name}</TableCell>
                <TableCell align="center">{item.Room.Number}</TableCell>
                <TableCell align="center">{item.Reason.Reason}</TableCell>
                <TableCell align="center">{item.Detail}</TableCell>
                <TableCell align="center">
                <IconButton aria-label="แก้ไข" size="large" 
                sx={{
                  background: 'white',   
                           '&:hover': {
                              background: "#24e1f9",
                              color: "white",
                              
                           },
               
                }} onClick={() => navigate(`${item.ID}`)} color="info">
                <EditIcon fontSize="inherit" />
                </IconButton>
                </TableCell>

                <TableCell align="center">
                <IconButton  aria-label="delete" size="large"
                sx={{
                  background: 'white',   
                           '&:hover': {
                              background: "#ff3838",
                              color: "white",
                              
                           },
               
                }} onClick={() => DeleteRequestchange(item.ID)} color="error">
                <DeleteIcon fontSize="inherit" />
                </IconButton>
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </div>
  );
}
export default Requestchange;