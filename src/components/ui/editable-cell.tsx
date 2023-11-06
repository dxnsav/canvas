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

	return (
		editMode ? (
			<Input
				value={inputValue}
				onChange={(e) => handleInputChange(e)}
				onBlur={(e) => handleInputSubmission(e)}
				onSubmit={(e) => handleInputSubmission(e)}
				autoFocus
				className="w-40 h-6"
				type={isNumber ? "number" : "text"}
			/>
		) : (
			<div className="w-40 h-6 bg-secondary border rounded-md border-border pl-3" onClick={toggleEditingMode}>{initialValue}</div>
		)
	);
};
