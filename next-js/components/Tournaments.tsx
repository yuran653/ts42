
import New from '@/components/New';
import TopNav from '@/components/TopNav';
import Link from 'next/link';

export default function Tournaments() {

	let isLogged = true;

	return (
		<div className='mx-auto gap-3 flex my-10 flex-col max-w-screen-lg w-full'>
			<div className='flex w-full opacity-40'>
				<div className='flex w-full'>Game</div>
				<div className='flex w-full'>Player 1</div>
				<div className='flex w-full'>Player 2</div>
				<div className='flex w-full'>Score</div>
			</div>
			<div className='flex opacity-80'>
				<div className='flex w-full'>11</div>
				<div className='flex w-full'>Alex</div>
				<div className='flex w-full'>Max 🏆</div>
				<div className='flex w-full'>1/10</div>
			</div>
		</div>
	)
}