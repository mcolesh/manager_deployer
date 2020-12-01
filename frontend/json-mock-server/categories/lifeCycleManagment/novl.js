module.exports = {
	novl_is_page_dependencies_ready: {
		ready: true,
		message: ''
	},
	novl_isActive: {
		active: false
	},
	novl_initial_page: {
		display: 'NOVL',
		fields: [
			{
				display: 'NOVL Test',
				help: 'Select NOVL Test',
				name: 'test',
				required: true,
				type: 'select',
				values: ['CMG-DPDK']
			}
		],
		name: 'novl_initial_page'
	},
	novl_main: {
		name: 'novl',
		sections: [
			{
				display: 'NOVL',
				name: 'novl_main',
				subSections: [
					{
						display: 'NOVL',
						fields: [
							{
								default: 'On specific host aggregates',
								display: 'Choose how to run the test',
								name: 'how_to_run',
								required: true,
								type: 'select',
								values: [
									'On specific computes',
									'On specific host aggregates',
									'On the entire cluster'
								]
							},
							{
								display: 'Select on which computes to run the test',
								multiple: true,
								name: 'run_on_computes',
								required: true,
								showIf: { parentName: 'how_to_run', parentValue: 'On specific computes' },
								type: 'select',
								values: [
									'overcloud-dpdkperformancecompute-hanoi-setup-1',
									'overcloud-dpdkperformancecompute-hanoi-setup-0',
									'overcloud-sriovperformancecompute-hanoi-setup-0'
								]
							},
							{
								default: 'DpdkPerformanceCompute',
								display: 'Select on which host aggregates to run the test',
								multiple: true,
								name: 'run_on_ha',
								required: true,
								showIf: { parentName: 'how_to_run', parentValue: 'On specific host aggregates' },
								type: 'select',
								values: [
									'dpdk_zone',
									'DpdkPerformanceCompute',
									'sriov_zone',
									'SriovPerformanceCompute'
								]
							}
						],
						name: 'choose_action'
					}
				]
			},
			{
				display: 'NOVL test parameters',
				name: 'novl_test',
				subSections: [
					{
						display: 'Test Parameters',
						fields: [
							{
								condition: {
									default: '>=',
									required: true,
									values: ['dont care', 'ignore', '==', '>', '>=', '<', '<=']
								},
								display: 'Openstack Version',
								fieldValue: {
									default: 'Newton',
									required: true,
									type: 'select',
									values: [
										'IceHouse',
										'Juno',
										'Kilo',
										'Liberty',
										'Mitaka',
										'Newton',
										'Ocata',
										'Pike',
										'Queens',
										'Rocky'
									]
								},
								name: 'openstack_version',
								type: 'novl'
							},
							{
								condition: {
									default: '>=',
									required: true,
									values: ['dont care', 'ignore', '==', '>', '>=', '<', '<=']
								},
								display: 'Available Cores',
								fieldValue: {
									default: 24,
									required: true,
									restrictions: { min: 0 },
									type: 'number'
								},
								name: 'available_cores',
								type: 'novl'
							},
							{
								condition: {
									default: 'dont care',
									required: true,
									values: ['dont care', 'ignore', '==']
								},
								display: 'CPU Model',
								fieldValue: {
									default: 'Haswell',
									required: true,
									type: 'select',
									values: [
										'486',
										'pentium',
										'pentium2',
										'pentium3',
										'pentiumpro',
										'coreduo',
										'n270',
										'core2duo',
										'qemu32',
										'kvm32',
										'cpu64-rhel5',
										'cpu64-rhel6',
										'kvm64',
										'qemu64',
										'Conroe',
										'Penryn',
										'Nehalem',
										'Westmere',
										'SandyBridge',
										'IvyBridge',
										'Haswell-noTSX',
										'Haswell',
										'Broadwell-noTSX',
										'Broadwell',
										'athlon',
										'phenom',
										'Opteron_G1',
										'Opteron_G2',
										'Opteron_G3',
										'Opteron_G4',
										'Opteron_G5',
										'POWER6',
										'POWER7',
										'POWER8',
										'POWERPC_e5500',
										'POWERPC_e6500'
									]
								},
								name: 'cpu_model',
								type: 'novl'
							},
							{
								condition: {
									default: 'dont care',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'Core Speed',
								fieldValue: {
									default: 2.5,
									required: true,
									restrictions: { min: 1.0 },
									type: 'number'
								},
								name: 'core_speed',
								type: 'novl'
							},
							{
								condition: {
									default: '>=',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'Data Interface MTU OVS',
								fieldValue: {
									default: 8800,
									required: true,
									restrictions: { min: 500 },
									type: 'number'
								},
								help: 'Data Interface MTU on tenant network',
								name: 'data_interface_mtu_ovs',
								type: 'novl'
							},
							{
								condition: {
									default: 'dont care',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'Data Interface MTU SRIOV',
								fieldValue: {
									default: 8800,
									required: true,
									restrictions: { min: 500 },
									type: 'number'
								},
								help: 'Data Interface MTU on physical network',
								name: 'data_interface_mtu_sriov',
								type: 'novl'
							},
							{
								condition: {
									default: '==',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'CPU Allocation Ratio',
								fieldValue: {
									default: 1,
									required: true,
									restrictions: { min: 1.0 },
									type: 'number'
								},
								name: 'cpu_allocation_ratio',
								type: 'novl'
							},
							{
								condition: {
									default: '<',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'RAM Allocation Ratio',
								fieldValue: {
									default: 1,
									required: true,
									restrictions: { min: 1.0 },
									type: 'number'
								},
								name: 'ram_allocation_ratio',
								type: 'novl'
							},
							{
								condition: {
									default: 'dont care',
									required: true,
									values: ['true', 'false', 'dont care', 'ignore']
								},
								display: 'Hyper Threading Enabled',
								name: 'hyper_threading_enabled',
								type: 'novl'
							},
							{
								condition: {
									default: 'false',
									required: true,
									values: ['true', 'false', 'dont care', 'ignore']
								},
								display: 'SRIOV Enabled',
								name: 'sriov_enabled',
								type: 'novl'
							},
							{
								condition: {
									default: 'dont care',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'SRIOV Number Of VFS',
								fieldValue: {
									default: 10,
									required: true,
									restrictions: { min: 0 },
									type: 'number'
								},
								name: 'sriov_number_of_vfs',
								type: 'novl'
							},
							{
								condition: {
									default: '>=',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'Huge Pages 1gb Count',
								fieldValue: {
									default: 64,
									required: true,
									restrictions: { min: 0 },
									type: 'number'
								},
								name: 'huge_pages_1gb_count',
								type: 'novl'
							},
							{
								condition: {
									default: 'dont care',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'Huge Pages 2mb Count',
								fieldValue: {
									default: 0,
									required: true,
									restrictions: { min: 0 },
									type: 'number'
								},
								name: 'huge_pages_2mb_count',
								type: 'novl'
							},
							{
								condition: {
									default: 'check',
									required: true,
									values: ['check', 'dont care', 'ignore']
								},
								display: 'CPU Isolation',
								name: 'cpu_isolation',
								type: 'novl'
							},
							{
								condition: {
									default: 'check',
									required: true,
									values: ['check', 'dont care', 'ignore']
								},
								display: 'CEPH Status',
								name: 'ceph_status',
								type: 'novl'
							},
							{
								condition: {
									default: '>=',
									required: true,
									values: ['dont care', 'ignore', '==', '!=', '>', '>=', '<', '<=']
								},
								display: 'CEPH Replication Size',
								fieldValue: {
									default: 2,
									required: true,
									restrictions: { min: 0 },
									type: 'number'
								},
								name: 'ceph_replication_size',
								type: 'novl'
							},
							{
								condition: {
									default: 'dont care',
									required: true,
									values: ['true', 'false', 'dont care', 'ignore']
								},
								display: 'IOMMU',
								help: 'Check if IOMMU configured as specified',
								name: 'iommu',
								type: 'novl'
							},
							{
								condition: {
									default: 'dont care',
									required: true,
									values: ['check', 'dont care', 'ignore']
								},
								display: 'Trust',
								help: 'Check if SRIOV VF trust mode is configured as specified',
								name: 'trust',
								type: 'novl'
							}
						],
						name: 'test'
					}
				]
			},
			{
				display: 'Execution',
				name: 'novl_execution',
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
								beforeSend: { confirm: 'Are you sure you want to start the NOVL procedure?' },
								disabled: false,
								onSuccess: { message: 'Procedure Started!' },
								role: 'submit',
								text: 'Execute',
								url: { method: 'POST', url: 'api/novl/deploy' }
							}
						],
						name: 'actions',
						showWarning: {
							expectedReturnValue: true,
							message: 'Warning: procedure is already in progress!.',
							url: { extract: 'active', method: 'GET', url: 'api/novl/isActive' }
						},
						type: 'actions'
					}
				],
				type: 'deploy'
			},
			{
				display: 'Log',
				name: 'novl_log',
				subSections: [{ display: 'Novl logs', name: 'novl_log-log', url: { url: 'log/novl.log' } }],
				type: 'log'
			}
		]
	},
	novl_status: {
		status: null
	},
	novl_results: {
		name: 'novl_report',
		sections: [
			{
				display: 'NOVL Report',
				name: 'report',
				subSections: [
					{
						display: 'Summary',
						fields: [
							{
								display: 'Total number of computes',
								failures: 0,
								name: 'total_computes',
								total: 3
							},
							{ display: 'PASSED', name: 'passed', numberOfPassed: 3 },
							{
								display: 'FAILED',
								name: 'failed',
								numberOfFailed: 0
							}
						],
						name: 'summary'
					},
					{
						columns: ['Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
						display: 'Cluster Level Tests',
						name: 'cluster_level_tests',
						rows: [
							['openstack_version', '>=', 'Rocky', 'Rocky', 'passed'],
							['ceph_status', 'dont care', ' ', 'HEALTH_OK', 'passed'],
							['ceph_replication_size', 'dont care', ' ', '2', 'passed']
						]
					},
					{
						display: 'Host aggregate level tests',
						failed: { display: 'Failed', rows: [] },
						name: 'host_aggregate_level_tests',
						passed: {
							display: 'Passed',
							rows: [
								{
									columns: ['Compute', 'Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
									display: 'DpdkPerformanceCompute',
									rows: [
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'compute_state',
											'==',
											'up',
											'up',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'available_cores',
											'dont care',
											'dont care',
											'80',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'core_speed',
											'dont care',
											'dont care',
											'2.10',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'cpu_isolation',
											'dont care',
											'dont care',
											'FAIL',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'cpu_model',
											'dont care',
											'dont care',
											'Skylake-Server-IBRS',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'data_interface_mtu_ovs',
											'dont care',
											'dont care',
											'9000',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'data_interface_mtu_sriov',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'sriov_enabled',
											'dont care',
											'dont care',
											'False',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'sriov_number_of_vfs',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'hyper_threading_enabled',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'huge_pages_1gb_count',
											'dont care',
											'dont care',
											'158',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'huge_pages_2mb_count',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'cpu_allocation_ratio',
											'dont care',
											'dont care',
											'1.0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'ram_allocation_ratio',
											'dont care',
											'dont care',
											'0.85',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'iommu',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'trust',
											'dont care',
											'dont care',
											'False',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'compute_state',
											'==',
											'up',
											'up',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'cpu_model',
											'dont care',
											'dont care',
											'Skylake-Server-IBRS',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'sriov_enabled',
											'dont care',
											'dont care',
											'False',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'sriov_number_of_vfs',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'hyper_threading_enabled',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'huge_pages_1gb_count',
											'dont care',
											'dont care',
											'158',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'huge_pages_2mb_count',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'cpu_allocation_ratio',
											'dont care',
											'dont care',
											'1.0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'ram_allocation_ratio',
											'dont care',
											'dont care',
											'0.85',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'iommu',
											'dont care',
											'dont care',
											'False',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'trust',
											'dont care',
											'dont care',
											'False',
											'passed'
										]
									]
								},
								{
									columns: ['Compute', 'Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
									display: 'dpdk_zone',
									rows: [
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'compute_state',
											'==',
											'up',
											'up',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'available_cores',
											'dont care',
											'dont care',
											'80',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'core_speed',
											'dont care',
											'dont care',
											'2.10',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'cpu_isolation',
											'dont care',
											'dont care',
											'FAIL',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'cpu_model',
											'dont care',
											'dont care',
											'Skylake-Server-IBRS',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'data_interface_mtu_ovs',
											'dont care',
											'dont care',
											'9000',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'data_interface_mtu_sriov',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'sriov_enabled',
											'dont care',
											'dont care',
											'False',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'sriov_number_of_vfs',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'hyper_threading_enabled',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'huge_pages_1gb_count',
											'dont care',
											'dont care',
											'158',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'huge_pages_2mb_count',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'cpu_allocation_ratio',
											'dont care',
											'dont care',
											'1.0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'ram_allocation_ratio',
											'dont care',
											'dont care',
											'0.85',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'iommu',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-0',
											'trust',
											'dont care',
											'dont care',
											'False',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'compute_state',
											'==',
											'up',
											'up',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'cpu_model',
											'dont care',
											'dont care',
											'Skylake-Server-IBRS',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'sriov_enabled',
											'dont care',
											'dont care',
											'False',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'sriov_number_of_vfs',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'hyper_threading_enabled',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'huge_pages_1gb_count',
											'dont care',
											'dont care',
											'158',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'huge_pages_2mb_count',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'cpu_allocation_ratio',
											'dont care',
											'dont care',
											'1.0',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'ram_allocation_ratio',
											'dont care',
											'dont care',
											'0.85',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'iommu',
											'dont care',
											'dont care',
											'False',
											'passed'
										],
										[
											'overcloud-dpdkperformancecompute-hanoi-setup-1',
											'trust',
											'dont care',
											'dont care',
											'False',
											'passed'
										]
									]
								},
								{
									columns: ['Compute', 'Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
									display: 'sriov_zone',
									rows: [
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'compute_state',
											'==',
											'up',
											'up',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'available_cores',
											'dont care',
											'dont care',
											'80',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'core_speed',
											'dont care',
											'dont care',
											'2.10',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'cpu_isolation',
											'dont care',
											'dont care',
											'SUCCESS',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'cpu_model',
											'dont care',
											'dont care',
											'Skylake-Server-IBRS',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'data_interface_mtu_ovs',
											'dont care',
											'dont care',
											'9000',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'data_interface_mtu_sriov',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'sriov_enabled',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'sriov_number_of_vfs',
											'dont care',
											'dont care',
											'184',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'hyper_threading_enabled',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'huge_pages_1gb_count',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'huge_pages_2mb_count',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'cpu_allocation_ratio',
											'dont care',
											'dont care',
											'1.0',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'ram_allocation_ratio',
											'dont care',
											'dont care',
											'0.85',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'iommu',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'trust',
											'dont care',
											'dont care',
											'False',
											'passed'
										]
									]
								},
								{
									columns: ['Compute', 'Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
									display: 'SriovPerformanceCompute',
									rows: [
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'compute_state',
											'==',
											'up',
											'up',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'available_cores',
											'dont care',
											'dont care',
											'80',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'core_speed',
											'dont care',
											'dont care',
											'2.10',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'cpu_isolation',
											'dont care',
											'dont care',
											'SUCCESS',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'cpu_model',
											'dont care',
											'dont care',
											'Skylake-Server-IBRS',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'data_interface_mtu_ovs',
											'dont care',
											'dont care',
											'9000',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'data_interface_mtu_sriov',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'sriov_enabled',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'sriov_number_of_vfs',
											'dont care',
											'dont care',
											'184',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'hyper_threading_enabled',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'huge_pages_1gb_count',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'huge_pages_2mb_count',
											'dont care',
											'dont care',
											'0',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'cpu_allocation_ratio',
											'dont care',
											'dont care',
											'1.0',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'ram_allocation_ratio',
											'dont care',
											'dont care',
											'0.85',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'iommu',
											'dont care',
											'dont care',
											'True',
											'passed'
										],
										[
											'overcloud-sriovperformancecompute-hanoi-setup-0',
											'trust',
											'dont care',
											'dont care',
											'False',
											'passed'
										]
									]
								}
							]
						}
					}
				]
			}
		]
	},
	novl_progress: {},
	novl_deploy: {
		deployStatus: 'SUCCESS'
	},
	log_size_novl: { name: '/var/log/cbis/novl.log', size: 24961 },
	log_NOVLlog: {
		jsonServer: true,
		log:
			'executing command: touch /opt/novl/nodejs_server/tmp_input.yaml\n' +
			'stderr: \n' +
			'ret_code: 0\n' +
			'2020-06-30 09:58:33,245 [cbis_terminal_client] [DEBUG   ]  running command: openstack server list -f json\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]  command: openstack server list -f json returned:\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     [\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-dpdkperformancecompute-hanoi-setup-1", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "70ceacdc-55d9-4010-a9e4-32b0b56bec13", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "DpdkPerformanceCompute", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.13"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }, \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-controller-hanoi-setup-1", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "7b250592-10ec-49ca-b187-aa0976d4c8d6", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "Controller", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.21"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }, \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-controller-hanoi-setup-0", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "bc154bba-723b-4666-a703-37b93112456a", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "Controller", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.7"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }, \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-dpdkperformancecompute-hanoi-setup-0", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "b990ecdc-fa56-46b1-9a89-b4de7fc13561", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "DpdkPerformanceCompute", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.10"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }, \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-controller-hanoi-setup-2", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "cccacc1e-a602-43a0-b637-695ac580df8a", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "Controller", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.22"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }, \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-storage-hanoi-setup-1", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "d9ddec35-56f4-45e0-9c02-db04a4b77200", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "Storage", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.9"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }, \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-storage-hanoi-setup-2", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "4bc32f0f-fb2d-4634-a064-87cec7f18d6e", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "Storage", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.5"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }, \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-storage-hanoi-setup-0", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "b196b6d8-42f2-4735-8339-5b750ba0e551", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "Storage", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.26"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }, \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     {\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Status": "ACTIVE", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Name": "overcloud-sriovperformancecompute-hanoi-setup-0", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Image": "overcloud-full", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "ID": "49ee3d9e-bea9-481c-ad45-74836c471d2c", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Flavor": "SriovPerformanceCompute", \n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     "Networks": "ctlplane=172.31.0.8"\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     }\n' +
			'2020-06-30 09:58:36,385 [cbis_terminal_client] [DEBUG   ]     ]\n' +
			'2020-06-30 09:58:36,453 [cbis_terminal_client] [DEBUG   ]  running command: openstack server list\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]  command: openstack server list returned:\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     +--------------------------------------+-------------------------------------------------+--------+----------------------+----------------+-------------------------+\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | ID                                   | Name                                            | Status | Networks             | Image          | Flavor                  |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     +--------------------------------------+-------------------------------------------------+--------+----------------------+----------------+-------------------------+\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | 70ceacdc-55d9-4010-a9e4-32b0b56bec13 | overcloud-dpdkperformancecompute-hanoi-setup-1  | ACTIVE | ctlplane=172.31.0.13 | overcloud-full | DpdkPerformanceCompute  |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | 7b250592-10ec-49ca-b187-aa0976d4c8d6 | overcloud-controller-hanoi-setup-1              | ACTIVE | ctlplane=172.31.0.21 | overcloud-full | Controller              |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | bc154bba-723b-4666-a703-37b93112456a | overcloud-controller-hanoi-setup-0              | ACTIVE | ctlplane=172.31.0.7  | overcloud-full | Controller              |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | b990ecdc-fa56-46b1-9a89-b4de7fc13561 | overcloud-dpdkperformancecompute-hanoi-setup-0  | ACTIVE | ctlplane=172.31.0.10 | overcloud-full | DpdkPerformanceCompute  |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | cccacc1e-a602-43a0-b637-695ac580df8a | overcloud-controller-hanoi-setup-2              | ACTIVE | ctlplane=172.31.0.22 | overcloud-full | Controller              |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | d9ddec35-56f4-45e0-9c02-db04a4b77200 | overcloud-storage-hanoi-setup-1                 | ACTIVE | ctlplane=172.31.0.9  | overcloud-full | Storage                 |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | 4bc32f0f-fb2d-4634-a064-87cec7f18d6e | overcloud-storage-hanoi-setup-2                 | ACTIVE | ctlplane=172.31.0.5  | overcloud-full | Storage                 |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | b196b6d8-42f2-4735-8339-5b750ba0e551 | overcloud-storage-hanoi-setup-0                 | ACTIVE | ctlplane=172.31.0.26 | overcloud-full | Storage                 |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     | 49ee3d9e-bea9-481c-ad45-74836c471d2c | overcloud-sriovperformancecompute-hanoi-setup-0 | ACTIVE | ctlplane=172.31.0.8  | overcloud-full | SriovPerformanceCompute |\n' +
			'2020-06-30 09:58:39,655 [cbis_terminal_client] [DEBUG   ]     +--------------------------------------+-------------------------------------------------+--------+----------------------+----------------+-------------------------+\n' +
			'2020-06-30 09:58:39,860 [service_builder     ] [INFO    ]  *****start getting nova services*****\n' +
			'2020-06-30 09:58:39,862 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,862 [service_builder     ] [INFO    ]  service name is: nova-conductor\n' +
			'2020-06-30 09:58:39,862 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-1.localdomain\n' +
			'2020-06-30 09:58:39,862 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,862 [service_builder     ] [INFO    ]  service name is: nova-consoleauth\n' +
			'2020-06-30 09:58:39,862 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-1.localdomain\n' +
			'2020-06-30 09:58:39,862 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,863 [service_builder     ] [INFO    ]  service name is: nova-conductor\n' +
			'2020-06-30 09:58:39,863 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-2.localdomain\n' +
			'2020-06-30 09:58:39,863 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,863 [service_builder     ] [INFO    ]  service name is: nova-conductor\n' +
			'2020-06-30 09:58:39,863 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-0.localdomain\n' +
			'2020-06-30 09:58:39,863 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,863 [service_builder     ] [INFO    ]  service name is: nova-consoleauth\n' +
			'2020-06-30 09:58:39,864 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-0.localdomain\n' +
			'2020-06-30 09:58:39,864 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,864 [service_builder     ] [INFO    ]  service name is: nova-consoleauth\n' +
			'2020-06-30 09:58:39,864 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-2.localdomain\n' +
			'2020-06-30 09:58:39,864 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,864 [service_builder     ] [INFO    ]  service name is: nova-scheduler\n' +
			'2020-06-30 09:58:39,864 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-1.localdomain\n' +
			'2020-06-30 09:58:39,865 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,865 [service_builder     ] [INFO    ]  service name is: nova-scheduler\n' +
			'2020-06-30 09:58:39,865 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-0.localdomain\n' +
			'2020-06-30 09:58:39,865 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,865 [service_builder     ] [INFO    ]  service name is: nova-scheduler\n' +
			'2020-06-30 09:58:39,865 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-controller-hanoi-setup-2.localdomain\n' +
			'2020-06-30 09:58:39,865 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,866 [service_builder     ] [INFO    ]  service name is: nova-compute\n' +
			'2020-06-30 09:58:39,866 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-dpdkperformancecompute-hanoi-setup-0.localdomain\n' +
			'2020-06-30 09:58:39,866 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,866 [service_builder     ] [INFO    ]  service name is: nova-compute\n' +
			'2020-06-30 09:58:39,866 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-sriovperformancecompute-hanoi-setup-0.localdomain\n' +
			'2020-06-30 09:58:39,866 [service_builder     ] [INFO    ]  -------------------------------------------------------\n' +
			'2020-06-30 09:58:39,866 [service_builder     ] [INFO    ]  service name is: nova-compute\n' +
			'2020-06-30 09:58:39,866 [service_builder     ] [INFO    ]  *is service up: True *service host: overcloud-dpdkperformancecompute-hanoi-setup-1.localdomain\n' +
			'\n' +
			'\n' +
			' WELCOME TO NODE VALIDATION TOOL\n' +
			'\n' +
			' please wait while performing validation\n' +
			'\n' +
			'!!!checking if compute is up, compute name is: overcloud-dpdkperformancecompute-hanoi-setup-0.localdomain\n' +
			'compute is up\n' +
			'2020-06-30 09:58:41,489 [host_reader         ] [INFO    ]  inside get_ntp\n' +
			'2020-06-30 09:58:41,983 [host_reader         ] [INFO    ]  ntp for host name: 172.31.0.10\n' +
			'2020-06-30 09:58:41,984 [host_reader         ] [INFO    ]  remote           refid      st t when poll reach   delay   offset  jitter\n' +
			'2020-06-30 09:58:41,984 [host_reader         ] [INFO    ]     ==============================================================================\n' +
			'2020-06-30 09:58:41,984 [host_reader         ] [INFO    ]     +overcloud-contr 135.239.25.18    3 u   43 1024  377    0.309    0.712   0.102\n' +
			'2020-06-30 09:58:41,984 [host_reader         ] [INFO    ]     *overcloud-contr 135.239.25.18    3 u   19 1024  377    0.138    0.467   0.149\n' +
			'2020-06-30 09:58:41,984 [host_reader         ] [INFO    ]     +overcloud-contr 135.239.25.18    3 u  213 1024  377    0.113    0.454   0.162\n' +
			'!!!checking if compute is up, compute name is: overcloud-sriovperformancecompute-hanoi-setup-0.localdomain\n' +
			'compute is up\n' +
			'2020-06-30 09:58:48,654 [host_reader         ] [INFO    ]  inside get_ntp\n' +
			'2020-06-30 09:58:49,141 [host_reader         ] [INFO    ]  ntp for host name: 172.31.0.8\n' +
			'2020-06-30 09:58:49,142 [host_reader         ] [INFO    ]  remote           refid      st t when poll reach   delay   offset  jitter\n' +
			'2020-06-30 09:58:49,142 [host_reader         ] [INFO    ]     ==============================================================================\n' +
			'2020-06-30 09:58:49,142 [host_reader         ] [INFO    ]     +overcloud-contr 135.239.25.18    3 u  905 1024  377    0.078    0.636   0.160\n' +
			'2020-06-30 09:58:49,142 [host_reader         ] [INFO    ]     *overcloud-contr 135.239.25.18    3 u   33 1024  377    0.157    0.428   0.291\n' +
			'2020-06-30 09:58:49,142 [host_reader         ] [INFO    ]     +overcloud-contr 135.239.25.18    3 u  607 1024  377    0.308    0.544   0.151\n' +
			'2020-06-30 09:58:51,781 [host_reader         ] [INFO    ]  trust in user_config for host 172.31.0.8 and for port ref:optional:common_network_config.nic_1_port_1.nameis False\n' +
			'2020-06-30 09:58:52,255 [host_reader         ] [INFO    ]  no vf is defined as trust\n' +
			'2020-06-30 09:58:52,255 [host_reader         ] [INFO    ]  trust in user_config for host 172.31.0.8 and for port ref:optional:common_network_config.nic_1_port_2.nameis False\n' +
			'2020-06-30 09:58:52,698 [host_reader         ] [INFO    ]  no vf is defined as trust\n' +
			'2020-06-30 09:58:52,699 [host_reader         ] [INFO    ]  trust in user_config for host 172.31.0.8 and for port ref:optional:common_network_config.nic_2_port_1.nameis False\n' +
			'2020-06-30 09:58:53,097 [host_reader         ] [INFO    ]  no vf is defined as trust\n' +
			'2020-06-30 09:58:53,097 [host_reader         ] [INFO    ]  trust in user_config for host 172.31.0.8 and for port ref:optional:common_network_config.nic_2_port_2.nameis False\n' +
			'2020-06-30 09:58:53,572 [host_reader         ] [INFO    ]  no vf is defined as trust\n' +
			'!!!checking if compute is up, compute name is: overcloud-dpdkperformancecompute-hanoi-setup-1.localdomain\n' +
			'compute is up\n' +
			'2020-06-30 09:58:57,769 [host_reader         ] [INFO    ]  inside get_ntp\n' +
			'2020-06-30 09:58:57,841 [host_reader         ] [INFO    ]  NO ntp for host name: overcloud-dpdkperformancecompute-hanoi-setup-1\n' +
			'\n' +
			'VALIDATION TOOL REPORT:\n' +
			'=======================\n' +
			'\n' +
			'\n' +
			'SUMMARY REPORT:\n' +
			'===============\n' +
			'+----------+---------+--------+\n' +
			'| criteria | Status  | Actual |\n' +
			'+----------+---------+--------+\n' +
			'| summary  | SUCCESS | 3/3    |\n' +
			'+----------+---------+--------+\n' +
			'+--------------------------+-----------+---------+-----------+\n' +
			'| criteria                 | Requested | Status  | Actual    |\n' +
			'+--------------------------+-----------+---------+-----------+\n' +
			'| online_computes          |         3 | SUCCESS | 3/3       |\n' +
			'| available_cores          | dont care | SUCCESS | 2/3       |\n' +
			'| core_speed               | dont care | SUCCESS | 2/3       |\n' +
			'| cpu_isolation            | dont care | SUCCESS | 2/3       |\n' +
			'| cpu_model                | dont care | SUCCESS | 3/3       |\n' +
			'| data_interface_mtu_ovs   | dont care | SUCCESS | 2/3       |\n' +
			'| data_interface_mtu_sriov | dont care | SUCCESS | 2/3       |\n' +
			'| sriov_enabled            | dont care | SUCCESS | 3/3       |\n' +
			'| sriov_number_of_vfs      | dont care | SUCCESS | 3/3       |\n' +
			'| hyper_threading_enabled  | dont care | SUCCESS | 3/3       |\n' +
			'| huge_pages_1gb_count     | dont care | SUCCESS | 3/3       |\n' +
			'| huge_pages_2mb_count     | dont care | SUCCESS | 3/3       |\n' +
			'| cpu_allocation_ratio     | dont care | SUCCESS | 3/3       |\n' +
			'| ram_allocation_ratio     | dont care | SUCCESS | 3/3       |\n' +
			'| iommu                    | dont care | SUCCESS | 3/3       |\n' +
			'| trust                    | dont care | SUCCESS | False     |\n' +
			'| openstack_version        |     Rocky | SUCCESS | Rocky     |\n' +
			'| ceph_status              | dont care | SUCCESS | HEALTH_OK |\n' +
			'| ceph_replication_size    | dont care | SUCCESS | 2         |\n' +
			'|                          |           |         |           |\n' +
			'+--------------------------+-----------+---------+-----------+\n' +
			'\n' +
			'\n' +
			'FULL REPORT:\n' +
			'============\n' +
			'\n' +
			'full report for compute: dpdk_zone: overcloud-dpdkperformancecompute-hanoi-setup-0.localdomain\n' +
			'+--------------------------+-----------+-----------+---------+---------------------+\n' +
			'| criteria                 | operand   | Requested | Status  | Actual              |\n' +
			'+--------------------------+-----------+-----------+---------+---------------------+\n' +
			'| compute_state            | ==        | up        | SUCCESS | up                  |\n' +
			'| available_cores          | dont care | dont care | SUCCESS | 80                  |\n' +
			'| core_speed               | dont care | dont care | SUCCESS | 2.10                |\n' +
			'|                          |           |           |         |                     |\n' +
			'| cpu_isolation            | dont care | dont care | SUCCESS | FAIL                |\n' +
			'| cpu_model                | dont care | dont care | SUCCESS | Skylake-Server-IBRS |\n' +
			'| data_interface_mtu_ovs   | dont care | dont care | SUCCESS | 9000                |\n' +
			'| data_interface_mtu_sriov | dont care | dont care | SUCCESS | 0                   |\n' +
			'| sriov_enabled            | dont care | dont care | SUCCESS | False               |\n' +
			'| sriov_number_of_vfs      | dont care | dont care | SUCCESS | 0                   |\n' +
			'| hyper_threading_enabled  | dont care | dont care | SUCCESS | True                |\n' +
			'| huge_pages_1gb_count     | dont care | dont care | SUCCESS | 158                 |\n' +
			'| huge_pages_2mb_count     | dont care | dont care | SUCCESS | 0                   |\n' +
			'| cpu_allocation_ratio     | dont care | dont care | SUCCESS | 1.0                 |\n' +
			'| ram_allocation_ratio     | dont care | dont care | SUCCESS | 0.85                |\n' +
			'| iommu                    | dont care | dont care | SUCCESS | True                |\n' +
			'| trust                    | dont care | dont care | SUCCESS | False               |\n' +
			'| full_pass                |           | SUCCESS   | SUCCESS | SUCCESS             |\n' +
			'+--------------------------+-----------+-----------+---------+---------------------+\n' +
			'\n' +
			'full report for compute: sriov_zone: overcloud-sriovperformancecompute-hanoi-setup-0.localdomain\n' +
			'+--------------------------+-----------+-----------+---------+---------------------+\n' +
			'| criteria                 | operand   | Requested | Status  | Actual              |\n' +
			'+--------------------------+-----------+-----------+---------+---------------------+\n' +
			'| compute_state            | ==        | up        | SUCCESS | up                  |\n' +
			'| available_cores          | dont care | dont care | SUCCESS | 80                  |\n' +
			'| core_speed               | dont care | dont care | SUCCESS | 2.10                |\n' +
			'|                          |           |           |         |                     |\n' +
			'| cpu_isolation            | dont care | dont care | SUCCESS | SUCCESS             |\n' +
			'| cpu_model                | dont care | dont care | SUCCESS | Skylake-Server-IBRS |\n' +
			'| data_interface_mtu_ovs   | dont care | dont care | SUCCESS | 9000                |\n' +
			'| data_interface_mtu_sriov | dont care | dont care | SUCCESS | 0                   |\n' +
			'| sriov_enabled            | dont care | dont care | SUCCESS | True                |\n' +
			'| sriov_number_of_vfs      | dont care | dont care | SUCCESS | 184                 |\n' +
			'| hyper_threading_enabled  | dont care | dont care | SUCCESS | True                |\n' +
			'| huge_pages_1gb_count     | dont care | dont care | SUCCESS | 0                   |\n' +
			'| huge_pages_2mb_count     | dont care | dont care | SUCCESS | 0                   |\n' +
			'| cpu_allocation_ratio     | dont care | dont care | SUCCESS | 1.0                 |\n' +
			'| ram_allocation_ratio     | dont care | dont care | SUCCESS | 0.85                |\n' +
			'| iommu                    | dont care | dont care | SUCCESS | True                |\n' +
			'| trust                    | dont care | dont care | SUCCESS | False               |\n' +
			'| full_pass                |           | SUCCESS   | SUCCESS | SUCCESS             |\n' +
			'+--------------------------+-----------+-----------+---------+---------------------+\n' +
			'\n' +
			'full report for compute: dpdk_zone: overcloud-dpdkperformancecompute-hanoi-setup-1.localdomain\n' +
			'+-------------------------+-----------+-----------+---------+---------------------+\n' +
			'| criteria                | operand   | Requested | Status  | Actual              |\n' +
			'+-------------------------+-----------+-----------+---------+---------------------+\n' +
			'| compute_state           | ==        | up        | SUCCESS | up                  |\n' +
			'| cpu_model               | dont care | dont care | SUCCESS | Skylake-Server-IBRS |\n' +
			'| sriov_enabled           | dont care | dont care | SUCCESS | False               |\n' +
			'| sriov_number_of_vfs     | dont care | dont care | SUCCESS | 0                   |\n' +
			'| hyper_threading_enabled | dont care | dont care | SUCCESS | True                |\n' +
			'| huge_pages_1gb_count    | dont care | dont care | SUCCESS | 158                 |\n' +
			'| huge_pages_2mb_count    | dont care | dont care | SUCCESS | 0                   |\n' +
			'| cpu_allocation_ratio    | dont care | dont care | SUCCESS | 1.0                 |\n' +
			'| ram_allocation_ratio    | dont care | dont care | SUCCESS | 0.85                |\n' +
			'| iommu                   | dont care | dont care | SUCCESS | False               |\n' +
			'| trust                   | dont care | dont care | SUCCESS | False               |\n' +
			'| full_pass               |           | SUCCESS   | SUCCESS | SUCCESS             |\n' +
			'+-------------------------+-----------+-----------+---------+---------------------+\n' +
			'\n' +
			'NOVL execution finished !\n' +
			'executing command: rm -f /opt/novl/nodejs_server/tmp_input.yaml\n' +
			'stderr: \n' +
			'ret_code: 0\n'
	}
};
