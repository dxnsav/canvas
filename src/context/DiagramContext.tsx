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
			active: () => {
				console.log(`Font ${fontFamily} is now active and ready to use.`);
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

		const totalPoints = parseInt(segments, 10);
		points.forEach((point, index) => {
			let angle = ((point / totalPoints) * (Math.PI * 2)) - Math.PI / 2;
			const endX = centerX + (radius + 15) * Math.cos(angle);
			const endY = centerY + (radius + 15) * Math.sin(angle);

			ctx.beginPath();
			ctx.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
			ctx.lineTo(endX, endY);
			ctx.stroke();

			const textOffset = 20;
			const textX = endX + textOffset * Math.cos(angle);
			const textY = endY + textOffset * Math.sin(angle);

			const adjustedTextX = Math.max(padding, Math.min(width - padding, textX));
			const adjustedTextY = Math.max(padding, Math.min(height - padding, textY));

			ctx.fillStyle = colors[index];
			ctx.fillText(point, adjustedTextX, adjustedTextY);
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

export const useDiagramContext = () => useContext(DiagramContext);
