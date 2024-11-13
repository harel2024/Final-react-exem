import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store';

import { logout } from '../../store/userSlice';
import { useNavigate } from "react-router";

import './defense.css'
// import { StartSocket } from '../../socketManag';

const Defense = () => {
    const dispatch = useDispatch()
    const {  status, error } = useSelector((state: RootState) => state.candidates);
    const navigate = useNavigate()



      useEffect(() => {
    if (status === 'idle') {
      
    /////קורא לפונקציה שמפעילה את הסוקט להוספת הצבעות
    // StartSocket();
    //   //@ts-ignore
    //   dispatch(fetchCandidates());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading candidates...</p>;
  if (status === 'failed') return <p style={{ color: 'red' }}>{error}</p>;

  const logoutFunc = () => {
    dispatch(logout()); // קריאה לפעולת logout ב-Redux
    navigate("/"); // חזרה לעמוד הבית לאחר logout
  };

  return (
    <div className="candidate-list-container">
            <h2>Defenc </h2>
    
      <div className="candidate-list">
      </div>
      <button onClick={logoutFunc} className="logout-button">Logout</button> 
      
    </div>
  )
}

export default Defense






