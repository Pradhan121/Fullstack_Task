import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout =()=>{
    localStorage.removeItem('username')
    navigate('/')
  }
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Language", path: "/dashboard/language" },
    { name: "Questions", path: "/dashboard/questions" },
    { name: "Topic", path: "/dashboard/topic" },
  ];
return (
    <Box sx={{ width: 250, height: "100vh", background: "#f1f5f9" }}>
      <List sx={{display:'flex',flexDirection:'column', gap:'20px', marginTop:'80px'}}>
        {menuItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)} >
              <ListItemText 
                 primary={item.name} sx={{
                  '& .MuiTypography-root': {
                  fontSize: '18px',
                }
              }}
            />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText
              primary="Logout"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "18px",
                  color: "red", 
                  fontWeight: "600"
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}