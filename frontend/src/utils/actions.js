const createAsyncAction = (actionType) => ({
	PENDING: `${actionType}_PENDING`,
	EVENT: `${actionType}_EVENT`,
	SUCCESS: `${actionType}_SUCCESS`,
	FAILURE: `${actionType}_FAILURE`
});
export default createAsyncAction;
