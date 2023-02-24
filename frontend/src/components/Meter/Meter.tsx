import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
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

// import { Alert, AlertProps, Snackbar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import IconButton from "@mui/material/IconButton";
import moment from "moment";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Meters() {
  // const classes = useStyles();
  let navigate = useNavigate();
  const { id } = useParams();
  const [meters, setMeters] = useState<MeterInterface[]>([]);
 
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  

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
    <div style={{
      backgroundImage: "url(https://i.pinimg.com/564x/9a/a0/78/9aa0784482ad21f5b5f9604755c38d29.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: '100%',
      fontFamily: "PK Krung Thep Medium",
      fontSize: 20,
      display: 'flex',
      justifyContent: 'center',
    }}>


      <Box sx={{
        mt: '100px',
        mb: '100px',
        minHeight: '50%',
        width: '80%',
        background: 'rgba(217, 227, 240, 0.3)',
        boxShadow: 5,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10,
      }}>

        <Box sx={{ width: "95%", marginTop: 1 }}>
          <Box display="flex" sx={{
            mt: "30px",
          }}>


            <Snackbar
              open={success}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleClose} severity="warning">
                ลบข้อมูลเรียบร้อย
              </Alert>
            </Snackbar>
            <Snackbar
              open={error}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleClose} severity="error">
                ลบข้อมูลผิดพลาด
              </Alert>
            </Snackbar>

            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
                sx={{
                  fontFamily: "PK Krung Thep Medium",
                  fontSize: "36px",
                }}
              >
                บันทึกการจดมิเตอร์
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/meter/create"
                variant="contained"
                sx={{
                  fontFamily: "PK Krung Thep Medium",
                  fontSize: "20px",
                  background: '#2448f9',
                  '&:hover': {
                    background: '#45be3c',
                    color: "#2448f9",
                  },
                }}
                style={{ borderRadius: '30px' }}
              >
                เพิ่มข้อมูล
              </Button>
            </Box>
          </Box>

          
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width="2%">
                ลำดับ
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
                <IconButton aria-label="แก้ไข" size="large" 
                sx={{ 
                  color: '#8b1fb2',
                           '&:hover': {
                              background: "#8b1fb2",
                              color: "white",
                              
                           },
               
                }} onClick={() => navigate(`${item.ID}`)} >
                <EditIcon fontSize="inherit" />
                </IconButton>
                </TableCell>

                <TableCell align="center">

                <IconButton  aria-label="delete" size="large"
                sx={{
                           '&:hover': {
                              background: "#ff3838",
                              color: "white",
                              
                           },
               
                }} onClick={() => DeleteMeter(item.ID)} color="error">
                <DeleteIcon fontSize="inherit" />
                </IconButton>
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      

      </Box>
      </Box>
    </div>
  );
}

export default Meters;

// function setSuccess(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
// function setErrorMessage(arg0: string) {
//   throw new Error("Function not implemented.");
// }

// function setError(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }

// function getManages() {
//   throw new Error("Function not implemented.");
// }

