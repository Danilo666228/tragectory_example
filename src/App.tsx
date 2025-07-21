import { useCallback, useEffect, useState } from 'react'

import { CarItem } from './components/shared/CarItem'

export type Car = {
	id: number
	name: string
	model: string
	year: number
	color: string
	price: number
	latitude: number
	longitude: number
}

function App() {
	const [cars, setCars] = useState<Car[] | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

	const handleDeleteCar = (id: number) => {
		setCars(prev => prev?.filter(car => car.id !== id))
	}

	const fetchCars = useCallback(async () => {
		try {
			const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles')

			const data = (await response.json()) as Car[]
			setCars(data)
		} catch {
			setIsError(true)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchCars()
	}, [fetchCars])

	if (isLoading) {
		return <div>Загрузка...</div>
	}
	if (isError) {
		return <div>Ошибка...</div>
	}
	return (
		<main className='min-h-screen p-10'>
			<h1 className='text-3xl font-bold'>Список всех машин</h1>

			<ul className='mt-5 grid grid-cols-3 gap-3'>
				{cars?.map(car => (
					<CarItem onDeleteCar={handleDeleteCar} key={car.id} car={car} />
				))}
			</ul>
		</main>
	)
}

export default App
