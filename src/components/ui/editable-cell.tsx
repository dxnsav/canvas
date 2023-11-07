import { Input } from "./input";
import { useState } from "react";
import { useDataTableContext } from "@/context/DataTableContext";

interface EditableCellProps {
	value: unknown;
	row: unknown;
	column: unknown;
	isNumber?: boolean;
}

export const EditableCell: React.FC<EditableCellProps> = ({
	value: initialValue,
	row: index,
	column: id,
	isNumber = true,
}) => {
	const [editMode, setEditMode] = useState(false);
	const [inputValue, setInputValue] = useState(initialValue);

	const { updateData } = useDataTableContext();

	const toggleEditingMode = () => {
		setEditMode(!editMode);
	};

	const handleInputChange = (e) => {
		setInputValue(isNumber ? parseInt(e.target.value, 10) : e.target.value);
	}

	const handleInputSubmission = (e) => {
		setInputValue(isNumber ? parseInt(e.target.value, 10) : e.target.value);
		updateData(index, id, inputValue);
		toggleEditingMode();
	}

	const handleKeyDown = (e, rowIndex, colIndex) => {

		const focusCell = (rowChange) => {
			const targetRow = rowIndex + rowChange;
			const targetCell = document.querySelector(`[tabindex][data-rowindex="${targetRow}"][data-colindex="${colIndex}"]`);
			if (targetCell) {
				targetCell.focus();
			}
		};

		if (e.key === 'Enter') {
			if (e.shiftKey) {
				e.preventDefault();
				if (e.altKey) {
					focusCell(-1);
				} else {
					focusCell(1);
				}
			} else {
				handleInputSubmission(e);
			}
		}
	};

	return (
		editMode ? (
			<Input
				value={inputValue}
				onChange={(e) => handleInputChange(e)}
				onBlur={(e) => handleInputSubmission(e)}
				onSubmit={(e) => handleInputSubmission(e)}
				onKeyDown={(e) => handleKeyDown(e, index, id)}
				autoFocus
				className="w-40 h-6"
				type={isNumber ? "number" : "text"}
			/>
		) : (
			<div data-rowindex={index}
				data-colindex={id} tabIndex={0} className="editable-cell w-40 h-6 bg-secondary border rounded-md border-border pl-3 focus:outline	focus:outline-primary focus:outline-2" onClick={toggleEditingMode} onFocus={() =>
					toggleEditingMode()
				} onKeyDown={(e) => handleKeyDown(e, index, id)} > {initialValue}</div >
		)
	);
};
