import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { createPlanning, getPlannings } from "../planning.api";
import type { TPlanning } from "../planning.types";
import { getDefaultPlanning } from "../utils/getDefaultPlanning/getDefaultPlanning";

export const DefaultPlanningWrapper = () => {
	const plannings = getPlannings();
	const [planning, setPlanning] = useState<TPlanning | undefined>(plannings[0]);

	useEffect(() => {
		if (!planning) {
			const createdPlanning = createPlanning(getDefaultPlanning());

			setPlanning(createdPlanning);
		}
	}, [planning]);

	return planning ? <Outlet /> : null;
};