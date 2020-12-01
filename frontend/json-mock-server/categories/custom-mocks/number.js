module.exports = {
	number_is_page_dependencies_ready: {
		ready: true,
		message: ''
	},
	number_isActive: {
		active: false
	},
	number_main: {
		name: 'number',
		sections: [
			{
				display: 'Number',
				name: 'number_main',
				subSections: [
					{
						display: 'Number',
						fields: [
							{
								default: 10,
								display: 'Number-1',
								help:
									'Click the +/- buttons to increment/decrement respectively or enter the required value in the input field. field value should be between 10 and 80',
								name: 'number_field1',
								required: true,
								restrictions: {
									min: 10,
									max: 80
								},
								type: 'number'
							},
							{
								display: 'Number-2',
								help:
									'Click the +/- buttons to increment/decrement respectively or enter the required value in the input field. value can be empty',
								name: 'number_field2',
								required: true,
								type: 'number'
							}
						],
						name: 'number1'
					}
				]
			},
			{
				display: 'Execution',
				name: 'number_execution',
				subSections: [
					{
						display: 'Mandatory Fields Completion',
						exclude: [],
						name: 'validation',
						required: true,
						type: 'validation'
					},
					{
						data: ['Create the new host group', 'Save its new parameters'],
						display: 'Add Host Group will',
						name: 'information',
						required: true,
						type: 'information'
					},
					{
						buttons: [
							{
								beforeSend: { confirm: 'Are you sure you want to start the number procedure?' },
								disabled: false,
								onSuccess: { message: 'Procedure Started!' },
								role: 'submit',
								text: 'Execute',
								url: { method: 'POST', url: 'api/number/deploy' }
							}
						],
						name: 'actions',
						showWarning: {
							expectedReturnValue: true,
							message: 'Warning: procedure is already in progress!.',
							url: { extract: 'active', method: 'GET', url: 'api/number/isActive' }
						},
						type: 'actions'
					}
				],
				type: 'deploy'
			},
			{
				display: 'Log',
				name: 'number_log',
				subSections: [
					{ display: 'number logs', name: 'number_log-log', url: { url: 'log/number.log' } }
				],
				type: 'log'
			}
		]
	},
	number_status: {
		status: null
	},
	number_progress: {},
	number_deploy: {
		deployStatus: 'SUCCESS'
	},
	log_size_number: { name: '/var/log/cbis/number.log', size: 24961 },
	log_number: {
		jsonServer: true,
		log: ''
	}
};
