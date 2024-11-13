import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  registerUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    if (organization && organization.startsWith("IDF")) {
      switch (organization) {
        case "IDF - North":
          setArea("North");
          break;
        case "IDF - South":
          setArea("South");
          break;
        case "IDF - Center":
          setArea("Center");
          break;
        case "IDF - West Bank":
          setArea("West Bank");
          break;
        default:
          setArea("");
      }
    } else {
      setArea("none");
    }
  }, [dispatch, organization]);

  const registerFunc = () => {
    if (username && password && organization && area) {
      //@ts-ignore
      dispatch(registerUser({ username, password, organization, area }));
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
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

        <div className="select-container">
          <label htmlFor="organization"> Organization</label>
          <select
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          >
            <option value="IDF - North">IDF - North</option>
            <option value="IDF - South">IDF - South</option>
            <option value="IDF - Center">IDF - Center</option>
            <option value="IDF - West Bank">IDF - West Bank</option>
            <option value="Hezbollah">Hezbollah</option>
            <option value="Hamas">Hamas</option>
            <option value="IRGC">IRGC</option>
            <option value="Houthis">Houthis</option>
          </select>
        </div>

        <button
          onClick={registerFunc}
          disabled={status === "loading"}
          className="register-button"
        >
          {status === "loading" ? "Signing up..." : "Sign up"}
        </button>

        {status === "failed" && <p className="error-message">{error}</p>}
        {status === "succeeded" && (
          <p className="success-message">Registration successful!</p>
        )}

        <div className="link-container">
          <Link to="/">Go back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
