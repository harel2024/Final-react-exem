

import { ReactNode, useEffect} from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
interface IPrivateRoute{
    component: ReactNode,
}
const PrivateRoute = ({ component}:IPrivateRoute) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    console.log("נכנסתי לפרייבט");
    
    useEffect(()=>{
        if(!token){
            navigate("/")
            console.log("go to login MDF");
        }
    },[])
    return(
        <div>
            {component}
        </div>
    )
};
export default PrivateRoute