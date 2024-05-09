import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ChangePassword({form, button}) {

    const [password, setpassword] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("");
    
    
    const [error, seterror] = useState("none");
    const navigate = useNavigate();
    
    const update = async (e) => {
        
    }; 
    useEffect(() => {
        document.title = "Đổi mật khẩu"
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
                    <input type="password" name="password" className="form-control"
                        placeholder="Mật khẩu" required="required" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <input type="password" name="newPassword" className="form-control"
                        placeholder="Mật khẩu mới" required="required" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <input type="password" name="confirmedPassword" className="form-control"
                        placeholder="Nhập lại mật khẩu" required="required" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)}></input>
                </div>
                <input id="submit" type="button" onClick={async () => await update()} value="Lưu"/>
                            
            </form>
        </div>
    </div>
  )
}
