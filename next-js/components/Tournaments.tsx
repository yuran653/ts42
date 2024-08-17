import { getUser } from "@/actions/db";
import { useEffect } from "react";



export default function Tournaments() {

	let isLogged = true;

	useEffect(() => {
		const fetchUser = async () => {
		  try {
			const data = await getUser('1');
			console.log(data);
		  } catch (error) {
			console.error('Error fetching user from API');
		  }
		};	
		fetchUser();
	}, []);
	
	
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