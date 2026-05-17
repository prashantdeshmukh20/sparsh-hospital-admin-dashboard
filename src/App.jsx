import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddNewDoctor from './components/AddNewDoctor';
import AddNewAdmin from './components/AddNewAdmin';
import Message from './components/Message';
import Doctors from './components/Doctors';
import Sidebar from './components/Sidebar.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from 'react';
import { p } from './AppWrapper.jsx'
import axios from 'axios';


function App(){

  const { isAuthenticated, setIsAuthenticated, setAdmin }=useContext(p);

  console.log(isAuthenticated);
  
  useEffect(()=>{
    const adminAuth = async () => {
      try{
        const respo = await axios.get("http://localhost:4000/api/v1/admin/detail",{
          withCredentials:true
        });
        
        setIsAuthenticated(true);
        setAdmin(respo.data.user);
        console.log(respo.data.user);
        console.log(respo);

      }catch(err){
        setIsAuthenticated(false);
        setAdmin({});
      }
    };

    adminAuth();
    
  },[isAuthenticated]);

  return<>
  <BrowserRouter>
  <Sidebar />
  <Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='/login' element={<Login/>} />
    <Route path='/doctor/addnew' element={<AddNewDoctor/>} />
    <Route path='/admin/addnew' element={<AddNewAdmin/>} />
    <Route path='/messages' element={<Message/>} />
    <Route path='/doctor' element={<Doctors/>} />
  </Routes>
  <ToastContainer position="top-center" />
  </BrowserRouter>
  </>
}
export default App;