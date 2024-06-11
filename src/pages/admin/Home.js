import React, { useEffect, useState } from 'react'
import "../../assets/css/admin.css"
import "../../assets/css/styles.css"
import { Link, useNavigate } from 'react-router-dom'
import { InputLabel, MenuItem, Select } from '@mui/material';
function Home() {
    const navigate = useNavigate();
    const [algorithms, setAlgorithms] = useState([])
    const [easy, setEasy] = useState(0)
    const [medium, setMedium] = useState(0)
    const [hard, setHard] = useState(0)
    const [openLevel, setOpenLevel] = useState(false)
    const getAlgorithms = async () => {
        try {
          const adminToken = localStorage.getItem("adminToken");
          const data = await fetch("https://chess-backend-3qay.onrender.com/api/algorithm/all", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + adminToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            // credentials: "include",
          });
          // console.log(data);
          if (data.status !== 200) {
            const error = await data.json();
            
            throw { message: error.message, status: error.cod };
          }
    
          const dataJson = await data.json();
          console.log(dataJson);
          setAlgorithms(dataJson)
        } catch (error) {
          // console.log(error);
          alert(error.message);
        }
      };
      const getLevels = async () => {
        try {
          const adminToken = localStorage.getItem("adminToken");
          const data = await fetch("https://chess-backend-3qay.onrender.com/api/level/all", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + adminToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            // credentials: "include",
          });
          // console.log(data);
          if (data.status !== 200) {
            const error = await data.json();
            
            throw { message: error.message, status: error.cod };
          }
    
          const dataJson = await data.json();
          console.log(dataJson);
          setEasy(dataJson[0].algorithm.id)
          setMedium(dataJson[1].algorithm.id)
          setHard(dataJson[2].algorithm.id)
        } catch (error) {
          // console.log(error);
          alert(error.message);
        }
      };
    const saveLevel = async(id) => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const params = {
          id: 1,
          name: id == 1? "Dễ": id == 2? "Trung bình": "Khó",
          depth: 2,
          algorithmId: id == 1? easy: id == 2? medium: hard
        }
        const data = await fetch("https://chess-backend-3qay.onrender.com/api/level", {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + adminToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params)
          // credentials: "include",
        });
        // console.log(data);
        if (data.status !== 200) {
          const error = await data.json();
          
          throw { message: error.message, status: error.cod };
        }
  
        const dataJson = await data.json();
        console.log(dataJson);
        
      } catch (error) {
        // console.log(error);
        alert(error.message);
      }
    }
    const saveLevels = async() => {
      saveLevel(1)
      saveLevel(2)
      saveLevel(3)
      setOpenLevel(false)
    }
    useEffect(() => {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        navigate("/admin/login")
      } else{
        getLevels()
        getAlgorithms()
      }
      
    }, [])
    
  return (
    <div className="bg">
        <div className="wrapper">
        <h1>ADMIN</h1>
        
        <Link to="/admin/user">
            <button >Quản lý người dùng</button>
        </Link>
        <Link>
            <button onClick={(e) => setOpenLevel(true)}>Quản lý độ khó</button>
        </Link>
        <div className={openLevel? "level active": "level"} id="level">
            <div style={{display: 'flex'}}>
                <InputLabel id='easy' style={{color: "black", background: 'white', textJustify: 'center', paddingTop: 15, paddingLeft: 15, paddingRight: 15, marginRight: 80}}>Chế độ Dễ: </InputLabel>
                <Select labelId='easy' label="Dễ" value={easy} style={{background: "white"}} onChange={(e) => setEasy(e.target.value)}>
                    {algorithms.map(algorithm => <MenuItem key={algorithm.id} value={algorithm.id}>{algorithm.name}</MenuItem>)}
                </Select>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                <InputLabel id='medium' style={{color: "black", background: 'white', textJustify: 'center', paddingTop: 15, paddingLeft: 15, paddingRight: 15, marginRight: 50}}>Chế độ Trung bình: </InputLabel>
                <Select labelId='medium' label="Trung bình" value={medium} style={{background: "white"}} onChange={(e) => setMedium(e.target.value)}>
                {algorithms.map(algorithm => <MenuItem key={algorithm.id} value={algorithm.id}>{algorithm.name}</MenuItem>)}
                </Select>
            </div>
            <div style={{display: 'flex'}}>
                <InputLabel id='hard' style={{color: "black", background: 'white', textJustify: 'center', paddingTop: 15, paddingLeft: 15, paddingRight: 15, marginRight: 80}}>Chế độ Khó: </InputLabel>
                <Select labelId='hard' label="Khó" value={hard} style={{background: "white"}} onChange={(e) => setHard(e.target.value)}>
                {algorithms.map(algorithm => <MenuItem key={algorithm.id} value={algorithm.id}>{algorithm.name}</MenuItem>)}
                </Select>
            </div>
            <button style={{marginBottom: 0}} onClick={saveLevels}>Lưu</button>        
            <button style={{marginTop: 0}} onClick={(e) => setOpenLevel(false)}>Thoát</button>        
        </div>
        <Link to="/admin/algorithm">
            <button>Quản lý thuật toán</button>
        </Link>
        <a>
            <button id="logout" onClick={() => {localStorage.removeItem("adminToken"); navigate("/admin/login");}}>Đăng xuất</button>
        </a>
        <div id="overlay"></div>
        </div>
    </div>
  )
}

export default Home