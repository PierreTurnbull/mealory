import { useEffect, useState } from "react";
import { getPlannings, updatePlanning } from "../planning.api";
import { PlanningForm } from "../PlanningForm/PlanningForm";

export const UpdatePlanning = () => {
	const initialPlanning = getPlannings()[0];

	const [planning, setPlanning] = useState(initialPlanning);

	useEffect(() => {
		updatePlanning(planning.id, planning);
	}, [planning]);

	return (
		<div>
			<PlanningForm
				planning={planning}
				setPlanning={setPlanning}
			/>
		</div>
	);
};