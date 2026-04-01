import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from 'yup';

export default function Language() {

  const [languageList, setLanguageList] = useState({
    name: '',
    loginUser: ''
  });

  const [languageData, setLanguageData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  const user = localStorage.getItem('userId')

  // ✅ fetch language
  const fetchLanguage = () => {
    axios.get('http://localhost:3000/language')
      .then((res) => {
        setLanguageData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // ✅ fetch users
  useEffect(() => {
    fetchLanguage();
  }, []);

  // ✅ formik
  const formik = useFormik({
    initialValues: languageList,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Language name required')
    }),

    onSubmit: (values,{resetForm}) => { 
      values.loginUser=user
      console.log(values);

      if (editId !== null) {
        axios.put(`http://localhost:3000/language/${editId}`, values)
          .then(() => {
            toast.success('Updated successfully');
            setEditId(null);
            setOpen(false);
            fetchLanguage();
            resetForm()
          });
      } 
      else {
        axios.post('http://localhost:3000/language', values)
          .then(() => {
            toast.success('Added successfully');
            setOpen(false);
            fetchLanguage();
            resetForm();
          });
      }
      setLanguageList({
        name: '',
      });
    }
  });

  const handleCancel = () =>{
    setOpen(false)
    setEditId(null)
    setLanguageList({name: ''})
  }

  // ✅ delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/language/${id}`)
      .then(() => {
        toast.success('Deleted successfully');
        fetchLanguage();
      });
  };

  // ✅ update
  const handleUpdate = (list) => {
    setLanguageList({
      name: list.name
    });

    setEditId(list._id);
    setOpen(true);
  };
  const handleAddLangauge=()=>{
    setOpen(true)
    setEditId(null)
  }

  return (
    <>
      <Typography variant="h5" sx={{ ml: 15 }}>Language</Typography>

      <Box sx={{ p: '50px 0 0 150px' }}>

        {/* ADD BUTTON */}
        <Button onClick={handleAddLangauge} sx={{ border: '1px solid', mb: 2 }}>
          Add Language
        </Button>

        {/* DIALOG */}
        <Dialog open={open} onClose={()=>setOpen(false)}>
          <DialogTitle>Add Language</DialogTitle>

          <DialogContent>
            <form onSubmit={formik.handleSubmit}>

              {/* Language Name */}
              <TextField
                fullWidth
                label="Language Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 2 }}
              />

              <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>

            </form>
          </DialogContent>
        </Dialog>

        {/* TABLE */}
        <table border={1}>
          <thead>
            <tr>
              <th>Language</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>
            {languageData.map((list, i) => (
              <tr key={i}>
                <td>{list.name}</td>
                <td onClick={() => handleDelete(list._id)}>Delete</td>
                <td onClick={() => handleUpdate(list)}>Update</td>
              </tr>
            ))}
          </tbody>
        </table>

      </Box>
    </>
  );
}