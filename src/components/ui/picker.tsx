import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { ScrollArea } from "./scroll-area";
import { useDataTableContext } from "@/context/DataTableContext";
import { useDiagramContext } from "@/context/DiagramContext";

interface PickerProps {
	isTag?: boolean;
	initialValue?: string;
	onColorChange: (color: string) => void;
	index?: number;
	id?: string | number;
}

export const Picker: React.FC<PickerProps> = ({
	isTag = true,
	initialValue = "#000000",
	onColorChange,
	index,
	id
}) => {
	const [color, setColor] = useState(initialValue);

	const { updateData } = useDataTableContext();
	const { setDiagramColor } = useDiagramContext();

	const handleChange = (newColor) => {
		setColor(newColor);
		if (isTag) {
			updateData(index, id, newColor);
		} else {
			setDiagramColor(newColor);
		}
	};

	return (
		<GradientPicker color={color} setColor={handleChange} isTag={isTag} />
	);
}

export function GradientPicker({
	color,
	setColor,
	isTag,
	className,
}: {
	color: string
	setColor: (color: string) => void
	className?: string,
	isTag?: boolean
}) {

	function generateWebSafeColors() {
		const colors = [];
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

	const buttonTag = () => (
		<Button
			variant="outline"
			className={cn(
				'w-[130px] align-middle justify-start text-left font-normal h-6 border',
				!color && 'text-muted-foreground',
				className,
			)}
			style={{ borderColor: color, backgroundColor: `${color}4d` }}
		>
			{color ? (
				<div
					className="transition-all"
					style={{ color }}
				>
					{color}
				</div>
			) : (<div style={{ color }}>Виберіть колір</div>)}
		</Button>
	);

	const buttonInput = () => (
		<Button
			variant="outline"
			className={cn(
				'w-full h-9 align-center justify-start text-left font-normal border',
				!color && 'text-muted-foreground',
				className,
			)}
			style={{ borderColor: color, backgroundColor: `${color}4d` }}
		>
			{color ? (
				<div
					className="transition-all"
					style={{ color }}
				>
					{color}
				</div>
			) : (<div style={{ color }}>Виберіть колір</div>)}
		</Button>
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				{isTag ? buttonTag() : buttonInput()}
			</PopoverTrigger>
			<PopoverContent className="w-60 p-2">
				<ScrollArea className="h-[200px] rounded-md border ">
					<div className="grid grid-cols-6">
						{solids.map((s, index) => (
							index % 6 === 0 && <div key={`row-${index}`} className="flex flex-wrap">
								{solids.slice(index, index + 6).map((color) => (
									<div
										key={color}
										style={{ background: color }}
										className="m-1 rounded-md h-6 w-6 cursor-pointer active:scale-105 transition-transform duration-150 ease-in-out"
										onClick={() => setColor(color)}
									/>
								))}
							</div>
						))}
					</div>

				</ScrollArea>
				<Input
					id="custom"
					value={color}
					className="col-span-2 h-8 mt-4"
					onChange={(e) => setColor(e.currentTarget.value)}
				/>
			</PopoverContent>
		</Popover >
	)
}

const GradientButton = ({
	color,
	children,
}: {
	color?: string
	children: React.ReactNode
}) => {
	return (
		<div
			className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
			style={{ background }}
		>
			<div className="bg-popover/80 rounded-md p-1 text-xs text-center">
				{children}
			</div>
		</div>
	)
}