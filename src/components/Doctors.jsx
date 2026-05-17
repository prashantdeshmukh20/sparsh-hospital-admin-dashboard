import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { p } from '../AppWrapper';
import { Navigate } from 'react-router-dom';

const Doctors = () => {

  const [allDoctors, setAllDoctors]=useState([]);
  const { isAuthenticated } = useContext(p);
  useEffect(()=>{
    
    const DoctorData = async() => {

      try{
        const respo = await axios.get('http://localhost:4000/api/v1/doctorsInfo/getAllDoctors',{
          withCredentials:true
        });
        console.log(respo);
        setAllDoctors(respo.data.doctors);
      }catch(err){
        toast.error(err.response.data.message);
      }
    }

    DoctorData();

  },[]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">{
        allDoctors && allDoctors.length>0 ? (
          allDoctors.map((e)=>{
          return(
            <div key={e._id} className="card">
              <img alt="Doctor_Profile_image" src={e.url}/>
              <h4>{e.firstName} {e.lastName}</h4>
              <div className="details">
                <p>
                  Email : <span>{e.email}</span>
                </p>
                <p>
                  Mobile : <span>{e.mobile}</span>
                </p>
                <p>
                  Aadhar : <span>{e.aadhar}</span>
                </p>
                <p>
                  DoB : <span>{e.dob}</span>
                </p>
                <p>
                  Gender : <span>{e.gender}</span>
                </p>
                <p>
                  Department : <span>{e.doctorDepartment}</span>
                </p>
                <p></p>
              </div>
            </div>
          );
        })  
        ) : (<h1>No Registered Doctors Found!</h1>)
      }</div>
    </section>
  )
}

export default Doctors
