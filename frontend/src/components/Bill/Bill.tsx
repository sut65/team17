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
import { BillInterface } from "../../models/IBill";
import { format } from 'date-fns'
import { useParams, useNavigate } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

function Bills() {
  // const classes = useStyles();
  let navigate = useNavigate();
   const { id } = useParams();
   const [bills, setBills] = useState<BillInterface[]>([]);
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

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

  const DeleteBill = async (id: string | number | undefined) => {
    const requestOptions = {
       method: "DELETE",
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
       },
    };

    fetch(`${apiUrl}/bills/${id}`, requestOptions)
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
             getBills();
          }
       )

 }

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
              ระบบบิลชำระค่าเช่า
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/bill/create"
              variant="contained"
              color="primary"
            >
              บันทึกบิลชำระค่าเช่า
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
                <TableCell align="center" width="9%">
                  เลขห้อง
                </TableCell>
                <TableCell align="center" width="18%">
                  ชื่อผู้เช่า
                </TableCell>
                
                <TableCell align="center" width="9%">
                  เบอร์โทร
                </TableCell>
                <TableCell align="center" width="9%">
                  ค่าห้องพัก
                </TableCell>
                <TableCell align="center" width="9%">
                  ค่าเช่าเฟอร์นิเจอร์
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
                  ค่าน้ำเหมา
                </TableCell>
                <TableCell align="center" width="9%">
                  ยอดรวม
                </TableCell>
                <TableCell align="center" width="9%">
                  วันที่บันทึก
                </TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((item: BillInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Meter.Manage.Room.Number}</TableCell>
                  <TableCell align="center">{item.Meter.User.Name}</TableCell>
                  <TableCell align="center">{item.Meter.User.Tel}</TableCell>
                  <TableCell align="center">{item.Meter.Manage.Price}</TableCell>
                  <TableCell align="center">{item.Furniture.Total}</TableCell>
                  <TableCell align="center">{item.Meter.After}</TableCell>
                  <TableCell align="center">{item.Meter.Before}</TableCell>
                  <TableCell align="center">{item.Meter.Total}</TableCell>
                  <TableCell align="center">{item.Meter.Unit}</TableCell>
                  <TableCell align="center">{item.Meter.Electric}</TableCell>
                  <TableCell align="center">{item.Meter.Water}</TableCell>
                  <TableCell align="center">{item.Cost}</TableCell>
                  <TableCell align="center">{format((new Date(item.BillTime)), 'dd MMMM yyyy hh:mm')}</TableCell>
                  <TableCell align="center">
                  <Button
                        variant="outlined"
                        size="medium"
                        startIcon={<SaveAsOutlinedIcon />}
                        sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: 20,
                           borderRadius: 20,
                           fontWeight: "bold",
                           color: 'black',
                           width: '100px',
                           marginBottom: 1,
                           borderColor: 'black',
                           '&:hover': {
                              background: 'rgba(0, 208, 132, 0.5)',
                              borderColor: 'rgba(0, 208, 132, 0.4)',
                           },
                        }}
                        onClick={() => navigate(`${item.ID}`)}
                     >
                        แก้ไข
                     </Button>

                     <Button
                        variant="outlined"
                        size="medium"
                        startIcon={<DeleteIcon />}
                        sx={{
                           fontFamily: "PK Krung Thep Medium",
                           fontSize: 20,
                           borderRadius: 20,
                           fontWeight: "bold",
                           marginTop: 1,
                           width: '100px',
                           color: 'black',
                           borderColor: 'black',
                           '&:hover': {
                              background: 'rgba(0, 208, 132, 0.5)',
                              borderColor: 'rgba(0, 208, 132, 0.4)',
                           },
                        }}
                        aria-label="delete"
                        onClick={() => DeleteBill(item.ID)}
                     >
                        ลบ
                     </Button>
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
export default Bills;