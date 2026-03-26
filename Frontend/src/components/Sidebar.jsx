import React, { useState } from 'react'
import Dashboard from './Dashboard';
import { Box, Button, 
  List, ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer
} from "@mui/material";

export default function Sidebar() {
  const[open,setOpen] = useState(false)

   const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Dashboard', 'Language', 'Questions', 'Topic'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
        <Dashboard/>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

