import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from "axios";
import { toast } from "react-toastify";
import *as Yup from 'yup'

export default function Language() {
  const[languageList,setLanguageList] = useState({
    name: '',
    loginUser: ''
  })
  const[langaugeData,setLanguageData] = useState([])
  const[editId,setEditId] = useState(null)
  const[open,setOpen] = useState(false)

  const languageListFetch=()=>{
    axios.get('http://localhost:3000/language')
     .then((res)=>{
         setLanguageData(res.data.data)
     })
     .catch((err)=>{console.log(err)})
  }
  useEffect(()=>{
   languageListFetch();
  },[])

  const formik = useFormik({
     initialValues: languageList,
     enableReinitialize: true,
     validationSchema: Yup.object({
       name: Yup.string().required('name is Required'),
       loginUser: Yup.string().required('Please select')
     }),
     onSubmit: (values)=>{
       if(editId!=null){
        axios.put(`http://localhost:3000/language/${editId}`,values)
        .then(()=>{
          toast.success('Data updated successfuly')
          setEditId(null)
          setLanguageList({
             name: '',
             loginUser: ''
          })
          languageListFetch()
          setOpen(false)
        })
        .catch((err)=>{
           console.log(err)
        })
       }
       else{
        axios.post('http://localhost:3000/language', values)
         .then(()=>{
          toast.success('data added successfuly')
           languageListFetch();
           setLanguageList({
             name: '',
             loginUser: ''
            })
            setOpen(false)
         })
         .catch((err)=>{console.log(err)})
       }
     }
  })
  const handleClose=()=>{
    setOpen(false)
  }
const handleDelete=(id)=>{
  axios.delete(`http://localhost:3000/language/${id}`)
    .then(()=>{
      toast.success('Data deleted successfuly');
      languageListFetch();
    })
    .catch((err)=>{console.log(err)})
}
const handleUpdate=(list)=>{
  setLanguageList({
    name: list.name,
    loginUser: list.loginUser
  })
  setEditId(list._id)
}
  return (
     <>
       <Typography variant="h5"sx={{marginLeft:'150px'}}>Language</Typography>
      <Box sx={{padding:'50px 0 0 150px'}}>
       <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
            Add Language
        </DialogTitle>
        <DialogContent>
            <form onSubmit={formik.handleSubmit}>
               <TextField fullWidth 
                  placeholder='Name'
                  type='text'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  />
               <TextField fullWidth
                  select
                  name="loginUser"
                  value={formik.values.loginUser}
                  onChange={formik.handleChange}
                  error={formik.touched.loginUser && Boolean(formik.errors.loginUser)}
                  helperText={formik.touched.loginUser && formik.errors.loginUser}>
                 <MenuItem>Select Language User</MenuItem>
                 <MenuItem value=''></MenuItem>
               </TextField>
               <DialogActions>
                  <Button onClick={handleClose}>Canecl</Button>
                  <Button type='submit'>Submit</Button>
               </DialogActions>
            </form>  
        </DialogContent>
      </Dialog>
    <Button onClick={()=>setOpen(true)} sx={{border: '1px solid', marginBottom:'10px'}}>Add Language</Button>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>LoginUser</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
         <tbody>
            {langaugeData.map((list,i)=>{
              return(
                <tr key={i}>
                  <td>{list.name}</td>
                  <td>{list.loginUser}</td>
                  <td onClick={()=>handleDelete(list._id)}>Delete</td>
                  <td onClick={()=>handleUpdate(list)}>Update</td>
                </tr>
              )
            })}
         </tbody>
      </table>
      </Box>
     </>
  )
}