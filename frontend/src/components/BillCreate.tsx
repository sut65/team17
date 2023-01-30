import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

import { MeterInterface } from "../models/IMeter";
import { AdminInterface } from "../models/IAdmin";
import { FurnitureInterface } from "../models/IFurniture";
import { BillInterface } from "../models/IBill";

import { InputLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})


function BookingCreate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [admins, setAdmins] = useState<AdminInterface>();
  const [furnitures, setFurnitures] = useState<FurnitureInterface[]>([]);
  const [meters, setMeters] = useState<MeterInterface[]>([]);
  const [bills, setBills] = useState<Partial<BillInterface>>({});
  const [costs, setCosts] = useState<string>("");
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof meters;
    setMeters({
      ...meters,
      [name]: event.target.value,
    });
  };


  const getAdmins = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/admin/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        bills.AdminID = res.data.ID
        if (res.data) {
            setAdmins(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getMeters = async () => {
    fetch(`${apiUrl}/meters`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMeters(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getFurniture = async () => {
    fetch(`${apiUrl}/manages`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setFurnitures(res.data);
        } else {
          console.log("else");
        }
      });
  };



  useEffect(() => {

    getMeters();
    getAdmins();
    getFurniture();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {

        MeterID: convertType(bills.MeterID),
        FurnitureID: convertType(bills.FurnitureID),
        AdminID: convertType(bills.AdminID),
        Cost:     costs,
        BillTime: selectedDate,  

    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/bills`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true)
          setErrorMessage("")
        } else {
          console.log("บันทึกไม่ได้")
          setError(true)
          setErrorMessage(res.error)
        }
      });
  }

  return (
    <Container sx={{ marginTop: 2 }} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
        </Alert>
      </Snackbar>
      <Paper sx={{ padding: 2, color: "text.secondary" }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h6"
              variant="h5"
              color="primary"
              gutterBottom
              
            >
              บันทึกบิลชำระค่าเช่า

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3}  sx={{ flexGrow: 1 }}>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <Select
                    native
                    disabled
                    value={bills.AdminID}
                    // label="ชื่อ - นามสกุล"
                    onChange={handleChange}
                    inputProps={{
                    name: "AdminID",
                    }}
                > 

                    <option value={admins?.ID} key={admins?.ID} >                 
                    {admins?.Name}                                                 
                    </option>
                    
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">ห้อง</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Manage.Room}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">ผู้เช่า</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    label="ระบุผู้เช่า"
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.User.Name}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">ผู้เช่า</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    label="ระบุผู้เช่า"
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.User.Tel}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">ค่าเช่าห้อง</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Manage.Price}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="FurnitureID">ค่าเช่าห้อง</InputLabel>
                <Select
                    native
                    value={bills.FurnitureID}
                    onChange={handleChange}
                    inputProps={{
                    name: "FurnitureID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {furnitures.map((item: FurnitureInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Price}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">บิลครั้งก่อน]</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Before}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">บิลที่จดได้]</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.After}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">หน่วยที่ใช้]</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Total}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">หน่วยละ]</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Unit}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">รวมค่าไฟ]</InputLabel>
                <Select
                    native
                    value={bills.MeterID}
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Electric}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="MeterID">ค่าน้ำ(เหมา)]</InputLabel>
                <Select
                    native
                    disabled
                    value={bills.MeterID}
                    onChange={handleChange}
                    inputProps={{
                    name: "MeterID",
                    }}
                >
                    <option aria-label="None" value="">
                    </option>
                    {meters.map((item: MeterInterface) => (
                    <option value={item.ID} key={item.ID}>
                        {item.Water}
                    </option>
                    ))}
                </Select>
                </FormControl>
            </Grid>





            
            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
              <p>รวม</p>
                <TextField
                    variant="filled"
                    id="BillID"
                    onChange={(event) => setCosts(event.target.value)}
                />
              </FormControl>
            </Grid>
            
            
           

            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  disabled
                  label="เดือน/วัน/ปี"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={(new Date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/bills"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default BookingCreate;