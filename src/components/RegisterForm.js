import React from 'react'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function RegisterForm({form, button}) {
    // const [username, setusername] = useState("");
    // const [password, setpassword] = useState("");
    // const [email, setEmail] = useState("");
    // const [confirmedPassword, setConfirmedPassword] = useState("");
    // const [hoTen, setHoTen] = useState("");
    // const [soDienThoai, setSoDienThoai] = useState("");
    // const [gioiTinh, setGioiTinh] = useState("true");
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const confirmedPasswordRef = useRef("");
    const emailRef = useRef("");
    const hoTenRef = useRef("");
    const soDienThoaiRef = useRef("");
    const gioiTinhRef = useRef("true");
    const [error, seterror] = useState("none");
    const navigate = useNavigate();
    const checkConfirmedPassword = () => {
        const password = passwordRef.current.value;
        const confirmedPassword = confirmedPasswordRef.current.value;
        if (confirmedPassword != password) {
            seterror("block");
        }
        else{
            seterror("none");
        }
    }
    const register = async (e) => {
        const param = {
			hoTen: hoTenRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            confirmedPassword: confirmedPasswordRef.current.value,
            email: emailRef.current.value,
            soDienThoai: soDienThoaiRef.current.value,
            gioiTinh: gioiTinhRef.current.firstChild.checked
		};
		console.log(param);
		try {
			const data = await fetch("http://localhost:8081/api/auth/signup",{
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
			
			navigate("/login");
		} catch (error) {
			// console.log(error);
			alert(error.message);
		}
    };
    return (
    <div className="form">
        <form>
            
            <h2 className="form-signin-heading" style={{textAlign: "center"}}>{form}</h2>
            <hr/>
            <br/>
            
            
            <div className="form-group">
                
                <input type="text" name="username" className="form-control"
                    placeholder="Tên đăng nhập" autoFocus={true} required="required" ref={usernameRef}></input>
                
                
            </div>

            <div className="form-group">
                <input type="password" className="form-control"
                    required="required" placeholder="Mật khẩu" ref={passwordRef} onChange={checkConfirmedPassword}></input>
                
            </div>

            <div className="form-group">
                <div className='alert error' style={{fontSize: "12px", display: error}}>Mật khẩu nhắc lại không đúng</div>
                <input type="password" name="confirmPassword"
                    className="form-control" placeholder="Nhắc lại mật khẩu"
                    required="required" ref={confirmedPasswordRef} onChange={checkConfirmedPassword}></input>
            </div>

            <div className="form-group">
                <input type="text" name="hoTen" className="form-control"
                    placeholder="Họ và tên" required="required" ref={hoTenRef}></input>
            </div>
            <div className="form-group">
                <input type="email" name="email" className="form-control"
                    placeholder="Email" required="required" ref={emailRef}></input>
                
            </div>
            <div className="form-group">
                <input type="text" name="sdt" className="form-control"
                    placeholder="Số điện thoại" required="required" ref={soDienThoaiRef}></input>
            </div>
            {/* <div onChange={setGioiTinh.bind(this)}> */}
            <div ref={gioiTinhRef}>
                <input type="radio" value={true} name="gioiTinh"  defaultChecked={true} /> Nam
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" value={false} name="gioiTinh" /> Nữ
            </div>
            <br/>
            <input id="maVaiTro" type="hidden" value="2"/>
            <input id="submit" type="button" onClick={async () => await register()} value={button}/>
                        
        </form>
    </div>
  )
}
