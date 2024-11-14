import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../store/userSlice';
import "./LoginPage.css";
import { Navigate, useNavigate } from "react-router-dom";


const Form: React.FC = () => {
    const { status, error } = useSelector((state: { userReducer: { status: string, error: string | null } }) => state.userReducer)
    const dispatch = useDispatch()

    const { formData, handleChange } = useForm({
        username: "",
        password: "",
        organization: ""
    });
    const navigate = useNavigate()
    //@ts-ignore
    const SendLoginUser = async() => {formData.password && formData.username && await dispatch( loginUser(formData)) ; navigate("/test")}
    useEffect(() => {
        const token = localStorage.getItem("token")

        // if (token && token !== "undefined") {
        //     navigate("/candidate")
        // }
    })
    return (
        <div className="form-container">
            <h2 className="form-title">Login</h2>
            <form className="login-form" onSubmit={(e) => { e.preventDefault(); SendLoginUser() }} >
                <label className="form-label">
                    UserName:
                    <input
                        name="username"
                        type="text"
                        value={formData?.username || ""}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label >
                <label className="form-label">
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={formData?.password || ""}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <div className="form-buttons">
                    <button onClick={() => navigate("/RegisterPage")} className="form-button">Register </button>
                    <button type="submit" className="form-button">Submit</button>

                </div>
            </form>
            <p className="form-error">{error}</p>
        </div>
    );
};
export default Form;