import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
   const handleSubmit = () => {
    axios
      .post(
        "http://localhost:3000/auth/login",
        { username, password })
      .then((res) => {
         
        console.log(res.data.data)
         localStorage.setItem('userId', res.data.data._id)
         toast.success("Register successful!");
          setUserName("");
          setPassword("");
         
         navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error('Sign up Failed')
      });
  };

  return (
    <>
       <Box
         sx={{ display: "flex", justifyContent: "center",minHeight:'100vh' }}
      >       
        <Box
          sx={{
            backgroundColor: "color-mix(in srgb, #0b1ae9, transparent 90%)",
            borderRadius: "12px",
            width: "320px",
            height: "350px",
            padding: "22px",
            margin: "80px auto",
          }}
        >               
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "25px",
              textTransform: "uppercase",
            }}
          >
               Welcome back !
          </Typography>
          <TextField
            fullWidth
            label="UserName"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "color-mix(in srgb, #131428, transparent 90%)",
                paddingLeft: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#524dd3", paddingLeft: "0" }} /> 
                             
                </InputAdornment>
              ),
            }}
          />
           <TextField
            fullWidth
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "color-mix(in srgb, #131428, transparent 90%)",
                paddingLeft: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#524dd3", paddingLeft: "0" }} />     
                           
                </InputAdornment>
              ),
            }}
          />
           <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#0b1ae9",
              padding: "10px",
              borderRadius: "10px",
              fontWeight: "500",
              fontSize: "16px",
              gap: "8px",
              display: "flex",
              alignItems: "center",
              color: "#fff",
              textDecoration: "none",
            }}
          >Submit</Button>

             <Link
                to="/register"
                style={{
                textDecoration: "none",
                color: "#94a3b8",
                textAlign: "center",
                marginTop: "24px",
                fontSize: "17px",
                display: "block",
              }}
            >
              Don’t have an account?
            <span style={{ color: "#2563eb", cursor: "pointer" }}>Sign Up</span>
        </Link>     
        </Box>
             
      </Box>
         
    </>
  );
}

