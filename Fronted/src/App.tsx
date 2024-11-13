
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
// import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Defense from "./pages/defense/Defense";
import Atteck from "./pages/atteck/Atteck";



function App() {
  return (
  
    // <Layout>   
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Defense" element={<PrivateRoute component={<Defense/>} />} />
          <Route path="/Atteck" element={<PrivateRoute component={<Atteck/>} />} />
       
          {/* <Route  path="/floor/:index"  element={ <PrivateRoute>  <Floor /> </PrivateRoute> } /> */}
       
       </Routes>
    //  </Layout>  
              
             
           
         
      
  
  );
}

export default App;

















