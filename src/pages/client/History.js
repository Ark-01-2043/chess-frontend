import { InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

function History() {
  const [mode, setMode] = useState(1)
  const [params] = useSearchParams()
  const [userId, setUserId] = useState(params.get("userId"))
  const [easy, setEasy] = useState([])
  const [medium, setMedium] = useState([])
  const [hard, setHard] = useState([])
  const navigate = useNavigate()
  
  const toDateString = (date) => {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    return day+"/"+month+"/"+date.getFullYear()
  }
  const getHistory = async () => {
    try {
      const token = localStorage.getItem("token")
      const data = await fetch("https://chess-backend-3qay.onrender.com/api/profile/history/" + userId,{
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
      // console.log(dataJson);
      const tempEasy = []
      const tempMedium = []
      const tempHard = []
      dataJson.forEach(item => {
        if (item.level.id == 1) {
          tempEasy.push(item)
        } else if (item.level.id == 2) {
          tempMedium.push(item)
        } else if (item.level.id == 3) {
          tempHard.push(item)
        }
      })
      setEasy(tempEasy)
      setMedium(tempMedium)
      setHard(tempHard)
      
      // console.log(tempEasy)
    } catch (error) {
      // console.log(error);
      alert(error.message);
      navigate("/")
    }
  }
  
  useEffect(() => {
    // console.log(mode)
    if (!userId) {
      navigate("/")
    }
    else{
      getHistory()
      document.title = "Lịch sử"
    }
    
  }, [])
  
  return (
    <div className="container">
      {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"/> */}
      <script src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> */}
      
      
      <div
        
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          height: "600px",
          minWidth: "600px",
          background: "white",
          alignItems: "center",
          border: "2px solid black",
          borderRadius: "16px",
          overflow: "scroll"
        }}
      >
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: 10}}>
          <InputLabel id='mode' style={{color: "black", background: 'white', textJustify: 'center', paddingTop: 15, paddingLeft: 15, paddingRight: 15, marginRight: 50}}>Chế độ: </InputLabel>
            <Select labelId='mode' label="mode" value={mode} style={{background: "white", width: "30%"}} onChange={(e) => setMode(e.target.value)}>
              <MenuItem value={1}>Dễ</MenuItem>
              <MenuItem value={2}>Trung bình</MenuItem>
              <MenuItem value={3}>Khó</MenuItem>
            </Select>
        </div>
        <TableContainer component={Paper} >
          <Table style={{fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"}}>
            <TableHead> 
              <TableRow>
                <TableCell align='center'  style={{fontWeight: 'bold'}}>Người chơi</TableCell>
                <TableCell align='center'  style={{fontWeight: 'bold'}}>Kết quả</TableCell>
                <TableCell align='center' style={{fontWeight: 'bold'}}>Thông tin</TableCell>
                <TableCell align='center' style={{fontWeight: 'bold'}}>Ngày chơi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {mode==1 && easy.map(item => (
                <TableRow key={item.id} onClick={() => navigate("/history/game", {state: {gameHistory: item}})}>
                  <TableCell align='center'>
                    <div>
                      <div>
                        <Typography>{item.user.hoTen} {item.playerSide == 'white'? <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/wk.png")}/>: <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/bk.png")}/>}</Typography>
                      </div>
                      <div>
                        <Typography>vs</Typography>
                      </div>
                      <div>
                        <Typography>Máy dễ {item.playerSide == 'white'? <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/bk.png")}/>: <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/wk.png")}/>}</Typography>
                        
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align='center'>{item.resultInt == "1"? <Typography style={{color: "blue"}}>Thắng</Typography>: item.resultInt == "-1"? <Typography style={{color: "red"}}>Thua</Typography>: <Typography style={{color: "yellow"}}>Hòa</Typography>}</TableCell>
                  <TableCell align='center'>{item.result}</TableCell>
                  <TableCell align='center'>{toDateString(new Date(item.gameDate))}</TableCell>
                </TableRow>
              ))}
              {mode==2 && easy.map(item => (
                <TableRow key={item.id} onClick={() => navigate("/history/game", {state: {gameHistory: item}})}>
                  <TableCell align='center'>
                    <div>
                      <div>
                        <Typography>{item.user.hoTen} {item.playerSide == 'white'? <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/wk.png")}/>: <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/bk.png")}/>}</Typography>
                      </div>
                      <div>
                        <Typography>vs</Typography>
                      </div>
                      <div>
                        <Typography>Máy Trung bình {item.playerSide == 'white'? <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/bk.png")}/>: <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/wk.png")}/>}</Typography>
                        
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align='center'>{item.resultInt == 1? <Typography style={{color: "blue"}}>Thắng</Typography>: item.resultInt == -1? <Typography style={{color: "red"}}>Thua</Typography>: <Typography style={{color: "yellow"}}>Hòa</Typography>}</TableCell>
                  <TableCell align='center'>{item.result}</TableCell>
                  <TableCell align='center'>{toDateString(new Date(item.gameDate))}</TableCell>
                </TableRow>
              ))}
              {mode==3 && easy.map(item => (
                <TableRow key={item.id} onClick={() => navigate("/history/game", {state: {gameHistory: item}})}>
                  <TableCell align='center'>
                    <div>
                      <div>
                        <Typography>{item.user.hoTen} {item.playerSide == 'white'? <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/wk.png")}/>: <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/bk.png")}/>}</Typography>
                      </div>
                      <div>
                        <Typography>vs</Typography>
                      </div>
                      <div>
                        <Typography>Máy Khó {item.playerSide == 'white'? <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/bk.png")}/>: <img style={{height: 25}} src={require("../../assets/img/chesspieces/wikipedia/wk.png")}/>}</Typography>
                        
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align='center'>{item.resultInt == 1? <Typography style={{color: "blue"}}>Thắng</Typography>: item.resultInt == -1? <Typography style={{color: "red"}}>Thua</Typography>: <Typography style={{color: "yellow"}}>Hòa</Typography>}</TableCell>
                  <TableCell align='center'>{item.result}</TableCell>
                  <TableCell align='center'>{toDateString(new Date(item.gameDate))}</TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default History