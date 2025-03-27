import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineCircle } from "react-icons/md";
import Loading from "./Loading";

export default function TicTacToe() {
    const [playersTurn, setPlayersTurn] = useState(Math.floor(Math.random() * 2))
    const [lastMove, setLastMove] = useState(null)
    const [winner, setWinner] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [growResult, setGrowResult] = useState(false)
    const playersShape = useRef(null)
    const [newGame, setNewGame] = useState(false)
    const [loading, setLoading] = useState(false)
    const [delay, setDelay] = useState(true)

    const [board, setBoard] = useState([
	null, null, null,
	null, null, null,
	null, null, null
    ])

    const available_moves = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8])

    const make_move = (index, shape) => {
	if (!board[index]) {
	    setBoard(prev => {
    		return (
		    prev.map((square, i) => {
			return index == i ? shape : square
		    })
		)
	    })
	    setLastMove(index)

	} else {
	    const taken_square = document.getElementById(`at ${index}`)
	    taken_square.style.animation = 'shake .2s ease infinite'
	    setTimeout(_ => {
		taken_square.style.animation = ''
	    }, 400)
	}
    }

    const CPU_play = _ => {
	const random_index = Math.floor(Math.random() * available_moves.current.length)
	make_move(available_moves.current[random_index], playersShape.current == 'x' ? 'o' : 'x')
    }

    const check_winner = _ => {
	const winning_patters = [
	    [0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	]

	for (const [a, b, c] of winning_patters) {
	    if (board[a] && board[a] == board[b] && board[a] == board[c]) {
		setTimeout(_ => setShowResult(true), 300)
		setTimeout(_ => setGrowResult(true), 400)
		const cells = [
		    document.getElementById(`at ${a}`),
		    document.getElementById(`at ${b}`),
		    document.getElementById(`at ${c}`)
		]
		cells.forEach(cell => {
		    cell.classList.add(board[a] == playersShape.current ? 'win-cell' : 'lose-cell')
		})

		return board[a]
	    }
	}

	if (board.every(square => square)){
	    setTimeout(_ => setShowResult(true), 200)
	    setTimeout(_ => setGrowResult(true), 300)
	    return 'draw'
	}

	return null
    }

    const restart_game = () => {
	setBoard([null, null, null, null, null, null, null, null, null])
	setPlayersTurn(Math.floor(Math.random() * 2))
	setLastMove(null)
	setWinner(null)
	setShowResult(false)
	setGrowResult(false)
	playersShape.current = null
	available_moves.current = [0, 1, 2, 3, 4, 5, 6, 7, 8]

	for (let i = 0; i < 9; i++) {
	    const el = document.getElementById(`at ${i}`)
	    if (el) {
		el.classList.remove('x-o-show')
	    }
	}

	setLoading(true)

	setTimeout(_ => {
	    setNewGame(prev => !prev)
	    setLoading(false)
	}, 500)
    }

    useEffect(_ => {
	const timeout = setTimeout(_ => setDelay(false), 500)

	playersShape.current = playersTurn ? 'x' : 'o'

	if (!playersTurn) {
	    setTimeout(_ => CPU_play(), 2000)
	}

	return _ => clearTimeout(timeout)
    }, [newGame])

    useEffect(_ => {
	if (lastMove === null) return

	const timeout = setTimeout(_ => {
	    document.getElementById(`at ${lastMove}`).classList.add('x-o-show')

	    const game_winner = check_winner()
	    if (game_winner) {
		setWinner(game_winner)
		return
	    }

	    available_moves.current = available_moves.current.filter(i => i != lastMove)

	    if (!game_winner) {
		if (playersTurn) {
		    setPlayersTurn(prev => !prev)

		    setTimeout(_ => {
			CPU_play()
		    }, 1000)
		} else {
		    setPlayersTurn(prev => !prev)
		}
	    }
	}, 50)

	return _ => clearTimeout(timeout)
    }, [lastMove])

    if (delay) return <div className="flex-grow"></div>

    if (loading) return <Loading/>

    return (
	<div className="mini-program flex-grow flex flex-col justify-around">
	    <div className="w-full flex justify-around">
		{
		    !showResult &&
		    <h1 className={`turn
			${playersTurn ? '' : '!text-[#ccc] scale-50'}
			${winner ? 'opacity-0' : ''}
			`}
		    >Your turn</h1>
		}

		{
		    showResult &&
		    (
			winner == 'draw'
			? <h1 className={`result ${growResult ? 'show-result' : ''}`}>Draw!</h1>
			: (winner == playersShape.current
			    ? <h1 className={`result ${growResult ? 'show-result' : ''}`}>You have won!</h1> 
			    : <h1 className={`result ${growResult ? 'show-result' : ''}`}>You have lost!</h1>
			)
		    )
		}

		{
		    !showResult &&
		    <h1 className={`turn
			${playersTurn ? '!text-[#ccc] scale-50' : ''}
			${winner ? 'opacity-0' : ''}
			`}
		    >CPU's turn</h1>
		}

	    </div>

	    <div id="tic-tac-toe-board">
		{
		    board.map((square, index) => {
			return (
			    <div 
				key={`square ${index}`} 
				className="square grid place-items-center cursor-pointer hover:bg-[#373737]"
				onClick={(playersTurn && !winner) ? _ =>  make_move(index, playersShape.current) : null}
			    >
				{!square
				    ? square
				    : (square == 'x'
					? <IoMdClose id={`at ${index}`} className="x-o"/>
					: <MdOutlineCircle id={`at ${index}`} className="x-o"/>
				    )
				}
			    </div>
			)
		    })
		}
	    </div>

	    <div className="self-end w-fit border rounded-md solid p-3 cursor-pointer"
		 onClick={restart_game}
	    >
		<h1>restart</h1>
	    </div>
	</div>
    )
}
