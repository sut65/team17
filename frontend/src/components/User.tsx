import React , { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { UserInterface } from "../models/IUser";
import { format } from 'date-fns'
import moment from "moment";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink,useNavigate, } from "react-router-dom";
import { useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       marginTop: theme.spacing(2),
//     },
//     table: {
//       minWidth: 650,
//     },
//     tableSpace: {
//       marginTop: 20,
//     },
//   })
// );

function Users() {
  // const classes = useStyles();
  let navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState<UserInterface[]>([]);

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

  const getUsers = async () => {
    fetch(`${apiUrl}/users`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const DeleteUser = async (id: string | number | undefined) => {
    const requestOptions = {
       method: "DELETE",
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
       },
    };

    fetch(`${apiUrl}/users/${id}`, requestOptions)
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
             getUsers();
          }
       )
 }

  useEffect(() => {
    getUsers();
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

      <Container sx={{marginTop: 2}} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกข้อมูลผู้เช่า
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/user/create"
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูลผู้เช่า
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ minWidth: 650}}>
          <Table sx={{marginTop: 2}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="2%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="5%">
                  คำนำหน้า
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อ-สกุล
                </TableCell>
                <TableCell align="center" width="10%">
                  วัน/เดือน/ปีเกิด
                </TableCell>
                <TableCell align="center" width="5%">
                  เพศ
                </TableCell>
                <TableCell align="center" width="5%">
                  สถานภาพการสมรส
                </TableCell>
                <TableCell align="center" width="15%">
                  อีเมล
                </TableCell>
                <TableCell align="center" width="10%">
                  เบอร์โทรศัพท์
                </TableCell>
                <TableCell align="center" width="18%">
                  ที่อยู่ตามทะเบียนบ้าน
                </TableCell>
                <TableCell align="center" width="10%">
                  แก้ไข
                </TableCell>
                <TableCell align="center" width="10%">
                  ลบ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item: UserInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Title.Name}</TableCell>
                  <TableCell align="center">{item.Name}</TableCell>
                  <TableCell align="center">{moment(item.BirthdayTime).format('DD MM yyyy')}</TableCell>
                  <TableCell align="center">{item.Gender.Name}</TableCell>
                  <TableCell align="center">{item.Status.Name}</TableCell>
                  <TableCell align="center">{item.Email}</TableCell>
                  <TableCell align="center">{item.Tel}</TableCell>
                  <TableCell align="center">{item.Address}</TableCell>

                  
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
               
                }} onClick={() => DeleteUser(item.ID)} color="error">
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

export default Users;