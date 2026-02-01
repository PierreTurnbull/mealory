import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useMemo, useState } from "react";
import { JSONTree } from "react-json-tree";
import { Button } from "../../common/Button/Button";
import { Page } from "../../common/Page/Page";
import { useNotificationsContext } from "../../features/notification/context/useNotificationsContext";

export const ImportExport = () => {
	const notificationsContext = useNotificationsContext();

	const [dataToImport, setDataToImport] = useState<null | unknown>(null);

	const importData = async () => {
		const clipboardItems = await navigator.clipboard.read();

		let blob: Blob;

		try {
			blob = await clipboardItems[0].getType("text/plain");
		} catch (error) {
			console.error(error);
			notificationsContext.addNotification("Impossible de récupérer les données depuis le presse-papiers.", "error");
			return;
		}

		const clipboardText = await blob.text();

		let dataToImport: unknown = null;

		try {
			dataToImport = JSON.parse(clipboardText);
		} catch (error) {
			console.error(error);
			notificationsContext.addNotification("Impossible d'importer les données : format invalide.", "error");
			return;
		}

		if (typeof dataToImport !== "object" || dataToImport === null || !("mode" in dataToImport)) {
			notificationsContext.addNotification("Impossible d'importer les données : format invalide.", "error");
			return;
		}

		if ((dataToImport.mode !== import.meta.env.MODE)) {
			notificationsContext.addNotification(`Impossible d'importer les données : les données importées sont en mode ${dataToImport.mode}, mais l'app est en mode ${import.meta.env.MODE}.`, "error");
			return;
		}

		if (!("dbVersion" in dataToImport)) {
			notificationsContext.addNotification("Impossible d'importer les données : version de db manquante.", "error");
			return;
		}

		if (dataToImport.dbVersion !== localStorage.dbVersion) {
			notificationsContext.addNotification(`Impossible d'importer les données : les données importées sont en version ${dataToImport.dbVersion}, mais la db est en version ${localStorage.dbVersion}.`, "error");
			return;
		}

		setDataToImport(dataToImport);
	};

	const confirmImport = () => {
		if (typeof dataToImport !== "object" || dataToImport === null) {
			return;
		}

		localStorage.clear();

		if ("dbVersion" in dataToImport) {
			localStorage.setItem("dbVersion", dataToImport["dbVersion"] as string);
		}
		if ("defaultPortions" in dataToImport) {
			localStorage.setItem("defaultPortions", dataToImport["defaultPortions"] as string);
		}
		if ("ingredients" in dataToImport) {
			localStorage.setItem("ingredients", dataToImport["ingredients"] as string);
		}
		if ("plannings" in dataToImport) {
			localStorage.setItem("plannings", dataToImport["plannings"] as string);
		}
		if ("recipes" in dataToImport) {
			localStorage.setItem("recipes", dataToImport["recipes"] as string);
		}

		notificationsContext.addNotification("Les données ont été importées.", "success");
	};

	const exportData = async () => {
		let data = JSON.stringify(localStorage);
		const parsedData = JSON.parse(data);

		parsedData.mode = import.meta.env.MODE;
		data = JSON.stringify(parsedData);

		await navigator.clipboard.writeText(data);

		notificationsContext.addNotification("Données exportées dans le presse-papier.", "success");
	};

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

	return (
		<Page
			title="Import/export"
		>
			<div className="flex gap-2">
				<Button
					onClick={importData}
				>
					Importer <ContentPasteIcon fontSize="small" />
				</Button>
				<Button
					onClick={exportData}
				>
					Exporter <ContentCopyIcon fontSize="small" />
				</Button>
			</div>
			{
				formattedDataToImport
					? (
						<div className="flex flex-col gap-2">
							<JSONTree data={formattedDataToImport} />
							<Button
								onClick={confirmImport}
							>
								Confirmer l'import
							</Button>
						</div>
					) : null
			}
		</Page>
	);
};