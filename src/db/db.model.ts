class Db {
	static #instance: Db;

	private constructor() { }

	public static get instance(): Db {
		if (!Db.#instance) {
			Db.#instance = new Db();
		}

		return Db.#instance;
	}

	getItem(key: string) {
		return localStorage.getItem(key);
	}

	setItem(key: string, value: string, options?: { mustBypassUpdatedAt: boolean }) {
		const prevValue = localStorage.getItem(key);
		const isDifferent = JSON.stringify(prevValue) !== JSON.stringify(value);

		if (!isDifferent) {
			return;
		}

		localStorage.setItem(key, value);

		if (!["githubToken", "dbVersion", "updatedAt"].includes(key) && !options?.mustBypassUpdatedAt) {
			localStorage.updatedAt = new Date().toISOString();
		}
	}

	removeItem(key: string) {
		localStorage.removeItem(key);
	}

	getAll() {
		return { ...localStorage };
	}

	clear() {
		localStorage.clear();
	}
}

export const db = Db.instance;