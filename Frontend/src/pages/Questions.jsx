import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
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
  const[languages,setLanguages] = useState([]);
  const[topics,setTopics] = useState([])
  const[editId,setEditId] = useState(null)
  const[open,setOpen] = useState(false)

  const user = localStorage.getItem('userId')

  const fetchQuestionData = ()=>{
    axios.get('http://localhost:3000/questions')
      .then((res)=>{
        setQuestions(res.data.data)
      })
      .catch((err)=>{console.log(err)})
  }

  useEffect(()=>{
    fetchQuestionData();

    axios.get('http://localhost:3000/language')
    .then((res)=>{setLanguages(res.data.data)})

   axios.get('http://localhost:3000/topic')
    .then((res)=>(setTopics(res.data.data)))
  },[])


  const formik = useFormik({
    initialValues: queList,
    enableReinitialize: true,
    validationSchema: Yup.object({
        question: Yup.string().required('Required'),
        answer: Yup.string().required('Required'),
        marks: Yup.string().required('Required'),
        languageList: Yup.string().required('Select language'),
        topicList: Yup.string().required('Required')
    }),
    onSubmit: (values,{resetForm})=>{
      values.loginUser = user

      if(editId !== null){
         axios.put(`http://localhost:3000/questions/${editId}`, values)
          .then(()=>{
            toast.success('QuestionData updated successfuly');
            fetchQuestionData()
            setEditId(null)
            resetForm();
            setOpen(false) 
          })
          .catch((err)=>{console.log(err)})
      }
      else{
        axios.post('http://localhost:3000/questions',values)
        .then(()=>{
          toast.success('QuestionData added successfuly');
          fetchQuestionData();
          resetForm()
          setOpen(false) 
        })
        .catch((err)=>{console.log(err)})
      }
      setQueList({
        question: '',
        answer: '',
        marks: '',
        languageList: '',
        topicList: ''
      })
    }
  })

 const handleDelete=(id)=>{
  axios.delete(`http://localhost:3000/questions/${id}`)
   .then(()=>{
     toast.success('Question data delete successfuly')
     fetchQuestionData();
   })
   .catch((err)=>{console.log(err)})
 }

 const handleEdit=(que)=>{
  setQueList({
    question: que.question,
    answer: que.answer,
    marks: que.marks,
    languageList: que.languageList,
    topicList: que.topicList
  })
   setEditId(que._id)
   setOpen(true)
 }

  const handleCancel=()=>{
    setOpen(false)
    setEditId(null)
    setQueList({
      question: '',
      answer: '',
      marks: '',
      languageList: '',
      topicList: ''
    })
  }
  return (
    <>
      <Typography variant="h5" sx={{ ml: 15 }}>
        Question
      </Typography>

      <Box sx={{ p: "50px 0 0 150px" }}>
        {/* ADD BUTTON */}
        <Button sx={{ border: "1px solid", mb: 2 }} onClick={()=>setOpen(true)}>Add Question</Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add Question</DialogTitle>

          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              
              <TextField fullWidth 
                  label='Question Name'
                  name='question' 
                  value={formik.values.question}
                  onChange={formik.handleChange}
                  error={formik.touched.question && Boolean(formik.errors.question)}
                  helperText={formik.touched.question && formik.errors.question}
                  sx={{mb: 2}} />

              <TextField fullWidth 
                  label='Answer Name'
                  name='answer' 
                  value={formik.values.answer}
                  onChange={formik.handleChange}
                  error={formik.touched.answer && Boolean(formik.errors.answer)}
                  helperText={formik.touched.answer && formik.errors.answer}
                  sx={{mb: 2}} />

              <TextField fullWidth 
                  label='Enter Mark'
                  name='marks' 
                  value={formik.values.marks}
                  onChange={formik.handleChange}
                  error={formik.touched.marks && Boolean(formik.errors.marks)}
                  helperText={formik.touched.marks && formik.errors.marks}
                  sx={{mb: 2}} />

              <TextField fullWidth
                select
                label='Language Name'
                name='languageList'
                value={formik.values.languageList}
                onChange={formik.handleChange}
                error={formik.touched.languageList && Boolean(formik.errors.languageList)}
                helperText={formik.touched.languageList && formik.errors.languageList}
                sx={{mb: 2}}
              >
                {languages.map((l)=>(
                  <MenuItem key={l._id} value={l._id}>
                     {l.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField fullWidth
                select
                label='Topic Name'
                name='topicList'
                value={formik.values.topicList}
                onChange={formik.handleChange}
                error={formik.touched.topicList && Boolean(formik.errors.topicList)}
                helperText={formik.touched.topicList && formik.errors.topicList}
                sx={{mb: 2}}
              >
                {topics.map((t)=>(
                  <MenuItem key={t._id} value={t._id}>
                      {t.topic_name}
                  </MenuItem>
                ))}
              </TextField>
              <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>

      <table border={1}>
        <thead>
          <th>Questions</th>
          <th>Answer</th>
          <th>Mark</th>
          <th>Language Name</th>
          <th>Topic Name</th>
          <th colSpan={2}>Action</th>
        </thead>
        <tbody>
          {questions.map((q,i)=>{
            return(
              <tr key={i}>
                <td>{q.question}</td>
                <td>{q.answer}</td>
                <td>{q.marks}</td>
                <td>{q.languageList.name}</td>
                <td>{q.topicList.name}</td>
                <td><button onClick={()=>handleDelete(q._id)}>Delete</button></td>
                <td><button onClick={()=>handleEdit(q)}>Update</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
}
