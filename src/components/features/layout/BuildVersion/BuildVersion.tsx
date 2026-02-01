export const BuildVersion = () => {
	return (
		<p className="p-1 text-xs text-violet-300">Version : {import.meta.env.VITE_VERSION}</p>
	);
};