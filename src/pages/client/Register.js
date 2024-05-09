import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/RegisterForm'
import "../../assets/css/login.css"


export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
        
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
        // console.log("Not login");
      navigate("/");
    }
    document.title = "Đăng kí"
});
  return (
    
    <div className="login-page">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <link type='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <RegisterForm form="Đăng kí tài khoản" button = "ĐĂNG KÍ"></RegisterForm>
        
    </div>

  )
}
