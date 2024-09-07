'use client'

import Link from "next/link"
import { useState } from "react"

export default function Settings() {

	const [image, setImage] = useState(null)
	
	// const handleImageUpload = async (e: any) => {
	// 	const file = e.target.files[0]
	// 	setImage(file)
	
	// 	try {
	// 	const formData = new FormData();
	// 	formData.append('image', file);
		
	// 	await fetch('/api/images', {
	// 		method: 'POST',
	// 		body: formData,
	// 	});
	// 	console.log('Изображение успешно загружено!')
	// 	} catch (error) {
	// 	console.error('Ошибка загрузки изображения:', error)
	// 	}
	// }

	const handleImageUpload = async (e: any) => {
        const file = e.target.files[0]
        setImage(file)
    
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await fetch('/api/images/', {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                console.log('Изображение успешно загружено!')
            } else {
                console.error('Ошибка загрузки изображения:', response.statusText)
            }
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error)
        }
    }

	return (
		<div className='w-96 py-4 mx-auto flex flex-col gap-3'>
			<div className="flex flex-row items-center">
				<label className="w-1/2">Avatar: </label>
				<input onChange={handleImageUpload} className='w-1/2 text-black' type="file" />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/2">Name: </label>
				<input className='w-1/2 px-2 py-1 text-black' type="text" placeholder={'at@gmail.com'} />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/2">Email: </label>
				<input className='w-1/2 px-2 py-1 text-black' type="text" placeholder={'at@gmail.com'} />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/2">Age: </label>
				<input className='w-1/2 px-2 py-1 text-black' type="text" placeholder={'8'} />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/2">Tournaments: </label>
				<input className='w-1/2 px-2 py-1 text-black' type="text" placeholder={'50'} />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/2">Best Score: </label>
				<input className='w-1/2 px-2 py-1 text-black' type="text" placeholder={'100'} />
			</div>
			<div className="flex flex-row mx-auto gap-3">
				<Link href='/' className="border-2 py-2 px-4 mt-4 opacity-100 text-sm ">Back</Link>
				<button className="uppercase border-2 py-2 px-4 mt-4 opacity-100 text-sm ">Save</button>
			</div>
		</div>
	)
}