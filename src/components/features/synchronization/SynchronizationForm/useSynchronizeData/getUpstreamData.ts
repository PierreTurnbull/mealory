import { request } from "@octokit/request";
import { FILE_NAME, GIST_ID } from "./useSynchronizeData";

export const getUpstreamData = async (
	token: string,
) => {
	const gist = await request(`GET /gists/${GIST_ID}`, {
		headers: {
			authorization: `token ${token}`,
		},
	});
	const upstreamData = await (await fetch(gist.data.files[FILE_NAME].raw_url)).json();

	return upstreamData;
};