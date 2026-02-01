import { createTokenAuth } from "@octokit/auth-token";

export const getToken = async (
	githubToken: string,
) => {
	const auth = createTokenAuth(githubToken);
	const { token } = await auth();

	return token;
};