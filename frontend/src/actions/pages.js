import * as AT from 'constants/action-types';

export const fetchPages = () => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: '/api/pages',
			nextActionType: AT.FETCH_PAGES
		}
	};
};

export const fetchPagesStatus = () => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: '/api/pages_status',
			nextActionType: AT.FETCH_PAGES_STATUS
		}
	};
};

export const onSuccessfullyDeployed = (wizardName) => ({
	type: AT.SUCCESSFUL_DEPLOYMENT,
	payload: { wizardName }
});

export const clearWizardAfterDeployment = () => ({
	type: AT.CLEAR_WIZARD_AFTER_DEPLOYMENT,
	payload: {}
});

export const storeSelectedCategory = (categoryIndex) => {
	return {
		type: AT.STORE_CATEGORY_INDEX,
		payload: { categoryIndex }
	};
};

export const toggleExampleCategories = () => ({
	type: AT.TOGGLE_EXAMPLE_CATEGORIES,
	payload: {}
});

export const hidePagesErrorDialog = () => ({
	type: AT.HIDE_PAGES_ERROR_DIALOG,
	payload: {}
});
