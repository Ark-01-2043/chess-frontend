import { InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Leaderboard() {
  const [ranking, setRanking] = useState([])
  const navigate = useNavigate()
  const getRanking = async () => {
    try {
      const token = localStorage.getItem("token")
      const data = await fetch("https://chess-backend-3qay.onrender.com/api/game/ranking",{
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
      const dataJson = await data.json();
      
      console.log(dataJson);
      setRanking(dataJson)
      
    } catch (error) {
      // console.log(error);
      alert(error.message);
    }
  }
  useEffect(() => {
    document.title = "Bảng xếp hạng"
    getRanking()
  }, [])
  
  return (<div>
    <a href="/">
        <button className="back-btn">&#8592;</button>
    </a>
    <div className="container">
      {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"/> */}
      <script src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> */}
      
      
      <div
        
        style={{
          position: "fixed",
          top: "60%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          minHeight: "600px",
          minWidth: "600px",
          background: "white",
          alignItems: "center",
          border: "2px solid black",
          borderRadius: "16px",
          overflow: "auto"
        }}
      >
        
        <TableContainer component={Paper} >
          <Table style={{fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"}}>
            <TableHead> 
              <TableRow>
                <TableCell align='center'  style={{fontWeight: 'bold'}}>Hạng</TableCell>
                <TableCell align='center'  style={{fontWeight: 'bold'}}>Người chơi</TableCell>
                <TableCell align='center'  style={{fontWeight: 'bold'}}>Điểm</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {ranking.map(item => (
                <TableRow key={item.id} onClick={() => navigate("/history?userId=" + item.user.id)}>
                  <TableCell align='center'>{item.rank}</TableCell>
                  <TableCell align='center'>{item.user.hoTen}</TableCell>
                  <TableCell align='center'>{item.score}</TableCell>
                  
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    </div>
  )
}

export default Leaderboard
