"use client";

import { useState } from 'react';
import New from '@/components/New';
import Settings from '@/components/Settings';
import TopNav from '@/components/TopNav';
import Tournaments from '@/components/Tournaments';
import Link from 'next/link';
import Game from '@/components/Game';

export default function Home() {
    const [activeTab, setActiveTab] = useState('');

	const [isLogged, setIsLogged] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  
	const handleSignIn = () => {
	  if (email === '42' && password === '42') {
		setIsLogged(true);
	  } else {
		alert('wrong email/password');
	  }
	};
	const handleSignOut = () => {
		setIsLogged(false);
	  };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='w-full gap-4 flex flex-col mx-4 my-4'>

			{isLogged && <div className='mx-auto gap-12 flex flex-row opacity-80'>
					<Link href='#' onClick={() => handleTabClick('newgame')} className='hover:opacity-70'>New game</Link>
					<Link href='#' onClick={() => handleTabClick('tournaments')} className='hover:opacity-70'>Tournaments</Link>
					<Link href='#' onClick={() => handleTabClick('settings')} className='hover:opacity-70'>Settings</Link>
					<Link href='#' onClick={() => handleTabClick('websocket')} className='hover:opacity-70'>Websocket</Link>
					<Link href='#' onClick={() => handleSignOut()} className='hover:opacity-70'>Exit</Link>
			</div>}

			{!isLogged && <div className='w-60 mx-auto gap-3 flex my-10 flex-col opacity-80'>
				<h1 className='text-2xl mb-4'>Sign in</h1>
				<label>Email: </label>
				<input className='text-black px-1' type="text"  value={email} onChange={(e) => setEmail(e.target.value)} />
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