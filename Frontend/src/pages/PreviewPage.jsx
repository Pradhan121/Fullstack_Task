import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import jsPDF from "jspdf";
import React, { useState } from "react";

export default function PreviewPage() {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(true);

  const getQue = JSON.parse(localStorage.getItem("questions")) || [];

  // ✅ PDF DOWNLOAD
  const handleDownload = () => {
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(16);
    doc.text("Question Paper", 10, y);
    y += 10;

    // Date
    if (value) {
      doc.setFontSize(10);
      doc.text(`Date: ${value.format("DD-MM-YYYY")}`, 10, y);
      y += 10;
    }

    // Total marks
    const totalMarks = getQue.reduce((sum, q) => sum + Number(q.marks || 0), 0);

    doc.text(`Total Marks: ${totalMarks}`, 10, y);
    y += 10;

    getQue.forEach((q, index) => {
      doc.setFontSize(12);

      doc.text(
        `${index + 1}. ${q.question} (${q.marks} marks)`,
        10,
        y
      );

      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("Question_Paper.pdf");
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>Preview — Question Paper</DialogTitle>
      <DialogContent>
        <Typography mb={2}>
          <b>Topic:</b> {getQue[0]?.topicList?.topic_name}
        </Typography>
        <Box mb={2}>
          
  <DatePicker
    label="Select Date"
    value={value}
    onChange={(newValue) => setValue(newValue)}
  />

        </Box>
        <Typography mb={2}>
          <b>Total Marks:</b>
          {getQue.reduce((sum, q) => sum + Number(q.marks || 0), 0)}
        </Typography>

        {/* Questions List */}
        <ol>
          {getQue.map((q, i) => (
            <li key={i}>
              {q.question} ({q.marks} marks)
            </li>
          ))}
        </ol>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDownload} variant="contained">
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}