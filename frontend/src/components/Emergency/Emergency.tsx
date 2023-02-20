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
import { EmergencyInterface } from "../../models/IEmergency";
import { format } from 'date-fns'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { useParams, useNavigate } from "react-router-dom";




function Emergencys() {
  const [emergencys, setEmergencys] = useState<EmergencyInterface[]>([]);
  let navigate = useNavigate();
  const { id } = useParams();
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

  const DeleteEmergency = async (id: string | number | undefined) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/emergencies/${id}`, requestOptions)
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
          getEmergencys();
        }
      )

  }

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
                  <TableCell align="center">{item.Resident.Manage.Room.Number}</TableCell>
                  <TableCell align="center">{item.Emergencytype.Name}</TableCell>
                  <TableCell align="center">{item.Detail}</TableCell>
                  <TableCell align="center">{format((new Date(item.Emergencytime)), 'dd MMMM yyyy hh:mm')} </TableCell>
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
                        onClick={() => DeleteEmergency(item.ID)}
                     >
                        ลบ
                     </Button>
                  
                  
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