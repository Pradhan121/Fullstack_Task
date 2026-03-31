import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from 'yup';

export default function Questions() {
  const[queList,setQueList] = useState({
    question: '',
    answer: '',
    marks: '',
    loginUser: '',
    languageList: '',
    topicList: ''
  })
  const[questions,setQuestions] = useState([])
  const[users,setUsers] = useState([]);
  const[languages,setLanguages] = useState([]);
  const[topics,setTopics] = useState([])
  const[editId,setEditId] = useState(null)
  const[open,setOpen] = useState(false)

  const fetchQuestionData = ()=>{
    axios.get('http://localhost:3000/questions')
      .then((res)=>{
        setQuestions(res.data.data)
      })
      .catch((err)=>{console.log(err)})
  }

  useEffect(()=>{
    fetchQuestionData();
  },[])


  const formik = useFormik({
    initialValues: queList,
    enableReinitialize: true,
    validationSchema: Yup.object({
        question: Yup.string().required('Required'),
        answer: Yup.string().required('Required'),
        marks: Yup.string().required('Required'),
        loginUser: Yup.string().required('Select user'),
        languageList: Yup.string().required('Select language'),
        topicList: Yup.string().required('Required')
    }),
    onSubmit: (values,{resetForm})=>{

      if(editId !== null){
         axios.put(`http://localhost:3000/questions/${editId}`, values)
          .then(()=>{
            toast.success('QuestionData updated successfuly');
            fetchQuestionData()
            setEditId(null)
            resetForm();
          })
          .catch((err)=>{console.log(err)})
      }
      else{
        axios.post('http://localhost:3000/questions',values)
        .then(()=>{
          toast.success('QuestionData added successfuly');
          fetchQuestionData();
        })
        .catch((err)=>{console.log(err)})
      }
      setQueList({
        question: '',
    answer: '',
    marks: '',
    loginUser: '',
    languageList: '',
    topicList: ''
      })
    }
  })
  return (
    <>
      <Typography variant="h5" sx={{ ml: 15 }}>
        Topic
      </Typography>

      <Box sx={{ p: "50px 0 0 150px" }}>
        {/* ADD BUTTON */}
        <Button sx={{ border: "1px solid", mb: 2 }}>Add Topic</Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add Topic</DialogTitle>

          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              
              <TextField fullWidth/>

              <TextField fullWidth/>

              <TextField fullWidth/>

              <TextField fullWidth>
                
              </TextField>

              
              <TextField fullWidth>
                
              </TextField>

              <TextField fullWidth>
                
              </TextField>
              <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
