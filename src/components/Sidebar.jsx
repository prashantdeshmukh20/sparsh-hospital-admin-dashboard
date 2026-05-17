import React, { useContext, useState } from 'react'
import { TiHome } from 'react-icons/ti';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdAddModerator } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { AiFillMessage } from 'react-icons/ai';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  GiHamburgerMenu } from 'react-icons/gi';
import { p } from '../AppWrapper.jsx'

const Sidebar = () => {

  const a = useNavigate();

  const [show, setShow]=useState(false);
  const { isAuthenticated, setIsAuthenticated} = useContext(p);

  const gotoAddNewDoctor = () => {
    a('/doctor/addnew');
    setShow(!show);
  }

  const gotoMessagePage = () => {
    a('/messages');
    setShow(!show);
  }

  const handleLogout = async() => {
    try{
     const respo = await axios.get('http://localhost:4000/api/v1/admin/logout',{
        withCredentials:true
      });
      toast.success(respo.data.message);
      setIsAuthenticated(false);
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  return (
    <>
    <nav style={!isAuthenticated ? { display: "none" } : { display: "flex" }} className={show ? "show sidebar" : "sidebar"}>
      <div className="links">
        <NavLink to='/' onClick={()=>setShow(!show)}><TiHome/></NavLink>
        <NavLink to='/doctor' onClick={()=>setShow(!show)}><FaUserDoctor /></NavLink>
        <NavLink to='/admin/addnew' onClick={()=>setShow(!show)}><MdAddModerator/></NavLink>
        <IoPersonAddSharp onClick={gotoAddNewDoctor} />
        <AiFillMessage onClick={gotoMessagePage}/>
        <RiLogoutBoxFill onClick={handleLogout}/>
      </div>
    </nav>
    <div className="wrapper" style={!isAuthenticated ? { display: "none" } : { display: "flex" }} >
      <GiHamburgerMenu className="hamburger" onClick={()=> setShow(!show)} />
    </div>
    </>
  )
}

export default Sidebar
