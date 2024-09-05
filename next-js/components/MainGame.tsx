'use client'

import { useState } from "react"
import GameRoom from "./GameRoom"


export default function MainGame() {
	// где находимся
	const [gameMode, setGameMode] = useState('choose_mode')
	// храним инфу игроков (однопользовательский режим = 1 игрок, сетовой = 2 игрока)
	// const [tPlayers, setTPlayers] = useState([])
	const [tScores, setTScores] = useState<number[]>([])
	const [tPlayers, setTPlayers] = useState<string[]>([])

	// прокидываем счет из игры вверх
	const scoresUpdate = (score1: number, score2: number) => {
		console.log('score1', score1)
		console.log('score2', score2)
		setTScores((prevScores) => [...prevScores, score1, score2])
		setGameMode('tournament_announce')
	}
	
	const nameChange = (index: number, name: string) => {
		setTPlayers((prevTPlayers) => {
			const newTPlayers = [...prevTPlayers]
			newTPlayers[index] = name
			return newTPlayers
		})
	}

	return (
		<div className="flex flex-col mx-auto">

			{gameMode === 'choose_mode' && 
			<div className='flex flex-col gap-3 w-96 mx-auto py-4'>
				<button className='hover:opacity-70 mr-auto' onClick={() => setGameMode('single_player')}>Single Player</button>
				<button className='hover:opacity-70 mr-auto' onClick={() => setGameMode('tournament_intro')}>Tournament</button>
			</div>
			}

			{gameMode === 'tournament_intro' && 
			<div className='w-96 py-4 mx-auto flex flex-col gap-3'>
				<h2>Welcome!</h2>
				{[0, 1, 2, 3].map((index) => (
					<div key={index} className=''>
						<label>Player {index + 1}:</label>
						<input
							type="text"
							// value={tPlayers[index] || ""}
							onChange={(e) => nameChange(index, e.target.value)}
							className="text-black"
						/>
					</div>
				))}
				<button className="border-2 py-2 px-4 mt-4 opacity-100 text-sm mx-auto" onClick={()=>setGameMode('tournament_announce')}>START</button>

			</div>
			}

			{gameMode === 'tournament_announce' && 
			<div className="w-96 gap-3">
				<h2>Announcement ...</h2>
				<button className="border-2 py-2 px-4 mt-4 opacity-100 text-sm mx-auto" onClick={()=>setGameMode('tournament_game')}>START</button>
			</div>
			}

			{gameMode === 'tournament_game' || gameMode === 'single_player' && 
				<GameRoom mode={'0'} scoresUpdate={scoresUpdate} players={tPlayers} />
			}
		</div>
	)


}