import {
	flexRender,
	useReactTable,
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	getSortedRowModel,
	getCoreRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table"
import { useState } from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MixerHorizontalIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"

import { useDataTableContext } from "@/context/DataTableContext"
import { columns } from './columns'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { ScrollArea } from '@/components/ui/scroll-area'


export function DataTable() {
	const { data, addNewRow, removeSelectedRows } = useDataTableContext()

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		title: false
	})
	const [rowSelection, setRowSelection] = useState({})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<Card className="w-[1100px] bg-muted">
			<CardHeader>
				<CardTitle>Введіть точки розрізу</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center py-4">
					<Badge variant="outline" className="h-8 ml-4">
						{table.getFilteredSelectedRowModel().rows.length} з{" "}
						{table.getFilteredRowModel().rows.length} рядків вибрано
					</Badge>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Колонки
								<MixerHorizontalIcon className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter(
									(column) => column.getCanHide()
								)
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant="outline" className="ml-2" onClick={addNewRow}>
						Додати
						<PlusIcon className="ml-2 h-4 w-4" />
					</Button>
					<Button variant="outline" className="ml-2" onClick={() => removeSelectedRows(table.getSelectedRowModel().rowsById)}
						disabled={table.getFilteredSelectedRowModel().rows.length === 0}>
						Видалити
						<TrashIcon className="ml-2 h-4 w-4" />
					</Button>
				</div>
				<div className="rounded-md border">
					<Table>
						<ScrollArea className="h-96 rounded-md border">
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
												</TableHead>
											)
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center">
											Немає даних
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</ScrollArea>
					</Table>
				</div>
			</CardContent>
		</Card>
	)
}