import { ColumnDef } from "@tanstack/react-table"
import { DotsHorizontalIcon, ChevronDownIcon, ChevronUpIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EditableCell } from "@/components/ui/editable-cell";
import { useDataTableContext } from "@/context/DataTableContext";
import { Picker } from "@/components/ui/picker";
import React from "react";

type Data = {
	id: number;
	amount: number;
	color: string;
	title?: string;
}

export const data: Data[] = [
	{ id: 1, amount: 10, color: '#000000', title: '' },
	{ id: 2, amount: 99, color: '#000000', title: '' },
	{ id: 3, amount: 30, color: '#00ff00', title: '' },
	{ id: 4, amount: 40, color: '#000000', title: '' },
	{ id: 5, amount: 50, color: '#000000', title: '' },
];

export const columns: ColumnDef<Data>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'amount',
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Точка
					<CaretSortIcon className="w-4 h-4 ml-2" />
				</Button>
			)
		},
		cell: ({ cell, row }) => {
			const val = cell.getValue();
			return (
				<EditableCell
					value={cell.getValue()}
					row={row.index}
					column={cell.column.id}
				/>
			);
		},
	},
	{
		id: 'color',
		accessorKey: 'color',
		header: () => <div className="text-left">Колір</div>,
		cell: ({ cell, row, column }) => {
			const val = cell.getValue();
			const { updateData } = useDataTableContext();

			const [cellColor, setCellColor] = React.useState(val);
			const handleSetColor = (color: string) => {
				setCellColor(color);
				cell.setValue(color);
				updateData(row.index, column.id, color);
			};

			return (
				<Picker initialValue={cellColor} setColor={handleSetColor} />
			);
		}
	},
	{
		id: 'title',
		accessorKey: 'title',
		header: () => <div className="text-left">Назва</div>,
		cell: ({ cell, row }) =>
			<EditableCell
				value={cell.getValue()}
				row={row.index}
				column={cell.column.id}
				isNumber={false}
			/>
	}
];