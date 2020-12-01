import React from 'react';
import { PieChart } from '@nokia-csf-uxr/csfWidgets';
import styled from 'styled-components';

import './novlReport.css';

const successIcon = require('../../../assets/images/check-circle.svg');
const failureIcon = require('../../../assets/images/alert-circle.svg');

const SummaryContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 327px;
`;

const SummaryTitleContainer = styled.div`
	height: 54px;
	background: #6a84b6;
`;

const SummaryTitle = styled.div`
	font-size: 24px;
	color: #ffffff;
	padding-left: 15px;
	padding-top: 7px;
`;

const SummaryData = styled.div`
	display: flex;
	background: white;
	justify-content: space-evenly;
`;

const SummaryCell = styled.div`
	width: 100%;
	border-bottom: 2px solid #dbdbdb;
	border-right: 2px solid #dbdbdb;
	text-align: -webkit-center;
`;

const StatusImage = styled.img`
	height: 40px;
`;

const StatusAndLabelContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 28px;
`;

const StatusLabel = styled.div`
	padding-left: 10px;
	font-size: 20px;
`;

const CounterTitle = styled.div`
	font-size: 112px;
	padding-left: 10px;
`;

export const Summary = ({
	summaryTitle,
	totalHostgroupsTitle,
	hostGroupPassedValue,
	hostGroupFailedValue,
	hostGroupFailedTitle,
	hostGroupPassedTitle,
	totalHostGroupFailuresValue,
	totalHostGroupTotalValue
}) => (
	<SummaryContainer>
		<SummaryTitleContainer>
			<SummaryTitle>{summaryTitle}</SummaryTitle>
		</SummaryTitleContainer>

		<SummaryData>
			<SummaryCell id='left-cell'>
				<PieChart
					title={totalHostgroupsTitle}
					width={300}
					height={300}
					data={[
						{
							name: hostGroupFailedTitle,
							value: totalHostGroupFailuresValue,
							fill: '#FF0000'
						},
						{
							name: hostGroupPassedTitle,
							value: totalHostGroupTotalValue - totalHostGroupFailuresValue,
							fill: '#0daf00'
						}
					]}
					dataKey='value'
					nameKey='name'
					valueLabel='Host Groups'
				/>
			</SummaryCell>

			<SummaryCell>
				<StatusAndLabelContainer>
					<StatusImage src={successIcon} />
					<StatusLabel>{hostGroupPassedTitle}</StatusLabel>
				</StatusAndLabelContainer>

				<CounterTitle>{hostGroupPassedValue}</CounterTitle>
			</SummaryCell>

			<SummaryCell>
				<StatusAndLabelContainer>
					<StatusImage src={failureIcon} />
					<StatusLabel>{hostGroupFailedTitle}</StatusLabel>
				</StatusAndLabelContainer>

				<CounterTitle>{hostGroupFailedValue}</CounterTitle>
			</SummaryCell>
		</SummaryData>
	</SummaryContainer>
);
