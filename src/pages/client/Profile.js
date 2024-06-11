import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../assets/css/styles.css"
import "../../assets/css/profile.css"
import Typography from '@mui/material/Typography';
import { Box, LinearProgress} from '@mui/material';


export default function Profile() {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({})
    const [error, seterror] = useState("none");
    const [de, setde] = useState({win: 0, lost: 0, draw: 0})
    const [trungbinh, settrungbinh] = useState({win: 0, lost: 0, draw: 0})
    const [kho, setkho] = useState({win: 0, lost: 0, draw: 0})
    const [easy, setEasy] = useState(0)
    const [medium, setMedium] = useState(0)
    const [hard, setHard] = useState(0)
    const getProfile = async (e) => {
        	try {
                const token = localStorage.getItem("token")
        		const data = await fetch("https://chess-backend-3qay.onrender.com/api/profile/overall",{
        			method: "GET",
        			headers: {
        				'Accept': 'application/json',
                        'Authorization': "Bearer " + token,
        				'Content-Type': 'application/json'
        			}
        		});
        		// console.log(data);
        		if (data.status !== 200) {
        			const error = await data.json();
            		throw {message: error.message};
        		}
        		const response = await data.json();
                const dataJson = response.data
        		console.log(dataJson);
                setUser(dataJson.user)
                setde(dataJson.thongke[0])
                setEasy(parseInt(dataJson.thongke[0].win) + parseInt(dataJson.thongke[0].lose) + parseInt(dataJson.thongke[0].draw))
                settrungbinh(dataJson.thongke[1])
                setMedium(parseInt(dataJson.thongke[1].win) + parseInt(dataJson.thongke[1].lose) + parseInt(dataJson.thongke[1].draw))
                setkho(dataJson.thongke[2])
                setHard(parseInt(dataJson.thongke[2].win) + parseInt(dataJson.thongke[2].lose) + parseInt(dataJson.thongke[2].draw))
        		
        	} catch (error) {
        		// console.log(error);
        		alert(error.message);
        	}
    };
    // const updateProfile = async (e) => {
    //     const param = {
	// 		hoTen: hoTenRef.current.value,
    //         username: usernameRef.current.value,
    //         password: passwordRef.current.value,
    //         confirmedPassword: confirmedPasswordRef.current.checked,
    //         email: emailRef.current.value,
    //         soDienThoai: soDienThoaiRef.current.value,
    //         gioiTinh: gioiTinhRef.current.firstChild.checked
	// 	};
	// 	console.log(param);
	// 	try {
	// 		const data = await fetch("https://chess-backend-3qay.onrender.com/api/auth/signup",{
	// 			method: "POST",
	// 			headers: {
	// 				'Accept': 'application/json',
	// 				'Content-Type': 'application/json'
	// 			},
	// 			// credentials: "include",
	// 			body: JSON.stringify(param)
	// 		});
	// 		// console.log(data);
	// 		if (data.status !== 200) {
	// 			const error = await data.json();
    //     		throw {message: error.message, status:error.cod};
	// 		}
	// 		const dataJson = await data.json();
	// 		// console.log(dataJson);
			
	// 		navigate("/login");
	// 	} catch (error) {
	// 		// console.log(error);
	// 		alert(error.message);
	// 	}
    // };
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            
            navigate("/login");
        }
        else{
            getProfile()
        
            document.title = "Hồ sơ";
        }
        
    }, []);
    return (
        <div className="container">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
            
            <div className="main-body">

                <div className="main-breadcrumb">
                <Link to="/">
                    <button className="back-btn" style={{borderRadius: 5, width: 80}}>&#8592;</button>
                </Link>
                </div>
                <br/>   
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={user.gioiTinh? require("../../assets/img/avatar/male.png"): require("../../assets/img/avatar/female.png")}
                                        className="rounded-circle" width="150"/>
                                    <div className="mt-3">
                                        <h4>{user.hoTen}</h4>
                                        <br/>
                                        <button className="btn btn-primary" onClick={() => navigate("/history?userId=" + user.id)}>Xem lịch sử đấu</button>
                                        <br/>
                                        <br/>
                                        <button className="btn btn-outline-primary" onClick={() => navigate("/profile/changePassword")}>Đổi mật khẩu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Họ tên</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {user.hoTen}
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <a href="" className="__cf_email__"
                                            >{user.email}</a>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Số điện thoại</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {user.soDienThoai}
                                    </div>
                                </div>
                                <hr/>
                                
                                <div className="row">
                                    <div className="col-sm-12">
                                        <a className="btn btn-info " 
                                            href="" onClick={(e) => {e.preventDefault(); navigate("/profile/update", {state: {user: user}})}}>Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="d-flex align-items-center mb-3"><i
                                                className="material-icons text-info mr-2">Chế độ: Dễ</i></h6>
                                        <div>
                                            <small>Thắng</small>
                                            <small style={{marginLeft: "93%"}}>{de.win}</small>
                                        </div>
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}>
                                            <div className="progress-bar bg-primary" role="progressbar" aria-valuenow={(easy == 0)? 0: de.win / easy * 100} aria-valuemin="0" aria-valuemax="100">{de.win}</div>
                                        </div>
                                        <div>
                                            <small>Thua</small>
                                            <small style={{marginLeft: "94%"}}>{de.lose}</small>
                                        </div>
                                        
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}> 
                                            <div className="progress-bar bg-danger" role="progressbar" style={{width: ((easy == 0)? 0: String(de.lose / easy * 100)) + "%"}} aria-valuenow={(easy == 0)? 0: de.lose / easy * 100} aria-valuemin="0" aria-valuemax="100">{de.lose}</div>
                                            {/* <Box sx={{width: "100%", height: 20}}>
                                                <LinearProgress color='error' sx={{height: "100%"}} variant='determinate' value={(easy == 0)? 0: de.lose / easy * 100}/>
                                            </Box> */}
                                            
                                            
                                        </div>
                                        <div>
                                            <small>Hòa</small>
                                            <small style={{marginLeft: "95%"}}>{de.draw}</small>
                                        </div>
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}>
                                            <div className="progress-bar bg-warning" role="progressbar" aria-valuenow={easy? 0: de.win / easy * 100} aria-valuemin="0" aria-valuemax="100">{de.draw}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="d-flex align-items-center mb-3"><i
                                                className="material-icons text-info mr-2">Chế độ: Trung bình</i></h6>
                                        <div>
                                            <small>Thắng</small>
                                            <small style={{marginLeft: "93%"}}>{trungbinh.lose}</small>
                                        </div>
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}>
                                            <div className="progress-bar bg-primary" role="progressbar" aria-valuenow={medium? 0: trungbinh.win / medium * 100} aria-valuemin="0" aria-valuemax="100">{trungbinh.win}</div>
                                        </div>
                                        <div>
                                            <small>Thua</small>
                                            <small style={{marginLeft: "94%"}}>{trungbinh.lose}</small>
                                        </div>
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}>
                                            <div className="progress-bar bg-danger" role="progressbar" aria-valuenow={medium? 0: trungbinh.lose / medium * 100} aria-valuemin="0" aria-valuemax="100">{trungbinh.lose}</div>
                                        </div>
                                        <div>
                                            <small>Hòa<a href=""></a></small>
                                            <small style={{marginLeft: "95%"}}>{trungbinh.draw}</small>
                                        </div>
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}>
                                            <div className="progress-bar bg-warning" role="progressbar" aria-valuenow={medium? 0: trungbinh.draw / medium * 100} aria-valuemin="0" aria-valuemax="100">{trungbinh.draw}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="d-flex align-items-center mb-3"><i
                                                className="material-icons text-info mr-2">Chế độ: Khó</i></h6>
                                        <div>
                                            <small>Thắng</small>
                                            <small style={{marginLeft: "93%"}}>{kho.win}</small>
                                        </div>
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}>
                                            <div className="progress-bar bg-primary" role="progressbar" aria-valuenow={(hard == 0)? 0: kho.win / hard * 100} aria-valuemin="0" aria-valuemax="100">{kho.win}</div>
                                        </div>
                                        <div>
                                            <small>Thua</small>
                                            <small style={{marginLeft: "94%"}}>{kho.lose}</small>
                                        </div>
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}>
                                            <div className="progress-bar bg-danger" role="progressbar" aria-valuenow={(hard == 0)? 0: kho.win / hard * 100} aria-valuemin="0" aria-valuemax="100">{kho.lose}</div>
                                        </div>
                                        <div>
                                            <small>Hòa</small>
                                            <small style={{marginLeft: "95%"}}>{kho.draw}</small>
                                        </div>
                                        <div className="progress mb-3" style={{height: "20px", borderColor: '#337AB7', borderWidth: 2, borderStyle: 'solid'}}>
                                            <div className="progress-bar bg-warning" role="progressbar" aria-valuenow={(hard == 0)? 0: kho.win / hard * 100} aria-valuemin="0" aria-valuemax="100">{kho.draw}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <script src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
            <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}
