'use server'

// import jwt_decode from 'jwt-decode'
// import jwt, { JwtPayload } from 'jsonwebtoken'

export const loginUser = async (username: string, password: string) => {
	try {
	  const response = await fetch('/api/token/', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
		credentials: 'include', // Включаем отправку и получение куки
	  });
  
	  if (!response.ok) {
		throw new Error(`HTTP error ${response.status}`);
	  }
  
	  // Теперь мы получаем JWT-токен от бэкенда и сохраняем его в куки
	  const { access_token } = await response.json();
	  document.cookie = `access_token=${access_token}; path=/`;
  
	  return; // Больше не нужно возвращать декодированный JWT-токен
	} catch (error) {
	  console.error('Error logging in:', error);
	  throw error;
	}
  };
	

// export const refreshToken = async () => {
// 	try {
// 	  const refreshToken = localStorage.getItem('refresh_token');
// 	  const response = await fetch('/api/token/refresh/', {
// 		method: 'POST',
// 		headers: {
// 		  'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({ refresh: refreshToken }),
// 	  });
  
// 	  if (!response.ok) {
// 		throw new Error(`HTTP error ${response.status}`);
// 	  }
  
// 	  const { access } = await response.json();
// 	  localStorage.setItem('access_token', access);
// 	  return jwt_decode(access);
// 	} catch (error) {
// 	  console.error('Error refreshing token:', error);
// 	  throw error;
// 	}
//   };

// export const getUser = async (id: string) => {
//     try {
//         const response = await fetch(`http://localhost:8000/users/${id}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         // console.error('Error: API', error);
//         throw error;
//     }
// };
export const getUser = async (id: string) => {
	try {
	  const accessToken = getCookieValue('access_token');
	  const response = await fetch(`http://localhost:8000/api/users/${id}`, {
		headers: {
		  'Authorization': `Bearer ${accessToken}`,
		},
		credentials: 'include', // Включаем отправку и получение куки
	  });
  
	  if (!response.ok) {
		throw new Error(`HTTP error ${response.status}`);
	  }
  
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error('Error fetching user:', error);
	  throw error;
	}
  };
  
  // Вспомогательная функция для получения значения куки
  function getCookieValue(cookieName: string): string {
	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
	  const [name, value] = cookie.trim().split('=');
	  if (name === cookieName) {
		return value;
	  }
	}
	return '';
  }
  