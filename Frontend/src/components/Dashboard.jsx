import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";


export default function Dashboard({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <>
      <Sidebar/>
      <Box>
        {children}
      </Box>
      <Box>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>

    </>
  );
}