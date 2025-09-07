import { useEffect } from "react";
import { useIsMounted } from "../useIsMounted/useIsMounted";

/**
 * Executes the callback once on component mount.
 */
export const useOnMount = (callback: () => void) => {
	const isMounted = useIsMounted();

	useEffect(() => {
		if (!isMounted) {
			callback();
		}
	}, [isMounted, callback]);
};