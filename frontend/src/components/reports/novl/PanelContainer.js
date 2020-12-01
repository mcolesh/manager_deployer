import React from 'react';
import styled from 'styled-components';

import { DataGridEnterprise } from '@nokia-csf-uxr/csfWidgets';

const PanelTitle = styled.div`
	display: flex;
	height: 68px;
	padding-top: 24px;
`;

const StatusImage = styled.img`
	height: 35px;
`;

const RowTitle = styled.div`
	flex-grow: 1;
	font-size: 16px;
	padding-top: 8px;
	padding-left: 12px;
`;

const RowTitleStatus = styled.div`
	font-size: 17px;
	color: #ff0000;
	padding-right: 30px;
	padding-top: 6px;
`;

export const PanelContainer = ({
	display,
	src,
	status,
	onGridReady,
	gridOptions,
	rowData,
	id,
	domLayout,
	licenseKey,
	isOpen,
	rowGroupOpened
}) => {
	let result;
	if (isOpen) {
		result = (
			<div>
				<PanelTitle>
					<StatusImage src={src} />
					<RowTitle>{display}</RowTitle>
					<RowTitleStatus>{status}</RowTitleStatus>
				</PanelTitle>

				<DataGridEnterprise
					onGridReady={onGridReady}
					gridOptions={gridOptions}
					rowData={rowData}
					licenseKey={licenseKey}
					id={id}
					domLayout={domLayout}
					rowGroupOpened={rowGroupOpened}
				/>
			</div>
		);
	} else {
		result = (
			<PanelTitle>
				<StatusImage src={src} />
				<RowTitle>{display}</RowTitle>
				<RowTitleStatus>{status}</RowTitleStatus>
			</PanelTitle>
		);
	}
	return result;
};
