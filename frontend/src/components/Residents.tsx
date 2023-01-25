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
import { ResidentInterface } from "../models/IResident";
import { UserInterface } from "../models/IUser";
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Unstable_Grid2';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";


function Resident() {
  const [residents, setResidents] = useState<ResidentInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };


  const getResidents = async () => {
    fetch(`${apiUrl}/residents`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setResidents(res.data);
        } else {
          console.log("else");
        }
      });
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
    getResidents();
    getUsers();
  }, []);


  return (
    <div>
      <Container sx={{ marginTop: 2 }} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography sx={{ 
                fontFamily: "PK Krung Thep Medium",
              }} 
              component="h2"
              variant="h3"
              color="primary"
              gutterBottom
            >
              ข้อมูลการทำสัญญาเช่า
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/resident/create"
              variant="contained"
              color="primary"
              sx={{ 
                fontFamily: "PK Krung Thep Medium",
                fontSize: 18
              }} 
            >
              ทำสัญญา
            </Button>
          </Box>
        </Box>


        <Paper elevation={1}>
          <Box sx={{
            m: 1.5
          }}>

            <Grid container spacing={3}>
              {residents.map((item: ResidentInterface) => (
                <Grid xs={4}>
                  <Typography 
                    align="center"
                    sx={{
                      fontFamily: "PK Krung Thep Medium",
                      fontSize: 35,
                    }}
                    color="primary"
                  >
                    <b>ห้อง{item.Manage.Room.Number}</b>
                  </Typography>
                  <Button
                    component="span"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexGrow: 1,
                      m: 1,
                      boxShadow: 5,
                      borderRadius: 5,
                      bgcolor: "#84ffff",
                      '&:hover': {
                        backgroundColor: '#00b8d4',
                      },
                    }}
                  >
                    <Typography
                      sx={{ 
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 18,
                      }} 
                      color="black"
                    >
                      <p> ชื่อผู้เช่า: {item.User.Name}<br/>
                          เบอร์โทร: {item.User.Tel}<br/>
                          สัญญา: {item.Lease.Lease}<br/>
                          ประกันห้อง: {item.Bail} บาท<br/>
                      </p>
                        <b>วันที่ทำสัญญา: {moment(item.LeaseTime).format('DD MM yyyy')}</b>
                      
                    

                    </Typography>
                  </Button>


                  

                  <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid xs={12}>
                      <ButtonGroup
                        // style={{ float: "right" }}
                        disableElevation
                        variant="outlined"
                        aria-label="Disabled elevation buttons"
                        sx={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <Button
                          color="success"
                          sx={{
                            fontFamily: "PK Krung Thep Medium",
                            fontSize: 18,
                          }}
                          startIcon={<EditIcon />}
                        >
                          <b>แก้ไข</b>
                        </Button>
                        <Button
                          color="success"
                          sx={{
                            fontFamily: "PK Krung Thep Medium",
                            fontSize: 18,
                          }}
                          startIcon={<DeleteIcon />}
                        >
                          <b>ลบ</b>
                        </Button>
                      </ButtonGroup>
                    </Grid >
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>


        
      </Container>
    </div>
  );
}
export default Resident;