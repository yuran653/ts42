import { useState } from "react";

export default function Tournament({onResultsUpdate} : any) {
  const [tPlayers, setTPlayers] = useState<string[]>([])
  const [tResults, setTResults] = useState<number[]>([])

  const handlePlayerNameChange = (index: number, name: string) => {
    setTPlayers((prevPlayers) => {
      const newTPlayers = [...prevPlayers]
      newTPlayers[index] = name
      return newTPlayers
    })
	setTResults((prevResults) => {
		const newTResults = [...prevResults]
		newTResults[index] = 1
		return newTResults
	})
  };

  const startTournament = () => {
	onResultsUpdate(tPlayers, tResults)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>Tournament</h2>
      <div>
        <label>Player 1:</label>
        <input
          type="text"
          value={tPlayers[0] || ""}
          onChange={(e) => handlePlayerNameChange(0, e.target.value)}
		  className="text-green-800"
        />
      </div>
      <div>
        <label>Player 2:</label>
        <input
          type="text"
          value={tPlayers[1] || ""}
          onChange={(e) => handlePlayerNameChange(1, e.target.value)}
		  className="text-green-800"
        />
      </div>
      <div>
        <label>Player 3:</label>
        <input
          type="text"
          value={tPlayers[2] || ""}
          onChange={(e) => handlePlayerNameChange(2, e.target.value)}
		  className="text-green-800"
        />
      </div>
      <div>
        <label>Player 4:</label>
        <input
          type="text"
          value={tPlayers[3] || ""}
          onChange={(e) => handlePlayerNameChange(3, e.target.value)}
		  className="text-green-800"
        />
      </div>
      <button onClick={startTournament}>Start Tournament</button>
    </div>
  );
}