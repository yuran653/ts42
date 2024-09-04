
export default function GameMode({onGameModeChange} : {onGameModeChange: any}) {

	return (
		<div className='flex flex-col'>
			<button onClick={() => onGameModeChange('singlePlayer')}>Single Player</button>
			<button onClick={() => onGameModeChange('tournament')}>Tournament</button>
		</div>
	)
}