import { useEffect, useRef } from 'react';

const useComponentWillMount = (callback) => {
	const willMount = useRef(true);
	if (willMount.current) {
		callback();
	}
	useEffect(() => {
		willMount.current = false;
	}, []);
};

export default useComponentWillMount;
