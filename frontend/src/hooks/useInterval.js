import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
	const savedCallback = useRef();
	savedCallback.current = callback;

	// Set up the interval.
	useEffect(() => {
		if (delay === undefined || delay === null) {
			return;
		}
		const timer = setInterval(() => {
			savedCallback.current();
		}, delay);
		// eslint-disable-next-line consistent-return
		return () => {
			clearInterval(timer);
		};
	}, [delay]);
}

export default useInterval;
