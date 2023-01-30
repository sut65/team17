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
import { CleaningInterface } from "../models/ICleaning";
import moment from "moment";

function Cleanings() {
  const [cleanings, setCleanings] = useState<CleaningInterface[]>([]);
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getCleanings = async () => {
    fetch(`${apiUrl}/cleanings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setCleanings(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getCleanings();
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
              ระบบจองบริการทำความความสะอาด
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/cleaning/create"
              variant="contained"
              color="primary"
            >
              จองทำความสะอาด
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
                  เบอร์โทร
                </TableCell>
                <TableCell align="center" width="5%">
                  ห้องพัก
                </TableCell>
                <TableCell align="center" width="15%">
                  ประเภทการทำความสะอาด
                </TableCell>
                <TableCell align="center" width="15%">
                  บริเวณที่ต้องการทำความสะอาด
                </TableCell>
                <TableCell align="center" width="15%">
                  เพิ่มเติม
                </TableCell>
                <TableCell align="center" width="20%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cleanings.map((item: CleaningInterface) => (
                <TableRow key={item.ID}>
                <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.User.Tel}</TableCell>
                  <TableCell align="center">{item.Room.Number}</TableCell>
                  <TableCell align="center">{item.Kind.Kind}</TableCell>
                  <TableCell align="center">{item.Area.Area}</TableCell>
                  <TableCell align="center">{item.Detail}</TableCell>
                <TableCell align="center">{moment(item.CleaningTime).format('DD MMMM yyyy hh:mm')}</TableCell>
                {/* <TableCell align="center">{format((new Date(item.BookingTime)), 'DD MMMM yyyy hh:mm')}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
//dw
export default Cleanings;

//   return (
//     <div>
//       <Container maxWidth="md">
//         <Box display="flex">
//           <Box flexGrow={1}>
//             <Typography
//               component="h2"
//               variant="h6"
//               color="primary"
//               gutterBottom
//             >
//               การจองคิว
//             </Typography>
//           </Box>
//           <Box>
//             <Button
//               component={RouterLink}
//               to="/booking/create"
//               variant="contained"
//               color="primary"
//             >
//               จองคิว
//             </Button>
//           </Box>
//         </Box>
//         <TableContainer component={Paper} className={classes.tableSpace}>
//           <Table className={classes.table} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center" width="2%">
//                   ลำดับ
//                 </TableCell>
//                 <TableCell align="center" width="18%">
//                   ชื่อ - นามสกุล
//                 </TableCell>
//                 <TableCell align="center" width="10%">
//                   เบอร์
//                 </TableCell>
//                 <TableCell align="center" width="15%">
//                   แผนก
//                 </TableCell>
//                 <TableCell align="center" width="20%">
//                   โรค
//                 </TableCell>
//                 <TableCell align="center" width="20%">
//                   อาการเพิ่มเติม
//                 </TableCell>
//                 <TableCell align="center" width="30%">
//                   วันที่และเวลา
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {bookings.map((item: BookingInterface) => (
//                 <TableRow key={item.ID}>
//                   <TableCell align="center">{item.ID}</TableCell>
//                   <TableCell align="center">{item.User.Name}</TableCell>
//                   <TableCell align="center">{item.User.Tel}</TableCell>
//                   <TableCell align="center">{item.Department.Name}</TableCell>
//                   <TableCell align="center">{item.Symptom.SymptomName}</TableCell>
//                   <TableCell align="center">{item.Detail}</TableCell>
//                   <TableCell align="center">{format((new Date(item.BookingTime)), 'dd MMMM yyyy hh:mm')}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Container>
//     </div>
//   );
// }

// export default Bookings;