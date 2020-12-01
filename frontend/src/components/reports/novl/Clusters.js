import React from 'react';
import styled from 'styled-components';
import { DataGrid } from '@nokia-csf-uxr/csfWidgets';

import './novlReport.css';

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

export const Clusters = ({ title, columns = [], rows = [] }) => {
	const gridOptions = () => {
		const columnDefs = [
			{
				headerName: '',
				field: columns.length ? columns[columns.length - 1].toLowerCase() : '',
				cellRendererFramework: StatusCellRenderer,
				width: 40
			}
		];

		columns.forEach((col) => {
			columnDefs.push({ headerName: col, field: col.toLowerCase() });
		});

		return { columnDefs };
	};

	const rowData = () => {
		const data = [];

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
		return <img src={value === 'passed' ? successIcon : failureIcon} alt='' />;
	};

	const onGridReady = (params) => {
		this.api = params.value.api;
		this.api.sizeColumnsToFit();
	};

	return (
		<ClusterContainer>
			<Title>{title}</Title>

			<DataGrid
				onGridReady={onGridReady}
				gridOptions={gridOptions()}
				rowData={rowData()}
				domLayout='autoHeight'
			/>
		</ClusterContainer>
	);
};
