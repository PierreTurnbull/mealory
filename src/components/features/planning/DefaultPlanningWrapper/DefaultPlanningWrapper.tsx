import { useEffect, useState, type ReactNode } from "react";
import { createPlanning, getPlannings } from "../planning.api";
import type { TPlanning } from "../planning.types";
import { getDefaultPlanning } from "../utils/getDefaultPlanning/getDefaultPlanning";

type TDefaultPlanningWrapperProps = {
	children: ReactNode
}

export const DefaultPlanningWrapper = ({
	children,
}: TDefaultPlanningWrapperProps) => {
	const plannings = getPlannings();
	const [planning, setPlanning] = useState<TPlanning | undefined>(plannings[0]);

	useEffect(() => {
		if (!planning) {
			const createdPlanning = createPlanning(getDefaultPlanning());

			setPlanning(createdPlanning);
		}
	}, [planning]);

	return planning ? children : null;
};