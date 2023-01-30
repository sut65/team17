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
import {FurnitureInterface } from "../models/IFurniture";
import moment from "moment";

function Furnitures() {
  const [furnitures, setFurnitures] = useState<FurnitureInterface[]>([]);
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getFurnitures = async () => {
    fetch(`${apiUrl}/furnitures`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setFurnitures(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getFurnitures();
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
              ระบบเบิกจ่ายอุปกรณ์ในห้องพัก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/furniture/create"
              variant="contained"
              color="primary"
            >
              เบิกจ่ายอุปกรณ์
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
                  เฟอร์นิเจอร์ 
                </TableCell>
                <TableCell align="center" width="15%">
                  จำนวนเช่า
                </TableCell>
                <TableCell align="center" width="15%">
                  ราคา
                </TableCell>
                <TableCell align="center" width="20%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {furnitures.map((item: FurnitureInterface) => (
                <TableRow key={item.ID}>
                <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.User.Tel}</TableCell>
                  <TableCell align="center">{item.Room.Number}</TableCell>
                  <TableCell align="center">{item.Equipment.Equipment}</TableCell>
                  <TableCell align="center">{item.Amount.Amount}</TableCell>
                  <TableCell align="center">{item.Equipment.Price}</TableCell>
                <TableCell align="center">{moment(item.FurnitureTime).format('DD MMMM yyyy hh:mm')}</TableCell>
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

export default Furnitures;

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