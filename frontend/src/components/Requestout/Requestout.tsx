import React, { useEffect, useState } from "react";
import { Link as RouterLink,useNavigate, } from "react-router-dom";
import { useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { RequestoutInterface } from "../../models/IRequestout";

import { format } from 'date-fns'
import moment from "moment";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Requestout() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [requestouts, setRequestouts] = useState<RequestoutInterface[]>([]);

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

  const DeleteRequestout = async (id: string | number | undefined) => {
    const requestOptions = {
       method: "DELETE",
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
       },
    };

    fetch(`${apiUrl}/requestouts/${id}`, requestOptions)
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
             getRequestouts();
          }
       )

 }



  useEffect(() => {
    getRequestouts();
  }, []);

  return (
    <div style={{
      backgroundImage: "url(https://images.hdqwalls.com/download/color-pages-abstract-8k-ye-1920x1080.jpg)",
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
      background: 'rgba(0, 0, 0, 0.4)',
      
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 10,

   }}>
    
    <Box sx={{ width: "90%", marginTop: 1 }}>
    {/* <Container sx={{ marginTop: 2 }} > */}
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
    
     
        <Box flexGrow={1} >
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            sx={{fontFamily: "PK Krung Thep Medium",
                fontSize: "40px",
                fontWeight: 'bold',
                color:'white'}}
          >
            ข้อมูลการแจ้งออก
          </Typography>
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to="/requestout/create"
            variant="contained"   
            sx={{fontFamily: "PK Krung Thep Medium",
                fontSize: "20px",
                background: '#2448f9',   
                '&:hover': {
                   background: '#45be3c',
                   color: "#2448f9",
                   
                },}}
              style={{borderRadius: '30px'}}
          >
            เพิ่มข้อมูล
          </Button>
        </Box>
        </Box>
        
        
        <Table sx={{ marginTop: 1 }} aria-label="simple table" >
          <TableHead>
            <TableRow>
            <TableCell align="center" width="2%" sx={{fontFamily: "PK Krung Thep Medium", fontSize: "30px", color: "#a80000"}}>
                ลำดับ
              </TableCell>
              <TableCell align="center" width="15%"sx={{fontFamily: "PK Krung Thep Medium", fontSize: "30px", color: "#a80000"}}>
                ชื่อ
              </TableCell>
              <TableCell align="center" width="10%"sx={{fontFamily: "PK Krung Thep Medium", fontSize: "30px", color: "#a80000"}}>
                ห้องพัก
              </TableCell>
              <TableCell align="center" width="20%"sx={{fontFamily: "PK Krung Thep Medium", fontSize: "30px", color: "#a80000"}}>
                สาเหตุ
              </TableCell>
              <TableCell align="center" width="20%"sx={{fontFamily: "PK Krung Thep Medium", fontSize: "30px", color: "#a80000"}}>
                รายละเอียด
              </TableCell>
              <TableCell align="center" width="20%"sx={{fontFamily: "PK Krung Thep Medium", fontSize: "30px", color: "#a80000"}}>
                วันที่ออก
              </TableCell>

              <TableCell align="center" width="20%"sx={{fontFamily: "PK Krung Thep Medium", fontSize: "30px", color: "#a80000"}}>
                แก้ไข
              </TableCell>
              <TableCell align="center" width="20%"sx={{fontFamily: "PK Krung Thep Medium", fontSize: "30px", color: "#a80000"}}>
                Delete
              </TableCell>
        
            </TableRow>
          </TableHead>
          <TableBody>
            {requestouts.map((item: RequestoutInterface) => (
              <TableRow key={item.ID}>
              <TableCell align="center" sx={{fontFamily: "PK Krung Thep Medium", fontSize: "20px", color: 'white' }}>{item.ID}</TableCell>
                <TableCell align="center" sx={{fontFamily: "PK Krung Thep Medium", fontSize: "20px", color: 'white' }}>{item.User.Name}</TableCell>
                <TableCell align="center" sx={{fontFamily: "PK Krung Thep Medium", fontSize: "20px", color: 'white' }}>{item.Room.Number}</TableCell>
                <TableCell align="center" sx={{fontFamily: "PK Krung Thep Medium", fontSize: "20px", color: 'white' }}>{item.Reason.Reason}</TableCell>
                <TableCell align="center" sx={{fontFamily: "PK Krung Thep Medium", fontSize: "20px", color: 'white' }}>{item.Detail}</TableCell>
                
                <TableCell align="center" sx={{fontFamily: "PK Krung Thep Medium", fontSize: "20px", color: 'white' }}>{moment(item.Outtime).format('DD MM yyyy')}</TableCell>

                <TableCell align="center">
                <IconButton aria-label="แก้ไข" size="large" 
                sx={{ 
                  color: '#2448f9',
                           '&:hover': {
                              background: "#2448f9",
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
               
                }} onClick={() => DeleteRequestout(item.ID)} color="error">
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
export default Requestout;