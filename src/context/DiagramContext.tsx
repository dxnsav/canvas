import { useState, useContext, createContext, useRef, useEffect } from "react";
import WebFont from "webfontloader";
import { useDataTableContext } from "./DataTableContext";
import opentype from "opentype.js";

export const DiagramContext = createContext();

interface DiagramProviderProps {
	children: React.ReactNode;
}

export const DiagramProvider: React.FC<DiagramProviderProps> = ({ children }) => {
	const [diagramName, setDiagramName] = useState('');
	const [segments, setSegments] = useState(0);
	const [points, setPoints] = useState([]);
	const [showLen, setShowLen] = useState(true);
	const [showName, setShowName] = useState(true);
	const [generated, setGenerated] = useState(false);
	const [selectedFont, setSelectedFont] = useState("Roboto");
	const [fontSize, setFontSize] = useState(14);
	const [colors, setColors] = useState([]);
	const [size, setSize] = useState({ width: 500, height: 500 });
	const [diagramColor, setDiagramColor] = useState('#000000');
	const [svgContent, setSvgContent] = useState([]);
	const { data } = useDataTableContext();

	useEffect(() => {
		setPoints(data.map((row) => row.amount));
		setColors(data.map((row) => row.color));
	}, [data]);

	const handleShowLenChange = (event) => {
		setShowLen(event);
	}

	const handleShowNameChange = (event) => {
		setShowName(event);
	}

	const handleSegmentsChange = (event) => {
		setSegments(event.target.value);
	};

	const handleDiagramNameChange = (event) => {
		setDiagramName(event.target.value);
	};

	const loadFont = (fontFamily) => {
		WebFont.load({
			google: {
				families: [fontFamily]
			},
		});
	};

	useEffect(() => {
		loadFont(selectedFont);
	}, [selectedFont]);


	const canvasRef = useRef(null);

	const drawCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const padding = 50;
		const centerX = size.width / 2;
		const centerY = size.height / 2;
		const radius = Math.min(centerX, centerY) - padding;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.font = `${fontSize}px ${selectedFont}`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
		ctx.strokeStyle = diagramColor;
		ctx.lineWidth = 2;
		ctx.stroke();

		const totalPoints = parseInt(segments, 10) || Math.max(...points);
		const textPositions = [];
		const labelRadiusOffset = 30;

		points.forEach((point, index) => {
			const angle = ((point / totalPoints) * (Math.PI * 2)) - Math.PI / 2;
			const circleEdgeX = centerX + radius * Math.cos(angle);
			const circleEdgeY = centerY + radius * Math.sin(angle);
			const labelX = centerX + (radius + labelRadiusOffset) * Math.cos(angle);
			const labelY = centerY + (radius + labelRadiusOffset) * Math.sin(angle);

			// Assuming findNonOverlappingPosition is a function you've defined
			// to calculate the position of text such that it doesn't overlap with others.
			const newPos = findNonOverlappingPosition(labelX, labelY, textPositions, fontSize * String(point).length, fontSize, 10);
			textPositions.push({ x: newPos.x, y: newPos.y, width: fontSize * String(point).length, height: fontSize });

			const lineMargin = fontSize;
			const lineEndX = newPos.x - lineMargin * Math.cos(angle);
			const lineEndY = newPos.y - lineMargin * Math.sin(angle);
			const rayEndX = circleEdgeX - 20 * Math.cos(angle);
			const rayEndY = circleEdgeY - 20 * Math.sin(angle);

			// Draw line from circle edge to the text position
			ctx.beginPath();
			ctx.moveTo(circleEdgeX, circleEdgeY);
			ctx.lineTo(lineEndX, lineEndY);
			ctx.strokeStyle = colors[index];
			ctx.lineWidth = 2;
			ctx.stroke();

			// Draw line representing the "ray" from the circle edge
			ctx.beginPath();
			ctx.moveTo(circleEdgeX, circleEdgeY);
			ctx.lineTo(rayEndX, rayEndY);
			ctx.stroke();

			// Draw the text label
			ctx.font = `${fontSize}px ${selectedFont}`;
			ctx.fillStyle = colors[index];
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(point.toString(), newPos.x, newPos.y);
		});

		ctx.font = `${fontSize * 1.75}px ${selectedFont}`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = diagramColor;

		if (showName) {
			ctx.fillText(diagramName, centerX, centerY - 20);
		}

		if (showLen) {
			const yOffset = showName ? centerY + 40 : centerY + 20;
			ctx.fillText(`${segments} bp`, centerX, yOffset);
		}
	}

	const handleDrawClick = () => {
		drawCanvas();
	};

	return (
		<DiagramContext.Provider
			value={{
				diagramName,
				handleDiagramNameChange,
				segments,
				handleSegmentsChange,
				points,
				handleShowLenChange,
				handleShowNameChange,
				handleDrawClick,
				canvasRef,
				selectedFont,
				setSelectedFont,
				showLen,
				showName,
				fontSize,
				setFontSize,
				generated,
				size,
				setSize,
				diagramColor,
				setDiagramColor,
				diagramName,
				drawCanvas
			}}>
			{children}
		</DiagramContext.Provider>
	)
}

function checkCollision(x, y, textPositions) {
	for (const pos of textPositions) {
		if (Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2) <= pos.height) {
			return true;
		}
	}
	return false;
}

function findNonOverlappingPosition(x, y, textPositions, width, height, padding = 5) {
	let newX = x;
	let newY = y;
	while (checkCollision(newX, newY, textPositions, width, height, padding)) {
		newX += padding;
		newY += padding;
	}
	return { x: newX, y: newY };
}


export const useDiagramContext = () => useContext(DiagramContext);
