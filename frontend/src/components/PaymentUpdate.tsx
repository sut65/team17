import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// import {makeStyles, Theme,createStyles,} from "@mui/material/styles";
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { UserInterface } from "../models/IUser";
import { BillInterface } from "../models/IBill";
import { BankingInterface } from "../models/IBanking";
import { PaymentInterface } from "../models/IPayment";
import { MethodInterface } from "../models/IMethod";
import { FormHelperText, InputLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useParams } from "react-router-dom"; 

// const Alert = (props: AlertProps) => {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// };

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     container: {
//       marginTop: theme.spacing(2),
//     },
//     paper: {
//       padding: theme.spacing(2),
//       color: theme.palette.text.secondary,
//     },
//   })
// );

function PaymentUpdate() {
  // const classes = useStyles();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
  const [users, setUsers] = useState<UserInterface>(); //map
  const [bills, setBills] = useState<BillInterface[]>([]);
  const [bankings, setBankings] = useState<BankingInterface[]>([]);
  const [methods, setMethods] = useState<MethodInterface[]>([]);
  const [payments, setPayments] = useState<Partial<PaymentInterface>>({});
  const [evidences, setEvidence] = useState<String>("");

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
    const name = event.target.name as keyof typeof payments;
    setPayments({
      ...payments,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getUsers = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        const data = res?.data
        console.log(data) //อันนี้
        if (data) {
          payments.UserID =data.ID
          setUsers(data);
        } else {
          console.log("else");
        }
      });
  };


  const getBanking = async () => {
    fetch(`${apiUrl}/bankings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBankings(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getBill = async () => {
    const uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/billByUser/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setBills(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getMethod = async () => {
    fetch(`${apiUrl}/methods`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMethods(res.data);
        } else {
          console.log("else");
        }
      });
  };

   const getPaymentsByID = async () => {
    const uid = localStorage.getItem("id");
    fetch(`${apiUrl}/payment/${uid}`, requestOptions)
       .then((response) => response.json())
       .then((res) => {
          payments.ID = res.data.ID
          if (res.data) {
             setPayments(res.data);
          } else {
             console.log("else");
          }
       });
 };

  useEffect(() => {
    getUsers();
    getBill();
    getMethod();
    getBanking();
    getPaymentsByID();
  }, []);

  const onFileChange = (e: any) => {
    //setSelectedFile(e.target.files);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    console.log(e.target.files[0].size);
    console.log(e.target.files[0].type);
    encodeFileBase64(e.target.files[0]);


  };
  const encodeFileBase64 = (file: any) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setEvidence(Base64 as string);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function update() {
    let data = {
      ID: convertType(id),
      BankingID: convertType(payments.BankingID),
      UserID: convertType(payments.UserID),
      BillID: convertType(bills[0].ID),
      MethodID: convertType(payments.MethodID),
      PaymentTime: selectedDate,
      Evidence: evidences,
    };

    console.log(data)

    const requestOptionsPatch = {
      method: "PATCH", //เรียกใช้เพื่ออัพเดต
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/payments`, requestOptionsPatch)
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
  console.log("users", users)

  return (

    <Box sx={{
      backgroundImage:
        "url(https://i.pinimg.com/564x/c0/4a/5f/c04a5f27b605cc21aa55420a7f83318d.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>

      <Box  sx={{
          fontFamily: "PK Krung Thep Medium",
          fontSize: "20px",
          width: "90%",
          mt: "70px",
          bgcolor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: "30px",
          boxShadow: 20,

        }}
      >

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

      <Box sx={{ padding: 2, color: "text.secondary" }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h6"
                variant="h5"
                color="primary"
                gutterBottom
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  
                }}
              >
              <h1>บันทึกการชำระเงิน</h1>

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>

        <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ชื่อ - นามสกุล</p>
                <Select
                  native
                  disabled
                  value={payments.UserID}
                  onChange={handleChange}
                  inputProps={{
                    name: "UserID",
                  }}
                >
                  <option value={users?.ID} key={users?.ID} >
                    {users?.Name}
                  </option>
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>เลขห้อง</p>
                <TextField
                  variant="outlined"
                  disabled
                  id="BillID"
                  inputProps={{
                    name: "BillID",
                  }}

                  value={bills.map((item: BillInterface) => (
                    item.Meter.Manage.Room.Number
                  ))}
                />

              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ค่าห้องพัก</p>
                <TextField
                  variant="outlined"
                  disabled
                  id="BillID"
                  inputProps={{
                    name: "BillID",
                  }}

                  value={bills.map((item: BillInterface) => (
                    item.Meter.Manage.Price
                  ))}
                />
              </FormControl>
            </Grid>



            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ค่าน้ำ</p>
                <TextField
                  variant="outlined"
                  disabled
                  id="BillID"
                  inputProps={{
                    name: "BillID",
                  }}

                  value={bills.map((item: BillInterface) => (
                    item.Meter.Water
                  ))}
                />
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ค่าไฟ</p>
                <TextField
                  variant="outlined"
                  disabled
                  id="BillID"
                  inputProps={{
                    name: "BillID",
                  }}

                  value={bills.map((item: BillInterface) => (
                    item.Meter.Electric
                  ))}
                />
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ค่าเฟอร์นิเจอร์</p>
                <TextField
                  variant="outlined"
                  disabled
                  id="BillID"
                  inputProps={{
                    name: "BillID",
                  }}

                  value={bills.map((item: BillInterface) => (
                    item.Furniture.Total
                  ))}
                />
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ยอดรวมชำระ</p>
                <TextField
                  variant="outlined"
                  disabled
                  id="BillID"
                  inputProps={{
                    name: "BillID",
                  }}

                  value={bills.map((item: BillInterface) => (
                    item.Cost
                  ))}
                />
              </FormControl>
            </Grid>



            <Grid item xs={6} sx={{ mt: 'auto', }}>
              <FormControl fullWidth variant="outlined">
                <p>ช่องทางการชำระ</p>
                <Select
                  native
                  value={payments.MethodID}
                  onChange={handleChange}
                  inputProps={{
                    name: "MethodID",
                  }}
                >
                  <option aria-label="None" value="">
                    เลือก...
                  </option>
                  {methods.map((item: MethodInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ธนาคาร</p>
                <Select
                  native
                  value={payments.BankingID}
                  onChange={handleChange}
                  inputProps={{
                    name: "BankingID",
                  }}
                >
                  <option aria-label="None" value="">
                    เลือก...
                  </option>
                  {bankings.map((item: BankingInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <p>ช่องทางการชำระ</p>
                  <DateTimePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    minDate={(new Date)}   //บันทึกค่าปัจจุบัน
                    renderInput={(params) =>
                      <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <Button variant="contained" component="label">
                  Upload
                  <input hidden accept="image/*" multiple type="file" onChange={onFileChange} />
                </Button>
              </FormControl>
            </Grid>


          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/payments"
              variant="contained"
            >
              กลับ
            </Button>
            
             <Button sx={{ 
              fontFamily: "PK Krung Thep Medium", 
              fontSize:17

            }}
              style={{ float: "right"}}
              onClick={update}
              variant="contained"
              color="primary"
            >
              <b>แก้ไขข้อมูล</b>
            </Button>
            
          </Grid>
        </Grid>
      </Box>
      </Box>
    </Box>
  );
}

export default PaymentUpdate;