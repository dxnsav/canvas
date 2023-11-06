import { useState, useContext, createContext, useRef, useEffect } from "react";
import WebFont from "webfontloader";
import { useDataTableContext } from "./DataTableContext";

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
	const [imageURL, setImageURL] = useState('');

	const drawSVG = () => {
		const padding = 50;
		const centerX = size.width / 2;
		const centerY = size.height / 2;
		const radius = Math.min(centerX, centerY) - padding;

		const newSvgContent = [];

		newSvgContent.push(<circle key="mainCircle" cx={centerX} cy={centerY} r={radius} stroke={diagramColor} fill="none" />);

		const totalPoints = parseInt(segments, 10) || Math.max(...points);
		const textPositions = [];
		const labelRadiusOffset = 30;

		points.forEach((point, index) => {
			const angle = ((point / totalPoints) * (Math.PI * 2)) - Math.PI / 2;
			const circleEdgeX = centerX + radius * Math.cos(angle);
			const circleEdgeY = centerY + radius * Math.sin(angle);
			const labelX = centerX + (radius + labelRadiusOffset) * Math.cos(angle);
			const labelY = centerY + (radius + labelRadiusOffset) * Math.sin(angle);


			const newPos = findNonOverlappingPosition(labelX, labelY, textPositions, fontSize * String(point).length, fontSize, 10);
			textPositions.push({ x: newPos.x, y: newPos.y, width: fontSize * String(point).length, height: fontSize });

			const lineMargin = fontSize * 0.75;
			const lineEndX = newPos.x - lineMargin * Math.cos(angle);
			const lineEndY = newPos.y - lineMargin * Math.sin(angle);

			newSvgContent.push(
				<line key={`line-${index}`} x1={circleEdgeX} y1={circleEdgeY} x2={lineEndX} y2={lineEndY} stroke={colors[index]} />
			);


			newSvgContent.push(
				<text key={`label-${index}`} x={newPos.x} y={newPos.y} fontSize={fontSize} fontFamily={selectedFont} fill={colors[index]} textAnchor="middle" dominantBaseline="central">
					{point}
				</text>
			);
		});

		if (showName) {
			newSvgContent.push(
				<text key="diagramName" x={centerX} y={centerY - 20} fontSize={fontSize} fontFamily={selectedFont} fill="black" textAnchor="middle" dominantBaseline="central">
					{diagramName}
				</text>
			);
		}

		if (showLen) {
			newSvgContent.push(
				<text key="segmentLength" x={centerX} y={showName ? centerY + 40 : centerY + 20} fontSize={fontSize} fontFamily={selectedFont} fill="black" textAnchor="middle" dominantBaseline="central">
					{`${segments} bp`}
				</text>
			);
		}

		setSvgContent(newSvgContent);
	};

	const handleDrawClick = () => {
		drawSVG();
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
				selectedFont,
				setSelectedFont,
				showLen,
				showName,
				fontSize,
				setFontSize,
				generated,
				size,
				setSize,
				svgContent,
				diagramColor,
				setDiagramColor,
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

function findNonOverlappingPosition(x, y, textPositions, width, height, padding) {
	let newX = x;
	let newY = y;
	while (checkCollision(newX, newY, textPositions, width, height, padding)) {
		newX += padding;
		newY += padding;
	}
	return { x: newX, y: newY };
}

export const useDiagramContext = () => useContext(DiagramContext);
