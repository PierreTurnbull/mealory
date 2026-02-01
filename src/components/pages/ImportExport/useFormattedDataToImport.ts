import { useMemo } from "react";

export const useFormattedDataToImport = (
	dataToImport: unknown,
) => {
	const formattedDataToImport = useMemo(() => {
		const formattedDataToImport = structuredClone(dataToImport);

		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
		for (const key in formattedDataToImport as any) {
			try {
				// Check whether the data is parsable.
				/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
				JSON.parse((formattedDataToImport as any)[key]);
			} catch (_) {
				continue;
			}

			/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
			;(formattedDataToImport as any)[key as any] = JSON.parse((formattedDataToImport as any)[key as any]);
		}

		return formattedDataToImport;
	}, [dataToImport]);

	return formattedDataToImport;
};