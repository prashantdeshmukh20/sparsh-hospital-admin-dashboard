import React, { useContext, useEffect, useState } from 'react'
import { p } from '../AppWrapper';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchAppointments = async () => {
      try {
        const respo = await axios.get("http://localhost:4000/api/v1/appintment/admin/appointment/all",{
           withCredentials: true 
          }
        );
        setAppointments(respo.data.appointments);
        console.log(respo);
      } catch (error) {
        setAppointments([]);
      }
    };

    fetchAppointments();

  }, []);

   const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const respo = await axios.put(`http://localhost:4000/api/v1/appintment/admin/update/status/${appointmentId}`,{
        status 
      },{
       withCredentials: true 
      });
      console.log(respo);
      setAppointments((prevAppointments) => 
        prevAppointments.map((appointment) => appointment._id === appointmentId ? { ...appointment, status } : appointment
      ));
      console.log(respo);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
   };

  const { isAuthenticated, admin } = useContext(p);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin && `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>1500</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0
                ? appointments.map((e) => (
                    <tr key={e._id}>
                      <td>{e.firstName} {e.lastName}</td>
                      <td>{e.appointment_date}</td>
                      <td>{e.doctor.firstName} {e.doctor.lastName}</td>
                      <td>{e.department}</td>
                      <td>
                        <select  className={ e.status === "Pending"? "value-pending" : e.status === "Accepted" ? "value-accepted" : "value-rejected" }
                          value={e.status}
                          onChange={(ele) => handleUpdateStatus(e._id, ele.target.value) }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{e.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  ))
                : (
                    <tr>
                      <td>No Appointments Found!</td>
                    </tr>
                  )
                }
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Dashboard
