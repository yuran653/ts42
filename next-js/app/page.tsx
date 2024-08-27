"use client";

import { useState } from 'react';
import New from '@/components/Game';
import Settings from '@/components/Settings';
import TopNav from '@/components/TopNav';
import Tournaments from '@/components/Tournaments';
import Link from 'next/link';
import { signIn } from '@/actions/db';
import Game from '@/components/Game';

export default function Home() {
    const [activeTab, setActiveTab] = useState('');

	const [isLogged, setIsLogged] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
  
	const handleSignIn = async () => {
		try {
			await signIn(username, password)
			setIsLogged(true)
		} catch (error) {
			console.error('Error logging in:', error);
			alert('wrong email/password')
		}
	};

	const handleSignOut = () => {
		setIsLogged(false);
	  };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='w-full gap-4 flex flex-col'>

			{isLogged && <div className='mx-auto gap-12 flex flex-row opacity-80'>
					<Link href='#' onClick={() => handleTabClick('newgame')} className='hover:opacity-70'>New game</Link>
					<Link href='#' onClick={() => handleTabClick('tournaments')} className='hover:opacity-70'>Tournaments</Link>
					<Link href='#' onClick={() => handleTabClick('settings')} className='hover:opacity-70'>Settings</Link>
					{/* <Link href='#' onClick={() => handleTabClick('websocket')} className='hover:opacity-70'>Websocket</Link> */}
					<Link href='#' onClick={() => handleSignOut()} className='hover:opacity-70'>Exit</Link>
			</div>}

			{!isLogged && <div className='w-60 mx-auto gap-3 flex my-10 flex-col opacity-80'>
				<h1 className='text-2xl mb-4'>Sign in</h1>
				<label>Email: </label>
				<input className='text-black px-1' type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />
				<label>Password: </label>
				<input className='text-black px-1' type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
				<button onClick={handleSignIn} className='border py-1 mt-4 opacity-100'>Sign in</button>
			</div>}

            {activeTab === 'newgame' && isLogged && <Game />}
            {activeTab === 'settings' && isLogged && <Settings />}
            {activeTab === 'tournaments' && isLogged && <Tournaments />}
            {/* <TopNav /> */}
            {activeTab === 'websocket' && isLogged && <New />}
        </div>
    )
}