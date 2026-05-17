import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { p } from '../AppWrapper';
import { Navigate } from 'react-router-dom';

const Message = () => {

  const [allMessages, setAllMessages]=useState([]);

  const { isAuthenticated } = useContext(p);
  useEffect(()=>{

    const getAllMessages = async () => {

      try{
        const respo = await axios.get("http://localhost:4000/api/v1/message/admin/allMessage",{
          withCredentials:true
        });
        console.log(respo);
        setAllMessages(respo.data.allMessage);

      }catch(err){
        toast.error(err.response.data.message);
      }

    }

    getAllMessages();

  },[])

  if(!isAuthenticated){
    return<>
    <Navigate to={"/login"} />
    </>
  }

  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {
          allMessages && allMessages.length > 0 ? (
            allMessages.map((e) => {
              return (
                <div className="card" key={e._id}>
                  <div className="details">
                    <p>
                      First Name: <span>{e.firstName}</span>
                    </p>
                    <p>
                      Last Name: <span>{e.lastName}</span>
                    </p>
                    <p>
                      Email: <span>{e.email}</span>
                    </p>
                    <p>
                      Phone: <span>{e.phone}</span>
                    </p>
                    <p>
                      Message: <span>{e.message}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) :(
          <h1>No Messages!</h1>
          )
        }
      </div>
    </section>
  )
}

export default Message
