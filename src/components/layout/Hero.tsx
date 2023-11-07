import { KeyboardIcon } from '@radix-ui/react-icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

const Hero = () => {
	return (
		<section id='hero' className='pt-10 md:pt-16 mb-20 md:mb-20 flex flex-row gap-10 justify-between'>
			<div className='w-fit'>
				<h1 className='text-xl text-clr-black font-bold max-w-md md:text-3xl lg:text-4xl lg:max-w-3xl xl:max-w-4xl mb-5 md:mb-7 lg:mb-10'>
					Що це таке?
				</h1>
				<p className='text-clr-black text-sm max-w-md md:max-w-lg lg:max-w-3xl md:text-base  lg:text-md'>
					Створення точних гістограм, кругових та лінійних діаграм у Photoshop може бути складним та часозатратним завданням. Наш генератор графіків розроблений з метою полегшити та прискорити цей процес, особливо коли йдеться про візуалізацію розрізів ДНК. Він ідеально підходить для генетиків, біологів та науковців, які потребують чіткого представлення даних для аналізу, навчання чи презентацій. Просто введіть ваші дані, і дивіться, як ваші графіки оживають в лічені секунди
				</p>
			</div>
			<Card className='w-[440px]'>
				<CardHeader>
					<CardTitle className='flex flex-row gap-2 align-middle'>
						<KeyboardIcon className='w-5 h-5 mr-2' />
						Хот-кеї
					</CardTitle>
					<Separator className='mt-2' />
				</CardHeader>
				<CardContent className='w-full flex flex-col gap-2'>
					<div className='flex flex-row gap-2 align-baseline justify-between'>
						<CardDescription>
							Зберегти графік
						</CardDescription>
						<kbd className="w-30 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							<span className="text-xs">⌘ / Ctrl + S</span>
						</kbd>
					</div>
					<div className='flex flex-row gap-2 align-baseline justify-between'>
						<CardDescription>
							Додати рядок
						</CardDescription>
						<kbd className="w-30 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							<span className="text-xs">⌘ / Ctrl + K</span>
						</kbd>
					</div>
					<div className='flex flex-row gap-2 align-baseline justify-between'>
						<CardDescription>
							Видалити рядок
						</CardDescription>
						<kbd className="w-30 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							<span className="text-xs">⌘ / Ctrl + D</span>
						</kbd>
					</div>
					<div className='flex flex-row gap-2 align-baseline justify-between'>
						<CardDescription>
							Перейти на наступний рядок
						</CardDescription>
						<kbd className="w-30 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							<span className="text-xs">Shift + Enter</span>
						</kbd>
					</div>
					<div className='flex flex-row gap-2 align-baseline justify-between'>
						<CardDescription>
							Перейти на попередній рядок
						</CardDescription>
						<kbd className="w-30 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							<span className="text-xs">Alt + Shift + Enter</span>
						</kbd>
					</div>
					<div className='flex flex-row gap-2 align-baseline justify-between'>
						<CardDescription>
							Перейти на наступну колонку
						</CardDescription>
						<kbd className="w-30 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							<span className="text-xs">Tab</span>
						</kbd>
					</div>
					<div className='flex flex-row gap-2 align-baseline justify-between'>
						<CardDescription>
							Перейти на попередню колонку
						</CardDescription>
						<kbd className="w-30 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
							<span className="text-xs">Alt  + Tab</span>
						</kbd>
					</div>
				</CardContent>
			</Card>
		</section >
	)
}

export default Hero