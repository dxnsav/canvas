import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Picker } from '../ui/picker'
import { Button } from '../ui/button'
import { Cross1Icon, FontItalicIcon, FontRomanIcon, FontSizeIcon, FontStyleIcon, LightningBoltIcon, PlusIcon } from '@radix-ui/react-icons'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'
import { useDiagramContext } from '../../context/DiagramContext'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ScrollArea } from '../ui/scroll-area'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Menubar, MenubarMenu } from '../ui/menubar'
import { Toggle } from '../ui/toggle'

type Props = {}

const GOOGLE_FONTS_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_GOOGLE_FONTS_API_KEY}`;


export const Details = (props: Props) => {
	const { handleSegmentsChange, handleDiagramNameChange, handleShowLenChange, handleShowNameChange, handleDrawClick, selectedFont, setSelectedFont, showLen, showName, fontSize, setFontSize, size, setSize } = useDiagramContext();
	const [open, setOpen] = React.useState(false);
	const [fonts, setFonts] = React.useState([]);
	const [fontSearchQuery, setFontSearchQuery] = React.useState("");

	React.useEffect(() => {
		fetch(GOOGLE_FONTS_URL)
			.then(response => response.json())
			.then(data => {
				setFonts(data.items);
			});
	}, []);

	function applyFont(fontFamily) {
		setSelectedFont(fontFamily);
		setOpen(false);
	}

	const filteredFonts = fontSearchQuery
		? fonts.filter(font => font.family.toLowerCase().includes(fontSearchQuery.toLowerCase()))
		: fonts;

	return (
		<Card className='w-[400px]'>
			<CardHeader>
				<CardTitle>Дані діаграми</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-2">
				<Label htmlFor='partsInput'>Довжина послідовності</Label>
				<Input id="partsInput" type="number" required onChange={(e) => handleSegmentsChange(e)} placeholder="Довжина" />
				<Label htmlFor='chartName'>Назва графіку</Label>
				<Input id="chartName" type='text' onChange={(e) => handleDiagramNameChange(e)} placeholder="Назва" />
				<div className='flex flex-col gap-2'>
					<Label>Виберіть колір</Label>
					<Picker isTag={false} />
				</div>
				<Separator className='my-2' />
				<div className="flex items-center space-x-2">
					<Checkbox id='showLen' checked={showLen} onCheckedChange={(e) => handleShowLenChange(e)} />
					<Label htmlFor='showLen'>Показувати довжину</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox id='showName' checked={showName} onCheckedChange={(e) => handleShowNameChange(e)} />
					<Label htmlFor='showName'>Показувати назву</Label>
				</div>
				<Separator className='my-2' />
				<Label htmlFor='fontSearch'>Шрифт</Label>
				<div className="flex items-center space-x-2">
					<FontStyleIcon className="h-4 w-4" />
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button variant="outline" id="fontSearch" className="w-[150px] justify-start">
								{selectedFont ?
									selectedFont :
									<>
										Виберіть шрифт
									</>
								}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="p-0" side="right" align="start">
							<Command>
								<CommandInput
									placeholder="Пошук шрифту"
									value={fontSearchQuery}
									onValueChange={(e) => setFontSearchQuery(e)}
									className="h-9"
								/>
								{filteredFonts.length === 0 && <CommandEmpty>Шрифт не знайден</CommandEmpty>}
								<CommandGroup>
									<ScrollArea className="h-[200px] rounded-md border ">
										{filteredFonts.map((font) => (
											<CommandItem
												key={font.family}
												value={font.family}
												onSelect={() => {
													setSelectedFont(font.family);
													setOpen(false);
												}}
											>
												{font.family}
											</CommandItem>
										))}
									</ScrollArea>
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
					<FontSizeIcon className="h-4 w-4" />
					<Input id="fontSize" className='w-20' type="number" placeholder="Розмір шрифту" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
				</div>
				<Separator className='my-2' />
				<Label>Розмір діаграми</Label>
				<div className="flex items-center space-x-2">
					<Input
						className="w-32"
						value={size.width}
						onChange={(e) => setSize(prevSize => ({ ...prevSize, width: parseInt(e.target.value, 10) }))}
						id="chartWidth"
						type='number'
						placeholder="Ширина"
						min="1"
						max="4000"
					/>

					<Cross1Icon className="h-4 w-4" />

					<Input
						className="w-32"
						value={size.height}
						onChange={(e) => setSize(prevSize => ({ ...prevSize, height: parseInt(e.target.value, 10) }))}
						id="chartHeight"
						type='number'
						placeholder="Висота"
						min="1"
						max="4000"
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full" onClick={() => handleDrawClick()}>
					Генерувати
					<LightningBoltIcon className="ml-2 h-4 w-4 animate-swing" />
				</Button>
			</CardFooter>
		</Card >
	)
}