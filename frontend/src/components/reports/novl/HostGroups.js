import React from 'react';
import styled from 'styled-components';
import { getOr } from 'lodash/fp';
import { ExpansionPanel } from '@nokia-csf-uxr/csfWidgets';
import './novlReport.css';
import { AG_GRID_LICENSE } from 'constants/app-constants';
import { PanelContainer } from './PanelContainer';

const successIcon = require('../../../assets/images/check-circle.svg');
const failureIcon = require('../../../assets/images/alert-circle.svg');

const ClusterContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: 38px;
`;

const Title = styled.div`
	font-size: 24px;
`;

const Subtitle = styled.div`
	padding-top: 18px;
	font-size: 18px;
`;

export const HostGroups = ({
	title,
	failedTitle,
	passedTitle,
	failedRows = [],
	passedRows = []
}) => {
	const rowParsed = (dataColRows) => {
		const data = [];
		const columns = getOr([], 'columns', dataColRows);
		const rows = getOr([], 'rows', dataColRows);

		rows.forEach((row) => {
			const item = {};

			columns.forEach((col, idx) => {
				item[col.toLowerCase()] = row[idx];
			});

			data.push(item);
		});
		return data;
	};

	const StatusCellRenderer = ({ value }) => {
		if (value) {
			return <img src={value === 'passed' ? successIcon : failureIcon} alt='' />;
		}
		return '';
	};

	const onGridReady = (params) => {
		this.gridColumnApi = params.value.columnApi;
		this.gridColumnApi.autoSizeAllColumns();
	};

	const rowGroupOpened = (params) => {
		this.gridColumnApi.autoSizeAllColumns();
	};

	const gridOptions = (rows) => {
		const columns = getOr([], 'columns', rows);

		let columnDefs = [];

		if (columns.length) {
			columnDefs.push({
				headerName: '',
				field: columns[columns.length - 1].toLowerCase(),
				cellRendererFramework: StatusCellRenderer,
				width: 80,
				rowGroup: false
			});
		}

		columns.forEach((col) => {
			columnDefs.push({
				headerName: col,
				rowGroup: col === 'Compute',
				field: col.toLowerCase(),
				sort: col.toLowerCase() === 'result' ? 'asc' : null
			});
		});

		return {
			columnDefs,
			animateRows: true
		};
	};

	return (
		<ClusterContainer>
			<Title>{title}</Title>

			{/* Fail */}

			{failedRows.length > 0 && <Subtitle>{failedTitle}</Subtitle>}

			{failedRows.map((failedRow) => (
				<ExpansionPanel width='100%' height={82} showExpansionGap={true} key={failedRow.display}>
					<PanelContainer
						src={failureIcon}
						display={failedRow.display}
						status={failedRow.status}
						onGridReady={onGridReady}
						rowGroupOpened={rowGroupOpened}
						gridOptions={gridOptions(failedRow)}
						rowData={rowParsed(failedRow)}
						licenseKey={AG_GRID_LICENSE}
						id='failed-datagrid'
						domLayout='autoHeight'
					/>
				</ExpansionPanel>
			))}

			{/* Success */}
			{passedRows.length > 0 && <Subtitle>{passedTitle}</Subtitle>}

			{passedRows.map((passedRow) => (
				<ExpansionPanel width='100%' height={82} showExpansionGap={true} key={passedRow.display}>
					<PanelContainer
						src={successIcon}
						display={passedRow.display}
						status={passedRow.status}
						onGridReady={onGridReady}
						rowGroupOpened={rowGroupOpened}
						gridOptions={gridOptions(passedRow)}
						rowData={rowParsed(passedRow)}
						licenseKey={AG_GRID_LICENSE}
						id='failed-datagrid'
						domLayout='autoHeight'
					/>
				</ExpansionPanel>
			))}
		</ClusterContainer>
	);
};
