
export default function Settings() {

	return (
		<div className='w-96 py-4 mx-auto flex flex-col gap-3'>
			<div className="flex flex-row items-center">
				<label className="w-1/2">Avatar: </label>
				<input className='w-1/2 px-2 py-1 text-black' type="text" placeholder={'Alex'} />
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
				<button className="border-2 py-2 px-4 mt-4 opacity-100 text-sm ">Back</button>
				<button className="border-2 py-2 px-4 mt-4 opacity-100 text-sm ">Save</button>
			</div>
		</div>
	)
}