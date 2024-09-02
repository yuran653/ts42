"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getUser, requestOtp, signIn } from '@/actions/db';
import { redirect } from 'next/dist/server/api-utils';

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
        <div className='w-full gap-4 flex flex-col'>

			{tokenOk && <div className='mx-auto gap-12 flex flex-row opacity-80'>
				<Link href='/pong' className='hover:opacity-70'>Pong</Link>
				<Link href='/settings' className='hover:opacity-70'>Tournaments</Link>
				<Link href='/tournaments' className='hover:opacity-70'>Settings</Link>
				{/* <Link href='#' onClick={() => handleTabClick('websocket')} className='hover:opacity-70'>Websocket</Link> */}
				<Link href='#' onClick={() => handleSignOut()} className='hover:opacity-70'>Exit</Link>
			</div>}

			{!tokenOk && <div className='w-60 mx-auto gap-3 flex my-10 flex-col opacity-80'>
				<h1 className='text-2xl mb-4'>Sign in</h1>
				<label>Email: </label>
				<input className='text-black px-1' type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />
				<label>Password: </label>
				<input className='text-black px-1' type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
				<button onClick={handleSignIn} className='border py-1 mt-4 opacity-100'>Sign in</button>
			</div>}

        </div>
    )
}