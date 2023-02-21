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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

import { MeterInterface } from "../../models/IMeter";
import { AdminInterface } from "../../models/IAdmin";
import { FurnitureInterface } from "../../models/IFurniture";
import { BillInterface } from "../../models/IBill";

import { InputLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BillUpdate() {
    const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [admins, setAdmins] = useState<AdminInterface>();
  const [furnitures, setFurnitures] = useState<FurnitureInterface[]>([]);
  const [totalFurnitures, setTotalFurnitures] = useState<number>(0)
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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof bills;
    setBills({
      ...bills,
      [name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const getAdmins = async () => {
    const uid = localStorage.getItem("uid")
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

  const getFurniture = async (value:number) => {
    fetch(`${apiUrl}/furniture/sum/${value}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.sum) {
          const datafur:FurnitureInterface[] = res.sum
          let totalsum = 0
          datafur.map(item => {
            totalsum = totalsum + item.Total
          })
          console.log("res",res)
          setTotalFurnitures(totalsum)
          setFurnitures(datafur)
          const arrFur = datafur.map(item => {
            return item.ID
          })
          setBills({...bills ,FurnitureID:arrFur})
        } else {
          console.log("else");
        }
      });
  };


  const totalvalue = async () => {
    const room = meters.find((item) => item.ID === Number(bills.MeterID));
    if(room && totalFurnitures == 0){
      await getFurniture(room?.Manage?.RoomID)
    }

  };

  useEffect(() => {
    getAdmins();
    getMeters();
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    if(bills?.MeterID){
      totalvalue()
    }else{
      setTotalFurnitures(0)
      setBills({...bills ,Cost:0})
    }
  },[bills])

  useEffect(() => {
    const room = meters.find((item) => item.ID === Number(bills.MeterID));
   if(room){
    const totalcost = totalFurnitures +  Number(room?.Manage.Price) + Number(room?.Water) + Number(room?.Electric)
    setBills({...bills ,Cost:totalcost})
   }
  },[totalFurnitures])

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
//?.map(item => convertType(item))
//Number(costs)
  function update() {
    const arrFurnitureID = bills?.FurnitureID?.map(item => convertType(item)) || []
    
    arrFurnitureID.forEach(item => {
      let data = {
        ID: convertType(id),
        MeterID: convertType(bills.MeterID),
        FurnitureID: item, //ส่งไปเป็น array จากบรรทัด 146
        Cost: bills.Cost, //คำนวณจาก 144
        BillTime: selectedDate,
      };
  
      const requestOptionsPost = {
        method: "PATCH",
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
            console.log("บันทึกได้");
            console.log(res.data)
            setSuccess(true);
            setErrorMessage("");
          } else {
            console.log("บันทึกไม่ได้");
            setError(true);
            setErrorMessage(res.error);
          }
        });
    });
  }

  return (
    <Box sx={{
      backgroundImage: "url(https://images.hdqwalls.com/download/simple-drop-white-10k-n8-1280x720.jpg)",
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         backgroundPosition: "center",
         // background: '#e0e0e0',
         width: '100%',
         fontFamily: "PK Krung Thep Medium",
         fontSize: 20,
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
    }}>

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

        <Box sx={{
          width: '90%',
          mt: '70px',
          mb: '20px',

          background: 'rgba(255, 255, 255, 0.8)',
        }}>
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
                <h1>บันทึกบิลชำระค่าเช่า</h1>
              </Typography>
            </Box>
          </Box>
          <Divider />
        <Grid container spacing={3} sx={{ flexGrow: 1, padding: 2 }}>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้บันทึกข้อมูล</p>
              {/* <InputLabel id="MeterID">ห้อง</InputLabel> */}
              <Select
                native
                disabled
                variant="outlined"
                value={bills.AdminID + ""}
                // label="ห้อง"
                onChange={handleChange}
                inputProps={{
                  name: "AdminID",
                }}
              >
                <option value={admins?.ID} key={admins?.ID}>
                  {admins?.Name}
                </option>
              
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลขห้อง</p>
              {/* <InputLabel id="MeterID">ห้อง</InputLabel> */}
              <Select
                native
                variant="outlined"
                value={bills.MeterID + ""}
                // label="ห้อง"
                onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
                {meters.map((item: MeterInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Manage.Room.Number}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้เช่า</p>
              {/* <InputLabel id="MeterID">ผู้เช่า</InputLabel> */}
              <Select
                native
                variant="outlined"
                value={bills.MeterID + ""}
                // label="ระบุผู้เช่า"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <p>เบอร์โทรศัพท์</p>
              {/* <InputLabel id="MeterID">เบอร์โทรศัพท์</InputLabel> */}
              <Select
                native
                variant="outlined"
                value={bills.MeterID + ""}
                // label="ระบุเบอร์โทรศัพท์"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <p>ค่าเช่าห้อง</p>
              {/* <InputLabel id="MeterID">ค่าเช่าห้อง</InputLabel> */}
              <Select
                native
                variant="outlined"
                value={bills.MeterID + ""}
                // label="ระบุค่าเช่าห้อง"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <p>ค่าเช่าเฟอร์นิเจอร์</p>
              {/* <InputLabel id="FurnitureID">ค่าเช่าเฟอร์นิเจอร์</InputLabel> */}
              <TextField
                variant="outlined"
                id="FurnitureID"
                inputProps={{
                  name: "FurnitureID",
                }}
                value = {totalFurnitures}
                onChange={(event) => setCosts(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>มิเตอร์ครั้งก่อน</p>
              {/* <InputLabel id="MeterID">บิลครั้งก่อน</InputLabel> */}
              <Select
                variant="outlined"
                native
                value={bills.MeterID + ""}
                // label="ระบุบิลครั้งก่อน"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <p>มิเตอร์ที่จดได้</p>
              {/* <InputLabel id="MeterID">บิลที่จดได้</InputLabel> */}
              <Select
                variant="outlined"
                native
                value={bills.MeterID + ""}
                // label="ระบุบิลที่จดได้"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <p>มิเตอร์ที่ใช้ไป</p>
              {/* <InputLabel id="MeterID">หน่วยที่ใช้</InputLabel> */}
              <Select
                native
                variant="outlined"
                value={bills.MeterID + ""}
                // label="ระบุหน่วยที่ใช้ไป"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <p>หน่วยละ</p>
              {/* <InputLabel id="MeterID">หน่วยละ</InputLabel> */}
              <Select
                native
                value={bills.MeterID + ""}
                // label="ระบุหน่วยละ"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <p>ค่าไฟ</p>
              {/* <InputLabel id="MeterID">รวมค่าไฟ</InputLabel> */}
              <Select
                native
                variant="outlined"
                value={bills.MeterID + ""}
                // label="ระบุรวมค่าไฟ"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
              <p>ค่านํ้าเหมา</p>
              {/* <InputLabel id="MeterID">ค่าน้ำ(เหมา)</InputLabel> */}
              <Select
                native
                disabled
                value={bills.MeterID + ""}
                // label="ค่าน้ำ(เหมา)"
              //   onChange={handleChange}
                inputProps={{
                  name: "MeterID",
                }}
              >
                <option aria-label="None" value=""></option>
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
                variant="outlined"
                id="BillID"
                onChange={(event) => setCosts(event.target.value)}
                value = {bills.Cost}
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
                  minDate={new Date('2022-12-20')}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button component={RouterLink} to="/bills" variant="contained">
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={update}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
        </Box>
    </Box>
  );
}
export default BillUpdate;