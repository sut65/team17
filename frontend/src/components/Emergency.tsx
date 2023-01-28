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
import { EmergencyInterface } from "../models/IEmergency";
import { format } from 'date-fns'




function Emergencys() {
  const [emergencys, setEmergencys] = useState<EmergencyInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getEmergencys = async () => {
    fetch(`${apiUrl}/emergencies`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setEmergencys(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => { 
    getEmergencys(); 
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
              การแจ้งเหตุฉุกเฉิน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/emergencie/create"
              variant="contained"
              color="primary"
            >
              การแจ้งเหตุฉุกเฉิน
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
                  ประเภทเหตุฉุกเฉิน
                </TableCell>
                <TableCell align="center" width="20%">
                  ระบุรายละเอียดเพิ่มเติม
                </TableCell>
                <TableCell align="center" width="20%">
                  วันที่แจ้งเหตุฉุกเฉิน
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emergencys.map((item: EmergencyInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.Resident.Room}</TableCell>
                  <TableCell align="center">{item.Emergencytype.Name}</TableCell>
                  <TableCell align="center">{item.Detail}</TableCell>
                  <TableCell align="center">{format((new Date(item.Emergencytime)), 'dd MMMM yyyy hh:mm')} </TableCell>
                  
                  
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Emergencys;