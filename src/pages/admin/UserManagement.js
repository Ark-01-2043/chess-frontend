import React, { useEffect } from "react";
import "../../assets/css/styles.css"
import ReactLoading from "react-loading";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
function UserManagement() {
  const [allUsers, setAllUsers] = useState([])
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const navigate = useNavigate()
  const getUsers = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const data = await fetch("https://chess-backend-3qay.onrender.com/api/user", {
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
      setusers(dataJson.data);
      setAllUsers(dataJson.data)
      setLoading(false);
    } catch (error) {
      // console.log(error);
      alert(error.message);
    }
  };
  const findUser = () => {
    
    setusers(allUsers.filter(user => user.hoTen.toLowerCase().includes(keyword.toLowerCase())))

  }
  const deleteUser = debounce(async(user) => {
    const confirmation = window.confirm("Xác nhận xóa người dùng " + user.hoTen + "?");
    if (!confirmation) {
      return
    }
    const adminToken = localStorage.getItem("adminToken")
    const data = await fetch("https://chess-backend-3qay.onrender.com/api/user/" + user.id, {
        method: "DELETE",
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
    const updatedUsers = allUsers.filter(item => user.id != item.id)
    setAllUsers(updatedUsers)
    setusers(updatedUsers)
    
  }, 1000)
  useEffect(() => {
    findUser()
  }, [keyword])
  
  useEffect(() => {
    document.title = "Quản lý người dùng";
    getUsers();
  }, []);

  return (
    <div className="bg">
      <a href="/admin">
        <button className="back-btn">&#8592;</button>
      </a>
      
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
            placeholder="Nhập họ tên"
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
          
          <Link to="/admin/user/add">
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
              {users.map((user) => (
                <div
                  key={user.id}
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
                    {user.hoTen}
                    <div
                      className="sex"
                      style={{ display: "inline-block", height: 20 }}
                    >
                      &nbsp; &nbsp;
                      <img
                        src={user.gioiTinh? require("../../assets/img/icons/male-sign-regular-24 (1).png"): require("../../assets/img/icons/female-sign-regular-24 (1).png")}
                        alt="male"
                      />
                    </div>
                  </div>

                  <div
                    className="more-info"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      maxWidth: "400px",
                    }}
                  >
                    <p>Họ tên: </p>
                    <div className="full-name"> {user.hoTen}</div>
                    <p>Email: </p>
                    <div className="email"> {user.email} </div>
                    <p>Số điện thoại: </p>
                    <div className="phone-num">{user.soDienThoai}</div>
                  </div>
                  <div >
                    <button
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "10px",
                        backgroundColor: "lawngreen",
                        color: "white",
                        height: "25px",
                        width: "70px",
                        fontSize: "15px",
                        border: "1px solid gray",
                        borderRadius: "13px",
                        transition: "0.1s",
                      }}
                      onClick={(e) => navigate("/admin/user/update", {state: {user: user}})}
                    >
                      
                      Sửa
                    </button>
                  </div>
                  <a>
                    <button
                      style={{
                        position: "absolute",
                        top: "30px",
                        right: "10px",
                        backgroundColor: "red",
                        color: "white",
                        height: "25px",
                        width: "70px",
                        fontSize: "15px",
                        border: "1px solid gray",
                        borderRadius: "13px",
                        transition: "0.1s",
                      }}
                      onClick={() => deleteUser(user)}
                    >
                      Xóa
                    </button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
