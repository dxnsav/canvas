import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '../ui/card';
import { DownloadIcon } from '@radix-ui/react-icons';
import { saveSvgAsPng } from 'save-svg-as-png';
import { useDiagramContext } from '../../context/DiagramContext';

interface CircleCanvasProps {
}


//link.download = `diagram-${formatDiagramName(diagramName)}.svg`;
const CircleCanvas: FC<CircleCanvasProps> = () => {
	const { size, svgContent, diagramName, canvasRef } = useDiagramContext();
	const svgRef = useRef(null);

	function formatDiagramName(diagramName) {
		let formattedName = diagramName.replace(/\s+/g, '-');
		formattedName = formattedName.replace(/[,.!@#$%^&*()+=\[\]{};':"\\|<>/?~]/g, '');
		return formattedName;
	}

	const downloadSvg = () => {
		const svgElement = svgRef.current;
		if (svgElement) {
			const serializer = new XMLSerializer();
			const source = serializer.serializeToString(svgElement);
			const blob = new Blob([source], { type: 'image/svg+xml' });
			const url = URL.createObjectURL(blob);

			// Create a link to download the blob
			const downloadLink = document.createElement('a');
			downloadLink.href = url;
			downloadLink.download = `diagram-${formatDiagramName(diagramName)}.svg`;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
			URL.revokeObjectURL(url); // Clean up
		}
	};

	const downloadPng = () => {
		const svgElement = svgRef.current;
		if (svgElement) {
			const svgData = new XMLSerializer().serializeToString(svgElement);
			const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
			const DOMURL = window.URL || window.webkitURL || window;
			const url = DOMURL.createObjectURL(svgBlob);

			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = size.width;
				canvas.height = size.height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				DOMURL.revokeObjectURL(url);

				canvas.toBlob((blob) => {
					const pngUrl = DOMURL.createObjectURL(blob);

					// Create a link to download the blob
					const downloadLink = document.createElement('a');
					downloadLink.href = pngUrl;
					downloadLink.download = `diagram-${formatDiagramName(diagramName)}.png`;
					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);
					DOMURL.revokeObjectURL(pngUrl); // Clean up
				});
			};
			img.src = url;
		}
	};

	const downloadJpg = () => {
		saveSvgAsPng(document.getElementById("diagram"), "diagram.png");
	}


	return (
		<div className='flex flex-col gap-4 items-center'>
			<Card className={`w-fit h-fit min-h-[200px] min-w-[200px] flex flex-col items-center justify-center`}>
				<CardContent>
					<svg ref={svgRef} id='diagram' width={size.width} height={size.height}>
						{svgContent}
					</svg>

				</CardContent>
			</Card>
			<Card className={`w-fit h-fit min-h-[200px] min-w-[200px] flex flex-col items-center justify-center`}>
				<CardContent>
					<canvas ref={canvasRef} width={size.width} height={size.height} />
				</CardContent>
			</Card>
			<div className='flex flex-row gap-4'>
				<Button className='w-fit' onClick={() => downloadJpg()}>
					Завантажити SVG
					<DownloadIcon className="ml-2 h-4 w-4" />
				</Button>
				<Button className='w-fit' onClick={() => downloadPng()}>
					Завантажити PNG
					<DownloadIcon className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default CircleCanvas;
