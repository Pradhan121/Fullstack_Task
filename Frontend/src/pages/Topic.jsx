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

export default function Topic() {

  const [topicList, setTopicList] = useState({
    topic_name: '',
    loginUser: '',
    languageList: ''
  });

  const [topicData, setTopicData] = useState([]);
  const [users, setUsers] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  // ✅ fetch topic
  const TopicListFetch = () => {
    axios.get('http://localhost:3000/topic')
      .then((res) => {
        setTopicData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // ✅ fetch users + languages
  useEffect(() => {
    TopicListFetch();

    axios.get('http://localhost:3000/auth/getAuth')
      .then(res => setUsers(res.data.data));

    axios.get('http://localhost:3000/language')
      .then(res => setLanguages(res.data.data));

  }, []);

  // ✅ formik
  const formik = useFormik({
    initialValues: topicList,
    enableReinitialize: true,
    validationSchema: Yup.object({
      topic_name: Yup.string().required('Topic name required'),
      loginUser: Yup.string().required('Select user'),
      languageList: Yup.string().required('Select language')
    }),

    onSubmit: (values) => {

      if (editId !== null) {
        axios.put(`http://localhost:3000/topic/${editId}`, values)
          .then(() => {
            toast.success('Updated successfully');
            setEditId(null);
            setOpen(false);
            TopicListFetch();
          });
      } else {
        axios.post('http://localhost:3000/topic', values)
          .then(() => {
            toast.success('Added successfully');
            setOpen(false);
            TopicListFetch();
          });
      }

      // reset form
      setTopicList({
        topic_name: '',
        loginUser: '',
        languageList: ''
      });
    }
  });

  const handleClose = () => setOpen(false);

  // ✅ delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/topic/${id}`)
      .then(() => {
        toast.success('Deleted successfully');
        TopicListFetch();
      });
  };

  // ✅ update
  const handleUpdate = (list) => {
    setTopicList({
      topic_name: list.topic_name,
      loginUser: list.loginUser?._id,
      languageList: list.languageList?._id
    });

    setEditId(list._id);
    setOpen(true);
  };

  return (
    <>
      <Typography variant="h5" sx={{ ml: 15 }}>Topic</Typography>

      <Box sx={{ p: '50px 0 0 150px' }}>

        {/* ADD BUTTON */}
        <Button onClick={() => setOpen(true)} sx={{ border: '1px solid', mb: 2 }}>
          Add Topic
        </Button>

        {/* DIALOG */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Topic</DialogTitle>

          <DialogContent>
            <form onSubmit={formik.handleSubmit}>

              {/* Topic Name */}
              <TextField
                fullWidth
                label="Topic Name"
                name="topic_name"
                value={formik.values.topic_name}
                onChange={formik.handleChange}
                error={formik.touched.topic_name && Boolean(formik.errors.topic_name)}
                helperText={formik.touched.topic_name && formik.errors.topic_name}
                sx={{ mb: 2 }}
              />

              {/* User Dropdown */}
              <TextField
                fullWidth
                select
                label="Select User"
                name="loginUser"
                value={formik.values.loginUser}
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
              >
                {users.map((u) => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.username}
                  </MenuItem>
                ))}
              </TextField>

              {/* Language Dropdown */}
              <TextField
                fullWidth
                select
                label="Select Language"
                name="languageList"
                value={formik.values.languageList}
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
              >
                {languages.map((l) => (
                  <MenuItem key={l._id} value={l._id}>
                    {l.name}
                  </MenuItem>
                ))}
              </TextField>

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
              <th>Topic</th>
              <th>User</th>
              <th>Language</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>
            {topicData.map((list, i) => (
              <tr key={i}>
                <td>{list.topic_name}</td>
                <td>{list.loginUser?.username}</td>
                <td>{list.languageList?.name}</td>
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