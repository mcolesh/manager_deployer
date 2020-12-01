module.exports = {
	cluster_bm_installation_initial_page: {
		display: 'Hardware',
		fields: [
			{
				display: 'Hardware Type',
				help: 'Select Hardware type',
				name: 'hardware',
				required: true,
				type: 'select',
				values: ['airframe']
			},
			{
				default: 'CREATE NEW CONFIGURATION',
				display: 'Configurations',
				help: 'Choose file with saved configuration',
				name: 'configurations_list',
				required: true,
				type: 'select',
				values: ['CREATE NEW CONFIGURATION']
			}
		],
		name: 'cluster_bm_installation_initial_page'
	},
	cluster_bm_installation_is_page_dependencies_ready: {
		message: '',
		ready: true
	},
	cluster_bm_installation_status: { status: null },
	cluster_bm_installation_main: {
		display: 'Container Manager installation',
		name: 'cluster_bm_installation',
		sections: [
			{
				display: 'Hardware',
				name: 'general',
				subSections: [
					{
						display: 'Hardware',
						fields: [
							{
								default: 'airframe',
								display: 'Chosen Platform',
								name: 'platform',
								readonly: true,
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: 'bvt',
								display: 'Cloud Name',
								help:
									'Set custom hostnames for all hosts in the cluster. Due to FQDN restrictions, only lower-case letters, numbers and dashes are allowed with a maximum of 15 characters total. Example: cr1-rack-1.\nIf remote ELK is used for multiple CBIS clusters, a unique cloud name must be used for each installed cluster.',
								name: 'CBIS:common:cloud_name',
								readonly: true,
								required: true,
								type: 'text',
								validation: '^[a-z][a-z0-9-]{2,15}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'Baremetal',
								display: 'Provider Type',
								name: 'provider_type',
								readonly: true,
								required: true,
								type: 'text',
								validation: '^[A-Za-z][A-Za-z0-9]*$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'Central',
								display: 'Life Cycle Management type',
								help:
									'Central for dedicated CBIS Manager server, Cluster for manager part of the cluster',
								name: 'CBIS:common:management_type',
								type: 'select',
								values: ['Central', 'Cluster']
							},
							{
								default: 'ens4f0',
								display: 'NIC 1 Port 1 Interface Name',
								help:
									'Edit this to change port name for Controller and Compute Nodes configurations. Infrastructure VLANs: (provisioning, OpenStack API, storage and storage management, tenant VLAN on SR-IOV computes and external VLAN on controllers)',
								name: 'CBIS:common_network_config:nic_1_port_1:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens4f1',
								display: 'NIC 1 Port 2 Interface Name',
								help:
									'Edit this to change port name for Controller and Compute Nodes configurations. Infrastructure VLANs: (provisioning, OpenStack API, storage and storage management, tenant VLAN on SR-IOV computes and external VLAN on controllers)',
								name: 'CBIS:common_network_config:nic_1_port_2:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens1f0',
								display: 'NIC 2 Port 1 Interface Name',
								help:
									'Edit this to change port name for Controller and Compute Nodes configurations. Tenant VLAN and provider networks or SR-IOV VFs',
								name: 'CBIS:common_network_config:nic_2_port_1:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens1f1',
								display: 'NIC 2 Port 2 Interface Name',
								help:
									'Edit this to change port name for Controller and Compute Nodes configurations. Tenant VLAN and provider networks or SR-IOV VFs',
								name: 'CBIS:common_network_config:nic_2_port_2:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens12f0',
								display: 'NIC 3 Port 1 Interface Name',
								help:
									'Edit this to change port name for Controller and Compute Nodes configurations. Provider networks or SR-IOV VFs',
								name: 'CBIS:common_network_config:nic_3_port_1:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens12f1',
								display: 'NIC 3 Port 2 Interface Name',
								help:
									'Edit this to change port name for Controller and Compute Nodes configurations. Provider networks or SR-IOV VFs',
								name: 'CBIS:common_network_config:nic_3_port_2:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens4f0',
								display: 'Storage NIC 1 Port 1 Interface Name',
								help:
									'Edit this to change port name for Storage Nodes configurations. Provisioning, storage and storage management VLANs',
								name: 'CBIS:common_network_config:storage_nic_1_port_1:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens4f1',
								display: 'Storage NIC 1 Port 2 Interface Name',
								help:
									'Edit this to change port name for Storage Nodes configurations. Provisioning, storage and storage management VLANs',
								name: 'CBIS:common_network_config:storage_nic_1_port_2:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens1f0',
								display: 'Storage NIC 2 Port 1 Interface Name',
								help:
									'Edit this to change port name for Storage Nodes configurations. Storage VLAN, for 2 NIC storage nodes (where applicable)',
								name: 'CBIS:common_network_config:storage_nic_2_port_1:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'ens1f1',
								display: 'Storage NIC 2 Port 2 Interface Name',
								help:
									'Edit this to change port name for Storage Nodes configurations. Storage VLAN, for 2 NIC storage nodes (where applicable)',
								name: 'CBIS:common_network_config:storage_nic_2_port_2:name',
								required: 'true',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: false,
								display: 'Custom Installation Enabled',
								help: 'If enabled, you can change the network interfaces names',
								name: 'is_custom_hardware',
								type: 'boolean'
							},
							{
								default: 'CaaS Default',
								display: 'Network Scheme',
								help:
									"Select 'Separated Infra' to set infrastructure traffic isolation at NIC level.\nSelect 'Default' for Infrastructure traffic on Linux bond.\nSelect 'Legacy' for OVS bond for infrastructure and tenant",
								name: 'network_scheme',
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'select',
								values: ['CaaS Default']
							},
							{
								default: 'Active-Backup (mode-1)',
								display: 'Infra Bond Type',
								help: 'Select Infra Bond Type',
								name: 'Infra_mode',
								required: true,
								showIf: { parentName: 'network_scheme', parentValue: ['CaaS Default'] },
								type: 'select',
								values: ['Active-Active (mode-4, LACP)', 'Active-Backup (mode-1)']
							},
							{
								default: 'CaaS Default',
								display: 'Network Scheme',
								help: 'To edit, enable the Custom Installation flag',
								name: 'default_network_scheme',
								readonly: true,
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: false },
								type: 'select',
								values: ['CaaS Default']
							},
							{
								default: 'Active-Backup (mode-1)',
								display: 'Infra Bond Type',
								help: 'To edit, enable the Custom Installation flag',
								name: 'default_Infra_mode',
								readonly: true,
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: false },
								type: 'select',
								values: ['Active-Active (mode-4, LACP)', 'Active-Backup (mode-1)']
							},
							{
								display: 'IPMI Username',
								name: 'ipmi_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9^._-]+$',
								validationDescription: "Only alphabet, numeric, '^', '.', '_' and '-' are allowed "
							},
							{
								default: '',
								display: 'IPMI Password',
								name: 'ipmi_password',
								required: true,
								type: 'password',
								validation: '^[A-Za-z0-9$%#@!^&*?.()=+~{}/|_-]+$',
								validationDescription:
									"Only alphabet, numeric, '!', '@', '#', '$', '%', '^', '&', '*', '_', '?', '.', '(', ')', '=', '+', '~', '{', '}', '/', '|' and '-' are allowed "
							},
							{
								default: false,
								display: 'Enable External Storage',
								help:
									'Enable external storage (e.g. EMC, NetApp or hpe3par), which is consumed and managed by Cinder as volume types.',
								name: 'CBIS:storage:external_storage_enabled',
								readonly: true,
								type: 'boolean'
							},
							{
								default: 'emc',
								display: 'External Storage System',
								help: 'External storage system type - EMC, NetApp or hpe3par',
								name: 'CBIS:storage:external_storage_system',
								required: true,
								showIf: { parentName: 'CBIS:storage:external_storage_enabled', parentValue: true },
								type: 'select',
								values: ['netapp', 'hpe3par', 'emc']
							},
							{
								default: [],
								display: 'Modules to delay',
								help:
									'Add kernel modules to delay in order to let /dev/sda appear first. Each module will be disabled until sda appears, and then loads them back. Relevant for Storage and Compute nodes.',
								name: 'delay_modules1',
								type: 'host-list',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: ['qla2xxx'],
								display: 'Modules to delay',
								help:
									'Add kernel modules to delay in order to let /dev/sda appear first. Each module will be disabled until sda appears, and then loads them back. Relevant for Storage and Compute nodes.',
								name: 'delay_modules2',
								showIf: {
									parentName: 'CBIS:storage:external_storage_system',
									parentValue: 'hpe3par'
								},
								type: 'host-list',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: [],
								display: 'Modules to delay',
								help:
									'Add kernel modules to delay in order to let /dev/sda appear first. Each module will be disabled until sda appears, and then loads them back. Relevant for Storage and Compute nodes.',
								name: 'delay_modules3',
								showIf: {
									parentName: 'CBIS:storage:external_storage_system',
									parentValue: ['netapp', 'emc']
								},
								type: 'host-list',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								allowCreate: true,
								display: 'External Storage Name',
								help: 'This value represent the external storage backend name (read-only)',
								name: 'CBIS:storage:external_storage_volume_backend_name',
								parentChildDependencyMap: {
									parentChildMap: {
										emc: { default: 'tripleo_emc', values: ['tripleo_emc'] },
										hpe3par: { default: 'tripleo_hpe3par', values: ['tripleo_hpe3par'] },
										netapp: { default: 'tripleo_netapp', values: ['tripleo_netapp'] }
									},
									parentName: 'CBIS:storage:external_storage_system'
								},
								readonly: true,
								required: false,
								showIf: {
									operator: 'or',
									parentName: 'CBIS:storage:external_storage_system',
									parentValue: ['emc', 'netapp', 'hpe3par']
								},
								type: 'select',
								values: ['tripleo_emc', 'tripleo_netapp', 'tripleo_hpe3par']
							},
							{
								allowCreate: true,
								display: 'External Storage Volume Driver',
								help:
									'Insert cinder volume driver name, the name should start after the prefix cinder.volume.drivers.',
								name: 'CBIS:storage:external_storage_volume_driver_name',
								parentChildDependencyMap: {
									parentChildMap: {
										emc: {
											default: 'dell_emc.vnx.driver.VNXDriver',
											values: ['dell_emc.vnx.driver.VNXDriver', 'dell_emc.unity.Driver']
										},
										hpe3par: {
											default: 'hpe.hpe_3par_fc.HPE3PARFCDriver',
											values: [
												'hpe.hpe_3par_fc.HPE3PARFCDriver',
												'hpe.hpe_3par_iscsi.HPE3PARISCSIDriver'
											]
										},
										netapp: {
											default: 'netapp.common.NetAppDriver',
											values: ['netapp.common.NetAppDriver']
										}
									},
									parentName: 'CBIS:storage:external_storage_system'
								},
								required: true,
								showIf: {
									operator: 'or',
									parentName: 'CBIS:storage:external_storage_system',
									parentValue: ['emc', 'netapp', 'hpe3par']
								},
								type: 'select',
								values: [
									'dell_emc.vnx.driver.VNXDriver',
									'dell_emc.unity.Driver',
									'netapp.common.NetAppDriver',
									'netapp_eseries.common.NetAppDriver',
									'hpe.hpe_3par_fc.HPE3PARFCDriver',
									'hpe.hpe_3par_iscsi.HPE3PARISCSIDriver'
								]
							},
							{
								default: 'rw',
								display: 'External Storage Login',
								help:
									'User name for external storage system.\nNote: for NetApp the default value is rw,\nWe advise to leave the default, unless you need to reconfigure this due to password protection in NetApp.',
								name: 'CBIS:storage:external_storage_login',
								required: true,
								showIf: { parentName: 'CBIS:storage:external_storage_enabled', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9^._-]+$',
								validationDescription: "Only alphabet, numeric, '^', '.', '_' and '-' are allowed "
							},
							{
								default: 'rw',
								display: 'External Storage Password',
								help:
									'Login password for external storage system.\nNote: for NetApp the default value is rw,\nwe advise to leave the default unless you need to reconfigure this due to password protection in NetApp.',
								name: 'CBIS:storage:external_storage_password',
								required: true,
								showIf: { parentName: 'CBIS:storage:external_storage_enabled', parentValue: true },
								type: 'password',
								validation: '^[A-Za-z0-9$%#@!^&*?.()=+~{}/|_-]+$',
								validationDescription:
									"Only alphabet, numeric, '!', '@', '#', '$', '%', '^', '&', '*', '_', '?', '.', '(', ')', '=', '+', '~', '{', '}', '/', '|' and '-' are allowed "
							},
							{
								default: '',
								display: 'External Storage Array Password',
								help: 'Storage array password for external NetApp storage system.',
								name: 'CBIS:storage:external_storage_sa_password',
								required: false,
								showIf: {
									parentName: 'CBIS:storage:external_storage_system',
									parentValue: 'netapp'
								},
								type: 'password',
								validation: '^[A-Za-z0-9$%#@!^&*?.()=+~{}/|_-]+$',
								validationDescription:
									"Only alphabet, numeric, '!', '@', '#', '$', '%', '^', '&', '*', '_', '?', '.', '(', ')', '=', '+', '~', '{', '}', '/', '|' and '-' are allowed "
							},
							{
								display: 'NetApp Controller IP Addresses',
								help: 'IP addresses of the NetApp controller',
								name: 'CBIS:storage:external_storage_controller_ips',
								required: true,
								showIf: {
									parentName: 'CBIS:storage:external_storage_system',
									parentValue: 'netapp'
								},
								type: 'ip-list'
							},
							{
								display: 'Storage Processor A IP',
								help: 'Storage IP of VNX storage processor A',
								name: 'CBIS:storage:external_storage_san_ip',
								required: true,
								showIf: {
									parentName: 'CBIS:storage:external_storage_system',
									parentValue: ['emc', 'hpe3par']
								},
								type: 'ip'
							},
							{
								display: 'Storage Processor B IP',
								help: 'Storage IP of VNX storage processor B',
								name: 'CBIS:storage:external_storage_secondary_san_ip',
								required: true,
								showIf: { parentName: 'CBIS:storage:external_storage_system', parentValue: 'emc' },
								type: 'ip'
							},
							{
								display: 'EMC IO Port List',
								help:
									'EMC I/O ports used by the driver to connect to the iSCSI ports of the EMC.\nWe recommend that you specify the exact ports, or there will be a penalty in performance, (if the EMC used serves other setups and exposes VLANs that are not available for this setup)\nEach I/O port should be as follows: [SP-Port]-[virtual port id] and it is mandatory. Example: a-12-1',
								name: 'CBIS:storage:external_storage_io_port_list',
								required: true,
								showIf: { parentName: 'CBIS:storage:external_storage_system', parentValue: 'emc' },
								type: 'host-list',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								display: 'External Storage Pool Names',
								help: 'Storage pool names e.g. pool1, pool2',
								name: 'CBIS:storage:external_storage_storage_pools',
								required: true,
								showIf: { parentName: 'CBIS:storage:external_storage_enabled', parentValue: true },
								type: 'host-list',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: false,
								display: 'Enable multi attach',
								help:
									'Disabling the multi attach flag for external storage will limit live migration with attached volumes.\nWhen enabled it will limit the backend to 256 cinder volumes.',
								name: 'CBIS:storage:external_storage_enable_multi_attach',
								showIf: {
									parentName: 'CBIS:storage:external_storage_volume_driver_name',
									parentValue: [
										'dell_emc.unity.Driver',
										'hpe.hpe_3par_fc.HPE3PARFCDriver',
										'hpe.hpe_3par_iscsi.HPE3PARISCSIDriver'
									]
								},
								type: 'boolean'
							},
							{
								default: true,
								display: 'Enable Ceph backend',
								help:
									'Disabling the Ceph backend disables local storage usage where external storage is available.\nIf disabled, the Ceph backend will not be automatically configured. However, admin may define one later.\nGlance will be configured to store images via Cinder on NetApp.',
								name: 'CBIS:storage:ceph_backend_enabled',
								showIf: { parentName: 'CBIS:storage:external_storage_enabled', parentValue: true },
								type: 'boolean'
							}
						],
						name: 'hardware'
					},
					{
						display: 'Installation Server Parameters',
						fields: [
							{
								default: ['1.1.1.116', '1.1.1.115'],
								display: 'NTP Servers',
								help: 'Enter list of NTP servers e.g. 1.1.1.1',
								name: 'CBIS:common:ntp_servers',
								readonly: true,
								required: true,
								type: 'ip-list',
								unique: true,
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: ['1.1.1.252', '1.1.1.6'],
								display: 'DNS servers',
								help: 'Enter list of DNS servers e.g. 1.1.1.1',
								name: 'CBIS:common:dns_servers',
								readonly: true,
								required: true,
								type: 'ip-list',
								unique: true,
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: true,
								display: 'Configure Installation Server Network',
								help:
									'If enabled, the Installation server network will be reconfigured and br-public and br-provisioning bridges will be created. Connectivity to the server may be lost for several minutes, and therefore CBIS-Manager will be down during this period. ',
								name: 'CBIS:undercloud:configure_hypervisor_network',
								readonly: true,
								type: 'boolean'
							},
							{
								default: ['IPv4'],
								display: 'Select IP Stack Type',
								multiple: true,
								name: 'CBIS:undercloud:enable_ipv6',
								readonly: true,
								required: true,
								type: 'select',
								values: ['IPv4', 'IPv6']
							},
							{
								display: 'External Network VLAN',
								help: 'Manager external network vlan',
								name: 'CBIS:undercloud:vlan',
								required: true,
								restrictions: { max: 4096, min: 1 },
								showIf: { parentName: 'CBIS:common:management_type', parentValue: 'Central' },
								type: 'number'
							},
							{
								default: '1.1.1.32/26',
								display: 'Installation Server External Address (CIDR format)',
								help: 'Enter IP/Mask e.g. 23.45.67.89/24',
								name: 'CBIS:undercloud:hypervisor_cidr',
								readonly: true,
								required: true,
								showIf: { parentName: 'CBIS:undercloud:enable_ipv6', parentValue: ['IPv4'] },
								type: 'cidr'
							},
							{
								default: '1.1.1.1',
								display: 'IPv4 External Gateway for Manager',
								help:
									'The Installation server require an IPv4 gateway. If an IPv6 gateway was entered in the external network configuration, the IPv4 gateway needs to be entered here.',
								name: 'CBIS:undercloud:gateway',
								readonly: true,
								required: true,
								showIf: { parentName: 'CBIS:undercloud:enable_ipv6', parentValue: ['IPv4'] },
								type: 'ip'
							},
							{
								default: '1.1.1.254/21',
								display: 'Installation Server Provisioning Address (CIDR format)',
								help:
									'The local manager IP/netmsak to use for provisioning subnets, must be reachable to all cluster using the provisioning gateway',
								name: 'CBIS:undercloud:hypervisor_provisioning_cidr',
								required: true,
								showIf: { parentName: 'CBIS:common:management_type', parentValue: 'Central' },
								type: 'cidr'
							},
							{
								default: '1.1.1.254',
								display: 'Installation Server Provisioning Gateway',
								help:
									'The gateway to use to reach provisioning subnets from this installation server to the other clusters',
								name: 'CBIS:undercloud:provisioning_gateway',
								readonly: true,
								required: true,
								showIf: { parentName: 'CBIS:common:management_type', parentValue: 'Central' },
								type: 'ip'
							},
							{
								default: 0,
								display: 'Installation Server Provisioning VLAN',
								help: 'The VLAN to use for the provisioning subnet',
								name: 'CBIS:undercloud:provisioning_vlan',
								required: true,
								restrictions: { max: 4095, min: 0 },
								showIf: { parentName: 'CBIS:common:management_type', parentValue: 'Central' },
								type: 'number'
							},
							{
								default: '',
								display: 'IP Version for Management VIP',
								help: "VIP will be the dedicated manager's physical IP",
								name: 'CBIS:undercloud:management_vip_version',
								required: true,
								showIf: {
									operator: 'and',
									parentName: 'CBIS:undercloud:enable_ipv6',
									parentValue: ['IPv4', 'IPv6']
								},
								type: 'select',
								values: ['IPv4', 'IPv6']
							},
							{
								display: 'Undercloud IPv6 Exteranl CIDR',
								help: 'IPv6 static IP address in CIDR format',
								name: 'CBIS:undercloud:hypervisor_cidr6',
								required: true,
								showIf: { parentName: 'CBIS:undercloud:enable_ipv6', parentValue: ['IPv6'] },
								type: 'cidr'
							},
							{
								display: 'IPv6 External Gateway',
								help: 'The Installation server requires an IPv6 gateway.',
								name: 'CBIS:undercloud:gateway_v6',
								required: true,
								showIf: { parentName: 'CBIS:undercloud:enable_ipv6', parentValue: ['IPv6'] },
								type: 'ip'
							}
						],
						name: 'network_params'
					},
					{
						display: 'Deployment Optional Parameters',
						fields: [
							{
								default: 'UTC',
								display: 'Time Zone',
								name: 'CBIS:common:time_zone',
								readonly: true,
								required: true,
								type: 'timezone'
							},
							{
								default: 9000,
								display: 'Host Underlay MTU',
								help:
									'The maximum size of an IP packet (MTU) that can traverse the physical network infrastructure without fragmentation.',
								name: 'CBIS:common:host_underlay_mtu',
								required: true,
								restrictions: { max: 9999, min: 1100 },
								type: 'number'
							},
							{
								default: 'us',
								display: 'Keyboard',
								name: 'CBIS:common:keyboard',
								required: true,
								type: 'select',
								values: [
									'ANSI-dvorak',
									'al',
									'al-plisi-d1',
									'amiga-de',
									'amiga-us',
									'applkey',
									'at',
									'at-mac',
									'at-nodeadkeys',
									'at-sundeadkeys',
									'atari-de',
									'atari-se',
									'atari-uk-falcon',
									'atari-us',
									'az',
									'azerty',
									'ba',
									'ba-alternatequotes',
									'ba-unicode',
									'ba-unicodeus',
									'ba-us',
									'backspace',
									'bashkir',
									'be',
									'be-iso-alternate',
									'be-latin1',
									'be-nodeadkeys',
									'be-oss',
									'be-oss_latin9',
									'be-oss_sundeadkeys',
									'be-sundeadkeys',
									'be-wang',
									'bg-cp1251',
									'bg-cp855',
									'bg_bds-cp1251',
									'bg_bds-utf8',
									'bg_pho-cp1251',
									'bg_pho-utf8',
									'br',
									'br-abnt',
									'br-abnt2',
									'br-dvorak',
									'br-latin1-abnt2',
									'br-latin1-us',
									'br-nativo',
									'br-nativo-epo',
									'br-nativo-us',
									'br-nodeadkeys',
									'by',
									'by-cp1251',
									'by-latin',
									'bywin-cp1251',
									'ca',
									'ca-eng',
									'ca-fr-dvorak',
									'ca-fr-legacy',
									'ca-multi',
									'ca-multix',
									'cf',
									'ch',
									'ch-de_mac',
									'ch-de_nodeadkeys',
									'ch-de_sundeadkeys',
									'ch-fr',
									'ch-fr_mac',
									'ch-fr_nodeadkeys',
									'ch-fr_sundeadkeys',
									'ch-legacy',
									'cm',
									'cm-azerty',
									'cm-dvorak',
									'cm-french',
									'cm-qwerty',
									'cn',
									'croat',
									'ctrl',
									'cz',
									'cz-bksl',
									'cz-cp1250',
									'cz-dvorak-ucw',
									'cz-lat2',
									'cz-lat2-prog',
									'cz-qwerty',
									'cz-qwerty_bksl',
									'cz-us-qwertz',
									'de',
									'de-T3',
									'de-deadacute',
									'de-deadgraveacute',
									'de-dsb',
									'de-dsb_qwertz',
									'de-dvorak',
									'de-latin1',
									'de-latin1-nodeadkeys',
									'de-legacy',
									'de-mac',
									'de-mac_nodeadkeys',
									'de-mobii',
									'de-neo',
									'de-nodeadkeys',
									'de-qwerty',
									'de-ro',
									'de-ro_nodeadkeys',
									'de-sundeadkeys',
									'de-tr',
									'de_CH-latin1',
									'de_alt_UTF-8',
									'defkeymap',
									'defkeymap_V1.0',
									'dk',
									'dk-dvorak',
									'dk-latin1',
									'dk-mac',
									'dk-mac_nodeadkeys',
									'dk-nodeadkeys',
									'dk-winkeys',
									'dvorak',
									'dvorak-ca-fr',
									'dvorak-es',
									'dvorak-fr',
									'dvorak-l',
									'dvorak-r',
									'dvorak-ru',
									'dvorak-sv-a1',
									'dvorak-sv-a5',
									'dvorak-uk',
									'ee',
									'ee-dvorak',
									'ee-nodeadkeys',
									'ee-us',
									'emacs',
									'emacs2',
									'en-latin9',
									'epo',
									'epo-legacy',
									'es',
									'es-ast',
									'es-cat',
									'es-cp850',
									'es-deadtilde',
									'es-dvorak',
									'es-mac',
									'es-nodeadkeys',
									'es-olpc',
									'es-sundeadkeys',
									'es-winkeys',
									'et',
									'et-nodeadkeys',
									'euro',
									'euro1',
									'euro2',
									'fi',
									'fi-classic',
									'fi-latin1',
									'fi-latin9',
									'fi-mac',
									'fi-nodeadkeys',
									'fi-old',
									'fi-smi',
									'fi-winkeys',
									'fo',
									'fo-nodeadkeys',
									'fr',
									'fr-bepo',
									'fr-bepo_latin9',
									'fr-bre',
									'fr-dvorak',
									'fr-latin0',
									'fr-latin1',
									'fr-latin9',
									'fr-latin9_nodeadkeys',
									'fr-latin9_sundeadkeys',
									'fr-mac',
									'fr-nodeadkeys',
									'fr-oci',
									'fr-old',
									'fr-oss',
									'fr-oss_latin9',
									'fr-oss_nodeadkeys',
									'fr-oss_sundeadkeys',
									'fr-pc',
									'fr-sundeadkeys',
									'fr_CH',
									'fr_CH-latin1',
									'gb',
									'gb-colemak',
									'gb-dvorak',
									'gb-dvorakukp',
									'gb-extd',
									'gb-intl',
									'gb-mac',
									'gb-mac_intl',
									'ge',
									'ge-ergonomic',
									'ge-mess',
									'ge-ru',
									'gh',
									'gh-akan',
									'gh-avn',
									'gh-ewe',
									'gh-fula',
									'gh-ga',
									'gh-generic',
									'gh-gillbt',
									'gh-hausa',
									'gr',
									'gr-pc',
									'hr',
									'hr-alternatequotes',
									'hr-unicode',
									'hr-unicodeus',
									'hr-us',
									'hu',
									'hu-101_qwerty_comma_dead',
									'hu-101_qwerty_comma_nodead',
									'hu-101_qwerty_dot_dead',
									'hu-101_qwerty_dot_nodead',
									'hu-101_qwertz_comma_dead',
									'hu-101_qwertz_comma_nodead',
									'hu-101_qwertz_dot_dead',
									'hu-101_qwertz_dot_nodead',
									'hu-102_qwerty_comma_dead',
									'hu-102_qwerty_comma_nodead',
									'hu-102_qwerty_dot_dead',
									'hu-102_qwerty_dot_nodead',
									'hu-102_qwertz_comma_dead',
									'hu-102_qwertz_comma_nodead',
									'hu-102_qwertz_dot_dead',
									'hu-102_qwertz_dot_nodead',
									'hu-nodeadkeys',
									'hu-qwerty',
									'hu-standard',
									'hu101',
									'ie',
									'ie-CloGaelach',
									'ie-UnicodeExpert',
									'ie-ogam_is434',
									'il',
									'il-heb',
									'il-phonetic',
									'in-eng',
									'iq-ku',
									'iq-ku_alt',
									'iq-ku_ara',
									'iq-ku_f',
									'ir-ku',
									'ir-ku_alt',
									'ir-ku_ara',
									'ir-ku_f',
									'is',
									'is-Sundeadkeys',
									'is-dvorak',
									'is-latin1',
									'is-latin1-us',
									'is-mac',
									'is-mac_legacy',
									'is-nodeadkeys',
									'it',
									'it-geo',
									'it-ibm',
									'it-mac',
									'it-nodeadkeys',
									'it-us',
									'it-winkeys',
									'it2',
									'jp',
									'jp-OADG109A',
									'jp-dvorak',
									'jp-kana86',
									'jp106',
									'kazakh',
									'ke',
									'ke-kik',
									'keypad',
									'kr',
									'kr-kr104',
									'ky_alt_sh-UTF-8',
									'kyrgyz',
									'la-latin1',
									'latam',
									'latam-deadtilde',
									'latam-nodeadkeys',
									'latam-sundeadkeys',
									'lt',
									'lt-ibm',
									'lt-lekp',
									'lt-lekpa',
									'lt-std',
									'lt-us',
									'lt.baltic',
									'lt.l4',
									'lv',
									'lv-adapted',
									'lv-apostrophe',
									'lv-ergonomic',
									'lv-fkey',
									'lv-modern',
									'lv-tilde',
									'ma-french',
									'mac-be',
									'mac-de-latin1',
									'mac-de-latin1-nodeadkeys',
									'mac-de_CH',
									'mac-dk-latin1',
									'mac-dvorak',
									'mac-es',
									'mac-euro',
									'mac-euro2',
									'mac-fi-latin1',
									'mac-fr',
									'mac-fr_CH-latin1',
									'mac-it',
									'mac-pl',
									'mac-pt-latin1',
									'mac-se',
									'mac-template',
									'mac-uk',
									'mac-us',
									'md',
									'md-gag',
									'me',
									'me-latinalternatequotes',
									'me-latinunicode',
									'me-latinunicodeyz',
									'me-latinyz',
									'mk',
									'mk-cp1251',
									'mk-utf',
									'mk0',
									'ml',
									'ml-fr-oss',
									'ml-us-intl',
									'ml-us-mac',
									'mt',
									'mt-us',
									'ng',
									'ng-hausa',
									'ng-igbo',
									'ng-yoruba',
									'nl',
									'nl-mac',
									'nl-std',
									'nl-sundeadkeys',
									'nl2',
									'no',
									'no-colemak',
									'no-dvorak',
									'no-latin1',
									'no-mac',
									'no-mac_nodeadkeys',
									'no-nodeadkeys',
									'no-smi',
									'no-smi_nodeadkeys',
									'no-winkeys',
									'pc110',
									'ph',
									'ph-capewell-dvorak',
									'ph-capewell-qwerf2k6',
									'ph-colemak',
									'ph-dvorak',
									'pl',
									'pl-csb',
									'pl-dvorak',
									'pl-dvorak_altquotes',
									'pl-dvorak_quotes',
									'pl-dvp',
									'pl-legacy',
									'pl-qwertz',
									'pl-szl',
									'pl1',
									'pl2',
									'pl3',
									'pl4',
									'pt',
									'pt-latin1',
									'pt-latin9',
									'pt-mac',
									'pt-mac_nodeadkeys',
									'pt-mac_sundeadkeys',
									'pt-nativo',
									'pt-nativo-epo',
									'pt-nativo-us',
									'pt-nodeadkeys',
									'pt-olpc',
									'pt-sundeadkeys',
									'ro',
									'ro-cedilla',
									'ro-std',
									'ro-std_cedilla',
									'ro-winkeys',
									'ro_std',
									'rs-latin',
									'rs-latinalternatequotes',
									'rs-latinunicode',
									'rs-latinunicodeyz',
									'rs-latinyz',
									'ru',
									'ru-cp1251',
									'ru-cv_latin',
									'ru-ms',
									'ru-yawerty',
									'ru1',
									'ru2',
									'ru3',
									'ru4',
									'ru_win',
									'ruwin_alt-CP1251',
									'ruwin_alt-KOI8-R',
									'ruwin_alt-UTF-8',
									'ruwin_alt_sh-UTF-8',
									'ruwin_cplk-CP1251',
									'ruwin_cplk-KOI8-R',
									'ruwin_cplk-UTF-8',
									'ruwin_ct_sh-CP1251',
									'ruwin_ct_sh-KOI8-R',
									'ruwin_ct_sh-UTF-8',
									'ruwin_ctrl-CP1251',
									'ruwin_ctrl-KOI8-R',
									'ruwin_ctrl-UTF-8',
									'se',
									'se-dvorak',
									'se-fi-ir209',
									'se-fi-lat6',
									'se-ir209',
									'se-lat6',
									'se-latin1',
									'se-mac',
									'se-nodeadkeys',
									'se-smi',
									'se-svdvorak',
									'sg',
									'sg-latin1',
									'sg-latin1-lk450',
									'si',
									'si-alternatequotes',
									'si-us',
									'sk',
									'sk-bksl',
									'sk-prog-qwerty',
									'sk-prog-qwertz',
									'sk-qwerty',
									'sk-qwerty_bksl',
									'sk-qwertz',
									'slovene',
									'sr-cy',
									'sun-pl',
									'sun-pl-altgraph',
									'sundvorak',
									'sunkeymap',
									'sunt4-es',
									'sunt4-fi-latin1',
									'sunt4-no-latin1',
									'sunt5-cz-us',
									'sunt5-de-latin1',
									'sunt5-es',
									'sunt5-fi-latin1',
									'sunt5-fr-latin1',
									'sunt5-ru',
									'sunt5-uk',
									'sunt5-us-cz',
									'sunt6-uk',
									'sv-latin1',
									'sy-ku',
									'sy-ku_alt',
									'sy-ku_f',
									'tj_alt-UTF8',
									'tm',
									'tm-alt',
									'tr',
									'tr-alt',
									'tr-crh',
									'tr-crh_alt',
									'tr-crh_f',
									'tr-f',
									'tr-intl',
									'tr-ku',
									'tr-ku_alt',
									'tr-ku_f',
									'tr-sundeadkeys',
									'tr_f-latin5',
									'tr_q-latin5',
									'tralt',
									'trf',
									'trf-fgGIod',
									'trq',
									'ttwin_alt-UTF-8',
									'ttwin_cplk-UTF-8',
									'ttwin_ct_sh-UTF-8',
									'ttwin_ctrl-UTF-8',
									'tw',
									'tw-indigenous',
									'tw-saisiyat',
									'ua',
									'ua-cp1251',
									'ua-utf',
									'ua-utf-ws',
									'ua-ws',
									'uk',
									'unicode',
									'us',
									'us-acentos',
									'us-alt-intl',
									'us-altgr-intl',
									'us-colemak',
									'us-dvorak',
									'us-dvorak-alt-intl',
									'us-dvorak-classic',
									'us-dvorak-intl',
									'us-dvorak-l',
									'us-dvorak-r',
									'us-dvp',
									'us-euro',
									'us-hbs',
									'us-intl',
									'us-mac',
									'us-olpc2',
									'us-workman',
									'us-workman-intl',
									'uz-latin',
									'wangbe',
									'wangbe2',
									'windowkeys'
								]
							}
						],
						initialCollapse: true,
						name: 'common'
					}
				]
			},
			{
				display: 'Resources',
				name: 'overcloud',
				subSections: [
					{
						description: 'Set your VLANs',
						display: 'VLANs',
						fields: [
							{
								display: 'Provisioning Network',
								help: 'Cluster provisioning network vlan',
								name: 'CBIS:subnets:provisioning:vlan',
								required: true,
								restrictions: { max: 4096, min: 0 },
								type: 'number'
							},
							{
								display: 'External OAM Network',
								help: 'CaaS control endpoint network vlan',
								name: 'CBIS:subnets:external:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								display: 'Internal Service Network',
								help: 'K8S main CNI network vlan',
								name: 'CBIS:subnets:tenant:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								display: 'Public Ceph Network',
								help: 'The Ceph client <> Ceph server network vlan',
								name: 'CBIS:subnets:storage:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								display: 'Ceph Cluster Network',
								help: 'The inter-OSD network used for replication vlan',
								name: 'CBIS:subnets:storage_mgmt:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							}
						],
						name: 'vlans'
					},
					{
						display: 'Networks Parameters',
						fields: [
							{
								default: 'IPv4',
								display: 'Select External OAM IP Stack Type',
								multiple: true,
								name: 'CBIS:subnets:external:type',
								required: true,
								type: 'select',
								values: ['IPv4', 'IPv6']
							},
							{
								default: '',
								display: 'External OAM IPv4 CIDR',
								name: 'CBIS:subnets:external:network_address',
								required: true,
								showIf: { parentName: 'CBIS:subnets:external:type', parentValue: ['IPv4'] },
								type: 'cidr'
							},
							{
								default: '',
								display: 'External OAM Gateway IPv4',
								name: 'CBIS:subnets:external:gateway',
								required: true,
								showIf: {
									isExternal: false,
									parentName: 'CBIS:subnets:external:type',
									parentValue: ['IPv4']
								},
								type: 'ip'
							},
							{
								default: '1.1.1.1',
								display: 'IPv4 Range Start',
								name: 'CBIS:subnets:external:ip_range_start',
								readonly: true,
								required: true,
								showIf: {
									isExternal: false,
									parentName: 'CBIS:subnets:external:type',
									parentValue: ['IPv4']
								},
								type: 'ip'
							},
							{
								default: '',
								display: 'IPv4 Range End',
								name: 'CBIS:subnets:external:ip_range_end',
								required: true,
								showIf: {
									isExternal: false,
									parentName: 'CBIS:subnets:external:type',
									parentValue: ['IPv4']
								},
								type: 'ip'
							},
							{
								default: '',
								display: 'IP Version for External VIP',
								help: 'Which IP version address will be used for VIP',
								name: 'CBIS:subnets:external:management_vip_version',
								required: true,
								showIf: {
									operator: 'and',
									parentName: 'CBIS:subnets:external:type',
									parentValue: ['IPv4', 'IPv6']
								},
								type: 'select',
								values: ['IPv4', 'IPv6']
							},
							{
								display: 'External VIP',
								help: 'VIP for NCS and Rados GW',
								name: 'CBIS:subnets:external:vip',
								required: true,
								showIf: { parentName: 'CBIS:subnets:external:type', parentValue: ['IPv4'] },
								type: 'ip'
							},
							{
								default: '',
								display: 'External OAM IPv6 CIDR',
								name: 'CBIS:subnets:external:network_address_v6',
								required: true,
								showIf: { parentName: 'CBIS:subnets:external:type', parentValue: ['IPv6'] },
								type: 'cidr'
							},
							{
								default: '',
								display: 'External OAM Gateway IPv6',
								name: 'CBIS:subnets:external:gateway_v6',
								required: true,
								showIf: {
									isExternal: false,
									parentName: 'CBIS:subnets:external:type',
									parentValue: ['IPv6']
								},
								type: 'ip'
							},
							{
								default: '',
								display: 'IPv6 Range Start',
								name: 'CBIS:subnets:external:ip_range_start_v6',
								required: true,
								showIf: {
									isExternal: false,
									parentName: 'CBIS:subnets:external:type',
									parentValue: ['IPv6']
								},
								type: 'ip'
							},
							{
								default: '',
								display: 'IPv6 Range End',
								name: 'CBIS:subnets:external:ip_range_end_v6',
								required: true,
								showIf: {
									isExternal: false,
									parentName: 'CBIS:subnets:external:type',
									parentValue: ['IPv6']
								},
								type: 'ip'
							},
							{
								display: 'External OAM IPv6 VIP',
								help: 'VIP for NCS and Rados GW',
								name: 'CBIS:subnets:external:ipv6_vip',
								required: true,
								showIf: { parentName: 'CBIS:subnets:external:type', parentValue: ['IPv6'] },
								type: 'ip'
							},
							{
								default: '1.1.1.0/24',
								display: 'Internal Service Network CIDR',
								help: 'K8S main CNI network. Option: ip/mask',
								name: 'CBIS:subnets:tenant:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '1.1.1.0/24',
								display: 'Public Ceph Network CIDR',
								help: 'The Ceph client <> Ceph server network. Option: ip/mask',
								name: 'CBIS:subnets:storage:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '1.1.1.0/24',
								display: 'Ceph Cluster Network CIDR',
								help: 'The inter-OSD network used for replication. Option: ip/mask',
								name: 'CBIS:subnets:storage_mgmt:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '',
								display: 'Provisioning Network CIDR',
								help:
									'Subnets used to provision the nodes -  Make sure the subnet is (at least) routable from the Manager',
								name: 'CBIS:subnets:provisioning:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: false,
								display: 'Configure Provision Network Gateway',
								help:
									'Allows you to set the provision network gateway, if needed. If not setting this, use the same provisioning subnet for manager and cluster ',
								name: 'configure_provision_gateway',
								showIf: { parentName: 'CBIS:common:management_type', parentValue: 'Central' },
								type: 'boolean'
							},
							{
								default: '',
								display: 'Cluster Provisioning Gateway',
								help: 'The gateway servers on this cluster will use to reach the manager',
								name: 'CBIS:subnets:provisioning:gateway',
								required: true,
								showIf: { parentName: 'configure_provision_gateway', parentValue: true },
								type: 'ip'
							},
							{
								default: false,
								display: 'Configure Provision Network IP Ranges',
								help: 'Allows you to change the provision network configuration.',
								name: 'configure_provision_network',
								type: 'boolean'
							},
							{
								display: 'Provisioning Network IP Range Start',
								help: 'Start IP for provisioning',
								name: 'CBIS:subnets:provisioning:ip_range_start',
								required: true,
								showIf: { parentName: 'configure_provision_network', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Provisioning Network IP Range End',
								help: 'End IP for provisioning',
								name: 'CBIS:subnets:provisioning:ip_range_end',
								required: true,
								showIf: { parentName: 'configure_provision_network', parentValue: true },
								type: 'ip'
							}
						],
						name: 'networks_optional'
					},
					{
						display: 'Security Configuration',
						fields: [
							{
								default: 'Mc10vin!!',
								display: 'Linux cbis-admin Password',
								help:
									'Configure the Linux cbis-admin user password on the Undercloud Physical Server and Overcloud. 8-16 characters. Special characters supported: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:linux_cbisadmin_password',
								readonly: true,
								required: true,
								type: 'password',
								validation: '^[a-zA-Z0-9!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription:
									"Only alphabet, numeric, '!', '@', '#', '$', '%', '^', '&', '*', '_', '?', '.', '(', ')', '=', '+', '~', '{', '}', '/', '|' and '-' are allowed Length between 8 to 16 "
							},
							{
								default: 'cbis-admin',
								display: 'Zabbix Username',
								name: 'CBIS:openstack_deployment:zabbix_username',
								readonly: true,
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: 'zabbix',
								display: 'Zabbix Password',
								help:
									'Configure the Zabbix user password. 6-16 characters. Special characters supported: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:zabbix_password',
								readonly: true,
								required: true,
								type: 'password',
								validation: '^[a-zA-Z0-9!@#$%^&*_?.()=+~{}/|-]{6,16}$',
								validationDescription:
									"Only alphabet, numeric, '!', '@', '#', '$', '%', '^', '&', '*', '_', '?', '.', '(', ')', '=', '+', '~', '{', '}', '/', '|' and '-' are allowed Length between 6 to 16 "
							},
							{
								default: 'kibana',
								display: 'Kibana Username',
								name: 'CBIS:openstack_deployment:kibana_username',
								readonly: true,
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'kibanauser',
								display: 'Kibana Password',
								help:
									'Configure the Kibana user password. 6-16 characters. Special characters supported: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:kibana_password',
								readonly: true,
								required: true,
								type: 'password',
								validation: '^[a-zA-Z0-9!@#$%^&*_?.()=+~{}/|-]{6,16}$',
								validationDescription:
									"Only alphabet, numeric, '!', '@', '#', '$', '%', '^', '&', '*', '_', '?', '.', '(', ')', '=', '+', '~', '{', '}', '/', '|' and '-' are allowed Length between 6 to 16 "
							}
						],
						name: 'security'
					},
					{
						display: 'General Optional Parameters',
						fields: [
							{
								default: true,
								display: 'Deploy ELK',
								help: 'Install ELK (Elasticsearch, Logstash, and Kibana)',
								name: 'CBIS:openstack_deployment:deploy_elk',
								type: 'boolean'
							},
							{
								default: 'Welcome to Cluster World!',
								display: 'Message of the day',
								help:
									'This message will be displayed every time that the user performs SSH into the overcloud component',
								name: 'CBIS:openstack_deployment:message_of_the_day',
								required: true,
								type: 'text',
								validation: '^[A-Za-z\\s0-9!.#=_-]+$',
								validationDescription:
									"Only alphabet, numeric, '!', '.', '#', '=', '_', '-' and ' ' are allowed "
							}
						],
						initialCollapse: true,
						name: 'optional-general'
					},
					{
						display: 'Ceph Optional Configuration',
						fields: [
							{
								default: 2,
								display: 'Ceph number of replicas of an object',
								help: 'Ceph replication factor per object.',
								name: 'CBIS:storage:ceph_pool_size',
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								default: 10240,
								display: 'Ceph journal size in mb',
								help:
									'Ceph OSDs disk journal size, to be set globally for all OSDs that use journals.',
								name: 'CBIS:storage:ceph_journal_size',
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								default: 1024,
								display: 'Ceph osd block.db size in mb',
								help:
									'Ceph OSDs disk block.db size, to be set globally for all OSDs that have fast devices to boost performance.\n If you have SSDs and NVMEs only, you can set journal size to 0 and enlarge the block.db size',
								name: 'CBIS:storage:ceph_block_db_size',
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable Ceph S3',
								help: 'Enable bcmt cluster to access the ceph Radosgw S3 i/f',
								name: 'CBIS:storage:ceph_rados_gw',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Allow unlimited quota users',
								help: 'Allow a user with unlimited Radosgw quota.',
								name: 'CBIS:storage:radosgw_allow_no_quota',
								showIf: { parentName: 'CBIS:storage:ceph_rados_gw', parentValue: true },
								type: 'boolean'
							},
							{
								default: '',
								display: 'S3 Max Aggregated Quota',
								help: 'The maximum aggregated quota for all Radosgw users this cluster can create.',
								name: 'CBIS:storage:radosgw_max_aggregated_quota',
								required: true,
								showIf: { parentName: 'CBIS:storage:radosgw_allow_no_quota', parentValue: false },
								type: 'text',
								validation: '^(-1|[1-9][0-9]*[TG])$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: '',
								display: 'S3 Max Quota Per User',
								help: 'The maximum quota that can be asked for a single Radosgw user.',
								name: 'CBIS:storage:radosgw_max_quota_per_user',
								required: true,
								showIf: { parentName: 'CBIS:storage:radosgw_allow_no_quota', parentValue: false },
								type: 'text',
								validation: '^(-1|[1-9][0-9]*[TG])$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								columns: [
									{
										display: 'Pool name',
										help: 'Ceph pool name.',
										name: 'pool_name',
										readonly: true,
										required: true,
										type: 'text',
										validation: '^[A-Za-z0-9_.]+$',
										validationDescription: "Only alphabet, numeric, '_' and '.' are allowed "
									},
									{
										display: 'Pool weight (%)',
										help:
											'Pool weight in percentages. Percentage amount of all pools should be 100.',
										name: 'pool_weight',
										required: true,
										restrictions: { max: 100, min: 0 },
										type: 'number'
									}
								],
								default: [
									{ pool_name: 'volumes', pool_weight: 30 },
									{
										pool_name: 'metrics',
										pool_weight: 10
									},
									{ pool_name: 'backups', pool_weight: 4 },
									{
										pool_name: 'cephfs_data',
										pool_weight: 12
									},
									{ pool_name: 'cephfs_metadata', pool_weight: 8 },
									{
										pool_name: 'default.rgw.buckets.data',
										pool_weight: 6
									},
									{ pool_name: 'default.rgw.control', pool_weight: 6 },
									{
										pool_name: 'default.rgw.meta',
										pool_weight: 6
									},
									{ pool_name: '.rgw.root', pool_weight: 6 },
									{
										pool_name: 'default.rgw.log',
										pool_weight: 6
									},
									{ pool_name: 'default.rgw.buckets.index', pool_weight: 6 }
								],
								display: 'Weights of pool placement groups',
								editItemDisplay: 'Set pool weight',
								emptyGridDisplay: 'Error. Pools are missing.',
								name: 'default_pg_pools_weights',
								operations: { Add: false, Delete: false, Edit: true },
								showIf: { parentName: 'CBIS:storage:ceph_rados_gw', parentValue: true },
								type: 'grid'
							},
							{
								columns: [
									{
										display: 'Pool name',
										help: 'Ceph pool name.',
										name: 'pool_name',
										readonly: true,
										required: true,
										type: 'text',
										validation: '^[A-Za-z0-9_.]+$',
										validationDescription: "Only alphabet, numeric, '_' and '.' are allowed "
									},
									{
										display: 'Pool weight (%)',
										help:
											'Pool weight in percentages. Percentage amount of all pools should be 100.',
										name: 'pool_weight',
										required: true,
										restrictions: { max: 100, min: 0 },
										type: 'number'
									}
								],
								default: [
									{ pool_name: 'volumes', pool_weight: 30 },
									{
										pool_name: 'metrics',
										pool_weight: 10
									},
									{ pool_name: 'backups', pool_weight: 10 },
									{
										pool_name: 'cephfs_data',
										pool_weight: 30
									},
									{ pool_name: 'cephfs_metadata', pool_weight: 20 }
								],
								display: 'Weights of pool placement groups',
								editItemDisplay: 'Set pool weight',
								emptyGridDisplay: 'Error. Pools are missing.',
								name: 'nonrgw_pg_pools_weights',
								operations: { Add: false, Delete: false, Edit: true },
								showIf: { parentName: 'CBIS:storage:ceph_rados_gw', parentValue: false },
								type: 'grid'
							}
						],
						initialCollapse: true,
						name: 'storage'
					},
					{
						display: 'ELK Optional Configuration',
						fields: [
							{
								default: 'local',
								display: 'ELK installation type',
								help:
									"Collect ELK data on the local or remote system. When 'local' is selected, the Elasticsearch database and Kibana dashboard will be installed locally.",
								name: 'CBIS:openstack_deployment:elk_deployment_type',
								required: true,
								type: 'select',
								values: ['local', 'remote']
							},
							{
								default: 'sdb',
								display: 'ELK Disk',
								help: 'Disk for ELK data. It can be any unused disk on the system.',
								name: 'CBIS:openstack_deployment:elk_disk',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9/._-]+$',
								validationDescription: "Only alphabet, numeric, '/', '.', '_' and '-' are allowed "
							},
							{
								default: 5,
								display: 'ELK Data Retention',
								help: 'Keep ELK data for X + current days',
								name: 'CBIS:openstack_deployment:elk_keep_data',
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								display: 'Rsyslog Servers',
								name: 'CBIS:openstack_deployment:rsyslog_servers',
								type: 'host-list',
								validation: '^[A-Za-z0-9:._-]+$',
								validationDescription: "Only alphabet, numeric, ':', '.', '_' and '-' are allowed "
							}
						],
						initialCollapse: true,
						name: 'elk',
						showIf: {
							isExternal: true,
							parentName: 'CBIS:openstack_deployment:deploy_elk',
							parentValue: true
						}
					},
					{
						display: 'Backup Optional Configuration',
						fields: [
							{
								default: 'b4cK1tup!!',
								display: 'Backup password',
								name: 'CBIS:openstack_deployment:backup_password',
								type: 'text',
								validation: '^[A-Za-z0-9:.,!\\/_-]{8,}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 2,
								display: 'Backup Hour',
								help: 'Hour of the day between 0 and 23.',
								name: 'CBIS:openstack_deployment:backup_hour',
								required: true,
								restrictions: { max: 23, min: 0 },
								type: 'number'
							},
							{
								default: 0,
								display: 'Backup Minute',
								help: 'Minute between 0 and 59.',
								name: 'CBIS:openstack_deployment:backup_minute',
								required: true,
								restrictions: { max: 59, min: 0 },
								type: 'number'
							},
							{
								default: '/root/backup',
								display: 'Backup NFS Mountpoint',
								help:
									'Backup storage location. This can be either a local folder on the installation server, or an external NFS mount.',
								name: 'CBIS:openstack_deployment:backup_nfs_mountpoint',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9/[\\]:._-]+$',
								validationDescription:
									"Only alphabet, numeric, '[', ']', '/', '\\', ':', '.', '_' and '-' are allowed "
							}
						],
						initialCollapse: true,
						name: 'backup'
					},
					{
						description: '',
						display: 'Alarm Manager Configuration',
						fields: [
							{
								default: false,
								display: 'Add Alarm Manager Notification Targets ',
								help: 'If disabled, no notification target will be created',
								name: 'CBIS:openstack_deployment:configure_alarm_manager',
								type: 'boolean'
							},
							{
								columns: [
									{
										display: 'SNMP username',
										name: 'username',
										required: true,
										type: 'text',
										validation: '^[A-Za-z0-9:.,/_-]*$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'Notification Target name',
										help: 'You may use letters, numbers, and underscore only',
										name: 'name',
										required: true,
										type: 'text',
										validation: '^[A-Za-z0-9_]+$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'IP address',
										help: 'Notification target IP address',
										name: 'send_to',
										required: true,
										type: 'ip'
									},
									{
										display: 'Community string',
										name: 'community_string',
										type: 'text',
										validation: '^[A-Za-z0-9:.,/_-]*$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'port',
										name: 'port',
										required: true,
										restrictions: { max: 65535, min: 0 },
										type: 'number'
									},
									{
										default: 'SNMPv2',
										display: 'SNMP Version',
										name: 'snmp_version',
										required: true,
										type: 'select',
										values: ['SNMPv2', 'SNMPv3']
									},
									{
										default: 'noAuthNoPriv',
										display: 'security level',
										name: 'security_level',
										required: true,
										type: 'select',
										values: ['noAuthNoPriv', 'authNoPriv', 'authPriv']
									},
									{
										default: 'MD5',
										display: 'Authentication Protocol',
										name: 'authProtocol',
										type: 'select',
										values: ['MD5', 'SHA']
									},
									{
										display: 'authentication password',
										name: 'authPassword',
										type: 'text',
										validation: '^[A-Za-z0-9:.,/_-]{8,}$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										default: 'DES',
										display: 'privacy protocol',
										name: 'privProtocol',
										type: 'select',
										values: ['DES', 'AES']
									},
									{
										display: 'privacy password',
										name: 'privPassword',
										type: 'text',
										validation: '^[A-Za-z0-9:.,/_-]{8,}$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'pass phrase',
										name: 'passPhrase',
										type: 'text',
										validation: '^[A-Za-z0-9:.,/_-]{8,}$',
										validationDescription: 'Regex invalid, look at the help for more information'
									}
								],
								default: [],
								display: '',
								editItemDisplay: 'Edit notification target configurations',
								emptyGridDisplay: 'No Notification targets added',
								name: 'notification_targets',
								newItemDisplay: 'Add new notification target',
								operations: { Add: true, Delete: true, Edit: true },
								showIf: {
									parentName: 'CBIS:openstack_deployment:configure_alarm_manager',
									parentValue: true
								},
								type: 'grid'
							}
						],
						initialCollapse: true,
						name: 'alarm_manager_config'
					},
					{
						display: 'Zabbix Optional Parameters',
						fields: [
							{
								default: false,
								display: 'Add IPMI connections to hosts ',
								help: 'If enabled, IPMI connections to ILOs will be added to Zabbix hosts',
								name: 'CBIS:openstack_deployment:configure_zabbix_host_ipmi',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Add SNMP connections to hosts',
								help: 'If enabled, SNMP connections to ILOs will be added to Zabbix hosts',
								name: 'CBIS:openstack_deployment:configure_zabbix_host_snmp',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Add SNMP addresses of switches',
								help: 'If disabled, no hosts will be created for switches on Zabbix',
								name: 'CBIS:openstack_deployment:configure_zabbix_switches',
								type: 'boolean'
							},
							{
								columns: [
									{
										display: 'Switch name',
										help: 'You may use letters, numbers, and underscore only',
										name: 'name',
										required: true,
										type: 'text',
										validation: '^[A-Za-z0-9_]+$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'IP address',
										help: 'trap target IP address',
										name: 'ip',
										required: true,
										type: 'ip'
									},
									{
										display: 'Community string',
										name: 'community_string',
										required: true,
										type: 'text',
										validation: '^[A-Za-z0-9:.,/_-]*$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'Switch SNMP port',
										name: 'snmp_port',
										required: true,
										restrictions: { max: 65535, min: 0 },
										type: 'number'
									}
								],
								default: [],
								display: '',
								editItemDisplay: 'Edit switch configurations',
								emptyGridDisplay: 'No switches added',
								name: 'snmp_switches',
								newItemDisplay: 'Add new switch',
								operations: { Add: true, Delete: true, Edit: true },
								showIf: {
									parentName: 'CBIS:openstack_deployment:configure_zabbix_switches',
									parentValue: true
								},
								type: 'grid'
							}
						],
						initialCollapse: true,
						name: 'zabbix_optional_parameters'
					}
				]
			},
			{
				dataSource: 'subnets_dataSource',
				description: 'External Services',
				display: 'External Ingress / Egress',
				isExtendable: true,
				limitMaxSubsections: '50',
				name: 'caas_external',
				subSections: [],
				subsectionTemplateFields: [
					{
						data:
							'Node Ingress Interface. Edge ingress/egress access to services. Supports IPv4, IPv6 and Dual Stack.',
						display: '',
						name: 'caas_external_help',
						severity: 'info',
						type: 'message'
					},
					{
						default: 'IPv4',
						display: 'Select IP Stack Type',
						multiple: true,
						name: 'ip_stack_type',
						required: true,
						type: 'select',
						values: ['IPv4', 'IPv6']
					},
					{
						default: '',
						display: 'Subnet',
						name: 'network_address',
						required: true,
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv4'] },
						type: 'cidr'
					},
					{
						default: '',
						display: 'IPv6 Subnet',
						name: 'network_ipv6_address',
						required: true,
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv6'] },
						type: 'cidr'
					},
					{
						display: 'Vlan',
						name: 'network_vlan',
						required: true,
						restrictions: { max: 4094, min: 1 },
						type: 'number'
					},
					{
						default: false,
						display: 'Enable Gateway',
						name: 'enable_network_gateway',
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv4'] },
						type: 'boolean'
					},
					{
						default: '',
						display: 'Gateway',
						name: 'network_gateway',
						showIf: { isExternal: false, parentName: 'enable_network_gateway', parentValue: true },
						type: 'ip'
					},
					{
						default: false,
						display: 'Enable IPv6 Gateway',
						name: 'enable_network_ipv6_gateway',
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv6'] },
						type: 'boolean'
					},
					{
						default: '',
						display: 'IPv6 Gateway',
						name: 'network_ipv6_gateway',
						showIf: {
							isExternal: false,
							parentName: 'enable_network_ipv6_gateway',
							parentValue: true
						},
						type: 'ip'
					},
					{
						default: false,
						display: 'Set Range',
						name: 'set_network_range',
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv4'] },
						type: 'boolean'
					},
					{
						default: '',
						display: 'IP Range Start',
						name: 'ip_network_range_start',
						showIf: { isExternal: false, parentName: 'set_network_range', parentValue: true },
						type: 'ip'
					},
					{
						default: '',
						display: 'IP Range End',
						name: 'ip_network_range_end',
						showIf: { isExternal: false, parentName: 'set_network_range', parentValue: true },
						type: 'ip'
					},
					{
						default: false,
						display: 'Set IPv6 Range',
						name: 'set_network_ipv6_range',
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv6'] },
						type: 'boolean'
					},
					{
						default: '',
						display: 'IPv6 Range Start',
						name: 'ip_network_ipv6_range_start',
						showIf: { isExternal: false, parentName: 'set_network_ipv6_range', parentValue: true },
						type: 'ip'
					},
					{
						default: '',
						display: 'IPv6 Range End',
						name: 'ip_network_ipv6_range_end',
						showIf: { isExternal: false, parentName: 'set_network_ipv6_range', parentValue: true },
						type: 'ip'
					},
					{
						default: true,
						display: 'Use host level setting',
						name: 'enable_mtu',
						type: 'boolean'
					},
					{
						default: 9000,
						display: 'MTU',
						name: 'mtu',
						showIf: { isExternal: false, parentName: 'enable_mtu', parentValue: false },
						type: 'number'
					}
				],
				validation: '^[A-Za-z]{1}[a-zA-Z0-9-]{3,23}$'
			},
			{
				dataSource: 'provider_networks',
				display: 'CaaS External Networks',
				isExtendable: true,
				limitMaxSubsections: '50',
				name: 'caas_subnets',
				subSections: [],
				subsectionTemplateFields: [
					{
						data:
							'CaaS External Network. AKA Provider networks, used by DANM in addition to the main CNI port. Support IPv4, IPv6 and Dual Stack.',
						display: '',
						name: 'caas_subnets_help',
						severity: 'info',
						type: 'message'
					},
					{
						default: 'IPv4',
						display: 'Select IP Stack Type',
						multiple: true,
						name: 'ip_stack_type',
						required: true,
						type: 'select',
						values: ['IPv4', 'IPv6']
					},
					{
						default: '',
						display: 'Subnet',
						name: 'network_address',
						required: true,
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv4'] },
						type: 'cidr'
					},
					{
						default: '',
						display: 'IPv6 Subnet',
						name: 'network_ipv6_address',
						required: true,
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv6'] },
						type: 'cidr'
					},
					{
						display: 'Vlan',
						name: 'network_vlan',
						required: true,
						restrictions: { max: 4094, min: 1 },
						type: 'number'
					},
					{
						default: false,
						display: 'Enable Gateway',
						name: 'enable_network_gateway',
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv4'] },
						type: 'boolean'
					},
					{
						default: '',
						display: 'Gateway',
						name: 'network_gateway',
						showIf: { isExternal: false, parentName: 'enable_network_gateway', parentValue: true },
						type: 'ip'
					},
					{
						default: false,
						display: 'Enable IPv6 Gateway',
						name: 'enable_network_ipv6_gateway',
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv6'] },
						type: 'boolean'
					},
					{
						default: '',
						display: 'IPv6 Gateway',
						name: 'network_ipv6_gateway',
						showIf: {
							isExternal: false,
							parentName: 'enable_network_ipv6_gateway',
							parentValue: true
						},
						type: 'ip'
					},
					{
						default: false,
						display: 'Set Range',
						name: 'set_network_range',
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv4'] },
						type: 'boolean'
					},
					{
						default: '',
						display: 'IP Range Start',
						name: 'ip_network_range_start',
						showIf: { isExternal: false, parentName: 'set_network_range', parentValue: true },
						type: 'ip'
					},
					{
						default: '',
						display: 'IP Range End',
						name: 'ip_network_range_end',
						showIf: { isExternal: false, parentName: 'set_network_range', parentValue: true },
						type: 'ip'
					},
					{
						default: false,
						display: 'Set IPv6 Range',
						name: 'set_network_ipv6_range',
						showIf: { parentName: 'ip_stack_type', parentValue: ['IPv6'] },
						type: 'boolean'
					},
					{
						default: '',
						display: 'IPv6 Range Start',
						name: 'ip_network_ipv6_range_start',
						showIf: { isExternal: false, parentName: 'set_network_ipv6_range', parentValue: true },
						type: 'ip'
					},
					{
						default: '',
						display: 'IPv6 Range End',
						name: 'ip_network_ipv6_range_end',
						showIf: { isExternal: false, parentName: 'set_network_ipv6_range', parentValue: true },
						type: 'ip'
					},
					{
						default: true,
						display: 'Use host level setting',
						name: 'enable_mtu',
						type: 'boolean'
					},
					{
						default: 9000,
						display: 'MTU',
						name: 'mtu',
						showIf: { isExternal: false, parentName: 'enable_mtu', parentValue: false },
						type: 'number'
					}
				],
				validation: '^[A-Za-z]{1}[a-zA-Z0-9-]{3,23}$'
			},
			{
				dataSource: 'caas_physnets',
				display: 'Caas Tenant Vlan\u00a0Ranges',
				isExtendable: true,
				limitMaxSubsections: '50',
				name: 'caas_physnets',
				subSections: [],
				subsectionTemplateFields: [
					{
						data: 'Allowed Tenant Vlan\u00a0Ranges, with DANM only',
						display: '',
						name: 'caas_physnets_help',
						severity: 'info',
						type: 'message'
					},
					{
						columns: [
							{
								default: 1,
								display: 'Start',
								name: 'start',
								required: true,
								restrictions: { max: 4093, min: 0 },
								type: 'number'
							},
							{
								default: 4094,
								display: 'End',
								name: 'end',
								required: true,
								restrictions: { max: 4094, min: 1 },
								type: 'number'
							}
						],
						default: [],
						deleteItemDisplay: 'Delete',
						display: 'Physnet VLAN Ranges',
						editItemDisplay: 'Update Range',
						emptyGridDisplay: '',
						name: 'vlan_range',
						newItemDisplay: 'Add New Range',
						operations: { Add: true, Delete: true, Edit: true },
						type: 'grid'
					}
				],
				validation: '^[A-Za-z]{1}[a-zA-Z0-9-]{3,23}$'
			},
			{
				dataSource: 'caas_hostgroups',
				display: 'Customize host groups',
				hostGroupTypeField: 'CBIS:host_group_config:CaaS:caas_role',
				isExtendable: true,
				limitMaxSubsections: '10',
				name: 'hostgroups',
				subSections: [
					{
						ShouldBeDeleted: false,
						default: {
							'CBIS:host_group_config:CaaS:caas_role': ['Storage'],
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_1:name': 'ens4f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_2:name': 'ens4f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_1:name': 'ens1f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_2:name': 'ens1f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_1:name': 'ens12f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_2:name': 'ens12f1',
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_0': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_1': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_scheme': 1,
							'CBIS:host_group_config:CaaS:custom_nics': false,
							'CBIS:host_group_config:CaaS:description': '',
							'CBIS:host_group_config:CaaS:edge_generic_caas_per_port_config': [
								{
									caas_external: [],
									edge_port_name: 'nic_2_bond'
								},
								{ caas_external: [], edge_port_name: 'nic_3_bond' }
							],
							'CBIS:host_group_config:CaaS:enable_raid': false,
							'CBIS:host_group_config:CaaS:exclusive_0_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:exclusive_1_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:generic_caas_per_port_config': [
								{
									caas_subnets: [],
									gen_port_name: 'nic_2_bond',
									physnet_mapping: []
								},
								{ caas_subnets: [], gen_port_name: 'nic_3_bond', physnet_mapping: [] }
							],
							'CBIS:host_group_config:CaaS:hugepages_size': '1G',
							'CBIS:host_group_config:CaaS:hypervisor_dedicated_cpus': 4,
							'CBIS:host_group_config:CaaS:include_external': false,
							'CBIS:host_group_config:CaaS:k8s_ht_support': false,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages': 0.2,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_0': -1,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_1': -1,
							'CBIS:host_group_config:CaaS:num_of_nics': '2',
							'CBIS:host_group_config:CaaS:osds:dedicated_devices': ['/dev/sdb', '/dev/sdb'],
							'CBIS:host_group_config:CaaS:osds:devices': ['/dev/sdc', '/dev/sdd'],
							'CBIS:host_group_config:CaaS:osds:root_ceph_block_size': 888636,
							'CBIS:host_group_config:CaaS:platform_usage': 'caas',
							'CBIS:host_group_config:CaaS:root_device': '',
							'CBIS:host_group_config:CaaS:shared_pool_allocation': 0.2,
							'CBIS:host_group_config:CaaS:sriov_caas_per_port_config': [
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_2',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_2',
									vf_number: 8
								}
							],
							'CBIS:host_group_config:CaaS:storage_separation_network': false
						},
						display: 'StorageBM',
						initialCollapse: true,
						name: 'StorageBM'
					},
					{
						ShouldBeDeleted: false,
						default: {
							'CBIS:host_group_config:CaaS:caas_role': ['Worker'],
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_1:name': 'ens4f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_2:name': 'ens4f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_1:name': 'ens1f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_2:name': 'ens1f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_1:name': 'ens12f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_2:name': 'ens12f1',
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_0': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_1': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_scheme': 1,
							'CBIS:host_group_config:CaaS:custom_nics': false,
							'CBIS:host_group_config:CaaS:description': '',
							'CBIS:host_group_config:CaaS:edge_generic_caas_per_port_config': [
								{
									caas_external: [],
									edge_port_name: 'nic_2_bond'
								},
								{ caas_external: [], edge_port_name: 'nic_3_bond' }
							],
							'CBIS:host_group_config:CaaS:enable_raid': false,
							'CBIS:host_group_config:CaaS:exclusive_0_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:exclusive_1_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:generic_caas_per_port_config': [
								{
									caas_subnets: [],
									gen_port_name: 'nic_2_bond',
									physnet_mapping: []
								},
								{ caas_subnets: [], gen_port_name: 'nic_3_bond', physnet_mapping: [] }
							],
							'CBIS:host_group_config:CaaS:hugepages_size': '1G',
							'CBIS:host_group_config:CaaS:hypervisor_dedicated_cpus': 4,
							'CBIS:host_group_config:CaaS:include_external': false,
							'CBIS:host_group_config:CaaS:k8s_ht_support': false,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages': 0.2,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_0': -1,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_1': -1,
							'CBIS:host_group_config:CaaS:num_of_nics': '2',
							'CBIS:host_group_config:CaaS:osds:dedicated_devices': ['/dev/sdb', '/dev/sdb'],
							'CBIS:host_group_config:CaaS:osds:devices': ['/dev/sdc', '/dev/sdd'],
							'CBIS:host_group_config:CaaS:osds:root_ceph_block_size': 888636,
							'CBIS:host_group_config:CaaS:platform_usage': 'caas',
							'CBIS:host_group_config:CaaS:shared_pool_allocation': 0.2,
							'CBIS:host_group_config:CaaS:sriov_caas_per_port_config': [
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_2',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_2',
									vf_number: 8
								}
							],
							'CBIS:host_group_config:CaaS:storage_config:enable_local_storage': false,
							'CBIS:host_group_config:CaaS:storage_config:local_storage_devices': '',
							'CBIS:host_group_config:CaaS:storage_separation_network': false
						},
						display: 'WorkerBM',
						initialCollapse: true,
						name: 'WorkerBM'
					},
					{
						ShouldBeDeleted: false,
						default: {
							'CBIS:host_group_config:CaaS:caas_role': [
								'Master',
								'Storage',
								'StorageMgmt',
								'Edge',
								'Worker'
							],
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_1:name': 'ens4f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_2:name': 'ens4f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_1:name': 'ens1f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_2:name': 'ens1f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_1:name': 'ens12f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_2:name': 'ens12f1',
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_0': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_1': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_scheme': 1,
							'CBIS:host_group_config:CaaS:custom_nics': false,
							'CBIS:host_group_config:CaaS:description': '',
							'CBIS:host_group_config:CaaS:edge_generic_caas_per_port_config': [
								{
									caas_external: [],
									edge_port_name: 'nic_2_bond'
								},
								{ caas_external: [], edge_port_name: 'nic_3_bond' }
							],
							'CBIS:host_group_config:CaaS:enable_raid': false,
							'CBIS:host_group_config:CaaS:exclusive_0_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:exclusive_1_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:generic_caas_per_port_config': [
								{
									caas_subnets: [],
									gen_port_name: 'nic_2_bond',
									physnet_mapping: []
								},
								{ caas_subnets: [], gen_port_name: 'nic_3_bond', physnet_mapping: [] }
							],
							'CBIS:host_group_config:CaaS:hugepages_size': '1G',
							'CBIS:host_group_config:CaaS:hypervisor_dedicated_cpus': 4,
							'CBIS:host_group_config:CaaS:include_external': false,
							'CBIS:host_group_config:CaaS:k8s_ht_support': false,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages': 0.2,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_0': -1,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_1': -1,
							'CBIS:host_group_config:CaaS:num_of_nics': '2',
							'CBIS:host_group_config:CaaS:osds:dedicated_devices': ['/dev/sdb', '/dev/sdb'],
							'CBIS:host_group_config:CaaS:osds:devices': ['/dev/sdc', '/dev/sdd'],
							'CBIS:host_group_config:CaaS:osds:root_ceph_block_size': 888636,
							'CBIS:host_group_config:CaaS:platform_usage': 'caas',
							'CBIS:host_group_config:CaaS:root_device': '',
							'CBIS:host_group_config:CaaS:shared_pool_allocation': 0.2,
							'CBIS:host_group_config:CaaS:sriov_caas_per_port_config': [
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_2',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_2',
									vf_number: 8
								}
							],
							'CBIS:host_group_config:CaaS:storage_separation_network': false
						},
						display: 'AllinOne',
						initialCollapse: true,
						name: 'AllinOne'
					},
					{
						ShouldBeDeleted: false,
						default: {
							'CBIS:host_group_config:CaaS:caas_role': ['Master', 'StorageMgmt'],
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_1:name': 'ens4f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_2:name': 'ens4f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_1:name': 'ens1f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_2:name': 'ens1f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_1:name': 'ens12f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_2:name': 'ens12f1',
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_0': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_1': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_scheme': 1,
							'CBIS:host_group_config:CaaS:custom_nics': false,
							'CBIS:host_group_config:CaaS:description': '',
							'CBIS:host_group_config:CaaS:edge_generic_caas_per_port_config': [
								{
									caas_external: [],
									edge_port_name: 'nic_2_bond'
								},
								{ caas_external: [], edge_port_name: 'nic_3_bond' }
							],
							'CBIS:host_group_config:CaaS:enable_raid': false,
							'CBIS:host_group_config:CaaS:exclusive_0_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:exclusive_1_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:generic_caas_per_port_config': [
								{
									caas_subnets: [],
									gen_port_name: 'nic_2_bond',
									physnet_mapping: []
								},
								{ caas_subnets: [], gen_port_name: 'nic_3_bond', physnet_mapping: [] }
							],
							'CBIS:host_group_config:CaaS:hugepages_size': '1G',
							'CBIS:host_group_config:CaaS:hypervisor_dedicated_cpus': 4,
							'CBIS:host_group_config:CaaS:include_external': false,
							'CBIS:host_group_config:CaaS:k8s_ht_support': false,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages': 0.2,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_0': -1,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_1': -1,
							'CBIS:host_group_config:CaaS:num_of_nics': '2',
							'CBIS:host_group_config:CaaS:osds:dedicated_devices': ['/dev/sdb', '/dev/sdb'],
							'CBIS:host_group_config:CaaS:osds:devices': ['/dev/sdc', '/dev/sdd'],
							'CBIS:host_group_config:CaaS:osds:root_ceph_block_size': 888636,
							'CBIS:host_group_config:CaaS:platform_usage': 'caas',
							'CBIS:host_group_config:CaaS:shared_pool_allocation': 0.2,
							'CBIS:host_group_config:CaaS:sriov_caas_per_port_config': [
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_2',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_2',
									vf_number: 8
								}
							],
							'CBIS:host_group_config:CaaS:storage_config:enable_etcd_location': false,
							'CBIS:host_group_config:CaaS:storage_config:enable_local_storage': false,
							'CBIS:host_group_config:CaaS:storage_config:etcd_disk': '',
							'CBIS:host_group_config:CaaS:storage_config:local_storage_devices': '',
							'CBIS:host_group_config:CaaS:storage_separation_network': false
						},
						display: 'MasterBM',
						initialCollapse: true,
						name: 'MasterBM'
					},
					{
						ShouldBeDeleted: false,
						default: {
							'CBIS:host_group_config:CaaS:caas_role': ['Edge'],
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_1:name': 'ens4f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_2:name': 'ens4f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_1:name': 'ens1f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_2:name': 'ens1f1',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_1:name': 'ens12f0',
							'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_2:name': 'ens12f1',
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_0': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_numa_1': -1,
							'CBIS:host_group_config:CaaS:cpu_isolation_scheme': 1,
							'CBIS:host_group_config:CaaS:custom_nics': false,
							'CBIS:host_group_config:CaaS:description': '',
							'CBIS:host_group_config:CaaS:edge_generic_caas_per_port_config': [
								{
									caas_external: [],
									edge_port_name: 'nic_2_bond'
								},
								{ caas_external: [], edge_port_name: 'nic_3_bond' }
							],
							'CBIS:host_group_config:CaaS:enable_raid': false,
							'CBIS:host_group_config:CaaS:exclusive_0_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:exclusive_1_pool_allocation': 0,
							'CBIS:host_group_config:CaaS:generic_caas_per_port_config': [
								{
									caas_subnets: [],
									gen_port_name: 'nic_2_bond',
									physnet_mapping: []
								},
								{ caas_subnets: [], gen_port_name: 'nic_3_bond', physnet_mapping: [] }
							],
							'CBIS:host_group_config:CaaS:hugepages_size': '1G',
							'CBIS:host_group_config:CaaS:hypervisor_dedicated_cpus': 4,
							'CBIS:host_group_config:CaaS:include_external': false,
							'CBIS:host_group_config:CaaS:k8s_ht_support': false,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages': 0.2,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_0': -1,
							'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_1': -1,
							'CBIS:host_group_config:CaaS:num_of_nics': '2',
							'CBIS:host_group_config:CaaS:osds:dedicated_devices': ['/dev/sdb', '/dev/sdb'],
							'CBIS:host_group_config:CaaS:osds:devices': ['/dev/sdc', '/dev/sdd'],
							'CBIS:host_group_config:CaaS:osds:root_ceph_block_size': 888636,
							'CBIS:host_group_config:CaaS:platform_usage': 'caas',
							'CBIS:host_group_config:CaaS:shared_pool_allocation': 0.2,
							'CBIS:host_group_config:CaaS:sriov_caas_per_port_config': [
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_2_port_2',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_1',
									vf_number: 8
								},
								{
									caas_subnets: [],
									dpdk_vf_number: 2,
									enable_trust: false,
									physnet_mapping: [],
									sriov_port_name: 'nic_3_port_2',
									vf_number: 8
								}
							],
							'CBIS:host_group_config:CaaS:storage_config:enable_local_storage': false,
							'CBIS:host_group_config:CaaS:storage_config:local_storage_devices': '',
							'CBIS:host_group_config:CaaS:storage_separation_network': false
						},
						display: 'EdgeBM',
						initialCollapse: true,
						name: 'EdgeBM'
					}
				],
				subsectionTemplateFields: [
					{
						data: 'Base CaaS host group',
						display: 'Description',
						name: 'CBIS:host_group_config:CaaS:description',
						readonly: false,
						required: false,
						severity: 'info',
						type: 'message'
					},
					{
						default: ['Worker'],
						display: 'CaaS Roles',
						ipmiFactor: true,
						multiple: true,
						name: 'CBIS:host_group_config:CaaS:caas_role',
						readonly: false,
						required: true,
						type: 'select',
						values: ['Master', 'Worker', 'Storage', 'Edge', 'StorageMgmt']
					},
					{
						default: 'caas',
						display: 'Platform Usage',
						name: 'CBIS:host_group_config:CaaS:platform_usage',
						readonly: true,
						required: true,
						type: 'text',
						validation: '^[A-Z:a-z0-9_-]+$'
					},
					{
						default: 4,
						display: 'Host Dedicated CPUs',
						help:
							"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Host Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
						name: 'CBIS:host_group_config:CaaS:hypervisor_dedicated_cpus',
						readonly: false,
						required: true,
						restrictions: { max: 128, min: 0 },
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'number'
					},
					{
						default: 1,
						display: 'CPU Isolation Scheme',
						help:
							'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
						ipmiFactor: false,
						multiple: false,
						name: 'CBIS:host_group_config:CaaS:cpu_isolation_scheme',
						readonly: true,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'select',
						values: [0, 1]
					},
					{
						default: -1,
						display: 'Number of Host Dedicated CPUs for Numa 0',
						help:
							"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Host Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Host Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
						name: 'CBIS:host_group_config:CaaS:cpu_isolation_numa_0',
						readonly: false,
						required: true,
						restrictions: { max: 128, min: -1 },
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'number'
					},
					{
						default: -1,
						display: 'Number of Host Dedicated CPUs for Numa 1',
						help:
							"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Host Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Host Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
						name: 'CBIS:host_group_config:CaaS:cpu_isolation_numa_1',
						readonly: false,
						required: true,
						restrictions: { max: 128, min: -1 },
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'number'
					},
					{
						default: false,
						display: 'Enable Exclusive CPU Pool',
						name: 'CBIS:host_group_config:CaaS:enable_cpu_pool',
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'boolean'
					},
					{
						default: 0.7,
						display: 'Allocation Ratio for NUMA 0 Exclusive CPU Pool',
						help:
							'Allocation Ratio for NUMA 0 Exclusive CPU Pool\nValid range is between 0 and 1.0.',
						name: 'CBIS:host_group_config:CaaS:exclusive_0_pool_allocation',
						readonly: false,
						required: true,
						restrictions: { max: 1.0, min: 0.0 },
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_cpu_pool',
							parentValue: true
						},
						type: 'number'
					},
					{
						default: 0.8,
						display: 'Allocation Ratio for NUMA 1 Exclusive CPU Pool',
						help:
							'Allocation Ratio for NUMA 1 Exclusive CPU Pool\nValid range is between 0 and 1.0.',
						name: 'CBIS:host_group_config:CaaS:exclusive_1_pool_allocation',
						readonly: false,
						required: true,
						restrictions: { max: 1.0, min: 0.0 },
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_cpu_pool',
							parentValue: true
						},
						type: 'number'
					},
					{
						default: 0.2,
						display: 'Allocation Ratio for Shared CPU Pool',
						help: 'Allocation Ratio for Shared CPU Pool\nValid range is between 0 and 1.0.',
						name: 'CBIS:host_group_config:CaaS:shared_pool_allocation',
						readonly: false,
						required: true,
						restrictions: { max: 1.0, min: 0.0 },
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_cpu_pool',
							parentValue: true
						},
						type: 'number'
					},
					{
						default: false,
						description: 'In case of HugePages disabled the HugePages Size set to be None',
						display: 'Enable HugePages',
						name: 'CBIS:host_group_config:CaaS:enable_hugepages',
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'boolean'
					},
					{
						default: '1G',
						display: 'HugePages Size',
						help: 'HugePages size for libvirt virtual machines on the compute',
						ipmiFactor: false,
						multiple: false,
						name: 'CBIS:host_group_config:CaaS:hugepages_size',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_hugepages',
							parentValue: true
						},
						type: 'select',
						values: ['2M', '1G']
					},
					{
						default: 0.2,
						display: 'Memory Ratio for HugePages',
						help:
							'The ratio of memory allocated for huge pages.\nValid range is between 0.1 and 0.8, on both NUMAs. Per NUMA ratio will override the value set, if -1 is not set for them',
						name: 'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages',
						readonly: false,
						required: true,
						restrictions: { max: 0.8, min: 0.1 },
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_hugepages',
							parentValue: true
						},
						type: 'number'
					},
					{
						default: -1,
						display: 'Memory Ratio for HugePages on NUMA 0',
						help:
							'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
						ipmiFactor: false,
						multiple: false,
						name: 'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_0',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_hugepages',
							parentValue: true
						},
						type: 'select',
						values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
					},
					{
						default: -1,
						display: 'Memory Ratio for HugePages on NUMA 1',
						help:
							'Valid range is between 0 and 0.9. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
						ipmiFactor: false,
						multiple: false,
						name: 'CBIS:host_group_config:CaaS:memory_ratio_for_hugepages_numa_1',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_hugepages',
							parentValue: true
						},
						type: 'select',
						values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
					},
					{
						default: false,
						display: 'Choose Etcd Partition Disk',
						help: 'Change to True if you want to change the etcd disk location',
						name: 'CBIS:host_group_config:CaaS:storage_config:enable_etcd_location',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Master']
						},
						type: 'boolean'
					},
					{
						default: '',
						display: 'Etcd Partition Disk',
						help: 'etcd will be installed in the chosen disk device',
						name: 'CBIS:host_group_config:CaaS:storage_config:etcd_disk',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:storage_config:enable_etcd_location',
							parentValue: true
						},
						type: 'text',
						validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$'
					},
					{
						default: 888636,
						display: 'Ceph Block Storage, Size in megabytes (Root device)',
						help:
							'root device size in MB, when set to 0 partition for OSD will not be created\nif set partition_layout_path will be used as refrence for root device paritioning\nWhile this value will be used for ceph_block',
						name: 'CBIS:host_group_config:CaaS:osds:root_ceph_block_size',
						readonly: false,
						restrictions: { min: 0 },
						type: 'number'
					},
					{
						default: ['/dev/sdc', '/dev/sdd'],
						display: 'Devices',
						help:
							"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
						name: 'CBIS:host_group_config:CaaS:osds:devices',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Storage']
						},
						type: 'host-list',
						unique: false,
						validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$'
					},
					{
						default: ['/dev/sdb', '/dev/sdb'],
						display: 'Dedicated Devices',
						help:
							"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
						name: 'CBIS:host_group_config:CaaS:osds:dedicated_devices',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Storage']
						},
						type: 'host-list',
						unique: false,
						validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$'
					},
					{
						default: false,
						display: 'Enable local persistent storage',
						help:
							'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
						name: 'CBIS:host_group_config:CaaS:storage_config:enable_local_storage',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'boolean'
					},
					{
						default: '',
						display: 'Local persistent storage devices',
						help:
							"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
						name: 'CBIS:host_group_config:CaaS:storage_config:local_storage_devices',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:storage_config:enable_local_storage',
							parentValue: true
						},
						type: 'host-list',
						unique: false,
						validation: '^[/]dev[/][a-z][a-z0-9:/]*$'
					},
					{
						default: false,
						display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
						help:
							'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
						name: 'CBIS:host_group_config:CaaS:enable_raid',
						readonly: false,
						required: true,
						type: 'boolean'
					},
					{
						default: false,
						display: 'Hyper-Threading Support in Kubernetes',
						help: 'If enabled, kubernetes has support for Hyper-Threading.',
						name: 'CBIS:host_group_config:CaaS:k8s_ht_support',
						readonly: true,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_cpu_pool',
							parentValue: true
						},
						type: 'boolean'
					},
					{
						default: false,
						display: 'NIC Separation Storage Networks (Press help for limitation)',
						help:
							'Will move Storage data network to NIC2 , but function will be appended\n only while storage been chosen and not worker/edge',
						name: 'CBIS:host_group_config:CaaS:storage_separation_network',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Storage']
						},
						type: 'boolean'
					},
					{
						default: false,
						display: 'Include External Network',
						help: 'Worker/Edge Roles External is Optianl Network',
						name: 'CBIS:host_group_config:CaaS:include_external',
						readonly: false,
						required: true,
						showIf: { parentName: 'CBIS:host_group_config:CaaS:caas_role', parentValue: ['TEST'] },
						type: 'boolean'
					},
					{
						default: false,
						display: 'Enable Custom NICs',
						help: 'If enable you can edit ports names , if not enable global value taken',
						name: 'CBIS:host_group_config:CaaS:custom_nics',
						onlyRangeEnable: true,
						readonly: false,
						required: false,
						type: 'boolean'
					},
					{
						default: '2',
						display: 'Num of NICs',
						help: 'number of NIC inside the server',
						ipmiFactor: false,
						multiple: false,
						name: 'CBIS:host_group_config:CaaS:num_of_nics',
						readonly: false,
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'select',
						values: ['2', '3']
					},
					{
						columns: [
							{
								display: 'Port Name',
								name: 'sriov_port_name',
								readonly: false,
								required: true,
								type: 'text',
								validation: '^nic_[1-3]_port_[1-4]$'
							},
							{
								default: 45,
								display: 'Number of Non DPDK VFs on port',
								name: 'vf_number',
								required: true,
								restrictions: { max: 63, min: 0 },
								type: 'number'
							},
							{
								default: 20,
								display: 'Number of DPDK VFs on port',
								name: 'dpdk_vf_number',
								required: true,
								restrictions: { max: 63, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Trust on Port',
								name: 'enable_trust',
								required: true,
								type: 'boolean'
							},
							{
								dataSource: 'caas_physnets',
								default: [],
								display: 'Internal Networks Mapping',
								multiple: true,
								name: 'physnet_mapping',
								required: false,
								type: 'select',
								values: []
							},
							{
								dataSource: 'provider_networks',
								default: [],
								display: 'DC Access Networks Mapping',
								multiple: true,
								name: 'caas_subnets',
								required: false,
								type: 'select',
								useFirstAsDefault: true,
								values: []
							}
						],
						default: [
							{
								caas_subnets: [],
								dpdk_vf_number: 2,
								enable_trust: false,
								physnet_mapping: [],
								sriov_port_name: 'nic_2_port_1',
								vf_number: 8
							},
							{
								caas_subnets: [],
								dpdk_vf_number: 2,
								enable_trust: false,
								physnet_mapping: [],
								sriov_port_name: 'nic_2_port_2',
								vf_number: 8
							},
							{
								caas_subnets: [],
								dpdk_vf_number: 2,
								enable_trust: false,
								physnet_mapping: [],
								sriov_port_name: 'nic_3_port_1',
								vf_number: 8
							},
							{
								caas_subnets: [],
								dpdk_vf_number: 2,
								enable_trust: false,
								physnet_mapping: [],
								sriov_port_name: 'nic_3_port_2',
								vf_number: 8
							}
						],
						display: 'Sriov per port configuration',
						editItemDisplay: 'Edit Interface per port',
						emptyGridDisplay: 'Interface Per Port configuration',
						help: 'BLA BLA HELP',
						name: 'CBIS:host_group_config:CaaS:sriov_caas_per_port_config',
						newItemDisplay: 'Add new port',
						onlyRangeEnable: true,
						operations: { Add: true, Delete: true, Edit: true },
						readonly: false,
						required: false,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'grid'
					},
					{
						columns: [
							{
								display: 'Bond Name',
								name: 'gen_port_name',
								readonly: false,
								required: true,
								type: 'text',
								validation: '^nic_[2-3]_bond$'
							},
							{
								dataSource: 'caas_physnets',
								default: [],
								display: 'Internal Networks Mapping',
								multiple: true,
								name: 'physnet_mapping',
								required: false,
								type: 'select',
								values: []
							},
							{
								dataSource: 'provider_networks',
								default: [],
								display: 'DC Access Networks Mapping',
								multiple: true,
								name: 'caas_subnets',
								required: false,
								type: 'select',
								values: []
							}
						],
						default: [
							{ caas_subnets: [], gen_port_name: 'nic_2_bond', physnet_mapping: [] },
							{
								caas_subnets: [],
								gen_port_name: 'nic_3_bond',
								physnet_mapping: []
							}
						],
						display: 'Interface per port configuration',
						editItemDisplay: 'Edit Interface per port',
						emptyGridDisplay: 'Interface Per Port configuration',
						help: 'Assign subnets to physical interfaces',
						name: 'CBIS:host_group_config:CaaS:generic_caas_per_port_config',
						newItemDisplay: 'Add new port',
						onlyRangeEnable: true,
						operations: { Add: true, Delete: true, Edit: true },
						readonly: false,
						required: false,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Worker', 'Edge']
						},
						type: 'grid'
					},
					{
						default: 'ens4f0',
						display: 'NIC 1 Port 1 Interface Name',
						help:
							'Edit this to change port name for Controller and Compute Nodes configurations. Infrastructure VLANs: (provisioning, OpenStack API, storage and storage management, tenant VLAN on SR-IOV computes and external VLAN on controllers)',
						name: 'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_1:name',
						required: 'true',
						showIf: { parentName: 'CBIS:host_group_config:CaaS:custom_nics', parentValue: true },
						type: 'text',
						validation: '^[A-Za-z0-9_-]+$'
					},
					{
						default: 'ens4f1',
						display: 'NIC 1 Port 2 Interface Name',
						help:
							'Edit this to change port name for Controller and Compute Nodes configurations. Infrastructure VLANs: (provisioning, OpenStack API, storage and storage management, tenant VLAN on SR-IOV computes and external VLAN on controllers)',
						name: 'CBIS:host_group_config:CaaS:common_network_config:nic_1_port_2:name',
						required: 'true',
						showIf: { parentName: 'CBIS:host_group_config:CaaS:custom_nics', parentValue: true },
						type: 'text',
						validation: '^[A-Za-z0-9_-]+$'
					},
					{
						default: 'ens1f0',
						display: 'NIC 2 Port 1 Interface Name',
						help:
							'Edit this to change port name for Controller and Compute Nodes configurations. Tenant VLAN and provider networks or SR-IOV VFs',
						name: 'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_1:name',
						required: 'true',
						showIf: { parentName: 'CBIS:host_group_config:CaaS:custom_nics', parentValue: true },
						type: 'text',
						validation: '^[A-Za-z0-9_-]+$'
					},
					{
						default: 'ens1f1',
						display: 'NIC 2 Port 2 Interface Name',
						help:
							'Edit this to change port name for Controller and Compute Nodes configurations. Tenant VLAN and provider networks or SR-IOV VFs',
						name: 'CBIS:host_group_config:CaaS:common_network_config:nic_2_port_2:name',
						required: 'true',
						showIf: { parentName: 'CBIS:host_group_config:CaaS:custom_nics', parentValue: true },
						type: 'text',
						validation: '^[A-Za-z0-9_-]+$'
					},
					{
						default: 'ens12f0',
						display: 'NIC 3 Port 1 Interface Name',
						help:
							'Edit this to change port name for Controller and Compute Nodes configurations. Provider networks or SR-IOV VFs',
						name: 'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_1:name',
						required: 'true',
						showIf: { parentName: 'CBIS:host_group_config:CaaS:custom_nics', parentValue: true },
						type: 'text',
						validation: '^[A-Za-z0-9_-]+$'
					},
					{
						default: 'ens12f1',
						display: 'NIC 3 Port 2 Interface Name',
						help:
							'Edit this to change port name for Controller and Compute Nodes configurations. Provider networks or SR-IOV VFs',
						name: 'CBIS:host_group_config:CaaS:common_network_config:nic_3_port_2:name',
						required: 'true',
						showIf: { parentName: 'CBIS:host_group_config:CaaS:custom_nics', parentValue: true },
						type: 'text',
						validation: '^[A-Za-z0-9_-]+$'
					},
					{
						columns: [
							{
								display: 'Bond Name',
								name: 'edge_port_name',
								readonly: false,
								required: true,
								type: 'text',
								validation: '^nic_[2-3]_bond$'
							},
							{
								dataSource: 'subnets_dataSource',
								default: [],
								display: 'Ingress/Egress Networks Mapping',
								multiple: true,
								name: 'caas_external',
								required: false,
								type: 'select',
								useFirstAsDefault: true,
								values: []
							}
						],
						default: [
							{ caas_external: [], edge_port_name: 'nic_2_bond' },
							{
								caas_external: [],
								edge_port_name: 'nic_3_bond'
							}
						],
						display: 'Ingress / Egress per port configuration',
						editItemDisplay: 'Edit Interface per port',
						emptyGridDisplay: 'Interface Per Port configuration',
						help: 'Assign subnets to physical interfaces',
						name: 'CBIS:host_group_config:CaaS:edge_generic_caas_per_port_config',
						newItemDisplay: 'Add new port',
						onlyRangeEnable: true,
						operations: { Add: true, Delete: true, Edit: true },
						readonly: false,
						required: false,
						showIf: { parentName: 'CBIS:host_group_config:CaaS:caas_role', parentValue: ['Edge'] },
						type: 'grid'
					},
					{
						default: false,
						display: 'Enable Ceph fast pool',
						help: 'Enable fast Ceph pool. The fast pool should be based on SSDs/NVMEs',
						name: 'CBIS:host_group_config:CaaS:enable_fast_pool',
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:caas_role',
							parentValue: ['Storage']
						},
						type: 'boolean'
					},
					{
						display: 'Fast pool device list',
						help:
							'If the fast pool is enabled, the following list will create new OSDs on each device(if space is available) to create a fast Ceph pool',
						name: 'CBIS:host_group_config:CaaS:fast_pool_device',
						required: true,
						showIf: {
							parentName: 'CBIS:host_group_config:CaaS:enable_fast_pool',
							parentValue: true
						},
						type: 'host-list',
						validation: '^[A-Za-z0-9/]*$'
					}
				],
				validation: '^[A-Za-z]{1}[a-zA-Z0-9_]{3,13}$'
			},
			{
				bmc: true,
				description: 'Add your IPMI IP addresses',
				display: 'IPMI',
				force_multiple_pools: false,
				force_racks: false,
				name: 'ipmi_ips',
				readonly_racks: false,
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
						default: [],
						display: 'Define Labels',
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
						fields: [{ dataSource: 'caas_hostgroups', name: 'hostGroups', values: [] }],
						name: 'assignNodes'
					}
				],
				supported_hw_pools: false,
				supported_racks: true,
				type: 'ipmi'
			},
			{
				display: 'CaaS Cluster',
				name: 'cluster',
				subSections: [
					{
						description: 'Basic configuration',
						display: 'Cluster',
						fields: [
							{
								display: 'Cluster Name',
								help: 'Only allows a-z,0-9,-',
								name: 'CBIS:cluster_deployment:cluster_config:system_name',
								required: true,
								type: 'text',
								validation: '^[a-z][a-z0-9-]{2,15}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								display: 'Cluster ID',
								name: 'CBIS:cluster_deployment:cluster_config:system_id',
								required: true,
								type: 'text',
								validation: '^[1-9][0-9]{7,15}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'Calico',
								display: 'Internal Service Network CNI',
								help:
									'Network plugin for container network. Currently only support calico for dcos mode',
								name: 'CBIS:cluster_deployment:cluster_config:network_mode',
								required: true,
								type: 'select',
								values: ['Calico', 'Weave']
							},
							{
								default: '1.1.1.0/24',
								display: 'Internal Service Network (IPv4)',
								help:
									"Docker registry URL, used by registry proxy on Master Nodes. Registry proxy on Master Nodes provides proxy function for docker registry. Option: URL in format 'http[s]://IP:PORT' for external registry. remote registry 'https://192.168.1.1:5000' IP segment used by calico/weave network. This network is used by calico/weave to assign IP addresses to containers running in the cluster. Option: network/mask",
								name: 'CBIS:cluster_deployment:cluster_config:overlay_network',
								required: true,
								type: 'cidr'
							},
							{
								default: 'IPv4',
								display: 'Select IP Stack Type',
								help:
									'Support IPv4 only, IPv6 only and IPv4/IPv6 dual stack. The cluster operates with IPv4/IPv6 dual stack. Infrastructure components (k8s and other services) still run with IPv4 addresses, but application Pods are allocated with IPv4/IPv6 dual stack addresses. k8s is only aware of IPv4 addressed on Pods and cluster IP is of IPv4. This requires calico as the CNI plugin and internal service network and external network with dual stacks. BCMT OAM networks still requires IPv4 network.',
								multiple: true,
								name: 'CBIS:cluster_deployment:cluster_config:network_stack',
								required: true,
								type: 'select',
								values: ['IPv4', 'IPv6']
							},
							{
								default: '2001:db8:1234::/64',
								display: 'Internal Service Network (IPv6)',
								help: 'See IPv4 help. Option: network/mask',
								name: 'CBIS:cluster_deployment:cluster_config:overlay_network_ipv6',
								showIf: {
									isExternal: true,
									parentName: 'CBIS:cluster_deployment:cluster_config:network_stack',
									parentValue: ['IPv6']
								},
								type: 'cidr'
							},
							{
								default: [],
								display: 'NTP Servers',
								help:
									'External NTP server list. Servers in the list serve us the upstream of internal NTP servers. Option: ip addresses. Also support IPv6',
								name: 'CBIS:cluster_deployment:cluster_config:external_ntpservers',
								required: true,
								type: 'ip-list',
								unique: true,
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: [],
								display: 'DNS servers',
								help: 'External upstream DNS servers. Option: ip addresses. Also support IPv6',
								name: 'CBIS:cluster_deployment:cluster_config:external_dns',
								required: true,
								type: 'ip-list',
								unique: true,
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: 'control',
								display: 'Internal NTP Servers',
								name: 'CBIS:cluster_deployment:cluster_config:internal_ntpservers',
								required: true,
								type: 'select',
								values: ['control', 'edge']
							},
							{
								default: 'None',
								display: 'CNI metaplugins',
								help:
									'Use Multus and DANM metaplugins in Kubernetes to support multiple interfaces per Pod.',
								name: 'CBIS:cluster_deployment:cluster_config:cni_metaplugins',
								required: true,
								type: 'select',
								values: ['None', 'DANM', 'Multus']
							},
							{
								default: [],
								display: 'Firewall Whitelist',
								help: 'Firewall Whitelist, IP addresses list',
								name: 'CBIS:cluster_deployment:cluster_config:firewall_whitelist',
								required: false,
								type: 'ip-list',
								unique: true,
								validation: '^[0-9.,_-]+$',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						name: 'cluster_basic'
					},
					{
						description: 'Advanced cluster configuration',
						display: 'Advanced',
						fields: [
							{
								default: 'cluster.local',
								display: 'Dns Domain',
								help:
									'Dns domain, must be consistent with domain root CA if root CA is not self-signed CA. Only one domain is supported',
								name: 'CBIS:cluster_deployment:cluster_config:dns_domain',
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: 'local/cluster',
								display: 'Domain Path',
								help: 'Domain path must be set according to DNS domain',
								name: 'CBIS:cluster_deployment:cluster_config:domain_path',
								type: 'text',
								validation: '^[A-Za-z0-9._/-]+$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 4096,
								display: 'Max Pod Pids',
								help: 'The number of max pids per pod. Default number is 4096',
								name: 'CBIS:cluster_deployment:cluster_config:max_pod_pids',
								restrictions: { max: 131072, min: 1 },
								type: 'number'
							},
							{
								default: true,
								display: 'Aide Enable',
								help:
									'Advanced Intrusion Detection Environment (aide) uses predefind rules to check file and directory integrity. The field controls the enablement of aide on the system. True: enable aide and check the integrity weekly of Sat 2:30. False: do nothing',
								name: 'CBIS:cluster_deployment:cluster_config:aide_enable',
								type: 'boolean'
							}
						],
						initialCollapse: true,
						name: 'cluster_advanced'
					},
					{
						description: 'IPV4 Egress configuration',
						display: 'IPV4 Egress',
						fields: [
							{
								default: 'Disabled',
								display: 'IPV4 Egress',
								name: 'CBIS:cluster_deployment:cluster_config:egress_mode',
								type: 'select',
								values: ['Disabled', 'Master Worker', 'Master Only', 'Worker Only']
							},
							{
								default: '',
								display: 'Master Gateway',
								help: 'The gateway of the control nodes. set it to a private IP of the edge node',
								name: 'CBIS:cluster_deployment:cluster_config:control_gw',
								showIf: {
									isExternal: false,
									operator: 'or',
									parentName: 'CBIS:cluster_deployment:cluster_config:egress_mode',
									parentValue: ['Master Worker', 'Master Only']
								},
								type: 'ip'
							},
							{
								default: '',
								display: 'Edge Interface',
								help:
									'The egress interface in the edge node, this one should be attached to the public network. e.g. eth0',
								name: 'CBIS:cluster_deployment:cluster_config:edge_if',
								showIf: {
									isExternal: false,
									operator: 'or',
									parentName: 'CBIS:cluster_deployment:cluster_config:egress_mode',
									parentValue: ['Master Worker', 'Master Only', 'Worker Only']
								},
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: '',
								display: 'Worker Gateway',
								help: 'The gateway of the worker nodes, set it to a private IP of the edge node',
								name: 'CBIS:cluster_deployment:cluster_config:worker_gw',
								showIf: {
									isExternal: false,
									operator: 'or',
									parentName: 'CBIS:cluster_deployment:cluster_config:egress_mode',
									parentValue: ['Master Worker', 'Worker Only']
								},
								type: 'ip'
							}
						],
						initialCollapse: true,
						name: 'cluster_egress1'
					},
					{
						description: 'IPV6 Egress configuration',
						display: 'IPV6 Egress',
						fields: [
							{
								default: 'Disabled',
								display: 'IPV6 Egress',
								name: 'CBIS:cluster_deployment:cluster_config:egress_mode_v6',
								type: 'select',
								values: ['Disabled', 'Master Worker', 'Master Only', 'Worker Only']
							},
							{
								default: '',
								display: 'Master Gateway',
								name: 'CBIS:cluster_deployment:cluster_config:control_gw_v6',
								showIf: {
									help: 'The gateway of the control nodes. set it to a private IP of the edge node',
									isExternal: false,
									operator: 'or',
									parentName: 'CBIS:cluster_deployment:cluster_config:egress_mode_v6',
									parentValue: ['Master Worker', 'Master Only']
								},
								type: 'ip'
							},
							{
								default: '',
								display: 'Edge Interface',
								name: 'CBIS:cluster_deployment:cluster_config:edge_if_v6',
								showIf: {
									help:
										'The egress interface in the edge node, this one should be attached to the public network. e.g. eth0',
									isExternal: false,
									operator: 'or',
									parentName: 'CBIS:cluster_deployment:cluster_config:egress_mode_v6',
									parentValue: ['Master Worker', 'Master Only', 'Worker Only']
								},
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: '',
								display: 'Worker Gateway',
								name: 'CBIS:cluster_deployment:cluster_config:worker_gw_v6',
								showIf: {
									help: 'The gateway of the worker nodes, set it to a private IP of the edge node',
									isExternal: false,
									operator: 'or',
									parentName: 'CBIS:cluster_deployment:cluster_config:egress_mode_v6',
									parentValue: ['Master Worker', 'Worker Only']
								},
								type: 'ip'
							}
						],
						initialCollapse: true,
						name: 'cluster_egress2'
					},
					{
						display: 'Docker Internal Network Settings',
						fields: [
							{
								default: '1.1.1.1/24',
								display: 'Bridge',
								help:
									'Specify IPv4 address and netmask for the docker0 bridge, such as 192.168.41.1/24.',
								name: 'CBIS:cluster_deployment:docker_network_settings:bridge',
								required: true,
								type: 'cidr'
							},
							{
								default: '',
								display: 'Container Subnet for fixed IPs',
								help:
									'Specify Container IPv4 subnet for fixed IPs. Restrict the IP range from the docker0 subnet, must be a subset of the bridge IP range.',
								name: 'CBIS:cluster_deployment:docker_network_settings:fixed_cidr',
								required: false,
								showIf: {
									isExternal: true,
									parentName: 'CBIS:cluster_deployment:cluster_config:network_stack',
									parentValue: ['IPv4']
								},
								type: 'cidr'
							},
							{
								default: '',
								display: 'Container IPv6 Subnet for fixed IPs',
								help:
									'Specify Container IPv6 subnet for fixed IPs. Please use unique local address (ULA) for this value. The network mask must be 80 or less to make sure the subnet for Docker containers should at least have a size of /80. If network_stack: ipv6_only, the default value is fd00:1::/64.',
								name: 'CBIS:cluster_deployment:docker_network_settings:fixed_cidr_v6',
								required: false,
								showIf: {
									isExternal: true,
									parentName: 'CBIS:cluster_deployment:cluster_config:network_stack',
									parentValue: ['IPv6']
								},
								type: 'cidr'
							}
						],
						name: 'docker_network'
					},
					{
						display: 'Root CA',
						fields: [
							{
								default: '',
								display: 'Root CA Certificate',
								maxCharCount: 5000,
								name: 'CBIS:cluster_deployment:root_ca:ca_certificate',
								type: 'textarea',
								validation: '.*$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: '',
								display: 'Root CA private key',
								maxCharCount: 5000,
								name: 'CBIS:cluster_deployment:root_ca:ca_private_key',
								type: 'textarea',
								validation: '.*$',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'ca_certificate'
					}
				]
			},
			{
				display: 'Installation steps',
				name: 'steps',
				subSections: [
					{
						description: 'Enable/Disable installation steps',
						display: 'Installation Steps',
						fields: [
							{
								default: true,
								display: 'Generate Inventory',
								name: 'CAAS_GENERATE',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Bootstrap Manager',
								name: 'CAAS_BOOTSTRAP',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Provision Nodes',
								name: 'CAAS_PROVISION',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Nodes Post Configuration',
								name: 'CAAS_POST_PROVISION',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Cluster Installation',
								help:
									'Install and configure Kubernetes and its ecosystem. Warning !  pre-existing k8s installation may be deleted ',
								name: 'CLUSTER_CONFIG',
								type: 'boolean'
							},
							{ default: true, display: 'Post install', name: 'POST_CONFIG', type: 'boolean' }
						],
						name: 'installation_steps'
					},
					{
						description: 'Enable/Disable post install steps',
						display: 'Post-Install',
						fields: [
							{
								default: false,
								display: 'Prometheus',
								name: 'PROMETHEUS',
								type: 'boolean'
							},
							{ default: false, display: 'Smoke Test', name: 'SMOKE_TEST', type: 'boolean' }
						],
						initialCollapse: true,
						name: 'cluster-post-install'
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
								disabled: false,
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
	cluster_bm_installation_isActive: { active: false },
	log_size_bm_installation: {
		name: '/var/log/cbis/cluster_bm_installation.log',
		size: 50000000
	},
	bm_progress: {
		progress_steps: [
			{
				description: 'Validating user input',
				display: 'Input validation',
				logRef: 'pre deploy validation passed successfully',
				name: 'input_validation'
			},
			{
				description: 'Running KeepAlive and Haproxy deployment phase',
				display: 'Run KeepAlive and Haproxy deployment',
				logRef: 'Running first post config phase',
				name: 'run_keepAlive_and_Haproxy_deployment'
			},
			{
				description: 'Running first post config phase',
				display: 'Run first post config',
				logRef: 'Running second post config phase',
				name: 'run_first_post_config'
			},
			{
				description: 'Running second post config phase',
				display: 'Run second post config',
				logRef: '*** Finished post install ***',
				name: 'run_second_post_config'
			},
			{
				description: 'Running ceph installation phase',
				display: 'Run ceph installation',
				logRef: 'Ceph installation Done',
				name: 'run_ceph_installation'
			},
			{
				description: 'Running third post config phase',
				display: 'Run third post config',
				logRef: '*** Pre-deploy-extra phase passed successfully ***',
				name: 'run_third_post_config'
			},
			{
				description: 'NCS admin docker creation',
				display: 'Create NCS docker',
				logRef: '*** NCS docker created successfully ***',
				name: 'create_bcmt_docker'
			},
			{
				description: 'Creating a new baremetal cluster',
				display: 'Cluster BM creation',
				logRef: '*** Cluster created successfully ***',
				name: 'cluster_creation'
			},
			{
				description: 'Get cluster from list',
				display: 'Cluster from  list',
				logRef: '*** Get cluster from list passed successfully ***',
				name: 'get_cluster_from_list'
			},
			{
				description: 'Cluster reset initial password',
				display: 'Cluster reset password',
				logRef: '*** Initial password was reset successfully ***',
				name: 'get_cluster_status'
			},
			{
				description: 'Deployment of new bare metal cluster',
				display: 'Cluster BM deployment passed',
				logRef: '*** Finished cluster installation flow ***',
				name: 'cluster_deployment_passed'
			},
			{
				description: 'Bare metal post install',
				display: 'Post install',
				logRef: '*Bare Metal Post Install*',
				name: 'post_config'
			}
		]
	},
	log_bm: {
		jsonServer: true,
		log:
			'2020-07-01 04:05:36,364 - ClusterBMInstallation - INFO - pre deploy validation passed successfully\n' +
			'\n' +
			'2020-07-01 04:05:36,648 - ClusterBMInstallation - INFO - staring BM cluster installation flow\n' +
			'2020-07-01 04:05:36,648 - ClusterBMInstallation - INFO - directory already exists - consider failing????\n' +
			'\n' +
			'2020-07-01 04:06:55,953 - ClusterBMInstallation - INFO - Running first post config phase\n' +
			'\n' +
			'2020-07-01 04:06:56,194 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: CONFIG_PHASE=postconfig /usr/local/bin/openstack-ansible --timeout=60 -b -u cbis-admin /opt/openstack-ansible/playbooks/postconfig-playbook.yml --private-key=/home/cbis-admin/.ssh/id_rsa --extra-vars "cluster_name=bvt-baremetal"\n' +
			'2020-07-01 04:09:21,272 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: CONFIG_PHASE=postconfig /usr/local/bin/openstack-ansible --timeout=60 -b -u cbis-admin /opt/openstack-ansible/playbooks/postconfig-playbook.yml --private-key=/home/cbis-admin/.ssh/id_rsa --extra-vars "cluster_name=bvt-baremetal" returned:\n' +
			'\n' +
			'2020-07-01 04:09:21,285 - ClusterBMInstallation - INFO - Running second post config phase\n' +
			'\n' +
			'2020-07-01 04:09:21,523 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: /usr/local/bin/openstack-ansible --timeout=60 -b -u cbis-admin /usr/share/cbis/cbis-ansible/pre-deploy/pre-deploy.yml --private-key=/home/cbis-admin/.ssh/id_rsa --extra-vars "cluster_name=bvt-baremetal"\n' +
			'2020-07-01 04:13:12,890 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: /usr/local/bin/openstack-ansible --timeout=60 -b -u cbis-admin /usr/share/cbis/cbis-ansible/pre-deploy/pre-deploy.yml --private-key=/home/cbis-admin/.ssh/id_rsa --extra-vars "cluster_name=bvt-baremetal" returned:\n' +
			'\n' +
			'2020-07-01 04:13:13,014 - ClusterBMInstallation - INFO - *** Finished post install ***\n' +
			'\n' +
			'2020-07-01 04:13:13,014 - ClusterBMInstallation - INFO - Running post config phase after blades reboot\n' +
			'2020-07-01 04:13:13,015 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - INFO - **Checking if Ceph is enabled**\n' +
			'2020-07-01 04:13:13,015 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - INFO - **Not Using default, using: /opt/install/data/cbis-clusters/bvt-baremetal/cluster_config.json**\n' +
			'2020-07-01 04:13:13,022 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - INFO - Ceph is enabled\n' +
			'\n' +
			'2020-07-01 04:13:13,022 - ClusterBMInstallation - INFO - Running ceph installation phase\n' +
			'\n' +
			'2020-07-01 04:13:13,259 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: /usr/local/bin/openstack-ansible --timeout 120 -b -u cbis-admin --private-key /home/cbis-admin/.ssh/id_rsa /usr/lib/python2.7/site-packages/cbis_common/ceph_api/bm_ceph_conf/bm_ceph_install.yml --extra-vars "cluster_name=bvt-baremetal private_key=/home/cbis-admin/.ssh/id_rsa"\n' +
			'2020-07-01 04:30:55,145 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: /usr/local/bin/openstack-ansible --timeout 120 -b -u cbis-admin --private-key /home/cbis-admin/.ssh/id_rsa /usr/lib/python2.7/site-packages/cbis_common/ceph_api/bm_ceph_conf/bm_ceph_install.yml --extra-vars "cluster_name=bvt-baremetal private_key=/home/cbis-admin/.ssh/id_rsa" returned:\n' +
			'\n' +
			'2020-07-01 04:41:52,825 - ClusterBMInstallation - INFO - *** Pre-deploy-extra phase passed successfully ***\n' +
			'\n' +
			'2020-07-01 04:41:52,827 - ClusterBMInstallation - INFO - The cluster with name bvt-baremetal does not exist.\n' +
			'2020-07-01 04:41:53,066 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: \\cp -rf /root/cbis/docker_images/bcmt_images /opt/install/data/cluster_data/\n' +
			'2020-07-01 04:41:55,769 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: \\cp -rf /root/cbis/docker_images/bcmt_images /opt/install/data/cluster_data/ returned:\n' +
			'\n' +
			'2020-07-01 04:41:55,837 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: chmod +x /opt/install/conf/cluster/bcmt-admin_all_in_one/Create.sh\n' +
			'2020-07-01 04:41:55,931 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: chmod +x /opt/install/conf/cluster/bcmt-admin_all_in_one/Create.sh returned:\n' +
			'\n' +
			'2020-07-01 04:41:56,289 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: cd /opt/install/conf/cluster/bcmt-admin_all_in_one;sudo ./Create.sh -r deploy -t /opt/install/data/cluster_data/bcmt_images/ -p bcmt-admin\n' +
			'2020-07-01 04:42:46,827 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: cd /opt/install/conf/cluster/bcmt-admin_all_in_one;sudo ./Create.sh -r deploy -t /opt/install/data/cluster_data/bcmt_images/ -p bcmt-admin returned:\n' +
			'\n' +
			'2020-07-01 04:42:46,833 - ClusterBMInstallation - INFO - *** NCS docker created successfully ***\n' +
			'2020-07-01 04:42:47,041 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: /usr/lib/python2.7/site-packages/nokia/cmframework/bin//generate_inventory --invhandlers /opt/nokia/cm/inventoryhandlers/ --inventory /opt/install/data/cbis-clusters//bvt-baremetal/ncs_inventory.json --phase ncs --cluster bvt-baremetal\n' +
			'2020-07-01 04:42:47,505 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: /usr/lib/python2.7/site-packages/nokia/cmframework/bin//generate_inventory --invhandlers /opt/nokia/cm/inventoryhandlers/ --inventory /opt/install/data/cbis-clusters//bvt-baremetal/ncs_inventory.json --phase ncs --cluster bvt-baremetal returned:\n' +
			'\n' +
			'2020-07-01 05:01:24,304 - ClusterBMInstallation - INFO - LOOP DEPLOY STATUS Response out: {"ncms-status":"failed","ncms-trans-id":"c99a9caf-a551-459e-84bb-d542e3a35ffc","last-deploy-status":"failed"}\n' +
			'\n' +
			'2020-07-01 05:01:24,304 - ClusterBMInstallation - ERROR - Failed to deploy cluster. See cluster log on bcmt-admin docker: /opt/bcmt/log/bcmt.log\n' +
			'2020-07-01 05:01:24,542 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command:  touch /opt/install/data/states/cluster_state\n' +
			'2020-07-01 05:01:24,652 - ClusterBMInstallation-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command:  touch /opt/install/data/states/cluster_state returned:\n' +
			'\n' +
			'2020-07-01 05:01:24,775 - ClusterBMInstallation - ERROR - Caught exception:\n' +
			"['  File \"/usr/lib/python2.7/site-packages/cbis_manager/backend/cbis_conductor.py\", line 79, in deploy\\n    flow.deploy()\\n', '  File \"/usr/lib/python2.7/site-packages/cbis_manager/backend/flows/cluster_bm_installation.py\", line 152, in deploy\\n    self.post_deploy_BM()\\n', '  File \"/usr/lib/python2.7/site-packages/cbis_manager/backend/flows/cluster_bm_installation.py\", line 185, in post_deploy_BM\\n    self.resume_deploy(flow=False)\\n', '  File \"/usr/lib/python2.7/site-packages/cbis_manager/backend/flows/cluster_bm_installation.py\", line 226, in resume_deploy\\n    self.deploy_cluster()\\n', '  File \"/usr/lib/python2.7/site-packages/cbis_manager/backend/flows/cluster_bm_installation.py\", line 193, in deploy_cluster\\n    if self.installer.run_cluster_deploy():\\n', '  File \"/usr/lib/python2.7/site-packages/cbis_manager/backend/flows/cluster/cluster_bm_installer.py\", line 119, in run_cluster_deploy\\n    raise CbisServerException(\\'Failed to deploy cluster\\')\\n']\n" +
			' message: Failed to deploy cluster\n'
	},
	cluster_bm_installation_deploy_deploy: {
		deployStatus: 'SUCCESS'
	}
};
