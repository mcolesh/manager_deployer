import { useEffect } from 'react';
import usePersistFn from './usePersistFn';

// The function is called right after the component mount.
const useMount = (fn) => {
	const fnPersist = usePersistFn(fn);
	useEffect(() => {
		if (fnPersist && typeof fnPersist === 'function') {
			fnPersist();
		}
	}, []);
};

export default useMount;
