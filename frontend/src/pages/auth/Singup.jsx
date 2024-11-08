import React, { useState } from "react";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import "./auth.css";
import Logo from '/logo.svg'
import { Link , useNavigate } from "react-router-dom";
const addUser = async (newUser)=>{
   const response = await fetch('/api/user',{
    method:'post',
    headers :{
      'content-type': 'application/json'
    },
    body: JSON.stringify(newUser)
   })
   if (!response.ok) {
    throw new Error('failed add user');
    
   }
   return response;
}
function Singup() {
  const [firstName, setFisrtName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  console.log(email);
  const quiryCleint = useQueryClient()
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: ()=>{
      toast.success('sing up succesfull')
      quiryCleint.invalidateQueries()
      setFisrtName('')
      setLastName('')
      setEmail('')
      setPassword('')
      navigate('/login')
    },
    onError: (err)=>{
      toast.error('error sing up', err)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password:password
    });
  };

  
  return (
    <main>
    <div className="formAuth">
      <form onSubmit={handleSubmit}>
        <h2>Get started</h2>
        <div>
          <img src={Logo} alt="logo" />
        </div>

        <label htmlFor="">First Name*</label>
        <input type="text" value={firstName} placeholder="First name" onChange={e=>setFisrtName(e.target.value)} />
        <label htmlFor="">Last Name*</label>
        <input type="text" value={lastName} placeholder="Last name" onChange={e=>setLastName(e.target.value)}/>
        <label htmlFor="">Email*</label>
        <input type="email" value={email} placeholder="You@example.com" required onChange={e=>setEmail(e.target.value)}/>
        <label htmlFor="">Password*</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button>Sing Up</button>
        <p>
          Already have an account?
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>

    </main>
  );
}

export default Singup;
