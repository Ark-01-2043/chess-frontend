import React, { useEffect, useRef, useState } from 'react'
import "../assets/css/styles.css"
import { Link, useNavigate } from 'react-router-dom'

export default function () {
    const navigate = useNavigate();
    const modalRef = useRef();
    const overlayRef = useRef("");
    const [level, setLevel] = useState(() => {
        if (localStorage.getItem("levelId")) {
            const levelId = localStorage.getItem("levelId");
            if (levelId == 1) {
                return "Dễ";
            } else if (levelId == 2) {
                return "Vừa";
            } else {
                return "Khó";
            }
        }
        localStorage.setItem("levelId", "1");
        return "Dễ";
    });
    
    useEffect(() => {
        
        console.log(localStorage.getItem("token"));
        if (!localStorage.getItem("token")) {
            console.log("Not login");
            navigate("/login");
        }
        document.title = "Trang chủ"
    });
    
    const openModal = (e) => {
        const modal = document.getElementById("level");
        const overlay = document.getElementById('overlay');
        console.log(modal);
        modal.classList.add('active');
        overlay.classList.add('active');
    };
    const closeModal = (e) => {
        const modal = document.getElementById("level");
        const overlay = document.getElementById('overlay');
        console.log(modal);
        modal.classList.remove('active');
        overlay.classList.remove('active');
    };
    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/login");
    };
    const btn1Onclick = () => {
        localStorage.setItem("levelId", 1);
        setLevel("Dễ");
        closeModal();
    }
    const btn2Onclick = () => {
        localStorage.setItem("levelId", 2);
        setLevel("Vừa");
        closeModal();
    }
    const btn3Onclick = () => {
        localStorage.setItem("levelId", 3);
        setLevel("Khó");
        closeModal();
    }
  return (
    <div className="bg">
        
        <div className="wrapper">
        <h1>CHESS AI</h1>
        <Link to="/game"><button>Chơi với máy</button></Link>
        
        <button id="targetButton" onClick={() => openModal()}>{level}</button>
        <div className="level" id="level" ref={modalRef}>
            <button id="button1" onClick={btn1Onclick}>Dễ</button>
            <button id="button2" onClick={btn2Onclick}>Vừa</button>
            <button id="button3" onClick={btn3Onclick}>Khó</button>
        
        </div>
        <Link to="/profile"><button>Chỉnh sửa thông tin</button></Link>
        <button id="logout" onClick={logOut}>Đăng xuất</button>
        
        <div id="overlay" className="overlay" ref={overlayRef}></div>
        </div>
    </div>
  )
}
