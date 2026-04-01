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
  // const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);


  const user = localStorage.getItem('userId')
  //console.log("=-=-=-=-=-=",user);
  
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

    // axios.get('http://localhost:3000/auth/getAuth')
    //   .then(res => setUsers(res.data.data));

  }, []);

  // ✅ formik
  const formik = useFormik({
    initialValues: languageList,
    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string().required('Language name required'),
      // loginUser: Yup.string().required('Select user')
    }),

    onSubmit: (values,{resetForm}) => {

      // console.log("===============");
      
      
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
      } else {
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
        loginUser: ''
      });
    }
  });

  const handleClose = () => setOpen(false);

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
      name: list.name,
      loginUser: list.loginUser?._id
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
        <Dialog open={open} onClose={handleClose}>
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

              {/* User Dropdown */}
              {/* <TextField fullWidth
                 select
                 name="loginUser"
                 value={formik.values.loginUser}
                 onChange={formik.handleChange}
                 error={formik.touched.loginUser && Boolean(formik.errors.loginUser)}
                 helperText={formik.touched.loginUser && formik.errors.loginUser}
                 sx={{ mb: 2 }}
               >
                {users.map((u) => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.username}
                  </MenuItem>
                ))}
              </TextField> */}

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
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
              {/* <th>User</th> */}
              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>
            {languageData.map((list, i) => (
              <tr key={i}>
                <td>{list.name}</td>
                {/* ✅ populate data show */}
                {/* <td>{list.loginUser?.username}</td> */}
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