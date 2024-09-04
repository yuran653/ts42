
import New from '@/components/GameRoom';
import TopNav from '@/components/TopNav';
import Link from 'next/link';

export default function Settings() {

	let isLogged = true;

	return (
		<div className='w-60 mx-auto gap-3 flex my-10 flex-col opacity-80'>
			<label>Avatar: </label>
			<input className='text-black px-1' type="text" placeholder={'Alex'} />
			<label>Name: </label>
			<input className='text-black px-1' type="text" placeholder={'at@gmail.com'} />
			<label>Email: </label>
			<input className='text-black px-1' type="text" placeholder={'at@gmail.com'} />
			<label>Age: </label>
			<input className='text-black px-1' type="text" placeholder={'8'} />
			<label>Tournaments: </label>
			<input className='text-black px-1' type="text" placeholder={'50'} />
			<label>Best Score: </label>
			<input className='text-black px-1' type="text" placeholder={'100'} />
		</div>
	)
}