import { Box, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from "react";

export default function PreviewPage() {
    const [value, setValue] = useState(null);
    const getQue = localStorage.getItem('questions')
  return (
    <>
      <Dialog
        open={open}
      >
        <DialogTitle>
          Preview Page
        </DialogTitle>
        <DialogContent>
            <Typography>{getQue.topic_name}</Typography>
            <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker 
                        label="Select Date" 
                        value={value} 
                        onChange={(newValue) => setValue(newValue)} 
                    />
               </LocalizationProvider>
               <Typography> <b>Total</b> -{getQue.marks}</Typography>
            </Box>
             <ul>
                <li>{getQue.question}</li>
             </ul>
        </DialogContent>
        <DialogActions>
          <Button>Download</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
