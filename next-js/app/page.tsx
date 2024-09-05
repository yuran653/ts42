"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

	const [otpStep, setOtpStep] = useState(0);
	const [tokenOk, setTokenOk] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
  
	const handleSignIn = async () => {
		try {
			// await signIn(username, password)
			// await requestOtp(username, password)
			// await setToken(username, password)
			// await getUser('1')
			// const res = await getUser('42')
			setTokenOk(true)
			// console.log('res:', res)
			// setTokenOk(true)
			// redirect('/pong')
		} catch (error) {
			console.error('Error logging in:', error);
			alert('wrong email/password')
		}
	};

	const handleSignOut = () => {
		setTokenOk(false);
	};

    return (
        <div className='gap-4 flex flex-col w-96 mx-auto py-4'>
			{tokenOk && <div className='gap-2 flex flex-col'>
				<Link href='/pong' className='hover:opacity-70'>Pong</Link>
				<Link href='/tournaments' className='hover:opacity-70'>Tournaments</Link>
				<Link href='/settings' className='hover:opacity-70'>Settings</Link>
				{/* <Link href='#' onClick={() => handleTabClick('websocket')} className='hover:opacity-70'>Websocket</Link> */}
				<Link href='#' onClick={() => handleSignOut()} className='hover:opacity-70'>Exit</Link>
			</div>}

			{!tokenOk && <div className='mx-auto gap-3 flex flex-col'>
				<div className='flex flex-row items-center'>
					<label className='w-1/2'>Email: </label>
					<input className='w-1/2 text-black px-2 py-1' type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>	
				<div className='flex flex-row items-center'>
					<label className='w-1/2'>Password: </label>
					<input className='w-1/2 text-black px-2 py-1' type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button onClick={handleSignIn} className='border-2 py-2 px-4 mt-4 opacity-100 text-sm mx-auto'>Sign in</button>
			</div>}

        </div>
    )
}