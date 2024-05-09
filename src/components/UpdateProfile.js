import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function UpdateProfile({form, button}) {
    const [id, setid] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [hoTen, setHoTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [gioiTinh, setGioiTinh] = useState("true");
    
    const [error, seterror] = useState("none");
    const navigate = useNavigate();
    const get = async (e) => {
        
		try {
            const token = localStorage.getItem("token");
			const data = await fetch("http://localhost:8081/api/profile",{
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
                    'Authorization': 'Bearer ${token}'
				}

				// credentials: "include",
				
			});
			// console.log(data);
			if (data.status !== 200) {
				const error = await data.json();
        		throw {message: error.message, status:error.cod};
			}
			
			const dataJson = await data.json();
            setid(dataJson.id);
            setHoTen(dataJson.hoTen);
            setusername(dataJson.username);
            setpassword(dataJson.password);
            setEmail(dataJson.email);
            setSoDienThoai(dataJson.soDienThoai);
            setGioiTinh(data.gioiTinh);
			// console.log(dataJson);
			setEmail(dataJson.email);
		} catch (error) {
			// console.log(error);
			alert(error.message);
		}
    };
    const update = async (e) => {

    }; 
    useEffect(() => {
        document.title = "Chỉnh sửa hồ sơ"
    })
    
    return (
        <div>
            <button onClick={() => navigate("/profile")}>Quay lại</button>
        
            <div className="form">
                
                <form>
                    
                    <h2 className="form-signin-heading" style={{textAlign: "center"}}>Chỉnh sửa hồ sơ cá nhân</h2>
                    <hr/>
                    <br/>
                    
                    <div className="form-group">
                        
                        <input type="text" name="username" className="form-control"
                            placeholder="Tên đăng nhập" autoFocus={true} required="required" value={username} readOnly></input>
                        
                        
                    </div>
                    <div className="form-group">
                        <input type="text" name="hoTen" className="form-control"
                            placeholder="Họ và tên" required="required" value={hoTen} onChange={(e) => setHoTen(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control"
                            placeholder="Email" required="required" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        
                    </div>
                    <div className="form-group">
                        <input type="text" name="sdt" className="form-control"
                            placeholder="Số điện thoại" required="required" value={soDienThoai} onChange={(e) => setSoDienThoai(e.target.value)}></input>
                    </div>
                    {/* <div onChange={setGioiTinh.bind(this)}> */}
                    <div>
                        <input type="radio" value={true} name="gioiTinh"  checked={gioiTinh} onChange={(e) => setGioiTinh(e.target.checked)}/> Nam
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <input type="radio" value={false} name="gioiTinh" checked={gioiTinh == "false"? "true": "false"} onChange={(e) => setHoTen(!e.target.checked)} /> Nữ
                    </div>
                    <br/>
                    <input id="maVaiTro" type="hidden" value="2"/>
                    <input id="submit" type="button" onClick={async () => await update()} value="Lưu"/>
                    <div style={{height: 20}}></div>
                    <input id="submit" type="button" onClick={() => navigate("/profile/changePassword")} value="Đổi mật khẩu"/>
                                
                </form>
            </div>
        </div>
  )
}
