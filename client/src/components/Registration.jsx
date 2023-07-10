import React, { useState } from 'react'
import '../styles/Registration.css'
import formImg from '../images/About-img.png'
import { NavLink, useNavigate } from 'react-router-dom'

const Registration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"", email:"", phone:"", work:"", password:"", cpassword:""
  })
  const handleInputs = (e) =>{
      const name = e.target.name;
      const value = e.target.value;

      setUser({...user, [name]:value })
  }
  const postData = async (e) =>
  {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    console.log(user.name);
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          name, email, phone, work, password, cpassword
      })
    });
    console.log(res);
    const data = await res.json();
    if(data.status === 422 || !data)
    {
      window.alert("Invalid Registration");
    }
    else
    {
      window.alert("Rgistration successfully");
      navigate("/login");
    }
  } 
  return (
    <div className='reg-section'>
        <div className="reg-container">
            <h1>Sign Up</h1> <br />
            <form method='POST'>
                <div className="form-left">

                  <div className='input-div'>
                    <label htmlFor="name"> <i className="zmdi zmdi-account material-icons-name"></i> </label>
                    <input type="text" id="name" autoComplete='off'
                          placeholder='Your Name'
                          name="name"
                          value={user.name}
                          onChange={handleInputs}  
                    />
                  </div>

                  <div className="input-div">
                    <label htmlFor="email"> <i className="zmdi zmdi-email material-icons-name"></i> </label>
                    <input type="text" id="email" autoComplete='off'
                          placeholder='Enter Email'
                          name="email" 
                          value={user.email}
                          onChange={handleInputs}
                    />
                  </div>

                  <div className="input-div">
                    <label htmlFor="phone"> <i className="zmdi zmdi-phone material-icons-name"></i> </label>
                    <input type="text" id="phone" autoComplete='off'
                          placeholder='Enter PhoneNo'
                          name="phone"  
                          value={user.phone}
                          onChange={handleInputs} 
                    />
                  </div>

                  <div className="input-div">
                    <label htmlFor="work"> <i className="zmdi zmdi-slideshow material-icons-name"></i> </label>
                    <input type="text" id="work" autoComplete='off'
                          placeholder='Your work'
                          name="work"  
                          value={user.work}
                          onChange={handleInputs} 
                    />
                  </div>

                  <div className="input-div">
                    <label htmlFor="password"> <i className="zmdi zmdi-lock material-icons-name"></i> </label>
                    <input type="password" id="password" autoComplete='off'
                          placeholder='Enter your password'
                          name="password" 
                          value={user.password} 
                          onChange={handleInputs}
                    />
                  </div>

                  <div className="input-div">
                    <label htmlFor="cpassword"> <i className="zmdi zmdi-lock material-icons-name"></i> </label>
                    <input type="password" id="cpassword" autoComplete='off'
                          placeholder='Confirm your password'
                          name="cpassword" 
                          value={user.cpassword}
                          onChange={handleInputs} 
                    />
                  </div>
                  <button onClick={postData}> Sign Up </button>
                </div>
                <div className="form-right">
                    <img src={formImg} alt="formImg" />
                    <NavLink to='/login' className='login-redi'> I am already Registered </NavLink>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Registration
