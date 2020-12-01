import { getOr } from 'lodash/fp';

export const getBrowserInfo = () => {
	return {
		screenWidth: getOr('', 'screen.width', window),
		screenHeight: getOr('', 'screen.height', window),
		navigatorLanguage: getOr('', 'navigator.language', window),
		mediaType: getOr('', 'styleMedia.type', window),
		deviceMemory: getOr('', 'navigator.deviceMemory', window),
		hardwareConcurrency: getOr('', 'navigator.hardwareConcurrency', window),
		effectiveType: getOr('', 'navigator.connection.effectiveType', window)
	};
};
