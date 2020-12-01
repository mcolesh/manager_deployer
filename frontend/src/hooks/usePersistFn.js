import { useCallback, useRef } from 'react';

// IF you need to memoize a callback with useCallback
// With usePersistFn, you can guarantee that the function reference will never change
function usePersistFn(fn) {
	const ref = useRef(() => {
		throw new Error('Cannot call function while rendering.');
	});
	ref.current = fn;
	const persistFn = useCallback((...args) => ref.current(...args), [ref]);
	return persistFn;
}

export default usePersistFn;
