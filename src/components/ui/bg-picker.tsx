import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { ColorWheelIcon, TransparencyGridIcon } from '@radix-ui/react-icons'
import { useMemo, useState } from 'react'

import { gradients } from '@/lib/gradients'
import { ScrollArea } from './scroll-area'
import { useDiagramContext } from '@/context/DiagramContext'

export function BgPicker() {
	const [background, setBackground] = useState('#ffffff')

	const { setDiagramBgColor } = useDiagramContext()

	const handleChange = (newColor) => {
		setBackground(newColor)
		setDiagramBgColor(newColor)
	}

	return (
		<GradientPicker background={background} setBackground={handleChange} />
	)
}

export function GradientPicker({
	background,
	setBackground,
	className,
}: {
	background: string
	setBackground: (background: string) => void
	className?: string
}) {
	function generateWebSafeColors() {
		const colors = ['transparent'];
		const hexValues = ['00', '33', '66', '99', 'CC', 'FF'];

		for (let r = 0; r < hexValues.length; r++) {
			for (let g = 0; g < hexValues.length; g++) {
				for (let b = 0; b < hexValues.length; b++) {
					colors.push(`#${hexValues[r]}${hexValues[g]}${hexValues[b]}`);
				}
			}
		}

		return colors;
	}

	const solids = useMemo(() => generateWebSafeColors(), [])

	const defaultTab = useMemo(() => {
		if (background.includes('url')) return 'image'
		if (background.includes('gradient')) return 'gradient'
		return 'solid'
	}, [background])

	const Btn = () => (
		<Button
			variant={'ghost'}
			className={cn(
				'w-[250px] h-7 align-center justify-start text-left font-normal',
				className,
			)}
		>
			<div className="w-full flex items-center gap-2">
				{background ? (
					<div
						className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
						style={{ background }}
					></div>
				) : (
					<ColorWheelIcon className="h-4 w-4" />
				)}
				<div className="truncate flex-1">
					{background ? background : 'Pick a color'}
				</div>
			</div>
		</Button>
	);

	return (
		<Popover>
			<PopoverTrigger>
				<GradientButton background={background}>
					<Btn />
				</GradientButton>
			</PopoverTrigger>
			<PopoverContent className="w-64">
				<Tabs defaultValue={defaultTab} className="w-full">
					<TabsList className="w-full mb-4">
						<TabsTrigger className="flex-1" value="solid">
							Колір
						</TabsTrigger>
						<TabsTrigger className="flex-1" value="gradient">
							Градієнт
						</TabsTrigger>
					</TabsList>
					<TabsContent value="solid" className="">
						<ScrollArea className="h-[200px] rounded-md border ">
							<div className="grid grid-cols-6">
								{solids.map((s, index) => (
									index % 6 === 0 && <div key={`row-${index}`} className="flex flex-wrap">
										{solids.slice(index, index + 6).map((color) => (
											<div
												key={color}
												style={{ background: color }}
												className="m-1 rounded-md h-6 w-6 cursor-pointer active:scale-105 transition-transform duration-150 ease-in-out"
												onClick={() => setBackground(color)}
											>
												{color === 'transparent' && <TransparencyGridIcon className=" rounded-md h-6 w-6 cursor-pointer active:scale-105 transition-transform duration-150 ease-in-out" />}

											</div>
										))}
									</div>
								))}
							</div>
						</ScrollArea>
					</TabsContent>
					<TabsContent value="gradient" className="mt-0">
						<ScrollArea className="h-[200px] rounded-md border ">
							<div className="grid grid-cols-6">
								{gradients.map((s, index) => (
									index % 6 === 0 && <div key={`row-${index}`} className="flex flex-wrap">
										{gradients.slice(index, index + 6).map((color) => (
											<div
												key={color}
												style={{ background: color }}
												className="m-1 rounded-md h-6 w-6 cursor-pointer active:scale-105 transition-transform duration-150 ease-in-out"
												onClick={() => setBackground(color)}
											/>
										))}
									</div>
								))}
							</div>
						</ScrollArea>
					</TabsContent>
				</Tabs>
				<Input
					id="custom"
					value={background}
					className="col-span-2 h-8 mt-4"
					onChange={(e) => setBackground(e.currentTarget.value)}
				/>
			</PopoverContent>
		</Popover >
	)
}


const GradientButton = ({
	background,
	children,
}: {
	background: string
	children: React.ReactNode
}) => {
	return (
		<div
			className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all w-fit h-[10.5] align-baseline justify-start text-left font-normal border"
			style={{ background }}
		>
			<div className="bg-popover/80 rounded-md p-1 text-xs text-center">
				{children}
			</div>
		</div>
	)
}