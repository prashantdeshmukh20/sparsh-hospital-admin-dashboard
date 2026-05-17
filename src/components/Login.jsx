import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { p } from '../AppWrapper'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const a = useNavigate();

  const {isAuthenticated, setIsAuthenticated} = useContext(p);

  const handleSub = async(e) => {
    e.preventDefault();
    try{
      const respo = await axios.post('http://localhost:4000/api/v1/user/patient/login',{
        email, password, confirmPassword, role: "Admin" 
      },{
        withCredentials:true,
        headers:{ "Content-Type" : "application/json" }
      });
      console.log(respo);
      toast.success(respo.data.message);
      setIsAuthenticated(true);
      a('/');
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  if(isAuthenticated){
    return<>
    <Navigate to="/" />
    </>
  }
  return (
    <section className="container form-component">
      <img src="/logo.png" alt="logo" className="logo"/>
      <h1 className="form-title">WELCOME TO SPARSH HOSPITAL</h1>
      <p>Only Admins Are Allowed To Access These Resources!</p>
      <form onSubmit={handleSub}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
}

export default Login
