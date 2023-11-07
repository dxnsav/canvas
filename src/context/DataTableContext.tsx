import { useState, useContext, createContext } from "react";
import { data as initialData } from "@/table/columns";

export const DataTableContext = createContext();

export const DataTableProvider = ({ children }) => {
	const [data, setData] = useState(initialData);

	const updateData = (rowIndex, columnId, value) => {
		setData((oldData) =>
			oldData.map((row, index) => {
				if (index === rowIndex) {
					return {
						...oldData[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			}),
		);
	};

	const addNewRow = () => {
		setData((oldData) => [
			...oldData,
			{ id: oldData.length, title: '', color: '#000000' },
		]);
	};

	const removeSelectedRows = (selectedRowIds) => {
		setData((oldData) =>
			oldData.filter((row) => !selectedRowIds[row.id])
		);
	};

	return (
		<DataTableContext.Provider value={{ data, updateData, addNewRow, removeSelectedRows }}>
			{children}
		</DataTableContext.Provider>
	)
}

export const useDataTableContext = () => useContext(DataTableContext);
