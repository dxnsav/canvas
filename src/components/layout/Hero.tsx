import React from 'react'
import { Button } from '../ui/button'

type Props = {}

const Hero = (props: Props) => {
	return (
		<section id='hero' className='px-6 pt-10 md:pt-16 mb-48 md:px-10 md:mb-60'>
			<h1 className='text-xl text-clr-black font-bold max-w-md md:text-3xl lg:text-4xl lg:max-w-3xl xl:max-w-4xl mb-5 md:mb-7 lg:mb-10'>
				Що це таке?
			</h1>
			<p className='text-clr-black text-sm max-w-md md:max-w-lg lg:max-w-3xl md:text-base  lg:text-md'>
				Створення точних гістограм, кругових та лінійних діаграм у Photoshop може бути складним та часозатратним завданням. Наш генератор графіків розроблений з метою полегшити та прискорити цей процес, особливо коли йдеться про візуалізацію розрізів ДНК. Він ідеально підходить для генетиків, біологів та науковців, які потребують чіткого представлення даних для аналізу, навчання чи презентацій. Просто введіть ваші дані, і дивіться, як ваші графіки оживають в лічені секунди
			</p>
			<Button className='mt-5 md:mt-7 lg:mt-10' href='/create'>
				Сгенерувати графік
			</Button>
		</section>
	)
}

export default Hero