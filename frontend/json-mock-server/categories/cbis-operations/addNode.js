module.exports = {
	add_node_isActive: {
		active: false
	},
	add_node_is_page_dependencies_ready: {
		message: '',
		ready: true
	},
	add_node_initial_page: {
		display: 'Hardware Type',
		fields: [
			{
				default: 'airframe_rm19',
				display: 'Current Hardware',
				help: 'Currently Installed hardware',
				name: 'current_hardware',
				readonly: true,
				type: 'text'
			},
			{
				default: 'airframe_rm19',
				display: 'Available Hardware Types for Scale Out',
				help: 'Select Hardware type for Scale Out',
				name: 'new_hardware',
				required: true,
				type: 'select',
				values: ['airframe_rm19']
			}
		],
		name: 'hardware_initial_page'
	},
	add_node_main: {
		name: 'add_node',
		sections: [
			{
				display: 'Undercloud & General',
				name: 'general',
				subSections: [
					{
						display: 'Hardware',
						fields: [
							{
								display: 'IPMI Username',
								help: 'Username used to access management interface (IPMI).',
								name: 'ipmi_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9^._-]+$',
								validationDescription: "Only alphabet, numeric, '^', '.', '_' and '-' are allowed "
							},
							{
								display: 'IPMI Password',
								help: 'Password used to access management interface (IPMI).',
								name: 'ipmi_password',
								required: true,
								type: 'password',
								validation: '^[A-Za-z0-9$%#@!^&*?.()=+~{}/|_-]+$',
								validationDescription:
									"Only alphabet, numeric, '!', '@', '#', '$', '%', '^', '&', '*', '_', '?', '.', '(', ')', '=', '+', '~', '{', '}', '/', '|' and '-' are allowed "
							},
							{
								display: 'Hardware Scan NIC index',
								help:
									'Optional: BIOS NIC index of provisioning network, the default port index is 0 for all the systems except airframe which has default port 2. Please specify this parameter if you configured your system differently',
								name: 'hw_nic_index',
								required: false,
								restrictions: { max: 100, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Hardware Firmware Validation',
								help: 'If disabled, the hardware scan will skip the firmware validation.',
								name: 'hw_fw_validation',
								required: false,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Run Security Hardening Post Scale out',
								help: 'If disabled, the security hardening will be skipped.',
								name: 'run_sec_hardening',
								required: false,
								type: 'boolean'
							},
							{
								default: true,
								display: 'Pre Scale Verifications',
								help:
									'If enabled, Will run undercloud/overcloud various resources, services, and memory validations before the scale.',
								name: 'pre_scale_verifications',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Auto Enroll into Ironic',
								help: 'Auto Enroll into Ironic',
								name: 'auto_enroll',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Backup Undercloud VM',
								help: 'If enabled, Will run undercloud backup before starting the scale',
								name: 'backup_undercloud',
								type: 'boolean'
							}
						],
						name: 'hardware'
					},
					{
						display: 'Backup Undercloud',
						fields: [
							{
								default: '/root/backup',
								display: 'Backup directory',
								help: 'Directory on the Undercloud Physical Server where backups are stored.',
								name: 'backup_directory',
								readonly: true,
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'full_undercloud_backup',
								display: 'Filename prefix',
								help:
									'Name of the backup file consists of specified prefix following by timestamps.\nCannot contain more than 26 characters.',
								name: 'filename_prefix',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9_-]{1,26}$',
								validationDescription: 'Only alphabet are allowed Length between 1 to 26 '
							},
							{
								default: false,
								display: 'Ignore the Undercloud VM status',
								help:
									'For advanced users only! If selected for backup, it will create a snapshot of the Undercloud regardless of its containers health. If selected for restore, it will ignore errors after restoring snapshot of the Undercloud with unhealthy containers.',
								name: 'ignore_status',
								required: true,
								type: 'boolean'
							}
						],
						name: 'backup_undercloud_params',
						showIf: { parentName: 'backup_undercloud', parentValue: true }
					}
				]
			},
			{
				bmc: false,
				description: 'Add your IPMI IP addresses',
				display: 'IPMI',
				force_multiple_pools: false,
				force_racks: false,
				name: 'ipmi_ips',
				readonly_racks: true,
				storageRoles: ['Storage'],
				subSections: [
					{ display: 'Add IPMIs', fields: [], name: 'ipmiAdd' },
					{
						default: [],
						display: 'Multiple pools',
						help: 'Enter the multiple pools names',
						name: 'pools',
						validation: '^[A-Z:a-z0-9_-]+$'
					},
					{
						default: [],
						display: 'Define Rack Names',
						name: 'racks',
						validation: '^[A-Z:a-z0-9_-]+$'
					},
					{
						default: { zones: ['sriov_zone'] },
						display: 'Define Availability Zones',
						fields: [],
						name: 'defineZones',
						validation: '^(?!internal$)[A-Z:a-z0-9_-]+$'
					},
					{
						default: [],
						display: 'Disks names',
						help:
							'Enter storage disks paths (At the "Assign nodes" section you will be able to assign disks paths from storage nodes to created pools)',
						name: 'disks',
						validation: '^[A-Za-z0-9/]+$'
					},
					{
						display: 'Assign Nodes',
						fields: [
							{
								name: 'hostGroups',
								values: [
									{ display: 'OVS-Compute', name: 'OvsCompute' },
									{ display: 'Monitoring', name: 'Monitoring', noZones: true },
									{ display: 'SRIOV-Performance-Compute', name: 'SriovPerformanceCompute' },
									{
										display: 'Triple-NIC-SRIOV-Performance-Compute',
										name: 'TripleNicSriovPerformanceCompute'
									},
									{ display: 'AVRS-Compute', name: 'AvrsCompute' },
									{ display: 'Storage', name: 'Storage', noZones: true },
									{
										display: 'SRIOVInfraVxlan-Performance-Compute',
										name: 'SriovInfraVxlanPerformanceCompute'
									},
									{
										display: 'Triple-NIC-SRIOVInfraVxlan-Performance-Compute',
										name: 'TripleNicSriovInfraVxlanPerformanceCompute'
									},
									{
										display: 'Triple-NIC-AVRS-VtepPerNuma-Compute',
										name: 'TripleNicAvrsVtepPerNumaCompute'
									},
									{
										display: 'Triple-NIC-DPDK-Performance-Compute',
										name: 'TripleNicDpdkPerformanceCompute'
									},
									{ display: 'DPDK-Performance-Compute', name: 'DpdkPerformanceCompute' }
								]
							}
						],
						name: 'assignNodes'
					}
				],
				supported_hw_pools: false,
				supported_racks: false,
				type: 'ipmi'
			},
			{
				display: 'Deploy',
				name: 'deploy',
				subSections: [
					{
						display: 'Mandatory Fields Completion',
						exclude: [],
						name: 'validation',
						type: 'validation'
					},
					{
						data: [
							'Will add Compute,Storage and Monitoring nodes to the existing CBIS installation'
						],
						display: 'Add Compute,Storage and Monitoring',
						name: 'information',
						type: 'information'
					},
					{
						buttons: [
							{
								beforeSend: {
									confirm:
										'Are you sure you want to start the Add Compute,Storage and Monitoring process? \nPlease make sure you have the latest Undercloud backup. '
								},
								disabled: false,
								onSuccess: { message: 'Add Compute,Storage and Monitoring Started!' },
								role: 'submit',
								text: 'Add Compute,Storage and Monitoring',
								url: { method: 'POST', url: 'api/add_node/deploy' }
							}
						],
						name: 'actions',
						showWarning: {
							expectedReturnValue: true,
							message: 'Warning: Add Compute,Storage and Monitoring process is already running!',
							url: { extract: 'active', method: 'GET', url: 'api/add_node/isActive' }
						},
						type: 'actions'
					}
				],
				type: 'deploy'
			},
			{
				display: 'Log',
				name: 'add_node-log',
				subSections: [
					{
						display: 'Add Compute,Storage and Monitoring Logs',
						name: 'add_node-log',
						url: { url: 'log/add_node.log' }
					}
				],
				type: 'log'
			}
		]
	},
	add_node_status: { pending_plugins: [], status: 'RUNNING' },
	log_size_add_node: { name: '/var/log/cbis/add_node.log', size: 8997192 },
	add_node_progress: {
		progress_steps: [
			{
				description: 'Validating user input',
				display: 'Input validation',
				logRef: 'pre deploy validation passed successfully',
				name: 'input_validation'
			},
			{
				description: '',
				display: 'Resources validation',
				logRef: '**Resources validation completed successfully**',
				name: 'resources_validation'
			},
			{
				description: '',
				display: 'Pre scale verification',
				logRef: 'Pre Scale Verifications completed successfully.',
				name: 'pre_scale_verification'
			},
			{
				description: 'Get MAC addresses from requested IPMI IPs',
				display: 'HW scan',
				logRef: '**Finished creating hosts config and performing hardware scan**',
				name: 'hardware_scan'
			},
			{
				description: 'PXE boot new computes',
				display: 'New nodes introspection',
				logRef: '**New nodes introspection completed successfully**',
				name: 'introspect_new_nodes'
			},
			{
				description: '',
				display: 'Verify ironic nodes status',
				logRef: '**All Ironic nodes are in available state**',
				name: 'verify_ironic_nodes_status'
			},
			{
				description:
					'Generate TripleO templates and create required flavors for new nodes deployment',
				display: 'Generate templates',
				logRef: '**Templates generated**',
				name: 'generate_templates'
			},
			{
				description: 'performing scale out',
				display: 'nodes adding',
				logRef: '**Deploying new nodes completed**',
				name: 'deploy'
			},
			{
				description: '',
				display: 'Post scale validation',
				logRef: 'Found correct state: UPDATE_COMPLETE',
				name: 'post_validation'
			},
			{
				display: 'Final configurations',
				logRef: '****Add Compute,Storage and Monitoring Finished Successfully****',
				name: 'final_configurations'
			}
		]
	},
	add_node_deploy: {
		deployStatus: 'SUCCESS'
	},
	log_add_node: {
		jsonServer: true,
		log:
			'2020-07-04 20:24:02,334 - AddNodeFlow - INFO - pre deploy validation passed successfully\n' +
			'2020-07-04 20:24:52,919 - AddNodeFlow - INFO - **Resources validation completed successfully**\n' +
			'2020-07-04 20:24:52,920 - AddNodeFlow - INFO - **Pre Scale Verifications enabled**\n' +
			'2020-07-04 20:25:06,003 - AddNodeFlow - INFO - Pre Scale Verifications completed successfully.\n' +
			'2020-07-04 20:25:06,004 - AddNodeFlow - DEBUG - **Checking if TLS was enabled during deployment**\n' +
			'2020-07-04 20:25:26,692 - AddNodeFlow - INFO - **Finished creating hosts config and performing hardware scan**\n' +
			'2020-07-04 20:25:26,692 - AddNodeFlow - INFO - **Registering new nodes with ironic**\n' +
			'2020-07-04 20:37:26,655 - AddNodeFlow - INFO - **New nodes introspection completed successfully**\n' +
			'2020-07-04 20:37:26,656 - AddNodeFlow - INFO - **Verification of ironic node-list output after introspection**\n' +
			'2020-07-04 20:37:40,059 - AddNodeFlow - INFO - **All Ironic nodes are in available state**\n' +
			'2020-07-04 20:37:40,360 - AddNodeFlow-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: openstack baremetal node list -f json\n' +
			'2020-07-04 20:38:06,333 - AddNodeFlow - INFO - **Templates generated**\n' +
			'2020-07-04 23:03:01,518 - AddNodeFlow - INFO - **Deploying new nodes completed**\n' +
			'2020-07-04 23:03:01,519 - AddNodeFlow - INFO - **validating overcloud deployment state**\n' +
			'2020-07-04 23:03:09,860 - AddNodeFlow - INFO - Found correct state: UPDATE_COMPLETE\n' +
			'2020-07-04 23:03:09,860 - AddNodeFlow-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: rm -f /tmp/hosts_config_before_changes.yaml\n' +
			'2020-07-04 23:03:19,593 - AddNodeFlow - INFO - ****Add Compute,Storage and Monitoring Finished Successfully****\n' +
			'2020-07-04 23:03:19,593 - AddNodeFlow - INFO - **Please backup Undercloud**\n'
	}
};
