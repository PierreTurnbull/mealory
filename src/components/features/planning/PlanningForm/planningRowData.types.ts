import type { TFormData } from "../../../../types/form/formData.types";

export type TPlanningRowData = {
	id:               string
	name:             string
	portionsFormData: TFormData<string>
	onRemove:         () => void
}