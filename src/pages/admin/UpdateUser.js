import { debounce } from 'lodash';
import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen.js';
import ReactLoading from "react-loading"
function UpdateUser() {
    const location = useLocation()
    const user = location.state.user;

    const [id, setid] = useState(user.id);
    const [username, setusername] = useState(user.username);
    
    const [email, setEmail] = useState(user.email);
    const [password, setpassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [hoTen, setHoTen] = useState(user.hoTen);
    const [soDienThoai, setSoDienThoai] = useState(user.soDienThoai);
    const [gioiTinh, setGioiTinh] = useState(user.gioiTinh);
    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState("none");
    const navigate = useNavigate();
    useEffect(() => {
        if (confirmedPassword != password) {
            seterror("block");
        }
        else{
            seterror("none");
        }
    }, [password, confirmedPassword])
    
    const update = async (e) => {
        try {
            setLoading(true)
            const params = {
                id: user.id,
                hoTen: hoTen,
                username: username,
                password: password,
                confirmedPassword: confirmedPassword,
                email: user.email,
                soDienThoai: soDienThoai,
                gioiTinh: gioiTinh
            }
            const adminToken = localStorage.getItem("adminToken")
            if (password != "" && (password.length < 8 || password.length > 32)) {
                alert("Mật khẩu mới phải có độ dài từ 8-32 ký tự")
                setLoading(false)
                return
            }
            if (password != confirmedPassword) {
                alert("Mật khẩu nhập lại không đúng")
                setLoading(false)
                return
            }
            const data = await fetch("https://chess-backend-3qay.onrender.com/api/user",{
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + adminToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            // console.log(data);
            if (data.status !== 200) {
                const error = await data.json();
                setLoading(false);
                throw {message: error.message};
            }
            const response = await data.json();
            const dataJson = response.data
            console.log(dataJson);
            navigate("/admin/user")
            
        } catch (error) {
            // console.log(error);
            alert(error.message);
            setLoading(false);
        }
    }; 
    useEffect(() => {
        document.title = "Chỉnh sửa người dùng"
        
    }, [])
  return (
    <div>
            <button onClick={() => navigate("/admin/user")}>Quay lại</button>
            
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
                        <input type="password" className="form-control"
                            required="required" placeholder="Mật khẩu" onChange={(e) => setpassword(e.target.value)}></input>
                        
                    </div>

                    <div className="form-group">
                        <div className='alert error' style={{fontSize: "12px", display: error}}>Mật khẩu nhắc lại không đúng</div>
                        <input type="password" name="confirmPassword"
                            className="form-control" placeholder="Nhắc lại mật khẩu"
                            required="required"  onChange={(e) => setConfirmedPassword(e.target.value)}></input>
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
                        <input type="radio" value={true} name="gioiTinh"  checked={gioiTinh == true? true: false} onChange={(e) => setGioiTinh(e.target.checked)}/> Nam
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <input type="radio" value={false} name="gioiTinh" checked={gioiTinh == false? true: false} onChange={(e) => setGioiTinh(!e.target.checked)} /> Nữ
                    </div>
                    <br/>
                    <input id="maVaiTro" type="hidden" value="2"/>
                    {!loading && <input id="submit" type="button" onClick={debounce(async () => await update(), 2000)} value="Lưu"/>}
                    {loading && <div className='submit-btn'>
                        <ReactLoading
                            type='spinningBubbles'
                            color={"#03fc4e"}
                            height={20}
                            width={30}
                        />
                    </div>}
                    <div style={{height: 20}}></div>
                    
                                                    
                </form>
            </div>
        </div>
  )
}

export default UpdateUser