'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSignUp = async () => {
		
	}

    return (
        <div className='gap-4 flex flex-col w-96 mx-auto py-4'>
			<h2>sign up</h2>

			<div className='mx-auto gap-3 flex flex-col'>
				<div className='flex flex-row items-center'>
					<label className='w-1/2'>Email: </label>
					<input className='w-1/2 text-black px-2 py-1' type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>	
				<div className='flex flex-row items-center'>
					<label className='w-1/2'>Password: </label>
					<input className='w-1/2 text-black px-2 py-1' type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button onClick={handleSignUp} className='border-2 py-2 px-4 mt-4 opacity-100 text-sm mx-auto uppercase'>sign in</button>
			</div>

			<div>have an account?  
				<Link href='/signin' className='hover:opacity-70 uppercase'> sign in</Link>
			</div>
        </div>
    )
}