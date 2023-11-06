import { Button } from "./button";
import { Input } from "./input";

import { useEffect, useState } from "react";
import { useDataTableContext } from "@/context/DataTableContext";
import { CheckIcon } from "@radix-ui/react-icons";

export const EditableCell = ({
	value: initialValue,
	row: index,
	column: id,
	isNumber = true
}) => {
	const [editMode, setEditMode] = useState(false);
	const [inputValue, setInputValue] = useState(initialValue);

	const { updateData, data } = useDataTableContext();

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
				className="w-fit h-5"
				type={isNumber ? "number" : "text"}
			/>
		) : (
			<div className="w-full h-5" onClick={toggleEditingMode}>{initialValue}</div>
		)
	);
};
