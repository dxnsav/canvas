import { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useDiagramContext } from '../../context/DiagramContext';

interface CircleCanvasProps {
}

const CircleCanvas: FC<CircleCanvasProps> = () => {
	const { size, diagramName, canvasRef } = useDiagramContext();

	const formatDiagramName = useCallback((name) => {
		let formattedName = name.replace(/\s+/g, '-');
		formattedName = formattedName.replace(/[,.!@#$%^&*()+=\[\]{};':"\\|<>/?~]/g, '');
		return formattedName;
	}, []); // formatDiagramName doesn't depend on any props or state

	const downloadPng = useCallback(() => {
		const link = document.createElement('a');
		link.download = `diagram-${formatDiagramName(diagramName)}.png`;
		if (canvasRef.current) {
			link.href = canvasRef.current.toDataURL('image/png');
			link.click();
		}
	}, [diagramName, canvasRef, formatDiagramName]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 's') {
				event.preventDefault();
				downloadPng();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [downloadPng]);

	return (
		<div className='flex flex-row gap-4 items-center h-fit px-2'>
			<Card className={`w-[314px] min-h-[200px] flex flex-col justify-between`} style={{ height: size.height }}>
				<CardHeader>
					<CardTitle>
						Дякую за використання!
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Button className='w-full' onClick={() => downloadPng()}>
						Завантажити
						<DownloadIcon className="ml-2 h-4 w-4" />
					</Button>
				</CardContent>
				<CardFooter>
					<CardDescription>
						<div className='my-10'>
							Зоставити фідбек можна надіславши лист на пошту <a
								href=""
								className="font-medium text-primary underline underline-offset-4"
							>
								contact@dxnsav.dev
							</a>
						</div>
					</CardDescription>
				</CardFooter>
			</Card>

			<Card className={`w-fit h-fit min-h-[200px] min-w-[200px] flex flex-col items-center justify-center`}>
				<CardContent className='p-0'>
					<canvas ref={canvasRef} width={size.width} height={size.height} className='rounded-xl' />
				</CardContent>
			</Card>
		</div >
	);
};

export default CircleCanvas;
