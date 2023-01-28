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


import { RequestoutInterface } from "../models/IRequestout";
import { Divider } from "@mui/material";
import { Chip } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import { url } from "inspector";
import { readBuilderProgram } from "typescript";


function Requestout() {
  const [requestouts, setRequestouts] = useState<RequestoutInterface[]>([]);
  
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


  useEffect(() => {
    getRequestouts();
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
              color="text.primary"
              gutterBottom
            >
              <b>แจ้งย้ายออก</b>
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/requestout/create"
              variant="contained"
              color="primary"
              sx={{ 
                fontFamily: "PK Krung Thep Medium",
                fontSize: 18
              }}
              style={{ borderRadius: "15px" }}
            >
              แจ้งย้ายออก
            </Button>
          </Box>
        </Box>
        
        
        <Paper elevation={3} style={{'borderRadius':'20px', 
          backgroundImage: 'url("https://www.hdwallpapers.in/download/foggy_sunrise_4k_2-1080x1920.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          
        }}>
          <Box sx={{ 
            m: 1.5,
          }}
          >
            <Grid container spacing={3}>
                {requestouts.map((item: RequestoutInterface) => (
                  <Grid xs={4}>
                    <Typography 
                      align="center"
                      sx={{ 
                        fontFamily: "PK Krung Thep Medium",
                        fontSize: 30,
                        
                      }}
                    >
                      <b>ห้อง {item.Room.Number}</b>
                    </Typography>
                    <Button 
                      component="span"
                      sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      flexGrow: 1,
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
                        align="center"
                        sx={{ 
                          fontFamily: "PK Krung Thep Medium",
                          fontSize: 20,
                          color: 'black',
                        }}
                      >
                        
                        <h1>
                          <b>
                            {/* ห้อง {item.Room.Number} <br/> */}
                            {item.Stetus}
                          </b>
                        </h1>
                        <h4>
                          <b>ขนาดห้อง:</b> {item.Size.Size}<br/>
                          <b>ประเภทห้อง:</b> {item.Category.Category}<br/>
                          <b>ราคาเช่า:</b> {item.Price}/เดือน<br/>
                          <h5>
                            สิ่งอำนวยความสะดวก:<br/>
                            {item.Detail}
                          </h5>
                        </h4>
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
export default Requestout;