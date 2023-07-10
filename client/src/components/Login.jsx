import { NavLink, useNavigate } from 'react-router-dom';
import loginImg from '../images/About-img.png'
import '../styles/Login.css'
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email:"", password:""
  });
  const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]:value })
  }
  const handleSignin = async (e) =>{
      e.preventDefault();
      const { email, password } = user;
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      } )
      if(res.status === 400 || !res)
      {
        window.alert("Invalid Credentials");
      }
      else
      {
        const data = await res.json();
        const { accessToken, refreshToken, message } = data;
        console.log("Access Token:", accessToken);
        // Store the access token in sessionStorage
        sessionStorage.setItem("accessToken", accessToken);
        document.cookie = `accessToken=${accessToken}; path=/;`;
        window.alert("Signin successfully");  
        navigate("/");
      }
  }
  return (
    <div>
        <div className="login-sec">
          <div className="login-container">
            <div className="login-left">
              <img src={loginImg} alt="loginImg" />
              <NavLink to='/registration' className='login-redi'> Create an account </NavLink>
            </div>
            <div className="login-right">
                <h1> Sign In </h1>
                <form method='POST'>
                  <div className="input-div">
                    <label htmlFor="email"> <i className="zmdi zmdi-email material-icons-name"></i> </label>
                    <input type="text"  id="email" placeholder='Enter Email' 
                          name="email" 
                          value={user.email}
                          onChange={handleInputs}
                    />
                  </div>
                  <div className="input-div">
                    <label htmlFor="password"> <i className="zmdi zmdi-lock material-icons-name"></i> </label>
                    <input type="password" id="password" placeholder='Your Password'
                          name="password"
                          value={user.password}
                          onChange={handleInputs}
                    />
                  </div>
                  <button onClick={handleSignin} > Sign In </button>
                  
                </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login;