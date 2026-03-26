import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./components/Dashboard";

export default function App() {
  return(
    <>
      <ToastContainer position="bottom-right" autoClose={2000}/>
     <Router>
       <Routes>
          <Route path='/' element = {<Login/>}/>
          <Route path='/logout' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>    
        </Routes>   
      </Router>
    </>
  )
}