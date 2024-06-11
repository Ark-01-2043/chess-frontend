import React, { useEffect } from "react";
import "../../assets/css/styles.css"
import ReactLoading from "react-loading";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { FilledInput, InputLabel, TextField } from "@mui/material";
function Algorithm() {
    const [allAlgorithms, setallAlgorithms] = useState([])
    const [algorithms, setalgorithms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("")
    const [showAdd, setShowAdd] = useState(false)
    const [file, setFile] = useState({})
    const [name, setname] = useState("")
    const navigate = useNavigate()
    
    const getalgorithms = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
          navigate("/admin/login")
        }
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
          setLoading(false);
          throw { message: error.message, status: error.cod };
        }
  
        const dataJson = await data.json();
        console.log(dataJson);
        setalgorithms(dataJson);
        setallAlgorithms(dataJson)
        setLoading(false);
      } catch (error) {
        // console.log(error);
        alert(error.message);
      }
    };
    const findAlgorithm = () => {
      
      setalgorithms(allAlgorithms.filter(algorithm => algorithm.name.toLowerCase().includes(keyword.toLowerCase())))
  
    }
    const saveAlgorithm = async() => {
        try {
            const adminToken = localStorage.getItem("adminToken");
            const formData = new FormData();
            formData.append("name", name)
            formData.append("file", file)
            console.log(file)
            const data = await fetch("https://chess-backend-3qay.onrender.com/api/algorithm", {
              method: "POST",
              headers: {
                Authorization: "Bearer " + adminToken,
                Accept: "application/json",
                // "Content-Type": "application/json",
              },
              body: formData
              // credentials: "include",
            });
            // console.log(data);
            if (data.status !== 200) {
              const error = await data.json();
              setLoading(false);
              throw { message: error.message, status: error.cod };
            }
      
            const dataJson = await data.json();
            console.log(dataJson);
            setallAlgorithms(algorithms.push(dataJson))
            setalgorithms(allAlgorithms)
            setShowAdd(false);
            
        } catch (error) {
        // console.log(error);
        alert(error.message);
        }
    }
    useEffect(() => {
      findAlgorithm()
    }, [keyword])
    
    useEffect(() => {
      document.title = "Quản lý thuật toán";
      getalgorithms();
    }, []);
  
    return (
      <div className="bg">
        <a href="/admin">
          <button className="back-btn">&#8592;</button>
        </a>
        <div className={showAdd? "level active": "level"} id="level" style={{backgroundColor: 'rgb(15, 18, 20)'}}>
            <TextField label="Tên thuật toán" variant="filled" style={{color: 'blue', backgroundColor: 'white'}} required={true} onChange={(e) => setname(e.target.value)}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <label id="file" style={{color: 'blue', backgroundColor: 'white', padding: 10, marginRight: 15}}>Chọn File</label>
                <input name="file" style={{color: 'blue', backgroundColor: 'white', padding: 10}} type="file" required={true} onChange={(e) => setFile(e.target.files[0])}></input>
            </div>
            <button style={{marginBottom: 0}} onClick={saveAlgorithm}>Lưu</button>        
            <button style={{marginTop: 0}} onClick={(e) => setShowAdd(false)}>Thoát</button>        
        </div>
        <div
          className="wrapper"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50% , -50%)",
            height: "450px",
            width: "600px",
            background: "white",
            alignItems: "center",
            border: "2px solid black",
            borderRadius: "16px",
            overflow: "auto"
          }}
        >
            
          <div>
            <input
              type="text"
              placeholder="Nhập tên thuật toán"
              style={{
                height: 35,
                flex: 1,
                marginLeft: 5,
                paddingLeft: 10,
                border: "1 solid gray",
                borderRadius: 11,
                boxShadow: "inset 1px 2px 3px rgba(0, 0, 0, 0.1)",
              }}
              onChange={(e) => setKeyword(e.target.value)}
            />
            
            <Link>
              <button
                className="add-btn"
                style={{
                  height: "35px",
                  width: "35px",
                  marginRight: "5px",
                  fontSize: "18px",
                  border: "1px solid gray",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setShowAdd(true)}
              >
                +
              </button>
            </Link>
            
            {!loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  maxHeight: "540px",
                  overflow: "auto",
                }}
              >
                {algorithms.map((algorithm) => (
                  <div
                    key={algorithm.id}
                    className="user"
                    style={{
                        position: "relative",
                        minHeight: "90px",
                        minWidth: "560px",
                        backgroundColor: "aliceblue",
                        border: "1px solid gray",
                        borderRadius: "11px",
                        padding: "3px 10px",
                    }}
                    >
                    <div
                        className="username"
                        style={{
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontWeight: "bold",
                        fontSize: "16px",
                        }}
                    >
                        {algorithm.name}
                    </div>

                    <div
                        className="more-info"
                        style={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        maxWidth: "400px",
                        }}
                    >
                        <p>Tên thuật toán: </p>
                        <div className="full-name"> {algorithm.name}</div>
                        
                        
                    </div>
                    
                    </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Algorithm