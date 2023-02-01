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
import { MeterInterface } from "../models/IMeter";
import { format } from 'date-fns'



function Meters() {
  // const classes = useStyles();
  const [meters, setMeters] = useState<MeterInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getMeters = async () => {
    fetch(`${apiUrl}/meters`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setMeters(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getMeters();
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
              to="/meter/create"
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
                  ผู้บันทึกข้อมูล
                </TableCell>
                <TableCell align="center" width="9%">
                  เลขห้อง
                </TableCell>
                <TableCell align="center" width="9%">
                  ชื่อผู้เช่า
                </TableCell>
                <TableCell align="center" width="9%">
                  เบอร์โทร
                </TableCell>
                <TableCell align="center" width="9%">
                  มิเตอร์ครั้งก่อน
                </TableCell>
                <TableCell align="center" width="9%">
                  มิเตอร์ที่จดได้
                </TableCell>
                <TableCell align="center" width="9%">
                  จำนวนมิเตอร์ที่ใช้
                </TableCell>
                <TableCell align="center" width="9%">
                  ราคาต่อหน่วย
                </TableCell>
                <TableCell align="center" width="9%">
                  ค่าไฟ
                </TableCell>
                <TableCell align="center" width="9%">
                  ค่านํ้า(เหมา)
                </TableCell>
                <TableCell align="center" width="9%">
                  เดือนที่ใช้
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meters.map((item: MeterInterface) => (
                <TableRow key={item.ID}>//
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.Manage.Room.Number}</TableCell>
                  <TableCell align="center">{item.Manage.Price}</TableCell>
                  <TableCell align="center">{item.Before}</TableCell>
                  <TableCell align="center">{item.After}</TableCell>
                  <TableCell align="center">{item.Unit}</TableCell>
                  <TableCell align="center">{item.Electric}</TableCell>
                  <TableCell align="center">{item.Water}</TableCell>
                  <TableCell align="center">{format((new Date(item.MeterTime)), 'dd MMMM yyyy hh:mm')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Meters;