module.exports = {
	patch_management_is_page_dependencies_ready: {
		message: '',
		ready: true
	},
	patch_management_main: {
		description: 'Manage Patches',
		display: 'Patch Management',
		name: 'patch_management',
		sections: [
			{
				display: 'Patch Management',
				name: 'patch_management',
				subSections: [
					{
						display: 'Patch Management',
						fields: [
							{
								columns: [
									{
										display: 'Patch name',
										name: 'patch_name',
										type: 'text',
										validation: '^[A-Za-z0-9^._-]+$'
									},
									{
										display: 'Patch description',
										name: 'patch_description',
										type: 'text',
										validation: '^[A-Za-z0-9^._-]+$'
									},
									{
										display: 'Installation date',
										name: 'installation_date',
										type: 'date',
										validation: '^[A-Za-z0-9^._-]+$'
									}
								],
								default: [
									{
										installation_date: '2020-01-23 09:43:31',
										patch_description: 'CBIS 1.1.1 Service Package 1',
										patch_name: 'CBIS-1.1.1-SP1'
									}
								],
								display: 'Installed patches',
								emptyGridDisplay: 'No patches installed',
								name: 'patches_table',
								operations: {
									Add: false,
									Delete: false,
									Edit: false
								},
								type: 'grid'
							},
							{
								default: 'Rollback a patch',
								display: 'Patch management tasks',
								name: 'task',
								required: true,
								type: 'select',
								values: ['Install new patch', 'Rollback a patch']
							},
							{
								display: 'Undercloud physical server cbis-admin password',
								help:
									'Password for cbis-admin SSH access to the Undercloud physical server, (this should be provided if the patch requires it) ',
								name: 'hypervisor_password',
								required: false,
								showIf: {
									parentName: 'task',
									parentValue: ['Install new patch', 'Rollback a patch']
								},
								type: 'password',
								validation: '^[A-Za-z0-9$%#@!^&*?.()=+~{}/|_-]+$'
							}
						],
						name: 'patch_management_options'
					},
					{
						display: 'New patch information',
						fields: [
							{
								default: 'Browse from computer',
								display: 'Select how to provide the patch',
								help: 'Path on the Undercloud physical server or browse from computer ',
								name: 'upload_way',
								required: true,
								showIf: {
									parentName: 'task',
									parentValue: 'Install new patch'
								},
								type: 'select',
								values: ['Browse from computer', 'Full path']
							},
							{
								accept: '.tar.gz',
								display: 'Upload patch',
								maxFileSizeAllowed: 50000000,
								name: 'patch',
								required: true,
								showIf: {
									parentName: 'upload_way',
									parentValue: 'Browse from computer'
								},
								type: 'file_upload',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*$'
							},
							{
								accept: '.tar.gz.sha1',
								display: 'Upload patch sha1',
								maxFileSizeAllowed: 100,
								name: 'patch_sha1',
								required: true,
								showIf: {
									parentName: 'upload_way',
									parentValue: 'Browse from computer'
								},
								type: 'file_upload',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*$'
							},
							{
								display: 'Patch full path',
								help: 'Full path on the Undercloud physical server',
								name: 'patch_path',
								required: true,
								showIf: {
									parentName: 'upload_way',
									parentValue: 'Full path'
								},
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*$'
							},
							{
								display: 'Patch sha1 full path',
								help: 'Full path on the Undercloud physical server',
								name: 'patch_sha1_path',
								required: true,
								showIf: {
									parentName: 'upload_way',
									parentValue: 'Full path'
								},
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*$'
							},
							{
								display: 'Reinstall Patch',
								help:
									'If the patch is already installed, enable this flag in order to reinstall it',
								name: 'reinstall',
								required: true,
								showIf: {
									parentName: 'task',
									parentValue: 'Install new patch'
								},
								type: 'boolean'
							}
						],
						name: 'install_patch',
						showIf: {
							parentName: 'task',
							parentValue: 'Install new patch'
						}
					},
					{
						display: 'Patch information',
						fields: [
							{
								default: 'CBIS-1.1.1-SP1',
								display: 'Patch to rollback',
								help: 'Select the patch which you want to rollback',
								name: 'patch_name',
								required: true,
								showIf: {
									parentName: 'task',
									parentValue: 'Rollback a patch'
								},
								type: 'select',
								values: ['CBIS-1.1.1-SP1']
							},
							{
								display: 'Rollback again patch',
								help:
									'If the patch was already rolled back, enable this flag in order to rollback the patch again',
								name: 'rollback_again',
								required: true,
								showIf: {
									parentName: 'task',
									parentValue: 'Rollback a patch'
								},
								type: 'boolean'
							}
						],
						name: 'rollback_patch',
						showIf: {
							parentName: 'task',
							parentValue: 'Rollback a patch'
						}
					}
				]
			},
			{
				display: 'Execution',
				name: 'patch_management_execution',
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
								beforeSend: {
									confirm: 'Are you sure you want start this procedure?'
								},
								disabled: false,
								onSuccess: {
									message: 'Procedure Started!'
								},
								role: 'submit',
								text: 'Execute',
								url: {
									method: 'POST',
									url: 'api/patch_management/deploy'
								}
							}
						],
						name: 'actions',
						showWarning: {
							expectedReturnValue: true,
							message: 'Warning: Procedure is already in progress!.',
							url: {
								extract: 'active',
								method: 'GET',
								url: 'api/patch_management/isActive'
							}
						},
						type: 'actions'
					}
				],
				type: 'deploy'
			},
			{
				display: 'Log',
				name: 'patch_management_log',
				subSections: [
					{
						display: 'Patch management logs',
						name: 'patch_management_log-log',
						url: {
							url: 'log/patch_management.log'
						}
					}
				],
				type: 'log'
			}
		]
	},
	patch_management_status: {
		status: null
	},
	patch_management_isActive: {
		active: false
	},
	patch_management_deploy: {
		deployStatus: 'SUCCESS'
	},
	patch_management_progress: {},
	log_patch_management: {
		jsonServer: true,
		log: ''
	},
	log_size_patch_management: { name: '/var/log/cbis/patch_management.log', size: 0 }
};
