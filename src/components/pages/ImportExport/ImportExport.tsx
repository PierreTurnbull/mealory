import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useState } from "react";
import { JSONTree } from "react-json-tree";
import { Button } from "../../common/Button/Button";
import { Page } from "../../common/Page/Page";
import { useConfirmImport } from "./useConfirmImport";
import { useExportData } from "./useExportData";
import { useFormattedDataToImport } from "./useFormattedDataToImport";
import { useImportData } from "./useImportData";

export const ImportExport = () => {
	const [dataToImport, setDataToImport] = useState<null | unknown>(null);

	// Import/Export functions.

	const importData = useImportData(dataToImport => setDataToImport(dataToImport));
	const confirmImport = useConfirmImport(dataToImport);
	const exportData = useExportData();

	// Imported data to render.

	const formattedDataToImport = useFormattedDataToImport(dataToImport);

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