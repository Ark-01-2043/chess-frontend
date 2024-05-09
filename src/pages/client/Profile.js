import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../assets/css/styles.css"
import "../../assets/css/profile.css"


export default function Profile() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [hoTen, setHoTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [gioiTinh, setGioiTinh] = useState("");
    const [error, seterror] = useState("none");
    
    const checkConfirmedPassword = () => {
        
        if (confirmedPassword != password) {
            seterror("block");
        }
        else{
            seterror("none");
        }
    }
    const getProfile = async (e) => {

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
	// 		const data = await fetch("http://localhost:8081/api/auth/signup",{
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
            
        // // console.log(localStorage.getItem("token"));
        // if (localStorage.getItem("token")) {
        //     // console.log("Not login");
        // navigate("/");
        // }
        document.title = "Hồ sơ";
    });
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
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"
                                        className="rounded-circle" width="150"/>
                                    <div className="mt-3">
                                        <h4>Tên người dùng</h4>
                                        <br/>
                                        <button className="btn btn-primary">Xem lịch sử đấu</button>
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
                                        <h6 className="mb-0">Họ tên</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Họ tên người dùng
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <a href="" className="__cf_email__"
                                            >Email</a>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Số điện thoại</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Số điện thoại
                                    </div>
                                </div>
                                <hr/>
                                
                                <div className="row">
                                    <div className="col-sm-12">
                                        <a className="btn btn-info " 
                                            href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
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
                                        <small>Thắng</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}}></div>
                                        </div>
                                        <small>Thua</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-danger" role="progressbar" style={{width: "72%"}}></div>
                                        </div>
                                        <small>Hòa</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-warning" role="progressbar" style={{width: "72%"}}></div>
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
                                        <small>Thắng</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}}></div>
                                        </div>
                                        <small>Thua</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-danger" role="progressbar" style={{width: "72%"}}></div>
                                        </div>
                                        <small>Hòa</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-warning" role="progressbar" style={{width: "72%"}}></div>
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
                                        <small>Thắng</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}}></div>
                                        </div>
                                        <small>Thua</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-danger" role="progressbar" style={{width: "72%"}}></div>
                                        </div>
                                        <small>Hòa</small>
                                        <div className="progress mb-3" style={{height: "5px"}}>
                                            <div className="progress-bar bg-warning" role="progressbar" style={{width: "72%"}}></div>
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
