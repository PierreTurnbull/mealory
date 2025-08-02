export type TTableColumn = {
	key:   string
	label: string
}

export type TTableItem = {
	key:   string
	value: string
	label: string
}

export type TTableRow = {
	key:   string | number
	items: TTableItem[]
}