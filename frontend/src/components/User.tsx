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
import { UserInterface } from "../models/IUser";
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

function Users() {
  // const classes = useStyles();
  const [users, setUsers] = useState<UserInterface[]>([]);
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

  useEffect(() => {
    getUsers();
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
                  เลขบัตรประชาชน
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
                  รหัสผ่าน
                </TableCell>
                <TableCell align="center" width="10%">
                  เบอร์โทรศัพท์
                </TableCell>
                <TableCell align="center" width="18%">
                  ที่อยู่ตามทะเบียนบ้าน
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item: UserInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Title.Name}</TableCell>
                  <TableCell align="center">{item.Name}</TableCell>
                  <TableCell align="center">{item.Personal}</TableCell>
                  <TableCell align="center">{format((new Date(item.BirthdayTime)), 'dd MMMM yyyy hh:mm')}</TableCell>
                  <TableCell align="center">{item.Gender.Name}</TableCell>
                  <TableCell align="center">{item.Status.Name}</TableCell>
                  <TableCell align="center">{item.Email}</TableCell>
                  <TableCell align="center">{item.Password}</TableCell>
                  <TableCell align="center">{item.Tel}</TableCell>
                  <TableCell align="center">{item.Address}</TableCell>
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