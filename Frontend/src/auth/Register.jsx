import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
   const handleSubmit = () => {
    //console.log({username, email, password}) 
    axios
      .post(
        "http://localhost:3000/auth/register",
        { username, email, password })
      .then(() => {
         toast.success("Register successful!");
          setUserName("");
          setEmail("");
          setPassword("");
        navigate("/");
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
               Create an account 
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
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                  <EmailIcon sx={{ color: "#524dd3", paddingLeft: "0" }} />               
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
        </Box>      
      </Box>
    </>
  );
}

