import React, { useEffect, useState } from "react";
// import { createStyles, makeStyles, Theme } from "@mui/material/styles";
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
import { PaymentInterface } from "../models/IPayment";
import { format } from 'date-fns'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink, useNavigate, } from "react-router-dom";
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

function Payments() {
  // const classes = useStyles();
  let navigate = useNavigate();
  const { id } = useParams();
  const [payments, setPayments] = useState<PaymentInterface[]>([]);
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

  const getPayments = async () => {
    fetch(`${apiUrl}/payments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("getPayments", res);
        if (res.data) {
          setPayments(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const DeletePayment = async (id: string | number | undefined) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/payments/${id}`, requestOptions)
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
          getPayments();
        }
      )
  }

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <Box sx={{
      backgroundImage:"url(https://i.pinimg.com/564x/c0/4a/5f/c04a5f27b605cc21aa55420a7f83318d.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: '100%',
      fontFamily: "PK Krung Thep Medium",
      fontSize: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

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

      <Box
        sx={{
          width: "90%",
          height: "80%",
          mt: "60px",
          bgcolor: 'rgba(255, 255, 255, 0.5)',
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
            justifyContent: 'center',
            alignItems: "center",
            
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: 30,
                ml: '50px',
              }}
            >
              <b>ระบบการชำระเงิน</b>
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/payment/create"
              variant="contained"
              color="primary"
              sx={{
                fontFamily: "PK Krung Thep Medium",
                mr: '30px',
              }}
            >
              บันทึกการชำระเงิน
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ marginTop: 2 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="2%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="15%">
                  ชื่อผู้เช่า
                </TableCell>
                <TableCell align="center" width="5%">
                  เลขห้อง
                </TableCell>
                <TableCell align="center" width="5%">
                  ค่าห้องพัก
                </TableCell>
                <TableCell align="center" width="5%">
                  ค่าน้ำ
                </TableCell>
                <TableCell align="center" width="5%">
                  ค่าไฟ
                </TableCell>
                <TableCell align="center" width="5%">
                  ค่าเฟอร์นิเจอร์
                </TableCell>
                <TableCell align="center" width="5%">
                  ยอดรวมชำระ
                </TableCell>
                <TableCell align="center" width="15%">
                  ช่องทางการชำระ
                </TableCell>
                <TableCell align="center" width="15%">
                  ธนาคาร
                </TableCell>
                <TableCell align="center" width="13%">
                  หลักฐานการชำระ
                </TableCell>
                <TableCell align="center" width="10%">
                  วันที่และเวลาที่บันทึก
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
              {payments.map((item: PaymentInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.Bill.Meter.Manage.Room.Number}</TableCell>
                  <TableCell align="center">{item.Bill.Meter.Manage.Price}</TableCell>
                  <TableCell align="center">{item.Bill.Meter.Water}</TableCell>
                  <TableCell align="center">{item.Bill.Meter.Electric}</TableCell>
                  <TableCell align="center">{item.Bill.Furniture.Equipment.Price}</TableCell>
                  <TableCell align="center">{item.Bill.Cost}</TableCell>
                  <TableCell align="center">{item.Method.Name}</TableCell>
                  <TableCell align="center">{item.Banking.Name}</TableCell>
                  <TableCell align="center"><a href={item.Evidence} download> download </a></TableCell>
                  <TableCell align="center">{format((new Date(item.PaymentTime)), 'dd MMMM yyyy hh:mm')}</TableCell>

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
                    <IconButton aria-label="delete" size="large"
                      sx={{
                        background: 'white',
                        '&:hover': {
                          background: "#ff3838",
                          color: "white",

                        },

                      }} onClick={() => DeletePayment(item.ID)} color="error">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
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

export default Payments;