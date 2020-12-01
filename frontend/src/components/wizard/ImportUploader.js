import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import {
	requestToImportWizard as requestToImportWizardRef,
	disableReset as disableResetRef,
	resetWizard as resetWizardRef,
	mapFormsFromFile as mapFormsFromFileRef,
	importErrorReceived as importErrorReceivedRef,
	finishedImportingFile as finishedImportingFileRef
} from 'actions/wizard';
import { getNormalizedInitialWizardState } from 'utils/wizard';
import Loader from 'components/Loader';
import { isEmpty, cloneDeep } from 'lodash/fp';
import { BLACK_LIST_FIELD } from 'constants/app-constants';
import { WizardLoaderContainer } from 'components/StyledComponents';

const ImportUploader = (props) => {
	const {
		importRequestEnabled,
		requestToImportWizard,
		resetWizardToggle,
		resetWizardValues,
		validateWizardForms,
		disableReset,
		prerequisites,
		importBlackList,
		name,
		hasInitialPage,
		resetWizard,
		mapFormsFromFile,
		importErrorReceived,
		change,
		importedFileSections,
		finishedImportingFile,
		importWizardToggle
	} = props;
	const [importClicked, setImportClicked] = useState(false);
	const [wizardResetFinished, setWizardResetFinished] = useState(false);
	const [wizardImportFinished, setWizardImportFinished] = useState(false);

	const uploadFileInput = useRef(null);

	const importPayloadFromFile = () => {
		const object = uploadFileInput.current;
		object.click();
	};

	const patchImportedFileToForm = (newValues) => {
		const wizardInitialStateValue = getNormalizedInitialWizardState(newValues, false);
		change('dynamic.content', wizardInitialStateValue);
	};

	useEffect(() => {
		if (importWizardToggle) {
			// get all imported file values, and set the whole form reducer
			patchImportedFileToForm(importedFileSections);
			setWizardImportFinished(true);
		}
	}, [importWizardToggle]);

	useEffect(() => {
		if (wizardImportFinished) {
			validateWizardForms();
			finishedImportingFile(false);
			setWizardImportFinished(false);
		}
	}, [wizardImportFinished]);

	useEffect(() => {
		if (resetWizardToggle) {
			// get all default values, and set the whole form reducer
			resetWizardValues();
			setWizardResetFinished(true);
		}
	}, [resetWizardToggle]);

	useEffect(() => {
		if (wizardResetFinished) {
			if (!importClicked) {
				validateWizardForms();
			}
			disableReset();
			setWizardResetFinished(false);
		}
	}, [wizardResetFinished]);

	const importFile = (file) => {
		try {
			const importedFile = JSON.parse(file.result);
			const importedPrerequisites = cloneDeep(prerequisites);
			let invalidPrerequisites = '';
			Object.keys(prerequisites).forEach((item) => {
				importedPrerequisites[item] = importedFile.prerequisites[item];
				if (!importBlackList.includes(item) && item !== BLACK_LIST_FIELD) {
					if (prerequisites[item] !== importedPrerequisites[item]) {
						invalidPrerequisites += ` \n ⦿ ${item}`;
					}
				}
			});
			if (
				(hasInitialPage && isEmpty(invalidPrerequisites)) ||
				(!hasInitialPage && importedFile.name === name)
			) {
				resetWizard(true);
				mapFormsFromFile(importedFile.content, false, importedPrerequisites);
			} else {
				importErrorReceived(invalidPrerequisites);
			}
		} catch (error) {
			importErrorReceived();
		}
		setImportClicked(false);
	};

	useEffect(() => {
		if (importRequestEnabled) {
			requestToImportWizard(false);
			importPayloadFromFile();
		}
	}, [importRequestEnabled]);

	const handleChange = (file) => {
		if (file) {
			setImportClicked(true);
			const reader = new window.FileReader();
			reader.readAsText(file);
			reader.onloadend = () => {
				importFile(reader);
			};
		}
	};

	return (
		<div>
			{importClicked ? (
				<WizardLoaderContainer>
					<Loader />
				</WizardLoaderContainer>
			) : null}
			<input
				type='file'
				name='file'
				accept='.json'
				hidden
				ref={uploadFileInput}
				data-testid='importUploader'
				onChange={(e) => handleChange(e.target.files[0])}
				onClick={(event) => {
					event.target.value = null;
				}}
			/>
		</div>
	);
};

ImportUploader.propTypes = {
	importRequestEnabled: PropTypes.bool,
	resetWizardToggle: PropTypes.bool,
	requestToImportWizard: PropTypes.func,
	disableReset: PropTypes.func,
	prerequisites: PropTypes.shape({}),
	importBlackList: PropTypes.instanceOf(Array),
	importedFileSections: PropTypes.instanceOf(Array),
	name: PropTypes.string,
	hasInitialPage: PropTypes.bool,
	importWizardToggle: PropTypes.bool,
	resetWizard: PropTypes.func,
	mapFormsFromFile: PropTypes.func,
	importErrorReceived: PropTypes.func,
	resetWizardValues: PropTypes.func,
	validateWizardForms: PropTypes.func,
	change: PropTypes.func,
	finishedImportingFile: PropTypes.func
};

const mapStateToProps = (state) => ({
	importRequestEnabled: state.wizard.importRequestEnabled,
	resetWizardToggle: state.wizard.resetWizardToggle,
	prerequisites: state.prerequisites,
	importBlackList: state.wizard.importBlackList,
	name: state.wizard.name,
	hasInitialPage: state.wizard.hasInitialPage,
	importedFileSections: state.wizard.importedFileSections,
	importWizardToggle: state.wizard.importWizardToggle
});

export default connect(mapStateToProps, {
	requestToImportWizard: requestToImportWizardRef,
	disableReset: disableResetRef,
	resetWizard: resetWizardRef,
	mapFormsFromFile: mapFormsFromFileRef,
	importErrorReceived: importErrorReceivedRef,
	finishedImportingFile: finishedImportingFileRef,
	change: actions.change
})(ImportUploader);
