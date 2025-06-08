import { Navigate, Route, Routes } from "react-router-dom"; 
import "./App.css"; 
import Home from "./pages/home/Home"; 
import Login from "./pages/login/Login"; 
import SignUp from "./pages/signup/Signup"; 
import Forgot from "./pages/forgot/ForgotPassword"; 
import Reset from "./pages/reset/ResetPassword"; 
import ProfileView from './pages/features/ProfileView'; 
import { Toaster } from "react-hot-toast"; 
import { useAuthContext } from "./context/AuthContext"; 
import { useEffect } from 'react';
import notificationService from './services/notificationService';
 
function App() { 
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      notificationService.requestPermission();
    }
  }, [authUser]); 
 
  return ( 
      <div className="p-4 h-screen flex items-center justify-center"> 
        <Routes> 
          <Route 
            path="/" 
            element={authUser ? <Home /> : <Navigate to={"/login"} />} 
          /> 
          <Route 
            path="/login" 
            element={authUser ? <Navigate to="/" /> : <Login />} 
          /> 
          <Route 
            path="/signup" 
            element={authUser ? <Navigate to="/" /> : <SignUp />} 
          /> 
          <Route path="/forgot" element={<Forgot />} /> 
          <Route path="/reset/:token" element={<Reset />} /> 
          <Route path="/profile" element={<ProfileView />} /> 
          <Route path="/profile/:userId" element={<ProfileView />} /> 
 
        </Routes> 
        <Toaster /> 
      </div> 
     
  ); 
} 
 
export default App;