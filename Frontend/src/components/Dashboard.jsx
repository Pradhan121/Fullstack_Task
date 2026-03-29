import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <Box sx={{ flex: 1, padding: "20px" }}>
        <Outlet />   {/* 👈 Yaha Language / Topic render hoga */}
      </Box>

    </Box>
  );
}