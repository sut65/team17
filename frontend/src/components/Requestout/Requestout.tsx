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
// import Grid from '@mui/material/Unstable_Grid2';
import { deepOrange, deepPurple, green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { RequestoutInterface } from "../../models/IRequestout";
// import { Divider } from "@mui/material";
// import { Chip } from "@material-ui/core";
// import Avatar from '@mui/material/Avatar';
// import { url } from "inspector";
// import { readBuilderProgram } from "typescript";

import { format } from 'date-fns'
import moment from "moment";

function Requestout() {
  const [requestouts, setRequestouts] = useState<RequestoutInterface[]>([]);
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getRequestouts = async () => {
    fetch(`${apiUrl}/requestouts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setRequestouts(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getRequestouts();
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
            ข้อมูลการแจ้งออก
          </Typography>
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to="/requestout/create"
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
                วันที่ออก
              </TableCell>
        
            </TableRow>
          </TableHead>
          <TableBody>
            {requestouts.map((item: RequestoutInterface) => (
              <TableRow key={item.ID}>
              <TableCell align="center">{item.ID}</TableCell>
                <TableCell align="center">{item.User.Name}</TableCell>
                <TableCell align="center">{item.Room.Number}</TableCell>
                <TableCell align="center">{item.Reason.Reason}</TableCell>
                <TableCell align="center">{item.Detail}</TableCell>
                
                <TableCell align="center">{moment(item.Outtime).format('DD MM yyyy')}</TableCell>
                <TableCell align="center">
                <IconButton aria-label="delete" size="large">
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
export default Requestout;