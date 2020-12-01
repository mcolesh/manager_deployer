module.exports = {
	manage_multi_is_page_dependencies_ready: { message: '', ready: true },
	manage_multi_main: {
		description: 'Manage Multi CBIS',
		display: 'Manage Remote Nodes',
		name: 'manage_multi',
		sections: [
			{
				display: 'Multi CBIS management',
				name: 'multi_vims',
				subSections: [
					{
						display: 'Multi CBIS management',
						fields: [
							{
								columns: [
									{
										display: 'Unique Node Name',
										help: 'You may use letters, numbers, and underscore only',
										name: 'name',
										required: true,
										type: 'text',
										validation: '^[A-Za-z0-9_]+$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'CBIS-Manager IP',
										help: 'CBIS-Manager IP',
										name: 'ip',
										required: true,
										type: 'ip'
									},
									{
										display: 'CBIS-Manager username',
										name: 'username',
										required: true,
										type: 'text',
										validation: '^[A-Za-z0-9:.,/_-]*$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'CBIS-Manager password',
										name: 'password',
										required: true,
										type: 'password',
										validation: '^[A-Za-z0-9$%#@!^&*?.()=+~{}/|_-]+$',
										validationDescription:
											"Only alphabet, numeric, '!', '@', '#', '$', '%', '^', '&', '*', '_', '?', '.', '(', ')', '=', '+', '~', '{', '}', '/', '|' and '-' are allowed "
									}
								],
								default: [
									{
										ip: '0.0.0.11',
										name: 'Hanoi1',
										password: 'password',
										username: 'cbis-admin'
									}
								],
								display: 'Clusters to manage',
								editItemDisplay: 'Edit cluster',
								emptyGridDisplay: 'No clusters to manage, click the + button to add new cluster',
								help:
									'Remote clusters to manage.\nIn order to add new cluster click the + button and provide the CBIS manager details.',
								name: 'manage_multi_details',
								newItemDisplay: 'Add new cluster',
								operations: { Add: true, Delete: true, Edit: true },
								type: 'grid'
							}
						],
						name: 'manage_multi'
					}
				]
			},
			{
				display: 'Deploy',
				name: 'Manage_Multi_execution',
				subSections: [
					{
						display: 'Mandatory Fields Completion',
						exclude: [],
						name: 'validation',
						type: 'validation'
					},
					{
						buttons: [
							{
								beforeSend: { confirm: 'Are you sure you want start this procedure?' },
								disabled: 'hasErrors',
								display: 'Deploy',
								onSuccess: { message: 'Procedure Started!' },
								role: 'submit',
								url: { method: 'POST', url: 'api/manage_multi/deploy' }
							}
						],
						name: 'actions',
						showWarning: {
							expectedReturnValue: true,
							message: 'Warning: Procedure is already in progress!.',
							url: { extract: 'active', method: 'GET', url: 'api/manage_multi/isActive' }
						},
						type: 'actions'
					}
				],
				type: 'deploy'
			},
			{
				display: 'Log',
				name: 'manage_multi_log',
				subSections: [
					{
						display: 'Manage multi VIM logs',
						name: 'manage_multi_log-log',
						url: { url: 'log/manage_multi.log' }
					}
				],
				type: 'log'
			}
		]
	},
	manage_multi_status: { status: null },
	manage_multi_progress: {},
	manage_multi_isActive: { active: false },
	manage_multi_deploy: { deployStatus: 'SUCCESS' },
	log_manage_multi: {
		jsonServer: true,
		log:
			'2020-07-20 09:25:38,884 - ManageMultiVimFlow - INFO - pre deploy validation passed successfully\n' +
			'2020-07-20 09:25:38,958 - ManageMultiVimFlow - DEBUG - sending task to cbis conductor. task id is 6715f978-2d2e-4752-8a10-da3457714a2d \n' +
			"2020-07-20 09:25:38,958 - ManageMultiVimFlow - DEBUG - Saving file manage_multi.json to collection page_data: {u'content': {u'multi_vims': {u'manage_multi': {u'manage_multi_details': [{u'username': u'cbis-admin', u'ip': u'10.75.13.130', u'password':  ********** u'name': u'PL147', u'action': u'deleted'}, {u'username': u'cbis-admin', u'name': u'Hanoi1', u'ip': u'10.75.13.11', u'originRow': {u'username': u'cbis-admin', u'ip': u'10.75.13.11', u'password':  ********** u'name': u'Hanoi'}, u'action': u'modified', u'password':  **********\n"
	},
	log_size_manage_multi: { name: '/var/log/cbis/manage_multi.log', size: 12657 }
};
