

import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 



  // פונקציה של התחברות
  const loginFunc = async () => {
    if (username && password) {
        // @ts-ignore: 
      const response =  await dispatch(loginUser({ username, password }));
      
      if (response.error) {
        alert(response.error);
        return;
      }

      // @ts-ignore
      if (response.payload.user.area ==="none") {
        navigate("/Atteck");
    }
    else {
      navigate("/Defense");
    }
    }
  };

  ////////////////////////////////////////////////////

  // Redirect to candidates page on successful login
//   useEffect(() => {
//     if (status === "succeeded" && token) {
//       navigate("/candidates");
//     }
//   }, [status, navigate, token]);



////////////////////////////////////////////////////
  // Check if there is an error
  const errorMessage = status === "failed" ? error : null;

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={loginFunc} disabled={status === "loading"} className="login-button">
          {status === "loading" ? "Logging in..." : "Login"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="link-container">
          <Link to="/register">Don't have an account? Sign up here!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;









