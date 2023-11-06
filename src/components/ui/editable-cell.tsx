import { Button } from "./button";
import { Input } from "./input";

import { useState } from "react";
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

	const { updateData } = useDataTableContext();

	const toggleEditingMode = () => {
		setEditMode(!editMode);
	};

	const handleInputChange = (e) => {
		setInputValue(parseInt(e.target.value, 10));
	}

	const handleInputSubmission = (e) => {
		setInputValue(parseInt(e.target.value, 10));
		updateData(index, id, inputValue);
		toggleEditingMode();
	}

	return (
		editMode ? (
			<Input
				value={inputValue}
				onChange={handleInputChange}
				onBlur={handleInputSubmission}
				onSubmit={() => handleInputSubmission()}
				autoFocus
				className="w-fit h-5"
				type={isNumber ? "number" : "text"}
			/>
		) : (
			<div onClick={toggleEditingMode}>{initialValue}</div>
		)
	);
};
