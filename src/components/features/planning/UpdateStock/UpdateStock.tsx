import { useEffect, useState } from "react";
import { getPlannings, updatePlanning } from "../planning.api";
import { StockForm } from "../StockForm/StockForm";

export const UpdateStock = () => {
	const initialPlanning = getPlannings()[0];

	const [planning, setPlanning] = useState(initialPlanning);

	useEffect(() => {
		updatePlanning(planning.id, planning);
	}, [planning]);

	return (
		<div>
			<StockForm
				planning={planning}
				setPlanning={setPlanning}
			/>
		</div>
	);
};