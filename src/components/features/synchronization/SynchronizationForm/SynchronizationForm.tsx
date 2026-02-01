import SyncIcon from "@mui/icons-material/Sync";
import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../../../../db/db.model";
import { Button } from "../../../common/Button/Button";
import { useSynchronizeData } from "./useSynchronizeData/useSynchronizeData";

export const SynchronizationForm = () => {
	const [isSynchronizing, setIsSynchronizing] = useState(false);
	const [githubToken, setGithubToken] = useState(db.getItem("githubToken") || "");

	const synchronizeData = useSynchronizeData(isSynchronizing => setIsSynchronizing(isSynchronizing), githubToken);

	useEffect(() => {
		db.setItem("githubToken", githubToken);
	}, [githubToken]);

	return (
		<div className="flex flex-col gap-2">
			<Input
				value={githubToken}
				onChange={event => setGithubToken(event.target.value)}
				fullWidth
			/>
			<Button
				onClick={synchronizeData}
				isDisabled={!githubToken}
				isLoading={isSynchronizing}
			>
				Synchroniser <SyncIcon fontSize="small" />
			</Button>
		</div>
	);
};