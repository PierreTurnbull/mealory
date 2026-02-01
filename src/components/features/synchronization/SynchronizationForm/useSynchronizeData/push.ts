import { request } from "@octokit/request";
import { db } from "../../../../../db/db.model";
import type { TNotificationsContextState } from "../../../notification/context/notificationsContextState.type";
import { FILE_NAME, GIST_ID } from "./useSynchronizeData";

export const push = async (
	token: string,
	notificationsContext: TNotificationsContextState,
) => {
	let data = JSON.stringify(db.getAll());
	const parsedData = JSON.parse(data);

	parsedData.mode = import.meta.env.MODE;
	parsedData.updatedAt = db.getItem("updatedAt");
	delete parsedData.githubToken;
	data = JSON.stringify(parsedData);

	await request(`PATCH /gists/${GIST_ID}`, {
		headers: {
			authorization: `token ${token}`,
		},
		description: "Update latest data.",
		files:       {
			[FILE_NAME]: {
				content: data,
			},
		},
	});

	notificationsContext.addNotification("Les données locales sont plus récentes, elles ont été poussées en amont.", "success");
};