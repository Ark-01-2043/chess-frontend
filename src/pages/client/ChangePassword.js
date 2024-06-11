import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import { debounce } from 'lodash';
import ReactLoading from "react-loading"
export default function ChangePassword({form, button}) {

    const [password, setpassword] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [loading, setLoading] = useState(false)
    
    const [error, seterror] = useState("none");
    const navigate = useNavigate();
    
    const update = async (e) => {
        setLoading(true)
        const token = localStorage.getItem("token")
        const params = {
            password: password,
            newPassword: newPassword,
            confirmedPassword: confirmedPassword
        }
        if (newPassword.length < 8 || newPassword.length > 32) {
            alert("Mật khẩu phải có độ dài từ 8-32 ký tự")
            setLoading(false)
            return
        }
        if (newPassword != confirmedPassword) {
            alert("Mật khẩu nhập lại không đúng")
            setLoading(false)
            return
        }
        try {
            const data = await fetch("https://chess-backend-3qay.onrender.com/api/profile/changePassword",{
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            // console.log(data);
            if (data.status !== 200) {
                const error = await data.json();
                setLoading(false);
                console.log(dataJson)
                throw {message: error.message};
            }
            const response = await data.json();
            
            const dataJson = response.data
            console.log(dataJson);
            navigate("/profile")
        } catch (error) {
            alert("Mật khẩu không đúng")
            setLoading(false)    
        }
    }; 
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            
            navigate("/login");
        }
        document.title = "Đổi mật khẩu"
    }, [])
    
    return (
    <div>
        
        <button onClick={() => navigate("/profile")}>Quay lại</button>
        
        <div className="form">
            <form>
                
                <h2 className="form-signin-heading" style={{textAlign: "center"}}>Đổi mật khẩu</h2>
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
                {!loading && <input id="submit" type="button" onClick={debounce(async () => await update(), 2000)} value="Lưu"/>}
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
