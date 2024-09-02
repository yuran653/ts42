'use server'

import { cookies } from 'next/headers'

// import jwt_decode from 'jwt-decode'
// import jwt, { JwtPayload } from 'jsonwebtoken'

export const signIn = async (username: string, password: string) => {

	const response = await fetch('http://localhost:8000/api/token/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
		credentials: 'include', // Включаем отправку и получение куки
	});

	if (!response.ok) {
		throw Error(`HTTP error ${response.status}`);
	}

	// console.log('access_token:', access_token)
	const access_token = await response.json();
	cookies().set('access_token', access_token.access)
	cookies().set('refresh_token', access_token.refresh)

  };


export const requestOtp = async (username: string, password: string) => {
	// username is for salt here
	
	const response = await fetch('http://localhost:8000/api/token/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
		credentials: 'include', // Включаем отправку и получение куки
	});

	if (!response.ok) {
		throw Error(`HTTP error ${response.status}`);
	}

	const access_token = await response.json()
	if (!access_token) {
		console.error('Access token is empty or undefined');
		throw new Error('Access token is empty or undefined');
	}		

	try {
		const url = `http://localhost:8000/api/get-otp/`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${access_token.access}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username }),
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error(`HTTP error ${response.status}`);
		}
		const otpResponse = await response.json();
		const otp = otpResponse[0];
		console.log('data:', otp)

		try {
			const url = `http://localhost:8000/api/verify-otp/`;
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${access_token.access}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, otp }),
				credentials: 'include',
			});
			if (!response.ok) {
				throw new Error(`HTTP error ${response.status}`);
			}
			const data = await response.json();
			console.log('data:', data)
			// return data;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}

		// return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}

};

export const getUser = async (id: string) => {

	const accessToken = cookies().get('access_token')
	if (!accessToken) {
		console.error('Access token is empty or undefined');
		throw new Error('Access token is empty or undefined');
	}
	try {
		const url = `http://localhost:8000/games/`;
		const response = await fetch(url, {
			// method: 'POST',
			headers: {
				'Authorization': `Bearer ${accessToken.value}`,
			},
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error(`HTTP error ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
