import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '../ui/card';
import { DownloadIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { useDiagramContext } from '../../context/DiagramContext';

interface CircleCanvasProps {
}

const CircleCanvas: FC<CircleCanvasProps> = () => {

	const { /*imageURL, canvasRef, generated, */ size, svgContent } = useDiagramContext();

	/*const downloadImage = () => {
		const link = document.createElement('a');
		link.download = 'circle.png';
		link.href = imageURL;
		link.click();
	};/** */

	return (
		<div className='flex flex-col gap-4 items-center'>
			<Card className={`w-fit h-fit min-h-[200px] min-w-[200px] flex flex-col items-center justify-center`}>
				<CardContent>

					{/*!generated ? <LightningBoltIcon className='animate-swing w-8 h-8' /> : <canvas ref={canvasRef} width={size.width} height={size.height} /> /** */}
					<svg width={size.width} height={size.height}>
						{svgContent}
					</svg>

				</CardContent>
			</Card>
			{/*imageURL && <Button className='w-fit' onClick={() => downloadImage()}>
				Завантажити
				<DownloadIcon className="ml-2 h-4 w-4" />
			</Button>/** */}
		</div>
	);
};

export default CircleCanvas;
