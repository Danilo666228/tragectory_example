import { X } from 'lucide-react'
import { type ComponentProps } from 'react'

import { Button } from '../ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

import type { Car } from '@/App'

interface CarItemProps extends ComponentProps<typeof Card> {
	car: Car
	onDeleteCar: (id: number) => void
}

export const CarItem = ({ car, onDeleteCar, ...props }: CarItemProps) => {
	return (
		<article>
			<Card className='relative overflow-hidden transition-shadow duration-500 hover:shadow-lg' {...props}>
				<Button variant={'outline'} onClick={() => onDeleteCar(car.id)} className='absolute top-3 right-3 cursor-pointer'>
					<X />
				</Button>
				<CardHeader>
					<CardTitle>
						{car.name} {car.model}
					</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col'>
					<span>Год выпуска : {car.year}</span>
					<div className='flex items-center gap-3'>
						<span>Цвет :</span>
						<span className='h-[20px] w-[20px] rounded-full' style={{ backgroundColor: car.color }} />
					</div>
				</CardContent>
				<CardFooter>
					<span>Цена : {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(car.price)}</span>
				</CardFooter>
			</Card>
		</article>
	)
}
