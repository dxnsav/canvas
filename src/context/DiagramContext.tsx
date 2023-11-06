import { useState, useContext, createContext, useRef, useEffect } from "react";
import WebFont from "webfontloader";
import { useDataTableContext } from "./DataTableContext";

export const DiagramContext = createContext();

export const DiagramProvider = ({ children }) => {
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

	// diagram gen
	const canvasRef = useRef(null);
	const [imageURL, setImageURL] = useState('');

	const draw = (ctx, segments, points, showName, showLen, diagramName) => {
		const { width, height } = ctx.canvas;

		const padding = 50;

		const centerX = width / 2;
		const centerY = height / 2;
		const radius = Math.min(centerX, centerY) - padding;

		ctx.clearRect(0, 0, width, height);


		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
		ctx.stroke();

		ctx.font = `${fontSize}px ${selectedFont}`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		let textPositions = [];
		const textPadding = 10;
		const labelRadiusOffset = 30;


		const totalPoints = parseInt(segments, 10) || Math.max(...points);
		points.forEach((point, index) => {
			// Calculate the angle for each point
			let angle = ((point / totalPoints) * (Math.PI * 2)) - Math.PI / 2;

			// Calculate the line end point
			let lineEndX = centerX + radius * Math.cos(angle);
			let lineEndY = centerY + radius * Math.sin(angle);

			// Draw the line from circle to label
			ctx.beginPath();
			ctx.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
			ctx.lineTo(lineEndX, lineEndY);
			ctx.stroke();

			// Calculate label position
			let labelX = centerX + (radius + labelRadiusOffset) * Math.cos(angle);
			let labelY = centerY + (radius + labelRadiusOffset) * Math.sin(angle);

			// Adjust label position to avoid overlap
			let newPos = findNonOverlappingPosition(labelX, labelY, textPositions, ctx.measureText(point).width, fontSize, textPadding);
			textPositions.push({ x: newPos.x, y: newPos.y, width: ctx.measureText(point).width, height: fontSize });

			// Draw the label text
			ctx.fillStyle = colors[index];
			ctx.fillText(point, newPos.x, newPos.y);
		});

		if (showName) {
			ctx.fillText(diagramName, centerX, centerY);
		}

		if (showLen) {
			const lengthYPosition = showName ? centerY + 20 : centerY;
			ctx.fillText(`${segments} bp`, centerX, lengthYPosition);
		}
		setGenerated(true);

	};

	const handleDrawClick = () => {
		setGenerated(true);
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			draw(context, segments, points, showName, showLen, diagramName);
			setImageURL(canvas.toDataURL());
		}

		// scroll to canvas ref
		const element = document.getElementById('canvas');
		element?.scrollIntoView({ behavior: 'smooth' });


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
				imageURL,
				draw,
				selectedFont,
				setSelectedFont,
				showLen,
				showName,
				fontSize,
				setFontSize,
				generated,
				size,
				setSize,
			}}>
			{children}
		</DiagramContext.Provider>
	)
}

function checkCollision(x, y, textPositions) {
	for (const pos of textPositions) {
		if (Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2) <= pos.height) {
			return true; // Collision detected
		}
	}
	return false; // No collision
}

function findNonOverlappingPosition(x, y, textPositions, width, height, padding) {
	let newX = x;
	let newY = y;
	while (checkCollision(newX, newY, textPositions, width, height, padding)) {
		newX += padding; // Move the text position slightly to the right
		newY += padding; // Move the text position slightly down
	}
	return { x: newX, y: newY };
}

export const useDiagramContext = () => useContext(DiagramContext);
