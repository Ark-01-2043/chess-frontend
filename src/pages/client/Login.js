import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../../assets/css/login.css"
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
	const navigate = useNavigate();
    useEffect(() => {
        
        // console.log(localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            // console.log("Not login");
        	navigate("/");
        }
		document.title = "Đăng nhập"
    });
	
    const loginClick = async (e) => {
        const param = {
			username: username,
			password: password
		};
		console.log(param);
		try {
			const data = await fetch("http://localhost:8081/api/auth/signin",{
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				// credentials: "include",
				body: JSON.stringify(param)
			});
			// console.log(data);
			if (data.status !== 200) {
				const error = await data.json();
        		throw {message: error.message, status:error.cod};
			}
			
			const dataJson = await data.json();
			// console.log(dataJson);
			localStorage.setItem("token", dataJson.accessToken);
			localStorage.setItem("id", dataJson.id);
			navigate("/");
		} catch (error) {
			// console.log(error);
			alert(error.message);
		}
    };
  return (
    <div className="login-page bg">
        
		<div className="form">
		    <h2 className="form-signin-heading" style={{textAlign: 'center'}}>Đăng nhập</h2>
			<br/>
			
			<form className="login-form">
			    
				<input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" name="username" required="required" style={{padding:  "10px"}}/> 
				
				<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" name="password" required="required" style={{padding:  "10px"}} /> 
				
                
				
				<input id="submit" type="button" defaultValue="ĐĂNG NHẬP" onClick={async () => await loginClick()}/>
				<p className="message" style={{fontSize: "18", paddingTop:"10px"}}> Chưa có tài khoản? <Link to="/register">Tạo tài khoản mới</Link></p>
			</form>
		</div>
	</div>
  )
}
