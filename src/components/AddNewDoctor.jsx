import React, { useContext, useState } from 'react'
import { p } from '../AppWrapper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewDoctor = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const[doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const[docAvatar, setDocAvatar]=useState("");

  const departmentArr = [
    { id : 1, department : "Pediatrics" },
    { id : 2, department : "Orthopedics" },
    { id : 3, department : "Cardiology" },
    { id : 4, department : "Neurology" },
    { id : 5, department : "Oncology" },
    { id : 6, department : "Radiology" },
    { id : 7, department : "Physical Therapy" },
    { id : 8, department : "Dermatology" },
    { id : 9, department : "ENT" },
  ];

  const{ isAuthenticated, setIsAuthenticated } = useContext(p);
  const a = useNavigate();

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleForm = async(e) => {
    e.preventDefault();

    try{
      const bodyData = new FormData();
      bodyData.append("firstName", firstName);
      bodyData.append("lastName", lastName);
      bodyData.append("email", email);
      bodyData.append("mobile", mobile);
      bodyData.append("password", password);
      bodyData.append("aadhar", aadhar);
      bodyData.append("dob", dob);
      bodyData.append("gender", gender);
      bodyData.append("doctorDepartment", doctorDepartment);
      bodyData.append("docAvatar", docAvatar);

      const respo = await axios.post("http://localhost:4000/api/v1/admin/doctor/addDoctor",bodyData,{
        withCredentials:true,
        headers:{"Content-Type":"multipart/form-data"}
      });
      toast.success(respo.data.message);
      setIsAuthenticated(true);
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

    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    }

  };

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleForm} >
          <div  className="first-wrapper">
            <div>
              <img src={ docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg" } alt="Doctor Avatar" />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
              <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="number" placeholder="Mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
              <input type="number" placeholder="Aadhar" value={aadhar} onChange={(e)=>setAadhar(e.target.value)}/>
              <input type="date" placeholder="DoB" value={dob} onChange={(e)=>setDob(e.target.value)}/>
              <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <select value={doctorDepartment} onChange={(e)=>setDoctorDepartment(e.target.value)}>
                <option value="">Select Doctor Department</option>
                {
                  departmentArr.map((e) => {
                    return (
                      <option key={e.id} value={e.department}>{e.department}</option>
                    );
                  })
                }
              </select>
              <button type='submit'>Register New Doctor</button>
            </div>
          </div>
        </form>
      </section> 
    </section >
  )
}

export default AddNewDoctor
