import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { BillInterface } from "../models/IBill";
import { format } from 'date-fns'



function Bills() {
  // const classes = useStyles();
  const [bills, setBills] = useState<BillInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getBills = async () => {
    fetch(`${apiUrl}/bills`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setBills(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getBills();
  }, []);

  return (
    <div>
      <Container sx={{ marginTop: 2 }} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการจดมิเตอร์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/bill/create"
              variant="contained"
              color="primary"
            >
              ตารางมิเตอร์
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="2%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="18%">
                  ผู้เช่า
                </TableCell>
                <TableCell align="center" width="9%">
                  เลขห้อง
                </TableCell>
                <TableCell align="center" width="9%">
                  เบอร์โทร
                </TableCell>
                <TableCell align="center" width="9%">
                  ค่าเช่าห้อง
                </TableCell>
                <TableCell align="center" width="9%">
                  เฟอร์นิเจอร์
                </TableCell>
                <TableCell align="center" width="9%">
                  ครั้งก่อน
                </TableCell>
                <TableCell align="center" width="9%">
                  ที่จด
                </TableCell>
                <TableCell align="center" width="9%">
                  ที่ใช้
                </TableCell>
                <TableCell align="center" width="9%">
                  หน่วยละ
                </TableCell>
                <TableCell align="center" width="9%">
                  ค่าไฟ
                </TableCell>
                <TableCell align="center" width="9%">
                  ค่าน้ำ
                </TableCell>
                <TableCell align="center" width="9%">
                  รวม
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((item: BillInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Meter.Manage.Room}</TableCell>
                  <TableCell align="center">{item.Meter.User.Name}</TableCell>
                  <TableCell align="center">{item.Meter.User.Tel}</TableCell>
                  <TableCell align="center">{item.Meter.Manage.Price}</TableCell>
                  <TableCell align="center">{item.Furniture.Price}</TableCell>
                  <TableCell align="center">{item.Meter.After}</TableCell>
                  <TableCell align="center">{item.Meter.Before}</TableCell>
                  <TableCell align="center">{item.Meter.Total}</TableCell>
                  <TableCell align="center">{item.Meter.Unit}</TableCell>
                  <TableCell align="center">{item.Meter.Electric}</TableCell>
                  <TableCell align="center">{item.Meter.Water}</TableCell>
                  <TableCell align="center">{item.Cost}</TableCell>
                  <TableCell align="center">{format((new Date(item.BillTime)), 'dd MMMM yyyy hh:mm')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Bills;