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
import Grid from '@mui/material/Unstable_Grid2';
import { deepOrange, deepPurple, green } from '@mui/material/colors';


import { ManageInterface } from "../models/IManage";
import { Divider } from "@mui/material";
import { Chip } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import { url } from "inspector";
import { readBuilderProgram } from "typescript";


function Manages() {
  const [manages, setManages] = useState<ManageInterface[]>([]);
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getManages = async () => {
    fetch(`${apiUrl}/manages`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setManages(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getManages();
  }, []);

  return (
    <div style={{
    }}>
      <Container sx={{ marginTop: 2 }} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              sx={{ 
                fontFamily: "PK Krung Thep Medium",
              }} 
              component="h2"
              variant="h3"
              color="primary"
              gutterBottom
            >
              <b>ระบบจัดการห้องพัก</b>
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/manage/create"
              variant="contained"
              color="primary"
              sx={{ 
                fontFamily: "PK Krung Thep Medium",
                fontSize: 18,
                borderRadius: 15
              }}
            >
              จัดการห้องพัก
            </Button>
          </Box>
        </Box>
        
        
        <Paper elevation={3} style={{'borderRadius':'20px', 
          backgroundImage: 'url("https://coolhdwall.com/storage/202101/mountains-fog-hd-phone-wallpaper-1125x2436.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          
        }}>
          <Box sx={{ 
            m: 1.5,
          }}
          >
            <Grid container spacing={3}>
                {manages.map((item: ManageInterface) => (
                  <Grid xs={4}>
                    <Typography 
                      align="center"
                      sx={{ 
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 35,
                      }}
                    >
                      <b>ห้อง {item.Room.Number}</b>
                    </Typography>
                    <Button 
                      component="span"
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: 2,
                        m: 0.5,
                        background: 'rgba(255, 255, 255,0.7)',
                        boxShadow: 5,
                        borderRadius: 4,
                        '&:hover': {
                        background: 'rgba(142, 209, 252, 0.5)',
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
                        <Typography 
                          align="center"
                          sx={{ 
                            fontFamily: "PK Krung Thep Medium",
                            fontSize: 20,
                          }}
                        >
                          <h1>
                            <b>
                              {item.Stetus}
                            </b>
                          </h1>
                        </Typography>
                        <p>
                          ขนาดห้อง: <b>{item.Size.Size}</b><br/>
                          ประเภทห้อง: <b>{item.Category.Category}</b><br/>
                          ราคาเช่า: <b>{item.Price}/เดือน</b><br/>
                          <center>สิ่งอำนวยความสะดวก:</center>
                          <b>{item.Detail}</b>
                        </p>
                      </Typography>                      
                    </Button>
                  </Grid>
                  
                  
                ))}
                
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Manages;