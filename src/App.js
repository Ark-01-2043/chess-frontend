import Login from "./pages/client/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/client/Register";
import HomePage from "./components/HomePage";
import Profile from "./pages/client/Profile";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./pages/client/ChangePassword";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/admin/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import UserManagement from "./pages/admin/UserManagement";
import AddUser from "./pages/admin/AddUser";
import UpdateUser from "./pages/admin/UpdateUser";
import Algorithm from "./pages/admin/Algorithm";
import Game from "./pages/client/Game";
import History from "./pages/client/History"
import GameHistory from "./pages/client/GameHistory";
import Leaderboard from "./pages/client/Leaderboard";

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
        <Route path="/loading" element={<LoadingScreen/>}/>
        <Route path="/admin" element={<Home/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/user" element={<UserManagement/>}/>
        <Route path="/admin/user/add" element={<AddUser/>}/>
        <Route path="/admin/user/update" element={<UpdateUser/>}/>
        <Route path="/admin/algorithm" element={<Algorithm/>}/>
        <Route path="/game" element={<Game/> }/>
        <Route path="/ranking" element={<Leaderboard />}/>
        <Route path="/history" element={<History />}/>
        <Route path="/history/game" element={<GameHistory />}/>
      </Routes>
    </>
    
  );
}

export default App;
