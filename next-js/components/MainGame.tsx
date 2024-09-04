'use client'

import { useState } from "react"
import GameMode from "./GameMode"
import GameRoom from "./GameRoom"
import Tournament from "./Tournament"

export default function MainGame() {
	// где находимся
	const [gameMode, setGameMode] = useState('');
	// храним инфу игроков (однопользовательский режим = 1 игрок, сетовой = 2 игрока)
	const [players, setPlayers] = useState([]);
	// const [tournamentResults, setTournamentResults] = useState();
  
	const gameModeChange = (mode: string) => {
		setGameMode(mode);
	}
	
	// прокидываем что нужно из торнамента ввверх
	const tournamentUpdate = (tPlayers: [], tResults: []) => {
		console.log('tourn players', tPlayers)
		console.log('tourn results', tResults)
		// если 4 игрока то gameMode = 'tournament_game_1'
		if (tPlayers.length > 2) {
			setGameMode('tournament_game_1');
		}

	}
  
	return (
	  <div>
			<GameMode onGameModeChange={gameModeChange} />
			{gameMode === 'singlePlayer' && <GameRoom mode="singlePlayer" players={players} />}
			{gameMode === 'tournament' && <Tournament onResultsUpdate={tournamentUpdate} />}
			{gameMode === 'tournament_game_1' && <GameRoom mode="singlePlayer" players={players} />}
			
	  </div>
	)

}