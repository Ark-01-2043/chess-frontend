import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../../assets/css/login.css"
import LoadingScreen from '../../components/LoadingScreen';
import ReactLoading from "react-loading"
import { debounce } from 'lodash';
function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate();
    useEffect(() => {
        
        // console.log(localStorage.getItem("token"));
        if (localStorage.getItem("adminToken")) {
            // console.log("Not login");
        	navigate("/admin");
        }
		document.title = "Đăng nhập-Admin"
    }, []);
	
    const loginClick = async (e) => {
		setLoading(true)
        const param = {
			username: username,
			password: password
		};
		// console.log(param);
		try {
			const data = await fetch("https://chess-backend-3qay.onrender.com/api/auth/signin",{
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
				setLoading(false)
        		throw {message: error.message, status:error.cod};
			}
			
			const dataJson = await data.json();
			console.log(dataJson);
			
			
			if (dataJson.role.id == 1) {
				localStorage.setItem("adminToken", dataJson.accessToken);
				navigate("/admin")
			}else{
                alert("Hãy dùng tài khoản admin")
				setLoading(false)
			}
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
				
                
				
				{!loading && <input id="submit" type="button" defaultValue="ĐĂNG NHẬP" onClick={debounce(async () => await loginClick(), 2000)}/>}
				{loading && <div className='submit-btn'>
					<ReactLoading
						type='spinningBubbles'
						color={"#03fc4e"}
						height={20}
						width={30}
					/>
				</div>}
				
			</form>
		</div>
	</div>
  )
}

export default AdminLogin