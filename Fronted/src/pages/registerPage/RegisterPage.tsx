import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {  registerUser } from "../../store/userSlice";
import "./register.css";
import { Navigate, useNavigate } from "react-router-dom";


const Form: React.FC = () => {
    const [organization, setOrganization] = React.useState<string>("");
    const { status, error } = useSelector((state: { userReducer: { status: string, error: string | null } }) => state.userReducer)
    const dispatch = useDispatch()

    const { formData, handleChange } = useForm({
        username: "",
        password: "",
        organization: "",
        location: "North"
    });
    const navigate = useNavigate()
    //@ts-ignore
    const SendLoginUser = () => {formData.password && formData.username && dispatch(registerUser(formData));
         navigate("/")}

    return (
        // <div className="form-container">
        //     <h2 className="form-title">Register</h2>
        //     <form className="login-form" onSubmit={(e) => { e.preventDefault(); SendLoginUser(); console.log(formData);
        //      }} >
        //         <label className="form-label">
        //             UserName:
        //             <input
        //                 name="username"
        //                 type="text"
        //                 value={formData?.username || ""}
        //                 onChange={handleChange}
        //                 className="form-input"
        //             />
        //         </label >
        //         <label className="form-label">
        //             Password:
        //             <input
        //                 name="password"
        //                 type="password"
        //                 value={formData?.password || ""}
        //                 onChange={handleChange}
        //                 className="form-input"
        //             />
        //         </label>
        //         <select name="organization" id="" onChange={(e)=>{setOrganization(e.target.value); formData.organization = e.target.value; }}>
        //             <option value="select">Select Organization</option>
        //             <option value="IDF" >IDF</option>
        //             <option value="Hamas">Hamas</option>
        //             <option value="Hezbollah">Hezbollah</option>
        //             <option value="Houthis">Houthis</option>
        //             <option value="IRGC">IRGC</option>
        //         </select>
        //         {organization == "IDF"?  
        //         <select name="location" id="" onChange={(e)=>{formData.location = e.target.value; }}>
        //             <option value="North">North</option>
        //             <option value="South">south</option>
        //             <option value="Center">Center</option>
        //             <option value="West Bank">West Bank</option>
        //         </select>: null}
        //         <div className="form-buttons">
        //             <button type="reset" className="form-button" onClick={() => navigate("/")} >Login Page</button>
        //             <button type="submit" className="form-button">Submit</button>

        //         </div>
        //     </form>
        //     <p className="form-error">{error}</p>
        // </div>
        <div className="form-container">
    <h2 className="form-title">Register</h2>
    <form
        className="login-form"
        onSubmit={(e) => {
            e.preventDefault();
            SendLoginUser();
            console.log(formData);
        }}
    >
        <label className="form-label">
            UserName:
            <input
                name="username"
                type="text"
                value={formData?.username || ""}
                onChange={handleChange}
                className="form-input"
            />
        </label>
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
        <label className="form-label">
            Organization:
            <select
             className = "form-select"
            
                name="organization"
                aria-label="Select your organization"
                onChange={(e) => {
                    setOrganization(e.target.value);
                    formData.organization = e.target.value;
                   
                }}
            >
                <option value="select">Select Organization</option>
                <option value="IDF">IDF</option>
                <option value="Hamas">Hamas</option>
                <option value="Hezbollah">Hezbollah</option>
                <option value="Houthis">Houthis</option>
                <option value="IRGC">IRGC</option>
            </select>
        </label>
        {organization === "IDF" && (
            <label className="form-label">
                Location:
                <select
                    name="location"
                    aria-label="Select your location"
                    onChange={(e) => {
                        formData.location = e.target.value;
                    }}
                    className = "form-select"
                >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                    <option value="West Bank">West Bank</option>
                </select>
            </label>
        )}
        <div className="form-buttons">
            <button type="reset" className="form-button" onClick={() => navigate("/")}>
                Login Page
            </button>
            <button type="submit" className="form-button">
                Submit
            </button>
        </div>
    </form>
    <p className="form-error">{error}</p>
</div>

    );
};
export default Form;