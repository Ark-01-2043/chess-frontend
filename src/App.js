import Login from "./pages/client/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/client/Register";
import HomePage from "./components/HomePage";
import Profile from "./pages/client/Profile";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./pages/client/ChangePassword";


function App() {
  return (
    <>
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element = {<UpdateProfile/>}/>
        <Route path="/profile/changePassword" element = {<ChangePassword/>}/>
        
      </Routes>
    </>
    
  );
}

export default App;
