import { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '../ui/card';
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
		<div className='flex flex-col gap-4 items-center'>
			<Card className={`w-fit h-fit min-h-[200px] min-w-[200px] flex flex-col items-center justify-center`}>
				<CardContent>
					<canvas ref={canvasRef} width={size.width} height={size.height} />
				</CardContent>
			</Card>
			<div className='flex flex-row gap-4'>
				<Button className='w-fit' onClick={() => downloadPng()}>
					Завантажити
					<DownloadIcon className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default CircleCanvas;
