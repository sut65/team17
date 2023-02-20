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
import { FurnitureInterface } from "../../models/IFurniture";
import moment from "moment";

import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

function Furnitures() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [furnitures, setFurnitures] = useState<FurnitureInterface[]>([]);

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

  const getFurnitures = async () => {
    fetch(`${apiUrl}/furnitures`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setFurnitures(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const DeleteFurnitures = async (id: string | number | undefined) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/furnitures/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          console.log("ยกเลิกสำเร็จ");
          setErrorMessage("");
        } else {
          setErrorMessage(res.error);
          setError(true);
          console.log("ยกเลิกไม่สำเร็จ");
        }
        getFurnitures();
      });
  };

  useEffect(() => {
    getFurnitures();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Container sx={{ marginTop: 2 }} > */}
      <Box
        display="flex"
        sx={{
          mt: "30px",
        }}
      >
        <Box flexGrow={1}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            sx={{
              fontFamily: "PK Krung Thep Medium",
              fontSize: 30,
            }}
          >
            <b>ระบบเบิกจ่ายอุปกรณ์ในห้องพัก</b>
          </Typography>
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to="/furniture/create"
            variant="contained"
            color="primary"
            sx={{
              fontFamily: "PK Krung Thep Medium",
            }}
          >
            เบิกจ่ายอุปกรณ์
          </Button>
        </Box>
      </Box>
      <TableContainer
        sx={
          {
            // bgcolor: "skyblue"
          }
        }
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="2%"
              >
                ลำดับ
              </TableCell>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="10%"
              >
                ชื่อ - นามสกุล
              </TableCell>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="8%"
              >
                เบอร์โทร
              </TableCell>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="5%"
              >
                ห้องพัก
              </TableCell>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="7%"
              >
                เฟอร์นิเจอร์
              </TableCell>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="5%"
              >
                จำนวนเช่า
              </TableCell>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="7%"
              >
                ราคา
              </TableCell>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="7%"
              >
                ราคารวม
              </TableCell>
              <TableCell
                sx={{
                  marginTop: 2,
                  fontFamily: "PK Krung Thep Medium",
                  fontWeight: "bold",
                }}
                align="center"
                width="10%"
              >
                วันที่และเวลา
              </TableCell>
              <TableCell align="center" width="1%"></TableCell>
              <TableCell align="center" width="1%"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {furnitures.map((item: FurnitureInterface) => (
              <TableRow key={item.ID}>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {item.ID}
                </TableCell>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {item.User.Name}
                </TableCell>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {item.User.Tel}
                </TableCell>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {item.Room.Number}
                </TableCell>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {item.Equipment.Equipment}
                </TableCell>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {item.Amount.Amount}
                </TableCell>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {item.Equipment.Price}
                </TableCell>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {item.Total}
                </TableCell>
                <TableCell
                  sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium" }}
                  align="center"
                >
                  {moment(item.FurnitureTime).format("DD MMMM yyyy hh:mm")}
                </TableCell>
                {/* <Box
                  sx={{
                    display: "grid",
                    justifyContent: "center",
                    marginTop: "50%",
                    bgcolor: "green",
                  }}
                > */}
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<SaveAsOutlinedIcon />}
                    sx={{
                      fontFamily: "PK Krung Thep Medium",
                      fontSize: 10,
                      borderRadius: 20,
                      fontWeight: "bold",
                      color: "black",
                      width: "auto",
                      marginBottom: "4px",
                      borderColor: "black",
                      "&:hover": {
                        background: "rgba(0, 208, 132, 0.5)",
                        borderColor: "rgba(0, 208, 132, 0.4)",
                      },
                    }}
                    onClick={() => navigate(`${item.ID}`)}
                  >
                    แก้ไข
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon />}
                    sx={{
                      fontFamily: "PK Krung Thep Medium",
                      fontSize: 10,
                      borderRadius: 20,
                      fontWeight: "bold",
                      color: "black",
                      width: "auto",
                      marginBottom: "4px",
                      borderColor: "black",
                      "&:hover": {
                        background: "rgba(205, 92, 92, 1)",
                        borderColor: "rgba(205, 92, 92, 1)",
                      },
                    }}
                    onClick={() => DeleteFurnitures(`${item.ID}`)}
                  >
                    ลบ
                  </Button>
                </TableCell>
                {/* </Box> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Furnitures;
