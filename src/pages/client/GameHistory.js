import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ReactLoading from "react-loading"
import "../../assets/css/style.css"

import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { Avatar, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { debounce, set } from 'lodash'
function GameHistory() {
    
    
    
    const location = useLocation()
    const gameHistory = location.state.gameHistory
    const pieceValues = {
        'p': 1, // Pawn
        'n': 4, // Knight
        'b': 3, // Bishop
        'r': 5, // Rook
        'q': 9, // Queen

    };
    const [chessMove, setChessMove] = useState([])
    const hasMounted = useRef(false)
    const [selectedMove, setSelectedMove] = useState(0)
    const playerSide = gameHistory.playerSide
    const level = gameHistory.level
    const moves = gameHistory.move.split(' ')
    const [chess, setchess] = useState(new Chess())
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [board, setboard] = useState(chess.fen())
    const [boardStyles, setBoardStyles] = useState({})
    const [histories, setHistories] = useState([])
    const [boardOrientation, setboardOrientation] = useState(playerSide)
    const [checkSquare, setCheckSquare] = useState(null)
    const [capturedWhite, setCapturedWhite] = useState([])
    const [capturedBlack, setCapturedBlack] = useState([])
    
    const [inCheck, setInCheck] = useState(chess.inCheck())
    const user = gameHistory.user
    
    const isStartingPosition = () => {
        const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        return chess.fen() === startingFEN;
    };
    
    const isDraggablePiece = ({piece}) => {
    
        return false
    }
    
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
    
    const onDrop = (source, target) => {
        
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
        if (chess.inCheck() || chess.isCheckmate()) {
            const king = chess.turn() == "w"? findKingSquare('w') : findKingSquare('b')
            // console.log(king)
            const tempStyle = {}
            
            
            tempStyle[king] = { backgroundColor: 'red' }
            setBoardStyles(tempStyle)
        } 
    }
    const convertMoves = () => {
        const tempChess = new Chess()
        moves.forEach((move) => {
          tempChess.move(move)
        });
        const tempMove = []
        tempChess.history({verbose: true}).forEach(move => {
            tempMove.push(move)
        })
        setChessMove(tempMove)
    };
    const renderChess = () => {
        const tempChess = new Chess()
        for (let index = 0; index <= selectedMove; index++) {
            tempChess.move(moves[index])
        }
        const tempCapturedBlack = []
        const tempCapturedWhite = []
        
        tempChess.history({verbose: true}).forEach(move => {
            if (move.captured) {
                if (move.color == 'w') {
                    
                    tempCapturedBlack.push(move.captured)
                    
                } else {
                    
                    tempCapturedWhite.push(move.captured)
                    
                }
            }
        })
        tempCapturedBlack.sort((a, b) => pieceValues[a] - pieceValues[b])
        tempCapturedWhite.sort((a, b) => pieceValues[a] - pieceValues[b])
        setboard(tempChess.fen())
        setCapturedBlack(tempCapturedBlack)
        setCapturedWhite(tempCapturedWhite)
        setInCheck(tempChess.inCheck() || tempChess.isCheckmate())
    } 
    const flipBoard = () => {
        if (boardOrientation == 'white') {
            setboardOrientation('black')
        } else {
            setboardOrientation('white')
        }
    }
    useEffect(() => {
      setCheckStyle()
    }, [inCheck])
    useEffect(() => {
        renderChess()
    }, [selectedMove])
    
    
    useEffect(() => {
        document.title = "Lịch sử"
      hasMounted.current = true
      convertMoves()
    }, [])
  return (
    <div className="bg">
    	
            <div style={{marginLeft: "16%", paddingTop: "2%", display: "flex", flexDirection: "row"}}>
                <div>
                    {boardOrientation != playerSide && <Avatar src={user.gioiTinh? require("../../assets/img/avatar/male.png") : require("../../assets/img/avatar/female.png")} style={{height: 50, width: 50}}/>}
                    {boardOrientation == playerSide && <Avatar src={require("../../assets/img/avatar/bot.jpg")} style={{height: 50, width: 50}}/>}
                </div>
                <div style={{marginLeft: 10}}>
                    {boardOrientation == playerSide && <Typography color={"white"} style={{fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontWeight: "bold"}} variant='subtitle1'>Máy: Chế độ {level.name}</Typography>}
                    {boardOrientation != playerSide && <Typography color={"white"} style={{fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontWeight: "bold"}} variant='subtitle1'>{user.hoTen}</Typography>}
                    <div>
                        {boardOrientation == 'white' && capturedWhite?.map((item, index) => 
                            (<img key={index} src={require("../../assets/img/chesspieces/wikipedia/w" + item + ".png")} style={{width: 20, height: 22}}></img>)
                        )}
                        {boardOrientation == 'black' && capturedBlack?.map((item, index) => 
                            (<img key={index} src={require("../../assets/img/chesspieces/wikipedia/b" + item + ".png")} style={{width: 20, height: 22}}></img>)
                        )}
                    </div>
                </div>
                
            </div>
            <div className="chess-area" style={{height: "100%", marginLeft: "15%"}}>
            
                <div className="board-table" style={{display: "flex", }}>
                    
                    <div id="board" style={{width: "96%", padding: 9, minWidth: 500}}>
                            <Chessboard id={"chessboard"} position={board} boardOrientation={boardOrientation} 
                            showBoardNotation={true}  
                            isDraggablePiece={isDraggablePiece}
                            customSquareStyles={boardStyles}
                            onPieceDrop={onDrop}
                            promotionDialogVariant='vertical'
                            />
                    </div>
                    <div id="board-top-controls" className="top-controls">
                        
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
                                    {chessMove.map((item, index) => (
                                        <TableRow onClick={() => setSelectedMove(index)} key={index} sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
                                            <TableCell align='center'>{index + 1}</TableCell>
                                            <TableCell align='center'><img style={{height: "25px", width: "25px"}} src={require("../../assets/img/chesspieces/wikipedia/" + item.color + item.piece + ".png")}/> {item.san}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                    </div>
                    
                    <div className="tunes">
                        <span onClick={() => setSelectedMove(0)} id='btn-left-bar' title="Nước đầu tiên" className="btn resign" style={{backgroundImage: require("../../assets/img/icons/chevron-bar-left.svg")}}></span>
                        <i className="icon"></i>
                        <span onClick={() => {if(selectedMove != 0) setSelectedMove(selectedMove - 1)}} id='btn-left' title="Nước trước" className="btn resign"></span>
                        <i className="icon"></i>
                        <span onClick={flipBoard} id='btn-flip' title="Flip" className="btn resign"></span>
                        <i className="icon"></i>
                        <span onClick={() => {if(selectedMove != moves.length - 1) setSelectedMove(selectedMove + 1)}} id='btn-right' title="Nước kế tiếp" className="btn resign"></span>
                        <i className="icon"></i>
                        <span onClick={() => setSelectedMove(moves.length - 1)} id='btn-right-bar' title="Nước cuối" className="btn resign"></span>
                        <i className="icon"></i>
                    </div>
                    
                </div>
            </div>
            <div style={{marginLeft: "16%", display: "flex", flexDirection: "row"}}>
                <div>
                {boardOrientation != playerSide && <Avatar src={require("../../assets/img/avatar/bot.jpg")} style={{height: 50, width: 50}}/>}
                {boardOrientation == playerSide && <Avatar src={user.gioiTinh? require("../../assets/img/avatar/male.png") : require("../../assets/img/avatar/female.png")} style={{height: 50, width: 50}}/>}
                </div>
                <div style={{marginLeft: 10}}>
                    {boardOrientation == playerSide && <Typography color={"white"} style={{fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontWeight: "bold"}} variant='subtitle1'>{user.hoTen}</Typography>}
                    {boardOrientation != playerSide && <Typography color={"white"} style={{fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontWeight: "bold"}} variant='subtitle1'>Máy: Chế độ {level.name}</Typography>}
                    <div>
                        {boardOrientation == 'black' && capturedWhite?.map((item, index) => 
                            (<img key={index} src={require("../../assets/img/chesspieces/wikipedia/w" + item + ".png")} style={{width: 20, height: 22}}></img>)
                        )}
                        {boardOrientation == 'white' && capturedBlack?.map((item, index) => 
                            (<img key={index} src={require("../../assets/img/chesspieces/wikipedia/b" + item + ".png")} style={{width: 20, height: 22}}></img>)
                        )}
                    </div>
                </div>
                
            </div>
            <div className="chess-log"></div>
    </div>
  )
}

export default GameHistory