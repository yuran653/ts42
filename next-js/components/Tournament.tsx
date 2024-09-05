import { useState } from "react";

export default function Tournament({onResultsUpdate} : any) {
  const [tPlayers, setTPlayers] = useState<string[]>([])
//   const [tResults, setTResults] = useState<number[]>([])
  const [tStatus, setTStatus] = useState<string>('')

  const nameChange = (index: number, name: string) => {
    setTPlayers((prevTPlayers) => {
      const newTPlayers = [...prevTPlayers]
      newTPlayers[index] = name
      return newTPlayers
    })

  };

  const startTournament = () => {
	onResultsUpdate(tPlayers, 'tournament_announ')
	setTStatus('tournament_announce')
  }

  return (
    <div className="flex flex-col gap-4">
		{tStatus === 'tournament_announce' && <h2>Announce .... </h2>}
		{tStatus === 'tournament_intro' && 
		<>
			<h2>Tournament</h2>
			{[0, 1, 2, 3].map((index) => (
				<div key={index}>
					<label>Player {index + 1}:</label>
					<input
						type="text"
						// value={tPlayers[index] || ""}
						onChange={(e) => nameChange(index, e.target.value)}
						className="text-green-800"
					/>
				</div>
			))}
		</>
		}

      	<button onClick={startTournament}>Start</button>
    </div>
  );
}