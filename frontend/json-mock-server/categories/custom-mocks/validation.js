module.exports = {
	validation_is_page_dependencies_ready: {
		ready: true,
		message: ''
	},
	validation_isActive: {
		active: false
	},
	validation_main: {
		display: 'Validation',
		name: 'validation',
		sections: [
			{
				display: 'Collapsed Section',
				name: 'collapsed_section',
				subSections: [
					{
						display: 'test field sub',
						name: 'text_field_sub',
						initialCollapse: true,
						fields: [
							{
								default: 'text',
								required: true,
								display: 'text',
								name: 'text_field',
								type: 'text'
							}
						]
					},
					{
						display: 'select field sub',
						name: 'select_field_sub',
						initialCollapse: true,
						fields: [
							{
								default: 'option1',
								display: 'select',
								name: 'select_field',
								required: true,
								type: 'select',
								values: ['option1', 'option2']
							}
						]
					},
					{
						display: 'multiple select field sub',
						name: 'multi_select_field_sub',
						initialCollapse: true,
						fields: [
							{
								default: ['option1', 'option2'],
								display: 'multi select',
								name: 'multi_select_field',
								multiple: true,
								required: true,
								type: 'select',
								values: ['option1', 'option2']
							}
						]
					},
					{
						display: 'number field sub',
						name: 'number_field_sub',
						initialCollapse: true,
						fields: [
							{
								default: 2,
								display: 'number',
								name: 'number_field',
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							}
						]
					},
					{
						display: 'list field sub',
						name: 'list_field_sub',
						initialCollapse: true,
						fields: [
							{
								default: ['item'],
								display: 'list',
								name: 'list_field',
								required: true,
								type: 'host-list',
								validation: '^[A-Za-z0-9/]*$'
							}
						]
					}
				]
			},
			{
				display: 'ShowIf section',
				name: 'showIf_section',
				subSections: [
					{
						display: 'showIf subsection',
						name: 'showIf_subsection',
						fields: [
							{
								default: false,
								display: 'bool ancestor',
								name: 'bool_ancestor',
								type: 'boolean'
							},
							{
								default: false,
								display: 'bool parent',
								name: 'bool_parent',
								type: 'boolean',
								showIf: {
									parentName: 'bool_ancestor',
									parentValue: true
								}
							},
							{
								default: '',
								required: true,
								display: 'text',
								name: 'text_field_child_of_ancestor',
								type: 'text',
								showIf: {
									parentName: 'bool_ancestor',
									parentValue: true
								}
							},
							{
								default: '',
								display: 'select',
								name: 'select_field_child_of_ancestor',
								required: true,
								type: 'select',
								values: ['option1', 'option2'],
								showIf: {
									parentName: 'bool_ancestor',
									parentValue: true
								}
							},
							{
								default: '',
								display: 'multi select',
								name: 'multi_select_field_child_of_ancestor',
								multiple: true,
								required: true,
								type: 'select',
								values: ['option1', 'option2'],
								showIf: {
									parentName: 'bool_ancestor',
									parentValue: true
								}
							},
							{
								display: 'number',
								name: 'number_field_child_of_ancestor',
								required: true,
								restrictions: { min: 0 },
								type: 'number',
								showIf: {
									parentName: 'bool_ancestor',
									parentValue: true
								}
							},
							{
								display: 'list',
								name: 'list_field_child_of_ancestor',
								required: true,
								type: 'host-list',
								validation: '^[A-Za-z0-9/]*$',
								showIf: {
									parentName: 'bool_ancestor',
									parentValue: true
								}
							},
							{
								default: '',
								required: true,
								display: 'text',
								name: 'text_field_child_of_parent',
								type: 'text',
								showIf: {
									parentName: 'bool_parent',
									parentValue: true
								}
							},
							{
								default: '',
								display: 'select',
								name: 'select_field_child_of_parent',
								required: true,
								type: 'select',
								values: ['option1', 'option2'],
								showIf: {
									parentName: 'bool_parent',
									parentValue: true
								}
							},
							{
								default: '',
								display: 'multi select',
								name: 'multi_select_field_child_of_parent',
								multiple: true,
								required: true,
								type: 'select',
								values: ['option1', 'option2'],
								showIf: {
									parentName: 'bool_parent',
									parentValue: true
								}
							},
							{
								display: 'number',
								name: 'number_field_child_of_parent',
								required: true,
								restrictions: { min: 0 },
								type: 'number',
								showIf: {
									parentName: 'bool_parent',
									parentValue: true
								}
							},
							{
								display: 'list',
								name: 'list_field_child_of_parent',
								required: true,
								type: 'host-list',
								validation: '^[A-Za-z0-9/]*$',
								showIf: {
									parentName: 'bool_parent',
									parentValue: true
								}
							}
						]
					}
				]
			},
			{
				display: 'Deploy',
				name: 'deploy',
				subSections: [
					{
						display: 'Fields Completion',
						exclude: [],
						name: 'validation',
						type: 'validation'
					},
					{
						buttons: [
							{
								beforeSend: {
									confirm:
										'Please note that when you start a new deployment it will override the existing one.  Are you sure you want to continue?'
								},
								disabled: 'hasErrors',
								onSuccess: { message: 'Deployment Started!' },
								role: 'submit',
								text: 'Deploy',
								url: { method: 'POST', url: 'api/cluster_bm_installation/deploy' }
							}
						],
						name: 'actions',
						showWarning: {
							expectedReturnValue: true,
							message:
								'Warning: Installation is already running, a new deployment will override the existing one.',
							url: { extract: 'active', method: 'GET', url: 'api/cluster_bm_installation/isActive' }
						},
						type: 'actions'
					}
				],
				type: 'deploy'
			},
			{
				display: 'Log',
				name: 'installation-log',
				subSections: [
					{
						display: 'Container Manager Installation Logs',
						name: 'installation-log',
						url: { url: '/log/cluster_bm_installation.log' }
					}
				],
				type: 'log'
			}
		]
	},
	validation_status: {
		status: null
	},
	validation_progress: {},
	validation_deploy: {
		deployStatus: 'SUCCESS'
	},
	log_size_validation: { name: '/var/log/cbis/log_validation.log', size: 24961 },
	log_validation: {
		jsonServer: true,
		log: ''
	}
};
