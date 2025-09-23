import type { TFormData } from "../../../../types/form/formData.types";

export type TPlanningRowDataType = "dish" | "meal"

export type TPlanningRowData = {
	id:               string
	name:             string
	portionsFormData: TFormData<string>
	type:             TPlanningRowDataType
	onRemove:         () => void
}