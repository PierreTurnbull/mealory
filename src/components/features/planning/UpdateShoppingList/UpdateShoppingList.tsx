import { useEffect, useState } from "react";
import { getPlannings, updatePlanning } from "../planning.api";
import { ShoppingListForm } from "../ShoppingListForm/ShoppingListForm";

export const UpdateShoppingList = () => {
	const initialPlanning = getPlannings()[0];

	const [planning, setPlanning] = useState(initialPlanning);

	useEffect(() => {
		updatePlanning(planning.id, planning);
	}, [planning]);

	return (
		<div>
			<ShoppingListForm
				planning={planning}
				setPlanning={setPlanning}
			/>
		</div>
	);
};