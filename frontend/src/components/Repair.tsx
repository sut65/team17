import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { RepairInterface } from "../models/IRepair";
import { format } from 'date-fns'




function Repairs() {
  const [repairs, setRepairs] = useState<RepairInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
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

  useEffect(() => { 
    getRepairs(); 
  }, []);

  function moment(LeaseTime: any) {
    throw new Error("Function not implemented.");
  }

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
              การแจ้งซ่อม
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/repair/create"
              variant="contained"
              color="primary"
            >
              การแจ้งซ่อม
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
                  <TableCell align="center">{item.Resident.Room}</TableCell>
                  <TableCell align="center">{item.Object.Name}</TableCell>
                  <TableCell align="center">{item.Detail}</TableCell>
                  <TableCell align="center">{format((new Date(item.Repairtime)), 'dd MMMM yyyy hh:mm')} </TableCell>
                  
                  
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Repairs;