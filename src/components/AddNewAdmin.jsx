import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { p } from '../AppWrapper';
import { toast } from 'react-toastify';

const AddNewAdmin = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const a = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(p);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const respo = axios.post('http://localhost:4000/api/v1/admin/admin/addNewAdmin',{
        firstName, lastName, email, mobile, aadhar, dob, gender, password
      },{
        withCredentials:true,
        headers:{ "Content-Type" : "appliction/json" }
      });
      toast.success(respo.data.message);
      setIsAuthenticated(false);
      a('/');
      setFirstName('');
      setLastName("");
      setEmail("");
      setMobile("");
      setAadhar("");
      setDob("");
      setGender("");
      setPassword("");
    }catch(err){
      toast.error(err.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          </div>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="number" placeholder="Mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
          </div>
          <div>
            <input type="number" placeholder="Aadhar" value={aadhar} onChange={(e)=>setAadhar(e.target.value)}/>
            <input type="date" placeholder="DoB" value={dob} onChange={(e)=>setDoB(e.target.value)}/>
          </div>
          <div>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type='submit'>ADD ADMIN</button>
          </div>
          </form>
      </section>
    </section>
  )
}

export default AddNewAdmin
