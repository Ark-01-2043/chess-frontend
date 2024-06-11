import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from "react-loading"
import "../../assets/css/style.css"

import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { Avatar, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { debounce, set } from 'lodash'
function Game() {
    const oldHistories = JSON.parse(localStorage.getItem("histories"))
    const oldPlayerside = localStorage.getItem("playerSide")
    const levelId = localStorage.getItem("levelId")
    
    
    const pieceValues = {
        'p': 1, // Pawn
        'n': 4, // Knight
        'b': 3, // Bishop
        'r': 5, // Rook
        'q': 9, // Queen

    };
    const hasMounted = useRef(false)
    const [playerSide, setPlayerSide] = useState("")
    const [oldGame, setOldGame] = useState(null)
    const [hints, setHints] = useState([])
    const [chess, setchess] = useState(new Chess())
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [board, setboard] = useState(chess.fen())
    const [boardStyles, setBoardStyles] = useState({})
    const [histories, setHistories] = useState(oldHistories? oldHistories: [])
    const [promotion, setPromotion] = useState({show: false, source: null, target: null})
    const [resign, setResign] = useState(false)
    const [winner, setWinner] = useState("")
    const [result, setResult] = useState("")
    const [checkSquare, setCheckSquare] = useState(null)
    const [capturedWhite, setCapturedWhite] = useState([])
    const [capturedBlack, setCapturedBlack] = useState([])
    const [showResign, setShowResign] = useState(false)
    const [inCheck, setInCheck] = useState(chess.inCheck())
    const [user, setuser] = useState({})
    const [gameOver, setGameOver] = useState(false)
    const isStartingPosition = () => {
        const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        return chess.fen() === startingFEN;
    };
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
            // console.log(dataJson);
            setuser(dataJson.user)
            
            
        } catch (error) {
            // console.log(error);
            alert(error.message);
        }
    };
    const isGameOver = () => {
        
        return resign || chess.isGameOver();
    }
    const saveResult = async () => {
        try {
            const token = localStorage.getItem("token")
            
            
            const tempWinner = (playerSide=="white"? "b": "w")
            const tempResult = ("Bạn đã đầu hàng!" + (playerSide=="b"? "Quân đen thắng" : "Quân trắng thắng"))
            
            const params = {
                playerSide: playerSide,
                result: resign? tempResult: result,
                winner: resign? tempWinner: winner,
                move: chess.history().join(" "),
                fen: chess.fen(),
                levelId: levelId,
                userId: user.id
            }
            const data = await fetch("https://chess-backend-3qay.onrender.com/api/game",{
                method: "POST",
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
                throw {message: error.message};
            }
            const response = await data.json();
            console.log(response)
        } catch (error) {
            // console.log(error);
            alert(error.message);
        }
    }
    const getResult = () => {
        
        if (isGameOver()) {
            localStorage.removeItem("histories")
            localStorage.removeItem("playerSide")    
            // console.log("lưu")
        }
        
        setWinner(chess.turn() == 'w'? 'b': 'w')
        if (resign) {
            
            setWinner(playerSide=="white"? "b": "w")
            // console.log("Đầu hàng " + winner) 
            setResult("Bạn đã đầu hàng!" + (playerSide=="b"? "Quân đen thắng" : "Quân trắng thắng"))
            // return ("Bạn đã đầu hàng!" + (playerSide=="b"? "Quân trắng thắng" : "Quân đen thắng"))
        }
        if (chess.isStalemate()) {
            setWinner("0")
            setResult("Hòa. Stalemate")
            // return ("Hòa. Stalemate")
        }
        
        if (chess.isThreefoldRepetition()) {
            setWinner("0")
            setResult("Hòa! Đi lại một nước quá 3 lần")
            // return ("Hòa! Đi lại một nước quá 3 lần")
        }
        if (chess.isDraw()) {
            setWinner("0")
            setResult("Hòa!")
            // return ("Hòa!")
        }
        if (chess.isCheckmate()) {

            setResult("Chiếu hết! " +(chess.turn()=="w"? "Quân đen thắng" : "Quân trắng thắng")) 
            // return ("Chiếu hết! " +(winner=="b"? "Quân đen thắng" : "Quân trắng thắng")) 
        }
        
        
    }
    const isDraggablePiece = ({piece}) => {
        if (promotion || playerSide == "") {
            return false
        }
        if ((chess.turn() == 'w' && piece.startsWith('w')) || (chess.turn() == 'b' && piece.startsWith('b'))) {
            return true
        }
        return false
    }
    const addMove = (move) => {
        
        const tempMoves = chess.history({verbose: true})
        setHistories(tempMoves)
        // console.log(histories)
        // console.log(tempMoves)
        localStorage.setItem("histories", JSON.stringify(tempMoves))
        localStorage.setItem("oldFen", chess.fen())
        localStorage.setItem("playerSide", playerSide)
    }
    const handlePromotion = async (piece) => {
        // console.log("promotion")
        if (!promotion.show) {
            return
        }
        try {
            const {source, target} = promotion
            // console.log()
            const move = chess.move({
                from: source,
                to: target,
                promotion: piece
            });
            // console.log("from " + source + " to " + target)
            
            if (move == null) {
                return false;
            }
            addMove(move)
            addCapturedPiece(move)
            setboard(chess.fen())
            setSelectedSquare(null)
            setBoardStyles({})
            setHints([])
            setPromotion({show: false, from: null, to: null})
            setInCheck(chess.inCheck())
            if (isGameOver()) {
                getResult()
            }
            if (chess.turn() != playerSide)  {
                await makeBestMove()
            }
            // saveHistoriesToLocalStorage();
            return true;
        } catch (error) {
            console.log(error)
        }  
    }

    const onSquareClick = (square) => {
        
        if (square == selectedSquare) {
            // console.log("repeat")
            setBoardStyles({})
            setHints([])
            setSelectedSquare(null)
            return
        }
        if (hints.includes(square)) {
            onDrop(selectedSquare, square)
        }
        const newBoardStyles = {}
        
        // console.log(square)
        newBoardStyles[square] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
        var moves = chess.moves({
            square: square,
            verbose: true
        });
        // console.log(moves)
        if (moves.length === 0) return;
        const newHint = []
        for (var i = 0; i < moves.length; i++) {
            newBoardStyles[moves[i].to] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
            newHint.push(moves[i].to)
        }
        if (inCheck) {
            newBoardStyles[findKingSquare(chess.turn())] = { backgroundColor: 'red' }
        }
        // console.log(newBoardStyles)
        setBoardStyles(newBoardStyles)
        setHints(newHint)
        setSelectedSquare(square);
        // setCheckStyle()
        // console.log(selectedSquare)
        
    };

    const saveHistoriesToLocalStorage = function () {
        localStorage.setItem("histories", JSON.stringify(histories))
        
        localStorage.setItem("playerSide", playerSide)
        // console.log(chess.history())
    };
    const addCapturedPiece = (move) => {
        // console.log(move)
        if (move.captured) {
            if (move.color == 'w') {
                const temp = capturedBlack
                temp.push(move.captured)
                const sortedTemp = temp.sort((a, b) => pieceValues[a] - pieceValues[b])
                setCapturedBlack(sortedTemp)
                // console.log(sortedTemp)
            } else {
                const temp = capturedWhite
                temp.push(move.captured)
                const sortedTemp = temp.sort((a, b) => pieceValues[a] - pieceValues[b])
                setCapturedWhite(sortedTemp)
                // console.log(sortedTemp)
            }
        }
    }
    const makeBestMove = async () => {
        if (isGameOver()) {
            getResult()
            return
        }
        try {
            const token = localStorage.getItem("token")
            const params = {
                playerSide: playerSide,
                result: result,
                winner: winner,
                move: histories.join(" "),
                fen: chess.fen(),
                levelId: levelId,
                userId: user.id
            }
            const data = await fetch("https://chess-backend-3qay.onrender.com/api/game/ai",{
                method: "POST",
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
                throw {message: error.message};
            }
            const response = await data.json();
            const dataJson = response.data
            // console.log(dataJson);
            const move = chess.move({
                from: dataJson.substring(0, 2),
                to: dataJson.substring(2, 4),
                promotion: 'q'
            })
            if (move == null) {
                console.log("Nước đi của ai không hợp lệ")
                return
            }
            addMove(move)
            addCapturedPiece(move)
            setboard(chess.fen())
            setInCheck(chess.inCheck())
            if (isGameOver()) {
                getResult()
            }
            
        } catch (error) {
            // console.log(error);
            alert("Server laggggg");
        }
    }
    const getOldGame = () => {
        
        if (oldHistories && !hasMounted.current) {
            console.log("Lấy lại bàn cờ")
            const tempChess = new Chess()
            oldHistories.forEach(item => {
                const move = tempChess.move(item.san)
                addCapturedPiece(move)
            });
            // console.log(tempChess)
            setboard(tempChess.fen())
            setchess(tempChess)
            
            return tempChess
        }
        return new Chess()
    }
    const onDrop = async (source, target) => {
        if (chess.turn() == playerSide.substring(0, 1)) {
            try {
            
                const move = chess.move({
                    from: source,
                    to: target,
                    verbose: true,
                    promotion: 'q'
                });
                // console.log("from " + source + " to " + target)
                // console.log(move)
                if (move == null) {
                    return false;
                }
                if (move && move.flags.includes('p')) {
                    chess.undo()
                    setPromotion({show: true, source: source, target: target})
                    // console.log("promotion " + promotion.source + " " + promotion.target)
                    return false
                }
                addMove(move)
                addCapturedPiece(move)
                setboard(chess.fen())
                setSelectedSquare(null)
                setBoardStyles({})
                setHints([])
                setInCheck(chess.inCheck())
                if (isGameOver()) {
                    getResult()
                }
                // console.log(capturedBlack)
                // console.log(capturedWhite)
                // saveHistoriesToLocalStorage();
                await makeBestMove()
                return true;
            } catch (error) {
                console.log(error)
            }  
        }
        return true
    }
    const findKingSquare = (color) => {
        for (const row of chess.board()) {
            // console.log(row)
            for(const piece of row){
                if (piece && piece.type == 'k' && piece.color == color) {
                    return piece.square
                }
                // console.log(piece)
            }
        }
    }
    const setCheckStyle = () => {
        if (chess.inCheck()) {
            const king = chess.turn() == "w"? findKingSquare('w') : findKingSquare('b')
            // console.log(king)
            const tempStyle = {}
            hints.forEach(item => tempStyle[item] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' })
            
            tempStyle[king] = { backgroundColor: 'red' }
            setBoardStyles(tempStyle)
        } else {
            const tempStyle = {}
            hints.forEach(item => tempStyle[item] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' })
            setBoardStyles(tempStyle)
        }
        // console.log(boardStyles)
    }
    useEffect(() => {
        if (isGameOver()) {
            console.log("lưu")    
            saveResult()
        }
        
      
    }, [isGameOver()])
    
    useEffect(() => {
      setCheckStyle()
    }, [inCheck])
    
    useEffect(() => {
      getResult()
    }, [resign])
    useEffect(() => {
        // if (hasMounted.current) {
        //     console.log("Đã gọi")
        // }
        
      getProfile()
      setPlayerSide(oldPlayerside? oldPlayerside: "")
      const oldGame = getOldGame()
      
    //   setchess(oldGame)
      
    //   if (!hasMounted.current) {
    //     if (playerSide != "" && chess.turn() != playerSide) {
    //         makeBestMove()
    //     }
    //   }
      hasMounted.current = true
    }, [])
    
    
    
  return (
    <div className="bg">
    	
            <div style={{marginLeft: "16%", paddingTop: "2%", display: "flex", flexDirection: "row"}}>
                <div>
                    <Avatar src={require("../../assets/img/avatar/bot.jpg")} style={{height: 50, width: 50}}/>
                </div>
                <div style={{marginLeft: 10}}>
                    <Typography color={"white"} style={{fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontWeight: "bold"}} variant='subtitle1'>Máy: Chế độ {levelId == 1? "Dễ": levelId == 2? "Trung bình": "Khó"}</Typography>
                    <div>
                        {playerSide == 'white' && capturedWhite.map((item, index) => 
                            (<img key={index} src={require("../../assets/img/chesspieces/wikipedia/w" + item + ".png")} style={{width: 20, height: 22}}></img>)
                        )}
                        {playerSide == 'black' && capturedBlack.map((item, index) => 
                            (<img key={index} src={require("../../assets/img/chesspieces/wikipedia/b" + item + ".png")} style={{width: 20, height: 22}}></img>)
                        )}
                    </div>
                </div>
                {(chess.turn() != playerSide.slice(0, 1)) && <div style={{position: "absolute", right: "48%"}}>
                    <ReactLoading type='spokes' height={45} width={45}></ReactLoading>
                </div>}
            </div>
            <div className="chess-area" style={{height: "100%", marginLeft: "15%"}}>
            
                <div className="board-table" style={{display: "flex", }}>
                    
                    <div id="board" style={{width: "96%", padding: 9, minWidth: 500}}>
                            <Chessboard id={"chessboard"} position={board} boardOrientation={playerSide} 
                            showBoardNotation={true}  
                            onSquareClick={onSquareClick}
                            isDraggablePiece={isDraggablePiece}
                            customSquareStyles={boardStyles}
                            onPieceDrop={onDrop}
                            promotionDialogVariant='vertical'
                            />
                    </div>
                    <div id="board-top-controls" className="top-controls">
                        <div id="game-promotion" className={promotion.show? "promotion": "promotion hidden"}>
                            <div figure="q" onClick={async () => await handlePromotion('q')}><img src={require("../../assets/img/chesspieces/wikipedia/" + chess.turn().charAt(0) + "q.png")}/></div>
                            <div figure="b" onClick={async () => await handlePromotion('b')}><img src={require("../../assets/img/chesspieces/wikipedia/" + chess.turn().charAt(0) + "b.png")}/></div>
                            <div figure="n" onClick={async () => await handlePromotion('n')}><img src={require("../../assets/img/chesspieces/wikipedia/" + chess.turn().charAt(0) + "n.png")}/></div>
                            <div figure="r" onClick={async () => await handlePromotion('r')}><img src={require("../../assets/img/chesspieces/wikipedia/" + chess.turn().charAt(0) + "r.png")}/></div>
                        </div>
                        
                        {showResign && (<div id="board-resign-game-area" className="popup">
                            <span className="close" onClick={() => setShowResign(false)}></span>
                            <label>Bạn thật sự muốn đầu hàng?</label>
                            <button className="yes" onClick={() => {setResign(true); setShowResign(false); getResult()}}>Có</button>
                            <button className="no" onClick={() => setShowResign(false)}>Không</button>
                        </div>)}
                        <div id="first-turn" className={playerSide == ""? "popup": "hidden"}>
                            <h2>Chọn quân nào</h2>
                            <button className="w" onClick={() => setPlayerSide("white")}>Trắng</button>
                            <button className="b" onClick={async () => {setPlayerSide("black"); await makeBestMove()}}>Đen</button>
                        </div>
                        <div id="result-board" className={isGameOver()? "popup": "popup hidden"}>
                            <h2 style={{alignSelf: "center"}}>Kết quả</h2>
                            <p style={{margin: 20}}>{result}</p>
                            <Link to="/"><button style={{padding: 10}} className="yes">Trở về</button></Link>
                        </div>
                    </div>
                    
                    <div id="board-controls" className="controls">
                        <div className="status">
                            <span id="game-turn"></span>
                            
                        </div>
                    </div>
                </div>
                <div className="board-settings" style={{marginLeft: '18%', minWidth: "40%", minHeight: '480px'}}>
                    <div className="apex" style={{display: 'flex', flexDirection: 'column'}}>
                        <div className="label-history" style={{margin: 10}}>Lịch sử</div>
                        
                        
                    </div>
                    
                    <div className="turns-history" id="game-turns-history">
                            <Table >
                                <TableBody>
                                    {chess.history({verbose: true}).map((item, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
                                            <TableCell align='center'>{index + 1}</TableCell>
                                            <TableCell align='center'><img style={{height: "25px", width: "25px"}} src={require("../../assets/img/chesspieces/wikipedia/" + item.color + item.piece + ".png")}/> {item.san}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                    </div>
                    
                    <div className="tunes">
                        <span id="btn-resign" title="Đầu hàng" className="btn resign" onClick={() => setShowResign(true)}></span>
                        <i className="icon"></i>
                    </div>
                    
                </div>
            </div>
            <div style={{marginLeft: "16%", display: "flex", flexDirection: "row"}}>
                <div>
                    <Avatar src={user.gioiTinh? require("../../assets/img/avatar/male.png") : require("../../assets/img/avatar/female.png")} style={{height: 50, width: 50}}/>
                </div>
                <div style={{marginLeft: 10}}>
                    <Typography color={"white"} style={{fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontWeight: "bold"}} variant='subtitle1'>{user.hoTen}</Typography>
                    <div>
                        {playerSide == 'black' && capturedWhite.map((item, index) => 
                            (<img key={index} src={require("../../assets/img/chesspieces/wikipedia/w" + item + ".png")} style={{width: 20, height: 22}}></img>)
                        )}
                        {playerSide == 'white' && capturedBlack.map((item, index) => 
                            (<img key={index} src={require("../../assets/img/chesspieces/wikipedia/b" + item + ".png")} style={{width: 20, height: 22}}></img>)
                        )}
                    </div>
                </div>
                {(chess.turn() == playerSide.slice(0, 1)) && <div style={{position: "absolute", right: "48%"}}>
                    <ReactLoading type='spokes' height={45} width={45}></ReactLoading>
                </div>}
            </div>
            <div className="chess-log"></div>
    </div>
  )
}

export default Game