import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  const [payments, setPayments] = useState<PaymentInterface[]>([]);
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
        console.log(res.data);
        if (res.data) {
            setPayments(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div>
      <Container sx={{marginTop: 2}} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              การชำระเงิน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/payment/create"
              variant="contained"
              color="primary"
            >
              บันทึกการชำระเงิน
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
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((item: PaymentInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.Bill.Room}</TableCell>
                  <TableCell align="center">{item.Bill.Price}</TableCell>
                  <TableCell align="center">{item.Bill.Water}</TableCell>
                  <TableCell align="center">{item.Bill.Electic}</TableCell>
                  <TableCell align="center">{item.Bill.Furniture}</TableCell>
                  <TableCell align="center">{item.Bill.Total}</TableCell>
                  <TableCell align="center">{item.Method.Name}</TableCell>
                  <TableCell align="center">{item.Banking.Name}</TableCell>
                  <TableCell align="center">{item.Evidence}</TableCell>
                  <TableCell align="center">{format((new Date(item.PaymentTime)), 'dd MMMM yyyy hh:mm')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Payments;