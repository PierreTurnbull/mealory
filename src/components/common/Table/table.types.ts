import type { ReactNode } from "react";

export type TTableColumn = {
	key:        string
	label:      ReactNode | string
	isSortable: boolean
	width?:     string
}

export type TTableItem = {
	key:   string
	value: string | number | boolean | null
	label: string | ReactNode
}

export type TTableRow = {
	key:         string | number
	items:       TTableItem[]
	isDisabled?: boolean
	isDimmed?:   boolean
}

export type TSortDirection = "asc" | "desc"

export type TSortParameters = {
	sortBy:        string
	sortDirection: TSortDirection
}