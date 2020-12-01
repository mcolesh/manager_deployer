import { useEffect, useRef } from 'react';

// The function is called right before the component unmount.
const useUnmount = (fn) => {
	const fnRef = useRef(fn);
	fnRef.current = fn;
	useEffect(
		() => () => {
			if (fnRef.current && typeof fnRef.current === 'function') {
				fnRef.current();
			}
		},
		[]
	);
};

export default useUnmount;
