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
import { MeterInterface } from "../../models/IMeter";
import { format } from 'date-fns'
import { useParams, useNavigate } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

function Meters() {
  // const classes = useStyles();
  let navigate = useNavigate();
  const { id } = useParams();
  const [meters, setMeters] = useState<MeterInterface[]>([]);
 
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

  const DeleteMeter = async (id: string | number | undefined) => {
    const requestOptions = {
       method: "DELETE",
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
       },
    };

    fetch(`${apiUrl}/meters/${id}`, requestOptions)
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
             getMeters();
          }
       )

 }

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
              ระบบจดมิเตอร์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/meter/create"
              variant="contained"
              color="primary"
            >
              บันทึกการจดมิเตอร์
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
                {/* <TableCell align="center" width="18%">
                  ผู้บันทึกข้อมูล
                </TableCell> */}
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
                  ค่านํ้าเหมา
                </TableCell>
                <TableCell align="center" width="9%">
                  เดือนที่ใช้
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meters.map((item: MeterInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Manage?.Room.Number}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.User.Tel}</TableCell>
                  <TableCell align="center">{item.Before}</TableCell>
                  <TableCell align="center">{item.After}</TableCell>
                  <TableCell align="center">{item.Total}</TableCell>
                  <TableCell align="center">{item.Unit}</TableCell>
                  <TableCell align="center">{item.Electric}</TableCell>
                  <TableCell align="center">{item.Water}</TableCell>
                  <TableCell align="center">{format((new Date(item.Metertime)), 'dd MMMM yyyy hh:mm')}</TableCell>
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
                        onClick={() => DeleteMeter(item.ID)}
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

export default Meters;

function setSuccess(arg0: boolean) {
  throw new Error("Function not implemented.");
}
function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

function setError(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function getManages() {
  throw new Error("Function not implemented.");
}

