import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./components/Dashboard";
import './App.css';
import Language from "./pages/Language";
import DashboardHome from "./pages/DashboardHome";
import Topic from "./pages/Topic";
import Questions from "./pages/Questions";

export default function App() {
  return(
    <>
      <ToastContainer position="bottom-right" autoClose={2000}/>
     <Router>
       <Routes>
          <Route path='/' element = {<Login/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='/dashboard' element={<Dashboard/>}>
            <Route index element={<DashboardHome />} />   
            <Route path='language' element={<Language/>}/>  
            <Route path='topic' element={<Topic/>}/>  
            <Route path="questions" element={<Questions/>}/>
          </Route>
        </Routes>   
      </Router>
    </>
  )
}