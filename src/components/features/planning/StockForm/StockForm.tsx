import { useState } from "react";
import { Table } from "../../../common/Table/Table";
import type { TSortParameters } from "../../../common/Table/table.types";
import type { TPlanning } from "../planning.types";
import { useOnStockChange } from "./useOnStockChange";
import { useResetMaxIngredientInStock } from "./useResetMaxIngredientInStock";
import { useSetMaxIngredientInStock } from "./useSetMaxIngredientInStock";
import { useStockColumns } from "./useStockColumns";
import { useStockFormData } from "./useStockFormData";
import { useStockRows } from "./useStockRows";
import { useSyncStockFormDataAndStock } from "./useSyncStockFormDataAndStock";

type TStockFormProps<T> = {
	planning:    T
	setPlanning: React.Dispatch<React.SetStateAction<T>>
}

export const StockForm = <T extends TPlanning | Omit<TPlanning, "id">>({
	planning,
	setPlanning,
}: TStockFormProps<T>) => {
	const [stockFormData, setStockFormData] = useStockFormData(planning);

	const onStockChange = useOnStockChange(setStockFormData);
	const setMaxIngredientInStock = useSetMaxIngredientInStock(setStockFormData);
	const resetMaxIngredientInStock = useResetMaxIngredientInStock(setStockFormData);

	useSyncStockFormDataAndStock(stockFormData, setPlanning);

	const [sortParameters, setSortParameters] = useState<TSortParameters | null>({
		sortBy:        "name",
		sortDirection: "asc",
	});

	const recipeColumns = useStockColumns();
	const recipeRows = useStockRows(
		planning.recipes,
		stockFormData,
		onStockChange,
		setMaxIngredientInStock,
		resetMaxIngredientInStock,
	);

	return (
		<div className="space-y-4">
			<Table
				fullWidth
				columns={recipeColumns}
				rows={recipeRows}
				sortParameters={sortParameters}
				onSort={setSortParameters}
			/>
		</div>
	);
};