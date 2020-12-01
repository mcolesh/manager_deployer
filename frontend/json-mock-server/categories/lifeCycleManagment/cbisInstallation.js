module.exports = {
	installation_isActive: {
		active: false
	},
	installation_is_page_dependencies_ready: {
		message: '',
		ready: true
	},
	installation_initial_page: {
		display: 'Hardware',
		fields: [
			{
				default: 'airframe_hd',
				display: 'Hardware Type',
				help: 'Select Hardware type',
				name: 'hardware',
				required: true,
				type: 'select',
				values: ['airframe_hd', 'hp-c7kg10']
			}
		],
		name: 'hardware_initial_page'
	},
	'installation_main_hp-c7kg10': {
		name: 'installation',
		sections: [
			{
				description: 'Configure the Undercloud and the general details',
				display: 'Undercloud & General',
				name: 'general',
				subSections: [
					{
						display: 'Hardware',
						fields: [
							{
								default: 'hp-c7kg10',
								display: 'Chosen Platform',
								name: 'platform',
								readonly: true,
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: 'None',
								display: 'SDN Integration',
								name: 'sdn_integration',
								required: true,
								type: 'select',
								values: ['None']
							},
							{
								display: 'Cloud Name',
								help:
									'Set custom hostnames for all hosts in the cluster. Due to FQDN restrictions, only lower-case letters, numbers and dashes are allowed with a maximum of 15 characters total. Example: cr1-rack-1.\nIf remote ELK is used for multiple CBIS clusters, a unique cloud name must be used for each installed cluster.',
								name: 'CBIS:common:cloud_name',
								required: true,
								type: 'text',
								validation: '^[a-z0-9-]{0,15}$',
								validationDescription:
									"Only low case alphabet, numeric and '-' are allowed Length between 0 to 15 "
							},
							{
								default: false,
								display: 'Custom Installation Enabled',
								help: 'If enabled, you can change the network interfaces names',
								name: 'is_custom_hardware',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable LLDP gather during introspeciton.',
								help:
									'In order to gather LLDP info for ports during introspection. This may cause introspection errors in some HW types.',
								name: 'CBIS:undercloud:introspect_lldp',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'boolean'
							},
							{
								default: 'eno1',
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
								default: 'eno2',
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
								default: 'ens2f0',
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
								default: 'ens2f1',
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
								default: 'eno1',
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
								default: 'eno2',
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
								display: 'Auto Enroll Into Ironic',
								help: 'Ironic will introspect and register any server that pxe boot',
								name: 'auto_enroll',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'boolean'
							},
							{
								default: 'Default',
								display: 'Network Scheme',
								help:
									"Select 'Separated Infra' to set infrastructure traffic isolation at NIC level.\nSelect 'Default' for Infrastructure traffic on Linux bond.\nSelect 'Legacy' for OVS bond for infrastructure and tenant",
								name: 'network_scheme',
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'select',
								values: ['Default', 'Separated Infra']
							},
							{
								default: 'Active-Backup (mode-1)',
								display: 'Infra Bond Type',
								help: 'Select Infra Bond Type',
								name: 'Infra_mode',
								required: true,
								showIf: {
									parentName: 'network_scheme',
									parentValue: ['Default', 'Separated Infra']
								},
								type: 'select',
								values: ['Active-Active (mode-4, LACP)', 'Active-Backup (mode-1)']
							},
							{
								default: 'None',
								display: 'Auxiliary Network',
								help:
									'Add a TripleO managed auxiliary VLAN (in ANSSI case, for supporting HSM), on infra bond',
								name: 'auxiliary_network',
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'select',
								values: ['None', 'Controllers only']
							},
							{
								display: 'Hardware Scan NIC index',
								help:
									'Optional: BIOS NIC index of provisioning network. The default port index is 0 for all the systems, except airframe which has the default of port 2 (not including airframe OR 17). Please specify this parameter if you configured your system differently',
								name: 'hw_nic_index',
								required: false,
								restrictions: { max: 100, min: 0 },
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'number'
							},
							{
								default: true,
								display: 'Hardware Firmware Validation',
								help: 'If disabled, the hardware scan will skip the firmware validation.',
								name: 'hw_fw_validation',
								required: false,
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'boolean'
							},
							{
								default: 'Default',
								display: 'Network Scheme',
								help: 'To edit, enable the Custom Installation flag',
								name: 'default_network_scheme',
								readonly: true,
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: false },
								type: 'select',
								values: ['Legacy', 'Default', 'Separated Infra']
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
								showIf: { parentName: 'CBIS:storage:external_storage_enabled', parentValue: false },
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
								default: 'tripleo_emc',
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
								display: 'Target iSCSI IP',
								help:
									'One or more iSCSI IP addresses.\nIf not supplied, the system will use all scanned IPs.',
								name: 'CBIS:storage:external_storage_iscsi_ip',
								required: false,
								showIf: {
									parentName: 'CBIS:storage:external_storage_volume_driver_name',
									parentValue: [
										'dell_emc.vnx.driver.VNXDriver',
										'dell_emc.unity.Driver',
										'netapp.common.NetAppDriver',
										'hpe.hpe_3par_iscsi.HPE3PARISCSIDriver'
									]
								},
								type: 'text',
								validation: '^[0-9.,]+$',
								validationDescription: 'Only numeric are allowed '
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
						display: 'Network Parameters',
						fields: [
							{ display: 'DNS', name: 'CBIS:common:dns_servers', required: true, type: 'ip-list' },
							{
								display: 'NTP',
								name: 'CBIS:common:ntp_servers',
								required: true,
								type: 'host-list',
								validation: '^[A-Za-z0-9:._-]+$',
								validationDescription: "Only alphabet, numeric, ':', '.', '_' and '-' are allowed "
							},
							{
								display: 'Undercloud CIDR',
								help: 'Enter IP/Mask e.g. 12.34.56.78/24',
								name: 'CBIS:undercloud:undercloud_cidr',
								required: true,
								type: 'cidr'
							},
							{
								display: 'Undercloud Physical Server CIDR',
								help: 'Enter IP/Mask e.g. 23.45.67.89/24',
								name: 'CBIS:undercloud:hypervisor_cidr',
								required: true,
								type: 'cidr'
							},
							{
								default: true,
								display: 'Configure Undercloud Physical Server Network',
								help:
									'If enabled, the Undercloud physical server network will be reconfigured and br-public and br-provisioning bridges will be created. Connectivity to the server will be lost for several minutes, and therefore CBIS-Manager will be down during this period. ',
								name: 'CBIS:undercloud:configure_hypervisor_network',
								type: 'boolean'
							},
							{
								default: 'IPv4',
								display: 'Select IP Stack Type',
								name: 'CBIS:undercloud:enable_ipv6',
								required: true,
								type: 'select',
								values: ['IPv4', 'IPv4/IPv6 dual stack']
							},
							{
								display: 'IPv4 Gateway',
								help:
									'The Undercloud VM and physical server require an IPv4 gateway. If an IPv6 gateway was entered in the external network configuration, the IPv4 gateway needs to be entered here.',
								name: 'CBIS:undercloud:gateway',
								required: true,
								showIf: {
									parentName: 'CBIS:undercloud:enable_ipv6',
									parentValue: 'IPv4/IPv6 dual stack'
								},
								type: 'ip'
							},
							{
								display: 'Undercloud IPv6 CIDR',
								help: 'IPv6 static IP address in CIDR format',
								name: 'CBIS:undercloud:undercloud_cidr6',
								required: true,
								showIf: {
									parentName: 'CBIS:undercloud:enable_ipv6',
									parentValue: 'IPv4/IPv6 dual stack'
								},
								type: 'cidr'
							},
							{
								display: 'Undercloud Physical Server IPv6 CIDR',
								help: 'IPv6 static IP address in CIDR format',
								name: 'CBIS:undercloud:hypervisor_cidr6',
								required: true,
								showIf: {
									parentName: 'CBIS:undercloud:enable_ipv6',
									parentValue: 'IPv4/IPv6 dual stack'
								},
								type: 'cidr'
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
								required: true,
								type: 'timezone'
							},
							{
								default: 9000,
								display: 'Guest MTU',
								help:
									'Neutron uses this value to calculate MTU for all virtual network components. For flat and VLAN networks, Neutron uses this value without modification. For overlay networks such as VXLAN, Neutron automatically subtracts the overlay protocol overhead from this value.',
								name: 'CBIS:common:guests_mtu',
								required: true,
								restrictions: { max: 9999, min: 1100 },
								type: 'number'
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
				description: 'Configure overcloud details',
				display: 'Overcloud',
				name: 'overcloud',
				subSections: [
					{
						description: 'Set Network Parameters',
						display: 'Networks',
						fields: [
							{
								display: 'External Network CIDR',
								name: 'CBIS:subnets:external:network_address',
								required: true,
								type: 'cidr'
							},
							{
								display: 'External Network Gateway',
								name: 'CBIS:subnets:external:gateway',
								required: true,
								type: 'ip'
							},
							{
								display: 'External Network IP range start',
								name: 'CBIS:subnets:external:ip_range_start',
								required: true,
								type: 'ip'
							},
							{
								display: 'External Network IP range End',
								name: 'CBIS:subnets:external:ip_range_end',
								required: true,
								type: 'ip'
							}
						],
						name: 'networks'
					},
					{
						description: 'Set your VLANs',
						display: 'VLANs',
						fields: [
							{
								display: 'External Network',
								name: 'CBIS:subnets:external:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								display: 'Tenant Network',
								name: 'CBIS:subnets:tenant:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								display: 'Storage Network',
								name: 'CBIS:subnets:storage:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								display: 'Storage Management Network',
								name: 'CBIS:subnets:storage_mgmt:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								display: 'Internal Network',
								name: 'CBIS:subnets:internal_api:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								default: [
									{ name: 'physnet0', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet1', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet2', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet3', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet4', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet5 -Flat', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet6 -Flat', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet7 -Flat', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet8 -Flat', value: [{ end: 4094, isRange: true, start: 1 }] }
								],
								display: 'Physical Networks VLAN Ranges',
								help:
									'Enter physical network VLAN ranges.\ne.g. physnet0 600-900, physnet1 901-1500.\nThis is only a logical configuration. If you have SRIOV in your environment, in the hostgroup section you will be able to map physnet to a port.',
								name: 'tenant_network_vlan_ranges',
								onlyRangeEnable: true,
								required: true,
								restrictions: { max: 4094, min: 1 },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: true,
								display: 'Flat OVS Network',
								help: 'If enabled, the OVS network will be flat',
								name: 'is_ovs_flat',
								showIf: { parentName: 'multi_ovs_phys_showif', parentValue: false },
								type: 'boolean'
							},
							{
								default: false,
								display: 'Add OVS Physnet',
								help:
									'Add multiple physnets with patch ports (beside physnet0). This is a tech-preview feature, contact support to activate',
								name: 'multi_ovs_phys_showif',
								readonly: true,
								type: 'boolean'
							},
							{
								default: [
									{ name: 'ovs_physnet1', value: [{ end: 4094, isRange: true, start: 1 }] }
								],
								display: 'Non-Admin Default OVS Physical Network VLAN Ranges',
								help: 'Enter default non admin tenant OVS physical network VLAN range.',
								name: 'extra_physnet_vlan_range',
								onlyRangeEnable: true,
								required: true,
								restrictions: { max: 4094, min: 1 },
								showIf: { parentName: 'multi_ovs_phys_showif', parentValue: true },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: 'None',
								display: 'Set Flat OVS Physnet',
								help:
									'Currently all OVS physnets are on the same external bridge, so only one can be flat',
								multiple: false,
								name: 'flat_ovs_physnet',
								onlyRangeEnable: true,
								readonly: false,
								required: true,
								showIf: { parentName: 'multi_ovs_phys_showif', parentValue: true },
								type: 'select',
								values: ['None', 'ovs_physnet1', 'physnet0']
							}
						],
						name: 'vlans'
					},
					{
						display: 'Security Configuration',
						fields: [
							{
								default: false,
								display: 'Enable Horizon Audit Logging',
								help:
									'If enabled, the Horizon log includes additional information which provides a mapping between the actions and the user performing these actions. The horizon.log file can be found under any of the controllers at /var/log/containers/horizon',
								name: 'CBIS:common:enable_horizon_additional_logging',
								type: 'boolean'
							},
							{
								default: false,
								display: 'User provided TLS Certificates and Key',
								help: 'If enabled, you can configure your own TLS certificate location',
								name: 'enable_user_tls',
								type: 'boolean'
							},
							{
								display: 'CA Certificate file',
								help:
									'Location of the file on the Undercloud Physical Server which contains the Certificate Authority trusted certificate\nThe name of the file must end with .pem\nExample: /root/ca.crt.pem',
								name: 'user_tls_ca_crt',
								showIf: { parentName: 'enable_user_tls', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*.pem$',
								validationDescription:
									"Only alphabet, numeric, ':', '\"', '[', '\\', ']', '.', '/', '_' and '-' are allowed Should end with '.pem' "
							},
							{
								display: 'SSL/TLS Key Certificate file',
								help:
									'Location of the file on the Undercloud Physical Server which contains the SSL/TLS Certificate associated with the SSL/TLS server key. This certificate should be CA signed.\nThe name of the file must end with .pem\nExample: /root/server.crt.pem',
								name: 'user_tls_crt',
								showIf: { parentName: 'enable_user_tls', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*.pem$',
								validationDescription:
									"Only alphabet, numeric, ':', '\"', '[', '\\', ']', '.', '/', '_' and '-' are allowed Should end with '.pem' "
							},
							{
								display: 'SSL/TLS Key file',
								help:
									'Location of the file on the Undercloud Physical Server which contains the SSL/TLS server key.\nThe name of the file must end with .pem\nExample: /root/server.key.pem',
								name: 'user_tls_keys',
								showIf: { parentName: 'enable_user_tls', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*.pem$',
								validationDescription:
									"Only alphabet, numeric, ':', '\"', '[', '\\', ']', '.', '/', '_' and '-' are allowed Should end with '.pem' "
							},
							{
								default: '',
								display: 'Linux cbis-admin Password',
								help:
									'Configure the Linux cbis-admin user password on the Undercloud Physical Server and Overcloud. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:linux_cbisadmin_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: '',
								display: 'OpenStack admin Password',
								help:
									'Configure the OpenStack / Horizon admin password. \nThe password must consist of: \n - 8-18 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_',
								name: 'CBIS:openstack_deployment:admin_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,18}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'cbis-admin',
								display: 'Zabbix Username',
								name: 'CBIS:openstack_deployment:zabbix_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: '',
								display: 'Zabbix Password',
								help:
									'Configure the Zabbix user password. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:zabbix_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'novl',
								display: 'Novl Username',
								name: 'CBIS:openstack_deployment:novl_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: '',
								display: 'Novl Password',
								help:
									'Configure the Novl user password. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:novl_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'kibana',
								display: 'Kibana Username',
								name: 'CBIS:openstack_deployment:kibana_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: '',
								display: 'Kibana Password',
								help:
									'Configure the Kibana user password. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:kibana_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: '',
								display: 'OpenStack DB Backup Password',
								help:
									'Configure the OpenStack DB backup password. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:backup_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						name: 'security'
					},
					{
						display: 'Networks Optional Parameters',
						fields: [
							{
								default: false,
								display: 'Configure Auxiliary Network',
								help: 'Configure the auxiliary network, Infra bond of Controllers only',
								name: 'configure_aux_network',
								showIf: {
									parentName: 'auxiliary_network',
									parentValue: ['Controllers only', 'Entire overcloud']
								},
								type: 'boolean'
							},
							{
								default: false,
								display: 'Configure Tenant Network',
								help: 'Allows you to change the tenant network configuration.',
								name: 'configure_tenant_network',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Configure Tenant Gateway  ',
								help: 'Allows you to set a tenant network gateway.',
								name: 'configure_tenant_gateway',
								showIf: { parentName: 'configure_tenant_network', parentValue: true },
								type: 'boolean'
							},
							{
								display: 'Tenant Network Gateway',
								help: 'This will set the default gateway for all computes (and only computes)',
								name: 'CBIS:subnets:tenant:gateway',
								showIf: { parentName: 'configure_tenant_gateway', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Tenant Network IP Range Start',
								help: 'Start IP for computes and controllers',
								name: 'CBIS:subnets:tenant:ip_range_start',
								required: true,
								showIf: { parentName: 'configure_tenant_network', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Tenant Network IP Range End',
								help: 'End IP for computes and controllers',
								name: 'CBIS:subnets:tenant:ip_range_end',
								required: true,
								showIf: { parentName: 'configure_tenant_network', parentValue: true },
								type: 'ip'
							},
							{
								default: false,
								display: 'Configure DHCP Tenant Network',
								help: 'Allows you to change the tenant network configuration to dhcp.',
								name: 'configure_dhcp_tenant_network',
								showIf: { parentName: 'sdn_integration', parentValue: ['nuage', 'nuage_ml2'] },
								type: 'boolean'
							},
							{
								display: 'Nuage DHCP Tenant Network VLAN ID',
								help: 'VLAN tag for the Nuage tenant network',
								name: 'CBIS:subnets:nuage_tenant:vlan',
								required: true,
								restrictions: { max: 4094, min: 1 },
								showIf: { parentName: 'configure_dhcp_tenant_network', parentValue: true },
								type: 'number'
							},
							{
								default: 'TripleO',
								display: 'Second Tenant VLAN',
								help:
									'Select the type of second vlan for Vtep Per Numa. If you do not intend to have VTEP per NUMA (even after installation ,as scale out), you may set to None',
								name: 'second_tenant',
								required: true,
								showIf: { parentName: 'sdn_integration', parentValue: ['nuage', 'nuage_ml2'] },
								type: 'select',
								values: ['None', 'DHCP', 'TripleO']
							},
							{
								default: '0.0.0.0/24',
								display: 'Second Tenant Network CIDR',
								name: 'CBIS:subnets:tenant_2:network_address',
								required: true,
								showIf: { parentName: 'second_tenant', parentValue: 'TripleO' },
								type: 'cidr'
							},
							{
								display: 'Second Tenant Network VLAN ID',
								help:
									'VLAN tag for the second tenant network. If you do not intend to have VTEP per NUMA (even after installation ,as scale out), you may set Second Tenant VLAN to None',
								name: 'CBIS:subnets:tenant_2:vlan',
								required: true,
								restrictions: { max: 4094, min: 1 },
								showIf: { parentName: 'second_tenant', parentValue: 'TripleO' },
								type: 'number'
							},
							{
								default: false,
								display: 'Configure Second Tenant Gateway  ',
								help:
									'Allows you to set the second tenant network gateway. This will not be the default GW',
								name: 'configure_tenant_2_gateway',
								showIf: { parentName: 'second_tenant', parentValue: 'TripleO' },
								type: 'boolean'
							},
							{
								display: 'Second Tenant Network Gateway',
								help: 'This will set the gateway for this vlan only on VTEP per NUMA computes',
								name: 'CBIS:subnets:tenant_2:gateway',
								showIf: { parentName: 'configure_tenant_2_gateway', parentValue: true },
								type: 'ip'
							},
							{
								default: false,
								display: 'Configure Second Tenant IP Range',
								help: 'Configure a specific IP range for the second tenant VLAN',
								name: 'configure_tenant_2_range',
								showIf: { parentName: 'second_tenant', parentValue: 'TripleO' },
								type: 'boolean'
							},
							{
								display: 'Second Tenant Network IP Range Start',
								help: 'Start IP',
								name: 'CBIS:subnets:tenant_2:ip_range_start',
								required: true,
								showIf: { parentName: 'configure_tenant_2_range', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Second Tenant Network IP Range End',
								help: 'End IP',
								name: 'CBIS:subnets:tenant_2:ip_range_end',
								required: true,
								showIf: { parentName: 'configure_tenant_2_range', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Nuage Second DHCP Tenant Network VLAN ID',
								help:
									'VLAN tag for the second Nuage tenant network on dual uplink VRS (VTEP per NUMA)',
								name: 'CBIS:subnets:nuage_tenant_2:vlan',
								required: false,
								restrictions: { max: 4094, min: 1 },
								showIf: { parentName: 'second_tenant', parentValue: 'DHCP' },
								type: 'number'
							},
							{
								default: '0.0.0.0/24',
								display: 'Auxiliary Network CIDR',
								name: 'CBIS:subnets:aux:network_address',
								required: true,
								showIf: {
									parentName: 'auxiliary_network',
									parentValue: ['Controllers only', 'Entire overcloud']
								},
								type: 'cidr'
							},
							{
								display: 'Auxiliary Network VLAN ID',
								help: 'VLAN tag for the auxiliary network',
								name: 'CBIS:subnets:aux:vlan',
								required: true,
								restrictions: { max: 4096, min: 1 },
								showIf: {
									parentName: 'auxiliary_network',
									parentValue: ['Controllers only', 'Entire overcloud']
								},
								type: 'number'
							},
							{
								display: 'Auxiliary Network IP Range Start',
								help: 'Start IP for computes and controllers',
								name: 'CBIS:subnets:aux:ip_range_start',
								required: true,
								showIf: { parentName: 'configure_aux_network', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Auxiliary Network IP Range End',
								help: 'End IP for computes and controllers',
								name: 'CBIS:subnets:aux:ip_range_end',
								required: true,
								showIf: { parentName: 'configure_aux_network', parentValue: true },
								type: 'ip'
							},
							{
								default: false,
								display: 'Set Auxiliary Network Gateway',
								help: 'Set the gateway for the auxiliary network',
								name: 'configure_aux_gateway',
								required: true,
								showIf: { parentName: 'configure_aux_network', parentValue: true },
								type: 'boolean'
							},
							{
								display: 'Auxiliary Network Gateway',
								help: 'This will set the gateway for the auxiliary network',
								name: 'CBIS:subnets:aux:gateway',
								required: true,
								showIf: { parentName: 'configure_aux_gateway', parentValue: true },
								type: 'ip'
							},
							{
								default: '0.0.0.0/24',
								display: 'Tenant Network CIDR',
								name: 'CBIS:subnets:tenant:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '0.0.0.0/24',
								display: 'Storage Network CIDR',
								name: 'CBIS:subnets:storage:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '0.0.0.0/24',
								display: 'Storage Management Network CIDR',
								name: 'CBIS:subnets:storage_mgmt:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '0.0.0.0/24',
								display: 'Internal API Network CIDR',
								name: 'CBIS:subnets:internal_api:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: 'vxlan,vlan',
								display: 'Default Order for Tenant Network Type',
								name: 'CBIS:openstack_deployment:tenant_network_tunnel_type',
								required: true,
								type: 'select',
								values: ['vxlan,vlan', 'vlan,vxlan']
							},
							{
								default: false,
								display: 'Enable OVS Native Firewall',
								help:
									'If enabled, a VM is attached to br_int directly without a Linux firewall bridge in between',
								name: 'CBIS:common:enable_ovs_native_firewall',
								readonly: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable VLAN Transparent Support in Neutron',
								help: 'This feature has to be enabled to support QnQ at hostgroup level',
								name: 'CBIS:common:enable_vlan_transparent',
								readonly: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable inherit DSCP from inner IP header to outer ip header',
								help:
									'Tech preview feature, please contact support to activate. If enabled DSCP field is copied from inner ip header to outer ip header',
								name: 'CBIS:common:enable_dscp_inherit',
								readonly: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Infra QoS Enable Priority Code weight',
								help:
									'If Enabled, QoS Priority Weights will be configured on infra Interfaces (Mellanox Interfaces Only) .\nTo change the default values, use the Operation Manual',
								name: 'CBIS:common_network_config:configure_pcp_weights',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Infra QoS Enable Priority Code Tags',
								help:
									'If Enabled, QoS Priority Tags will be configured on infra Interfaces. \nTo change the default values, use the Operation Manual',
								name: 'CBIS:common_network_config:configure_pcp_tags',
								type: 'boolean'
							}
						],
						initialCollapse: true,
						name: 'networks_optional'
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
								default: true,
								display: 'Deploy Zabbix',
								name: 'CBIS:openstack_deployment:deploy_zabbix',
								showIf: { parentName: 'CBIS:openstack_deployment:deploy_elk', parentValue: '42' },
								type: 'boolean'
							},
							{
								default: 'Welcome to CBIS!',
								display: 'Message of the day',
								help:
									'This message will be displayed every time that the user performs SSH into the overcloud component',
								name: 'CBIS:openstack_deployment:message_of_the_day',
								required: true,
								type: 'text',
								validation: '^[A-Za-z\\s0-9!.#=_-]+$',
								validationDescription:
									"Only alphabet, numeric, '!', '.', '#', '=', '_', '-' and ' ' are allowed "
							},
							{
								default: true,
								display: 'Add NOVL validations for CMG',
								help: 'If enabled, validation tests for CMG will be displayed in NOVL',
								name: 'novl_cmg',
								type: 'boolean'
							}
						],
						initialCollapse: true,
						name: 'optional-general'
					},
					{
						display: 'Ceph Optional Configuration',
						fields: [
							{
								default: true,
								display: 'Install Hyper-converged Ceph',
								help: 'If enabled, Ceph will be installed on Nova computes.',
								name: 'CBIS:storage:ceph_hci',
								type: 'boolean'
							},
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
								default: 50,
								display: 'CephFS Share Point Size',
								help: 'Define CephFS Share Point size in GB',
								name: 'CBIS:storage:cephfs_share_point_size',
								restrictions: { max: 5120, min: 0 },
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
								display: 'Enable Ceph Radosgw (object storage)',
								name: 'CBIS:storage:ceph_rados_gw',
								type: 'boolean'
							},
							{
								default: '',
								display: 'Ceph Disks block.db and block.wal',
								help:
									'List of disks/block.db/block.wal that are used by Ceph.\nUse colon to separate the data disk block.db and block.wal, e.g.: /dev/sdb:/dev/sdk:/dev/sdk which means: sdb device uses sdk device as block.db and block.wal.\nIf colon is not used, the block.db and bloc.wal is on data disk, e.g.: /dev/sdc meaning: sdc device is both the disk and its block.db/wal.\nIf the value is left empty CBIS will automatically allocate available disks/block.db/blcok.wal for Ceph once the deployment starts. Therefore, you do not have to fill in this box, and it is recommended to leave it empty.',
								name: 'CBIS:storage:ceph_disks',
								required: false,
								type: 'host-list',
								validation:
									'^\\/dev\\/(mapper\\/)?[A-Za-z][A-Za-z0-9]+$|^\\/dev\\/(mapper\\/)?[A-Za-z][A-Za-z0-9]+:\\/dev\\/(mapper\\/)?[A-Za-z][A-Za-z0-9]+$|^\\/dev\\/(mapper\\/)?[A-Za-z][A-Za-z0-9]+$',
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
									{ pool_name: 'vms', pool_weight: 20 },
									{ pool_name: 'images', pool_weight: 12 },
									{ pool_name: 'metrics', pool_weight: 10 },
									{ pool_name: 'backups', pool_weight: 4 },
									{ pool_name: 'cephfs_data', pool_weight: 3 },
									{ pool_name: 'cephfs_metadata', pool_weight: 3 },
									{ pool_name: 'default.rgw.buckets.data', pool_weight: 3 },
									{ pool_name: 'default.rgw.control', pool_weight: 3 },
									{ pool_name: 'default.rgw.meta', pool_weight: 3 },
									{ pool_name: '.rgw.root', pool_weight: 3 },
									{ pool_name: 'default.rgw.log', pool_weight: 3 },
									{ pool_name: 'default.rgw.buckets.index', pool_weight: 3 }
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
									{ pool_name: 'vms', pool_weight: 20 },
									{ pool_name: 'images', pool_weight: 12 },
									{ pool_name: 'metrics', pool_weight: 10 },
									{ pool_name: 'backups', pool_weight: 10 },
									{ pool_name: 'cephfs_data', pool_weight: 9 },
									{ pool_name: 'cephfs_metadata', pool_weight: 9 }
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
						name: 'elk'
					},
					{
						display: 'Backup Optional Configuration',
						fields: [
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
									'Backup storage location. This can be either a local folder on the Undercloud physical server, or an external NFS mount.',
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
								newItemDisplay: 'Add new notfication target',
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
				description: 'Customize Host Groups',
				display: 'Customize host groups',
				name: 'hostgroups',
				subSections: [
					{
						display: 'OVS-Compute',
						fields: [
							{
								default: 8,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name: 'CBIS:host_group_config:OvsCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:OvsCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:OvsCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:OvsCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 'None',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:OvsCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: 0.2,
								display: 'Memory Ratio for HugePages',
								help:
									'The ratio of memory allocated for huge pages.\nValid range is between 0.1 and 0.8, on both NUMAs. Per NUMA ratio will override the value set, if -1 is not set for them',
								name: 'CBIS:host_group_config:OvsCompute:memory_ratio_for_hugepages',
								readonly: false,
								required: true,
								restrictions: { max: 0.8, min: 0.1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:OvsCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name: 'CBIS:host_group_config:OvsCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:OvsCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:OvsCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name: 'CBIS:host_group_config:OvsCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name: 'CBIS:host_group_config:OvsCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:OvsCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: true,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name: 'CBIS:host_group_config:OvsCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sda2', '/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:OvsCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:OvsCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sda5', '/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:OvsCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:OvsCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: 1331200,
								display: 'Ceph Block Storage, Size in megabytes (Root device)',
								help:
									'root device size in MB, when set to 0 partition for OSD will not be created\nif set partition_layout_path will be used as refrence for roo device paritioning\nWhile this value will be used for ceph_block',
								name: 'CBIS:host_group_config:OvsCompute:osds:root_ceph_block_size',
								readonly: false,
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Hypervisor RPS (Receive Packet Steering) Enabled',
								help: 'Enable Hypervisor RPS for higher network throughput',
								name: 'CBIS:host_group_config:OvsCompute:enable_hypervisor_rps',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:OvsCompute:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:OvsCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 10000,
								display: 'Change the txqueuelen for tap devices',
								help: 'Values between 1000 and 30000',
								name: 'CBIS:host_group_config:OvsCompute:tap_txqueuelen',
								readonly: false,
								required: true,
								restrictions: { max: 30000, min: 1000 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:OvsCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:OvsCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							}
						],
						initialCollapse: true,
						name: 'OvsCompute'
					},
					{
						display: 'Monitoring',
						fields: [
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:Monitoring:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'Monitoring'
					},
					{
						display: 'SRIOV-Performance-Compute',
						fields: [
							{
								columns: [
									{
										display: 'Port Name',
										name: 'port_name',
										readonly: true,
										required: true,
										type: 'text',
										validation: '^[A-Z:a-z0-9_-]+$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'Number of VFs on port',
										name: 'vf_number',
										required: true,
										restrictions: { max: 63, min: 0 },
										type: 'number'
									},
									{
										default: false,
										display: 'Enable trust on port',
										name: 'enable_trust',
										required: true,
										type: 'boolean'
									},
									{
										display: ' Port to Physnet Mapping',
										name: 'physnet_mapping',
										required: true,
										type: 'select',
										values: [
											'none',
											'physnet1',
											'physnet2',
											'physnet3',
											'physnet4',
											'physnet5',
											'physnet6',
											'physnet7',
											'physnet8'
										]
									},
									{
										default: false,
										display: 'Allow Untagged traffic in VGT',
										name: 'allow_vgt_untagged',
										required: true,
										type: 'boolean'
									},
									{
										default: false,
										display: 'Allow infra VLANs in VGT',
										name: 'allow_vgt_infra',
										required: true,
										type: 'boolean'
									}
								],
								default: [
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_2_port_1',
										vf_number: 63
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_2_port_2',
										vf_number: 63
									}
								],
								display: 'SR-IOV per port configuration',
								editItemDisplay: 'Edit Sriov per port',
								emptyGridDisplay: 'Sriov Per Port configuration',
								help:
									"Configure the following for each\nPort Name in the 'Edit SR-IOV per port' screen:\n1. Number of VFs on port. \nPorts on the same physical NIC must have the same number of VFs\n2. Enable trust on port.\n3. Port to Physnet Mapping - Physnets 5 to 8 are Flat enabled physnets. Flat physnets allow usage of VLAN trunk ports. \n*none* in physnet dropdown,  means no SR-IOV will be configured for the port. \n4. Allow Untagged traffic in VGT - Disabled ensures that flat management network will not be accessible from the VMs utilizing VLAN trunk ports. \n5. Allow infra VLANs in VGT - Disabled ensures that infrastructure VLANs will not be accessible from the VMs utilizing VLAN trunk ports. \n \nNote: Vlan Guest Tagging (VGT)",
								name: 'SriovPerformanceCompute:sriov_per_port_config',
								newItemDisplay: 'Add new port',
								onlyRangeEnable: true,
								operations: { Add: false, Delete: false, Edit: true },
								readonly: false,
								required: false,
								type: 'grid'
							},
							{
								default: [
									{ name: 'nic_2_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_2_port_2', value: [{ end: 4095, isRange: true, start: 0 }] }
								],
								display: 'VGT allowed VLAN ranges',
								help:
									"For Flat physnets and Mellanox NICs, configure the VLAN ranges that can be utilized on VLAN Trunk ports.\nFor non-Flat physnets and other NIC vendors, configuration is not required and will be ignored.\n\nAllowing untagged traffic (VLAN '0') and  VLANs used by infrastructure networks, such as 'external', 'tenant', 'storage', 'storage management', 'internal' and others - is strongly discouraged for security reasons.\n\nIf you have to access some of those networks from VM, use  'Allow Untagged traffic in VGT' and 'Allow infra VLANs in VGT' switches in 'SR-IOV per port configuration.'",
								name: 'SriovPerformanceCompute:sriov__vgt',
								onlyRangeEnable: true,
								readonly: false,
								required: true,
								restrictions: { max: 4095, min: 0 },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:SriovPerformanceCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 'None',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:SriovPerformanceCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: 0.2,
								display: 'Memory Ratio for HugePages',
								help:
									'The ratio of memory allocated for huge pages.\nValid range is between 0.1 and 0.8, on both NUMAs. Per NUMA ratio will override the value set, if -1 is not set for them',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:memory_ratio_for_hugepages',
								readonly: false,
								required: true,
								restrictions: { max: 0.8, min: 0.1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: true,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sda2', '/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sda5', '/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: 1331200,
								display: 'Ceph Block Storage, Size in megabytes (Root device)',
								help:
									'root device size in MB, when set to 0 partition for OSD will not be created\nif set partition_layout_path will be used as refrence for roo device paritioning\nWhile this value will be used for ceph_block',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:osds:root_ceph_block_size',
								readonly: false,
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable LLDP on SRIOV hosts for Nuage installations',
								help:
									'On supported switches (such as WBX) Nuage can dynamically open a VTEP for SRIOV, with the aid of LLDP',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:lldp',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 10000,
								display: 'Change the txqueuelen for tap devices',
								help: 'Values between 1000 and 30000',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:tap_txqueuelen',
								readonly: false,
								required: true,
								restrictions: { max: 30000, min: 1000 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'SriovPerformanceCompute'
					},
					{
						display: 'Storage',
						fields: [
							{
								default: true,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name: 'CBIS:host_group_config:Storage:storage_config:enable_ceph_storage',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sda2', '/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:Storage:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName: 'CBIS:host_group_config:Storage:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sda5', '/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:Storage:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName: 'CBIS:host_group_config:Storage:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: 1331200,
								display: 'Ceph Block Storage, Size in megabytes (Root device)',
								help:
									'root device size in MB, when set to 0 partition for OSD will not be created\nif set partition_layout_path will be used as refrence for roo device paritioning\nWhile this value will be used for ceph_block',
								name: 'CBIS:host_group_config:Storage:osds:root_ceph_block_size',
								readonly: false,
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:Storage:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: false,
								display: 'Nic Separation Storage Networks',
								help: 'Will move Storage MNGMT network to NIC2',
								name: 'CBIS:host_group_config:Storage:storage_separation_network',
								readonly: false,
								required: true,
								type: 'boolean'
							}
						],
						initialCollapse: true,
						name: 'Storage',
						type: 'storage'
					},
					{
						display: 'AVRS-Compute',
						fields: [
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name: 'CBIS:host_group_config:AvrsCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:AvrsCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: 6,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:AvrsCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 0,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:AvrsCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: '1G',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:AvrsCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:AvrsCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name: 'CBIS:host_group_config:AvrsCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:AvrsCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: 2,
								display: 'DPDK Dedicated CPUs Per NIC port',
								help:
									'The number of dedicated CPUs per DPDK NIC port. If hyperthreading is on, number of vCPUs must be even',
								name: 'CBIS:host_group_config:AvrsCompute:dpdk_dedicated_cpus_per_nic',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name: 'CBIS:host_group_config:AvrsCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name: 'CBIS:host_group_config:AvrsCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:AvrsCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: true,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name: 'CBIS:host_group_config:AvrsCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sda2', '/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:AvrsCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:AvrsCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sda5', '/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:AvrsCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:AvrsCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: 1331200,
								display: 'Ceph Block Storage, Size in megabytes (Root device)',
								help:
									'root device size in MB, when set to 0 partition for OSD will not be created\nif set partition_layout_path will be used as refrence for roo device paritioning\nWhile this value will be used for ceph_block',
								name: 'CBIS:host_group_config:AvrsCompute:osds:root_ceph_block_size',
								readonly: false,
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								default: 'active-backup',
								display: 'Tenant and Provider Bond Mode',
								help:
									'Selecting active-active requires that LACP is configured at the L2 switch for the tenant and provider bond. SLB is not applicable for AVRS',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:AvrsCompute:bond_mode',
								readonly: false,
								required: true,
								type: 'select',
								values: ['active-backup', 'active-active-lacp', 'active-active-slb']
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:AvrsCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:AvrsCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:AvrsCompute:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'AvrsCompute',
						showIf: { parentName: 'sdn_integration', parentValue: 'nuage' }
					},
					{
						display: 'Controller',
						fields: [
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:Controller:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'Controller'
					},
					{
						display: 'Triple-NIC-AVRS-VtepPerNuma-Compute',
						fields: [
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: '1G',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								data:
									'For VTEP per NUMA, dual uplink AVRS. LACP on NIC 2 and on NIC 3 (separately), with a VLAN on each',
								display: 'Description',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:description',
								readonly: false,
								required: false,
								severity: 'info',
								type: 'message'
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: 2,
								display: 'DPDK Dedicated CPUs Per NIC port',
								help:
									'The number of dedicated CPUs per DPDK NIC port. If hyperthreading is on, number of vCPUs must be even',
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:dpdk_dedicated_cpus_per_nic',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 'active-backup',
								display: 'Tenant and Provider Bond Mode',
								help:
									'Selecting active-active requires that LACP is configured at the L2 switch for the tenant and provider bond. SLB is not applicable for AVRS',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:bond_mode',
								readonly: false,
								required: true,
								type: 'select',
								values: ['active-backup', 'active-active-lacp', 'active-active-slb']
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'TripleNicAvrsVtepPerNumaCompute',
						showIf: { parentName: 'sdn_integration', parentValue: 'nuage' }
					},
					{
						display: 'DPDK-Performance-Compute',
						fields: [
							{
								default: 4,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: '1G',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: 4,
								display: 'DPDK Dedicated CPUs Per NIC port',
								help:
									'The number of dedicated CPUs per DPDK NIC port. If hyperthreading is on, number of vCPUs must be even',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:dpdk_dedicated_cpus_per_nic',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: 'active-backup',
								display: 'Tenant and Provider Bond Mode',
								help:
									'Selecting active-active requires that LACP is configured at the L2 switch for the tenant and provider bond. SLB is not applicable for AVRS',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:bond_mode',
								readonly: false,
								required: true,
								type: 'select',
								values: ['active-backup', 'active-active-lacp', 'active-active-slb']
							},
							{
								default: '4096,4096',
								display: 'Memory limit in MB for DPDK on NUMA0 and NUMA1',
								help:
									'The NUMA node that attaches the DPDK NIC will have the memory allocated for the specified size.\nIf the DPDK cores are reserved on both NUMA nodes, memory will be reserved on both NUMA nodes.',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:dpdk_reserved_memory',
								readonly: false,
								required: true,
								type: 'select',
								values: ['10240,10240', '8192,8192', '4096,4096']
							},
							{
								default: 4,
								display: 'Number of queues per DPDK port',
								help: 'Defaults to the number of cores reserved per DPDK NIC',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:dpdk_queue_number',
								readonly: false,
								required: true,
								restrictions: { max: 8, min: 1 },
								type: 'number'
							},
							{
								default: 1000,
								display: 'Change OVS tx-flush-interval',
								help: 'Values between 0 and 1000000 usec',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:tx_flush_interval',
								readonly: true,
								required: true,
								restrictions: { max: 1000000, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: true,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sda2', '/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sda5', '/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: 1331200,
								display: 'Ceph Block Storage, Size in megabytes (Root device)',
								help:
									'root device size in MB, when set to 0 partition for OSD will not be created\nif set partition_layout_path will be used as refrence for roo device paritioning\nWhile this value will be used for ceph_block',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:osds:root_ceph_block_size',
								readonly: false,
								required: true,
								restrictions: { min: 0 },
								type: 'number'
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: true,
								display: 'Load based PMD RX queue rebalance enabled',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:enable_pmd_rx_rebalance',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 2,
								display: 'DPDK Dedicated CPUs Per NIC port on the default NUMA node',
								help:
									'The number of CPUs to isolate for the default numa node that attaches the DPDK NIC. The value -1 means all on the default NUMA node',
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:dpdk_dedicated_cpus_per_nic_default_numa',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							}
						],
						initialCollapse: true,
						name: 'DpdkPerformanceCompute',
						showIf: {
							parentName: 'sdn_integration',
							parentValue: ['cisco_ml2', 'None', 'nuage_ml2']
						}
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
									{ display: 'Storage', name: 'Storage', noZones: true, racks: true },
									{ display: 'AVRS-Compute', name: 'AvrsCompute' },
									{ display: 'Controller', name: 'Controller', noZones: true },
									{
										display: 'Triple-NIC-AVRS-VtepPerNuma-Compute',
										name: 'TripleNicAvrsVtepPerNumaCompute'
									},
									{ display: 'DPDK-Performance-Compute', name: 'DpdkPerformanceCompute' }
								]
							}
						],
						name: 'assignNodes'
					}
				],
				supported_hw_pools: false,
				supported_racks: true,
				type: 'ipmi'
			},
			{
				description: 'Select steps to perform during installation',
				display: 'Installation Steps',
				initialCollapse: true,
				name: 'steps',
				subSections: [
					{
						description: 'Enable/Disable installation steps',
						display: 'CBIS Installation Steps',
						fields: [
							{
								default: true,
								display: 'Install Undercloud',
								help:
									'If disabled, the deployment will assume that the Undercloud is already installed. Warning! If there is no pre-existing Undercloud, the deployment will fail',
								name: 'install_undercloud',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Hardware scan and introspection',
								help:
									'If enabled, the deployment will discover by ironic iLO provided and will register them into ironic DB',
								name: 'hw_scan_and_introspection',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Generate templates',
								help:
									'If enabled, the deployment will prepare the PXE boot requirements and generate the templates for the installation.',
								name: 'templates_generate',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Install Overcloud',
								help:
									'If enabled, the Overcloud will be installed. Warning! If the requirements are not met, the installation will fail',
								name: 'install_overcloud',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Run Security Hardening Post Installation',
								help: 'If enabled, security hardening will be run at the end of the installation.',
								name: 'run_sec_hardening',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Smoke test sanity check',
								help: 'If enabled, tests will be run at the end of the installation',
								name: 'run_smoke_tests',
								type: 'boolean'
							}
						],
						name: 'installation_steps'
					}
				]
			},
			{
				display: 'Deploy',
				name: 'deploy',
				subSections: [
					{ display: 'Fields Completion', exclude: [], name: 'validation', type: 'validation' },
					{
						buttons: [
							{
								beforeSend: { confirm: 'Are you sure you want to start the deployment?' },
								disabled: false,
								onSuccess: { message: 'Deployment Started!' },
								role: 'submit',
								text: 'Deploy',
								url: { method: 'POST', url: 'api/installation/deploy' }
							}
						],
						name: 'actions',
						showWarning: {
							expectedReturnValue: true,
							message:
								'Warning: Installation is already running, a new deployment will override the existing one.',
							url: { extract: 'active', method: 'GET', url: 'api/installation/isActive' }
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
						display: 'Installation Logs',
						name: 'installation-log',
						url: { url: 'log/deployment.log' }
					}
				],
				type: 'log'
			}
		]
	},
	'installation_status_hp-c7kg10': { status: null },
	installation_progress: {
		progress_steps: [
			{
				description: 'Validating user input',
				display: 'Input validation',
				logRef: 'pre deploy validation passed successfully',
				name: 'input_validation'
			},
			{
				description: 'Validating IPMI ping, network scheme, sepnet restrictions.',
				display: 'Network requirements validation',
				logRef: '**Finished testing IPMI IP connectivity**',
				name: 'network_validation'
			},
			{
				description: 'Creating user_config yaml file for deployment',
				display: 'Created user config yaml',
				logRef: '**finished creating user_config.yaml**',
				name: 'create_user_config'
			},
			{
				display: 'Undercloud installation',
				logRef: '**undercloud installation finished**',
				name: 'undercloud_install'
			},
			{
				description: 'Get MAC addresses from requested IPMI IPs',
				display: 'HW scan',
				logRef: '**Finished creating hosts config and performing hardware scan**',
				name: 'hwscan'
			},
			{
				description: 'Import IPMIs into Ironic',
				display: 'Import ironic nodes',
				logRef: '**Ironic Nodes imported successfully**',
				name: 'oc_node_import'
			},
			{
				description: 'PXE boot computes',
				display: 'Nodes introspection',
				logRef: '**finished introspection**',
				name: 'introspection'
			},
			{
				display: 'Wait for all Ironic nodes to sync with Nova',
				logRef: '**All Ironic nodes are synced with Nova**',
				name: 'ironic_nodes_sync_with_nova'
			},
			{
				display: 'Generate TLS certificates',
				logRef: '**generated TLS certificates finished**',
				name: 'tls'
			},
			{
				description:
					'Generate TripleO templates and create required flavors for Overcloud deployment',
				display: 'Generate templates',
				logRef: '**Templates generated**',
				name: 'templates'
			},
			{
				description: 'TripleO ansible execution pre overcloud deployment ',
				display: 'Overcloud TripleO ansible pre deployment',
				logRef: '**Overcloud TripleO ansible pre deployment finished successfully**',
				name: 'oc_tripleo_ansible_pre'
			},
			{
				description: 'Deploy TripleO Heat stack',
				display: 'Overcloud TripleO heat stack',
				logRef: 'Overcloud configuration completed.',
				name: 'oc_tripleo_heat'
			},
			{
				description: 'TripleO ansible post deployment nodes configuration',
				display: 'Overcloud TripleO ansible post deployment',
				logRef:
					"Executing playbooks: ['/usr/share/cbis/cbis-ansible/post-install/post-install.yml']",
				name: 'oc_tripleo_ansible_post'
			},
			{
				description:
					'CBIS post deployment ansible execution for tuning nodes and deploying additional tools',
				display: 'Overcloud CBIS ansible post deployment',
				logRef: '**overcloud deployed successfully**',
				name: 'oc_cbis_ansible_post'
			},
			{
				description: 'Security hardening for post deployment',
				display: 'Security hardening execution',
				logRef: '** Post Install Security Hardening Completed **',
				name: 'security_hardening'
			},
			{
				description: 'Smoke tests for post deployment to make sure OC is operational',
				display: 'Smoke tests execution',
				logRef: '** Post install Sanity tests completed **',
				name: 'smoke_tests'
			}
		]
	},
	log_size_deployment: {
		name: '/var/log/cbis/deployment.log',
		size: 15303209
	},
	log_deployment: {
		jsonServer: true,
		log:
			'2020-07-01 09:21:01,966 - CbisDeployment - INFO - pre deploy validation passed successfully\n' +
			'2020-07-01 09:21:01,985 - CbisDeployment - DEBUG - sending task to cbis conductor. task id is 26049562-2b83-40f7-af88-22da30f52436\n' +
			'\n' +
			'2020-07-01 09:21:18,937 - CbisDeployment - INFO - **Finished testing IPMI IP connectivity**\n' +
			'\n' +
			'2020-07-01 09:21:19,987 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: cat /etc/hosts\n' +
			'2020-07-01 09:21:20,699 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - INFO - 127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4\n' +
			'\n' +
			'2020-07-01 09:25:49,566 - CbisDeployment - INFO - **finished creating user_config.yaml**\n' +
			'\n' +
			'2020-07-01 09:25:49,695 - CbisDeployment - DEBUG - Skipping OvsCompute - no VGT configuration in the host group\n' +
			'2020-07-01 09:25:49,695 - CbisDeployment - DEBUG - Skipping Monitoring - no VGT configuration in the host group\n' +
			'\n' +
			'2020-07-01 10:26:10,492 - CbisDeployment - INFO - **undercloud installation finished**\n' +
			'\n' +
			'2020-07-01 10:26:10,759 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: virsh list --all\n' +
			'2020-07-01 10:26:10,840 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: virsh list --all returned:\n' +
			'\n' +
			'2020-07-01 10:27:11,277 - CbisDeployment - INFO - **Finished creating hosts config and performing hardware scan**\n' +
			'\n' +
			'2020-07-01 10:27:11,277 - CbisDeployment - INFO - **Performing baremetal import hosts**\n' +
			'2020-07-01 10:27:11,576 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: openstack overcloud node import /home/stack/hosts.yaml\n' +
			'\n' +
			'2020-07-01 10:28:13,652 - CbisDeployment - INFO - **Ironic Nodes imported successfully**\n' +
			'\n' +
			'2020-07-01 10:28:13,653 - CbisDeployment - INFO - **performing introspection**\n' +
			'2020-07-01 10:28:13,988 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: openstack overcloud node introspect --all-manageable\n' +
			'\n' +
			'2020-07-01 10:36:06,981 - CbisDeployment - INFO - **finished introspection**\n' +
			'\n' +
			'2020-07-01 10:36:06,981 - CbisDeployment - INFO - **performing duplicate port validation**\n' +
			'2020-07-01 10:36:07,280 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: python /usr/share/cbis/undercloud/tools/duplicate_port_validation.py\n' +
			'\n' +
			'2020-07-01 10:36:12,095 - CbisDeployment - INFO - **Finished duplicate port validation**\n' +
			'2020-07-01 10:36:12,096 - CbisDeployment - INFO - **Performing baremetal configure boot**\n' +
			'2020-07-01 10:37:12,457 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: openstack overcloud node provide --all-manageable\n' +
			'\n' +
			'2020-07-01 10:39:06,250 - CbisDeployment - INFO - **All Ironic nodes are synced with Nova**\n' +
			'\n' +
			'2020-07-01 10:39:06,251 - CbisDeployment - INFO - **Generating TLS certificates**\n' +
			'2020-07-01 10:39:06,551 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: /bin/bash /usr/share/cbis/undercloud/tools/tls-prepare-certs.sh\n' +
			'\n' +
			'2020-07-01 10:39:11,440 - CbisDeployment - INFO - **generated TLS certificates finished**\n' +
			'\n' +
			'2020-07-01 10:39:11,440 - CbisDeployment - INFO - **Generating templates**\n' +
			'2020-07-01 10:39:11,742 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: openstack cbis template generate --destination /home/stack/templates --ssl-certificate server.crt.pem --ssl-key server.key.pem --ssl-root-certificate ca.crt.pem --user-config /home/stack/user_config.yaml -y\n' +
			'\n' +
			'2020-07-01 10:39:25,588 - CbisDeployment - INFO - **Templates generated**\n' +
			'\n' +
			'2020-07-01 10:39:25,852 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: virsh list --all\n' +
			'2020-07-01 10:39:25,936 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: virsh list --all returned:\n' +
			'\n' +
			'2020-07-01 10:39:26,298 - CbisDeployment - INFO - **Overcloud TripleO ansible pre deployment finished successfully**\n' +
			'\n' +
			'2020-07-01 10:39:26,298 - CbisDeployment - INFO - **deploying overcloud this operation may take 1-4 hours depending on hardware and scale**\n' +
			'2020-07-01 10:39:26,299 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: chmod 777 /var/log/cbis/deployment.log\n' +
			'\n' +
			'Overcloud configuration completed.\n' +
			'Overcloud Endpoint: https://1.1.1.1:13000\n' +
			'Overcloud Horizon Dashboard URL: https://1.1.1.1:443/dashboard\n' +
			'Overcloud rc file: /home/stack/overcloudrc\n' +
			'Overcloud Deployed\n' +
			'\n' +
			"Executing playbooks: ['/usr/share/cbis/cbis-ansible/post-install/post-install.yml']; options: Options(tags=[], listtags=False, listtasks=False, listhosts=False, syntax=False, connection='ssh', module_path=None, forks=50, remote_user='cbis-admin', private_key_file=None, ssh_common_args=None, ssh_extra_args=None, sftp_extra_args=None, scp_extra_args=None, become=None, become_method='sudo', become_user='root', verbosity=None, diff=False, check=False, start_at_task=None); extra_vars: {'flag_file': '/usr/share/cbis/installation_success', 'templates_dir': u'templates/', 'ceph_yaml_path': u'templates/puppet/hieradata/ceph.yaml'}\n" +
			'\n' +
			'PLAY [undercloud] **************************************************************\n' +
			'\n' +
			'2020-07-01 13:15:06,025 - CbisDeployment - INFO - **overcloud deployed successfully**\n' +
			'2020-07-01 13:15:06,358 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: sudo cp /usr/share/cbis/undercloud/tools/novl_cmg_tests/CMG-DPDK_input.yaml /opt/novl/nodejs_server\n' +
			'2020-07-01 13:15:06,462 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: sudo cp /usr/share/cbis/undercloud/tools/novl_cmg_tests/CMG-DPDK_input.yaml /opt/novl/nodejs_server returned:\n' +
			'\n' +
			'2020-07-01 13:47:53,884 - CbisDeployment - INFO - ** Post Install Security Hardening Completed **\n' +
			'2020-07-01 13:47:53,884 - CbisDeployment - INFO - Review the PLAY RECAP section in this log (or directly in the ansible.log) to identify any failure\n' +
			'\n' +
			'2020-07-01 13:53:16,977 - CbisDeployment - INFO - ** Post install Sanity tests completed **\n' +
			"2020-07-01 13:53:17,276 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - running command: python -c 'import cbis_common.cbis_warnings as cw ; print cw.get_warnings()'\n" +
			"2020-07-01 13:53:17,368 - CbisDeployment-cbis_manager.backend.common.cbis_deploy_helper - DEBUG - command: python -c 'import cbis_common.cbis_warnings as cw ; print cw.get_warnings()' returned:\n" +
			'\n' +
			'\n'
	},
	installation_deploy: {
		deployStatus: 'SUCCESS'
	},
	installation_status_airframe_hd: {
		status: {
			content: {
				ipmi_ips: {
					allocations: [{ host_group: 'Storage', pm_addr: ['0.0.0.103'] }],
					bmc: false,
					ipmiAdd: {
						computed: ['0.0.0.105', '0.0.0.104', '0.0.0.103'],
						raw: '0.0.0.105\n0.0.0.104\n0.0.0.103'
					}
				}
			},
			prerequisites: { hardware: 'airframe_hd' }
		}
	},
	installation_main_airframe_hd: {
		name: 'installation',
		sections: [
			{
				description: 'Configure the Undercloud and the general details',
				display: 'Undercloud & General',
				name: 'general',
				subSections: [
					{
						display: 'Hardware',
						fields: [
							{
								default: 'airframe_hd',
								display: 'Chosen Platform',
								name: 'platform',
								readonly: true,
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: 'None',
								display: 'SDN Integration',
								name: 'sdn_integration',
								required: true,
								type: 'select',
								values: ['None']
							},
							{
								default: 'cloud',
								display: 'Cloud Name',
								help:
									'Set custom hostnames for all hosts in the cluster. Due to FQDN restrictions, only lower-case letters, numbers and dashes are allowed with a maximum of 15 characters total. Example: cr1-rack-1.\nIf remote ELK is used for multiple CBIS clusters, a unique cloud name must be used for each installed cluster.',
								name: 'CBIS:common:cloud_name',
								required: true,
								type: 'text',
								validation: '^[a-z0-9-]{0,15}$',
								validationDescription:
									"Only low case alphabet, numeric and '-' are allowed Length between 0 to 15 "
							},
							{
								default: false,
								display: 'Custom Installation Enabled',
								help: 'If enabled, you can change the network interfaces names',
								name: 'is_custom_hardware',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable LLDP gather during introspeciton.',
								help:
									'In order to gather LLDP info for ports during introspection. This may cause introspection errors in some HW types.',
								name: 'CBIS:undercloud:introspect_lldp',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'boolean'
							},
							{
								default: 'ens3f0',
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
								default: 'ens3f1',
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
								default: 'ens6f0',
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
								default: 'ens6f1',
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
								default: 'ens1f0',
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
								default: 'ens1f1',
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
								default: 'ens3f0',
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
								default: 'ens3f1',
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
								default: 'ens6f0',
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
								default: 'ens6f1',
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
								display: 'Auto Enroll Into Ironic',
								help: 'Ironic will introspect and register any server that pxe boot',
								name: 'auto_enroll',
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'boolean'
							},
							{
								default: 'Default',
								display: 'Network Scheme',
								help:
									"Select 'Separated Infra' to set infrastructure traffic isolation at NIC level.\nSelect 'Default' for Infrastructure traffic on Linux bond.\nSelect 'Legacy' for OVS bond for infrastructure and tenant",
								name: 'network_scheme',
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'select',
								values: ['Default', 'Separated Infra']
							},
							{
								default: 'Active-Backup (mode-1)',
								display: 'Infra Bond Type',
								help: 'Select Infra Bond Type',
								name: 'Infra_mode',
								required: true,
								showIf: {
									parentName: 'network_scheme',
									parentValue: ['Default', 'Separated Infra']
								},
								type: 'select',
								values: ['Active-Active (mode-4, LACP)', 'Active-Backup (mode-1)']
							},
							{
								default: 'None',
								display: 'Auxiliary Network',
								help:
									'Add a TripleO managed auxiliary VLAN (in ANSSI case, for supporting HSM), on infra bond',
								name: 'auxiliary_network',
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'select',
								values: ['None', 'Controllers only']
							},
							{
								display: 'Hardware Scan NIC index',
								help:
									'Optional: BIOS NIC index of provisioning network. The default port index is 0 for all the systems, except airframe which has the default of port 2 (not including airframe OR 17). Please specify this parameter if you configured your system differently',
								name: 'hw_nic_index',
								required: false,
								restrictions: { max: 100, min: 0 },
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'number'
							},
							{
								default: true,
								display: 'Hardware Firmware Validation',
								help: 'If disabled, the hardware scan will skip the firmware validation.',
								name: 'hw_fw_validation',
								required: false,
								showIf: { parentName: 'is_custom_hardware', parentValue: true },
								type: 'boolean'
							},
							{
								default: 'Default',
								display: 'Network Scheme',
								help: 'To edit, enable the Custom Installation flag',
								name: 'default_network_scheme',
								readonly: true,
								required: true,
								showIf: { parentName: 'is_custom_hardware', parentValue: false },
								type: 'select',
								values: ['Legacy', 'Default', 'Separated Infra']
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
								default: 'Nokia',
								display: 'IPMI Username',
								name: 'ipmi_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9^._-]+$',
								validationDescription: "Only alphabet, numeric, '^', '.', '_' and '-' are allowed "
							},
							{
								default: 'Password0!',
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
								showIf: { parentName: 'CBIS:storage:external_storage_enabled', parentValue: false },
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
								default: 'tripleo_emc',
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
								display: 'Target iSCSI IP',
								help:
									'One or more iSCSI IP addresses.\nIf not supplied, the system will use all scanned IPs.',
								name: 'CBIS:storage:external_storage_iscsi_ip',
								required: false,
								showIf: {
									parentName: 'CBIS:storage:external_storage_volume_driver_name',
									parentValue: [
										'dell_emc.vnx.driver.VNXDriver',
										'dell_emc.unity.Driver',
										'netapp.common.NetAppDriver',
										'hpe.hpe_3par_iscsi.HPE3PARISCSIDriver'
									]
								},
								type: 'text',
								validation: '^[0-9.,]+$',
								validationDescription: 'Only numeric are allowed '
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
						display: 'Network Parameters',
						fields: [
							{
								default: '0.0.0.0',
								display: 'DNS',
								name: 'CBIS:common:dns_servers',
								required: true,
								type: 'ip-list'
							},
							{
								default: '0.0.0.0',
								display: 'NTP',
								name: 'CBIS:common:ntp_servers',
								required: true,
								type: 'host-list',
								validation: '^[A-Za-z0-9:._-]+$',
								validationDescription: "Only alphabet, numeric, ':', '.', '_' and '-' are allowed "
							},
							{
								default: '0.0.0.0/24',
								display: 'Undercloud CIDR',
								help: 'Enter IP/Mask e.g. 12.34.56.78/24',
								name: 'CBIS:undercloud:undercloud_cidr',
								required: true,
								type: 'cidr'
							},
							{
								default: '0.0.0.0/24',
								display: 'Undercloud Physical Server CIDR',
								help: 'Enter IP/Mask e.g. 23.45.67.89/24',
								name: 'CBIS:undercloud:hypervisor_cidr',
								required: true,
								type: 'cidr'
							},
							{
								default: true,
								display: 'Configure Undercloud Physical Server Network',
								help:
									'If enabled, the Undercloud physical server network will be reconfigured and br-public and br-provisioning bridges will be created. Connectivity to the server will be lost for several minutes, and therefore CBIS-Manager will be down during this period. ',
								name: 'CBIS:undercloud:configure_hypervisor_network',
								type: 'boolean'
							},
							{
								default: 'IPv4',
								display: 'Select IP Stack Type',
								name: 'CBIS:undercloud:enable_ipv6',
								required: true,
								type: 'select',
								values: ['IPv4', 'IPv4/IPv6 dual stack']
							},
							{
								display: 'IPv4 Gateway',
								help:
									'The Undercloud VM and physical server require an IPv4 gateway. If an IPv6 gateway was entered in the external network configuration, the IPv4 gateway needs to be entered here.',
								name: 'CBIS:undercloud:gateway',
								required: true,
								showIf: {
									parentName: 'CBIS:undercloud:enable_ipv6',
									parentValue: 'IPv4/IPv6 dual stack'
								},
								type: 'ip'
							},
							{
								display: 'Undercloud IPv6 CIDR',
								help: 'IPv6 static IP address in CIDR format',
								name: 'CBIS:undercloud:undercloud_cidr6',
								required: true,
								showIf: {
									parentName: 'CBIS:undercloud:enable_ipv6',
									parentValue: 'IPv4/IPv6 dual stack'
								},
								type: 'cidr'
							},
							{
								display: 'Undercloud Physical Server IPv6 CIDR',
								help: 'IPv6 static IP address in CIDR format',
								name: 'CBIS:undercloud:hypervisor_cidr6',
								required: true,
								showIf: {
									parentName: 'CBIS:undercloud:enable_ipv6',
									parentValue: 'IPv4/IPv6 dual stack'
								},
								type: 'cidr'
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
								required: true,
								type: 'timezone'
							},
							{
								default: 9000,
								display: 'Guest MTU',
								help:
									'Neutron uses this value to calculate MTU for all virtual network components. For flat and VLAN networks, Neutron uses this value without modification. For overlay networks such as VXLAN, Neutron automatically subtracts the overlay protocol overhead from this value.',
								name: 'CBIS:common:guests_mtu',
								required: true,
								restrictions: { max: 9999, min: 1100 },
								type: 'number'
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
				description: 'Configure overcloud details',
				display: 'Overcloud',
				name: 'overcloud',
				subSections: [
					{
						description: 'Set Network Parameters',
						display: 'Networks',
						fields: [
							{
								default: '0.0.0.0/24',
								display: 'External Network CIDR',
								name: 'CBIS:subnets:external:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '0.0.0.0',
								display: 'External Network Gateway',
								name: 'CBIS:subnets:external:gateway',
								required: true,
								type: 'ip'
							},
							{
								default: '0.0.0.0',
								display: 'External Network IP range start',
								name: 'CBIS:subnets:external:ip_range_start',
								required: true,
								type: 'ip'
							},
							{
								default: '0.0.0.10',
								display: 'External Network IP range End',
								name: 'CBIS:subnets:external:ip_range_end',
								required: true,
								type: 'ip'
							}
						],
						name: 'networks'
					},
					{
						description: 'Set your VLANs',
						display: 'VLANs',
						fields: [
							{
								default: 10,
								display: 'External Network',
								name: 'CBIS:subnets:external:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								default: 10,
								display: 'Tenant Network',
								name: 'CBIS:subnets:tenant:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								default: 10,
								display: 'Storage Network',
								name: 'CBIS:subnets:storage:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								default: 10,
								display: 'Storage Management Network',
								name: 'CBIS:subnets:storage_mgmt:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								default: 10,
								display: 'Internal Network',
								name: 'CBIS:subnets:internal_api:vlan',
								required: true,
								restrictions: { max: 4096, min: 2 },
								type: 'number'
							},
							{
								default: [
									{ name: 'physnet0', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet1', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet2', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet3', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet4', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet5 -Flat', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet6 -Flat', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet7 -Flat', value: [{ end: 4094, isRange: true, start: 1 }] },
									{ name: 'physnet8 -Flat', value: [{ end: 4094, isRange: true, start: 1 }] }
								],
								display: 'Physical Networks VLAN Ranges',
								help:
									'Enter physical network VLAN ranges.\ne.g. physnet0 600-900, physnet1 901-1500.\nThis is only a logical configuration. If you have SRIOV in your environment, in the hostgroup section you will be able to map physnet to a port.',
								name: 'tenant_network_vlan_ranges',
								onlyRangeEnable: true,
								required: true,
								restrictions: { max: 4094, min: 1 },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: true,
								display: 'Flat OVS Network',
								help: 'If enabled, the OVS network will be flat',
								name: 'is_ovs_flat',
								showIf: { parentName: 'multi_ovs_phys_showif', parentValue: false },
								type: 'boolean'
							},
							{
								default: false,
								display: 'Add OVS Physnet',
								help:
									'Add multiple physnets with patch ports (beside physnet0). This is a tech-preview feature, contact support to activate',
								name: 'multi_ovs_phys_showif',
								readonly: true,
								type: 'boolean'
							},
							{
								default: [
									{ name: 'ovs_physnet1', value: [{ end: 4094, isRange: true, start: 1 }] }
								],
								display: 'Non-Admin Default OVS Physical Network VLAN Ranges',
								help: 'Enter default non admin tenant OVS physical network VLAN range.',
								name: 'extra_physnet_vlan_range',
								onlyRangeEnable: true,
								required: true,
								restrictions: { max: 4094, min: 1 },
								showIf: { parentName: 'multi_ovs_phys_showif', parentValue: true },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: 'None',
								display: 'Set Flat OVS Physnet',
								help:
									'Currently all OVS physnets are on the same external bridge, so only one can be flat',
								multiple: false,
								name: 'flat_ovs_physnet',
								onlyRangeEnable: true,
								readonly: false,
								required: true,
								showIf: { parentName: 'multi_ovs_phys_showif', parentValue: true },
								type: 'select',
								values: ['None', 'ovs_physnet1', 'physnet0']
							}
						],
						name: 'vlans'
					},
					{
						display: 'Security Configuration',
						fields: [
							{
								default: false,
								display: 'Enable Horizon Audit Logging',
								help:
									'If enabled, the Horizon log includes additional information which provides a mapping between the actions and the user performing these actions. The horizon.log file can be found under any of the controllers at /var/log/containers/horizon',
								name: 'CBIS:common:enable_horizon_additional_logging',
								type: 'boolean'
							},
							{
								default: false,
								display: 'User provided TLS Certificates and Key',
								help: 'If enabled, you can configure your own TLS certificate location',
								name: 'enable_user_tls',
								type: 'boolean'
							},
							{
								display: 'CA Certificate file',
								help:
									'Location of the file on the Undercloud Physical Server which contains the Certificate Authority trusted certificate\nThe name of the file must end with .pem\nExample: /root/ca.crt.pem',
								name: 'user_tls_ca_crt',
								showIf: { parentName: 'enable_user_tls', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*.pem$',
								validationDescription:
									"Only alphabet, numeric, ':', '\"', '[', '\\', ']', '.', '/', '_' and '-' are allowed Should end with '.pem' "
							},
							{
								display: 'SSL/TLS Key Certificate file',
								help:
									'Location of the file on the Undercloud Physical Server which contains the SSL/TLS Certificate associated with the SSL/TLS server key. This certificate should be CA signed.\nThe name of the file must end with .pem\nExample: /root/server.crt.pem',
								name: 'user_tls_crt',
								showIf: { parentName: 'enable_user_tls', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*.pem$',
								validationDescription:
									"Only alphabet, numeric, ':', '\"', '[', '\\', ']', '.', '/', '_' and '-' are allowed Should end with '.pem' "
							},
							{
								display: 'SSL/TLS Key file',
								help:
									'Location of the file on the Undercloud Physical Server which contains the SSL/TLS server key.\nThe name of the file must end with .pem\nExample: /root/server.key.pem',
								name: 'user_tls_keys',
								showIf: { parentName: 'enable_user_tls', parentValue: true },
								type: 'text',
								validation: '^[A-Za-z0-9:"[\\].,/_-]*.pem$',
								validationDescription:
									"Only alphabet, numeric, ':', '\"', '[', '\\', ']', '.', '/', '_' and '-' are allowed Should end with '.pem' "
							},
							{
								default: 'Password1!',
								display: 'Linux cbis-admin Password',
								help:
									'Configure the Linux cbis-admin user password on the Undercloud Physical Server and Overcloud. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:linux_cbisadmin_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'Password1!',
								display: 'OpenStack admin Password',
								help:
									'Configure the OpenStack / Horizon admin password. \nThe password must consist of: \n - 8-18 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_',
								name: 'CBIS:openstack_deployment:admin_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,18}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'cbis-admin',
								display: 'Zabbix Username',
								name: 'CBIS:openstack_deployment:zabbix_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', ' ' and '-' are allowed "
							},
							{
								default: 'Password1!',
								display: 'Zabbix Password',
								help:
									'Configure the Zabbix user password. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:zabbix_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'novl',
								display: 'Novl Username',
								name: 'CBIS:openstack_deployment:novl_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'Password1!',
								display: 'Novl Password',
								help:
									'Configure the Novl user password. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:novl_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'kibana',
								display: 'Kibana Username',
								name: 'CBIS:openstack_deployment:kibana_username',
								required: true,
								type: 'text',
								validation: '^[A-Za-z0-9_-]+$',
								validationDescription: "Only alphabet, numeric, '_' and '-' are allowed "
							},
							{
								default: 'Password1!',
								display: 'Kibana Password',
								help:
									'Configure the Kibana user password. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:kibana_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 'Password1!',
								display: 'OpenStack DB Backup Password',
								help:
									'Configure the OpenStack DB backup password. \nThe password must consist of: \n - 8-16 characters \n - At least one lowecase \n - At least one uppercase \n - At least one digit \n - At least one special character from: !@#$%^&*_?.()=+~{}/|-',
								name: 'CBIS:openstack_deployment:backup_password',
								required: true,
								type: 'password',
								validation:
									'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?.()=+~{}/|-])^[0-9a-zA-Z!@#$%^&*_?.()=+~{}/|-]{8,16}$',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						name: 'security'
					},
					{
						display: 'Networks Optional Parameters',
						fields: [
							{
								default: false,
								display: 'Configure Auxiliary Network',
								help: 'Configure the auxiliary network, Infra bond of Controllers only',
								name: 'configure_aux_network',
								showIf: {
									parentName: 'auxiliary_network',
									parentValue: ['Controllers only', 'Entire overcloud']
								},
								type: 'boolean'
							},
							{
								default: false,
								display: 'Configure Tenant Network',
								help: 'Allows you to change the tenant network configuration.',
								name: 'configure_tenant_network',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Configure Tenant Gateway  ',
								help: 'Allows you to set a tenant network gateway.',
								name: 'configure_tenant_gateway',
								showIf: { parentName: 'configure_tenant_network', parentValue: true },
								type: 'boolean'
							},
							{
								display: 'Tenant Network Gateway',
								help: 'This will set the default gateway for all computes (and only computes)',
								name: 'CBIS:subnets:tenant:gateway',
								showIf: { parentName: 'configure_tenant_gateway', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Tenant Network IP Range Start',
								help: 'Start IP for computes and controllers',
								name: 'CBIS:subnets:tenant:ip_range_start',
								required: true,
								showIf: { parentName: 'configure_tenant_network', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Tenant Network IP Range End',
								help: 'End IP for computes and controllers',
								name: 'CBIS:subnets:tenant:ip_range_end',
								required: true,
								showIf: { parentName: 'configure_tenant_network', parentValue: true },
								type: 'ip'
							},
							{
								default: false,
								display: 'Configure DHCP Tenant Network',
								help: 'Allows you to change the tenant network configuration to dhcp.',
								name: 'configure_dhcp_tenant_network',
								showIf: { parentName: 'sdn_integration', parentValue: ['nuage', 'nuage_ml2'] },
								type: 'boolean'
							},
							{
								display: 'Nuage DHCP Tenant Network VLAN ID',
								help: 'VLAN tag for the Nuage tenant network',
								name: 'CBIS:subnets:nuage_tenant:vlan',
								required: true,
								restrictions: { max: 4094, min: 1 },
								showIf: { parentName: 'configure_dhcp_tenant_network', parentValue: true },
								type: 'number'
							},
							{
								default: 'TripleO',
								display: 'Second Tenant VLAN',
								help:
									'Select the type of second vlan for Vtep Per Numa. If you do not intend to have VTEP per NUMA (even after installation ,as scale out), you may set to None',
								name: 'second_tenant',
								required: true,
								showIf: { parentName: 'sdn_integration', parentValue: ['nuage', 'nuage_ml2'] },
								type: 'select',
								values: ['None', 'DHCP', 'TripleO']
							},
							{
								default: '0.0.0.0/24',
								display: 'Second Tenant Network CIDR',
								name: 'CBIS:subnets:tenant_2:network_address',
								required: true,
								showIf: { parentName: 'second_tenant', parentValue: 'TripleO' },
								type: 'cidr'
							},
							{
								display: 'Second Tenant Network VLAN ID',
								help:
									'VLAN tag for the second tenant network. If you do not intend to have VTEP per NUMA (even after installation ,as scale out), you may set Second Tenant VLAN to None',
								name: 'CBIS:subnets:tenant_2:vlan',
								required: true,
								restrictions: { max: 4094, min: 1 },
								showIf: { parentName: 'second_tenant', parentValue: 'TripleO' },
								type: 'number'
							},
							{
								default: false,
								display: 'Configure Second Tenant Gateway  ',
								help:
									'Allows you to set the second tenant network gateway. This will not be the default GW',
								name: 'configure_tenant_2_gateway',
								showIf: { parentName: 'second_tenant', parentValue: 'TripleO' },
								type: 'boolean'
							},
							{
								display: 'Second Tenant Network Gateway',
								help: 'This will set the gateway for this vlan only on VTEP per NUMA computes',
								name: 'CBIS:subnets:tenant_2:gateway',
								showIf: { parentName: 'configure_tenant_2_gateway', parentValue: true },
								type: 'ip'
							},
							{
								default: false,
								display: 'Configure Second Tenant IP Range',
								help: 'Configure a specific IP range for the second tenant VLAN',
								name: 'configure_tenant_2_range',
								showIf: { parentName: 'second_tenant', parentValue: 'TripleO' },
								type: 'boolean'
							},
							{
								display: 'Second Tenant Network IP Range Start',
								help: 'Start IP',
								name: 'CBIS:subnets:tenant_2:ip_range_start',
								required: true,
								showIf: { parentName: 'configure_tenant_2_range', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Second Tenant Network IP Range End',
								help: 'End IP',
								name: 'CBIS:subnets:tenant_2:ip_range_end',
								required: true,
								showIf: { parentName: 'configure_tenant_2_range', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Nuage Second DHCP Tenant Network VLAN ID',
								help:
									'VLAN tag for the second Nuage tenant network on dual uplink VRS (VTEP per NUMA)',
								name: 'CBIS:subnets:nuage_tenant_2:vlan',
								required: false,
								restrictions: { max: 4094, min: 1 },
								showIf: { parentName: 'second_tenant', parentValue: 'DHCP' },
								type: 'number'
							},
							{
								default: '0.0.0.0/24',
								display: 'Auxiliary Network CIDR',
								name: 'CBIS:subnets:aux:network_address',
								required: true,
								showIf: {
									parentName: 'auxiliary_network',
									parentValue: ['Controllers only', 'Entire overcloud']
								},
								type: 'cidr'
							},
							{
								display: 'Auxiliary Network VLAN ID',
								help: 'VLAN tag for the auxiliary network',
								name: 'CBIS:subnets:aux:vlan',
								required: true,
								restrictions: { max: 4096, min: 1 },
								showIf: {
									parentName: 'auxiliary_network',
									parentValue: ['Controllers only', 'Entire overcloud']
								},
								type: 'number'
							},
							{
								display: 'Auxiliary Network IP Range Start',
								help: 'Start IP for computes and controllers',
								name: 'CBIS:subnets:aux:ip_range_start',
								required: true,
								showIf: { parentName: 'configure_aux_network', parentValue: true },
								type: 'ip'
							},
							{
								display: 'Auxiliary Network IP Range End',
								help: 'End IP for computes and controllers',
								name: 'CBIS:subnets:aux:ip_range_end',
								required: true,
								showIf: { parentName: 'configure_aux_network', parentValue: true },
								type: 'ip'
							},
							{
								default: false,
								display: 'Set Auxiliary Network Gateway',
								help: 'Set the gateway for the auxiliary network',
								name: 'configure_aux_gateway',
								required: true,
								showIf: { parentName: 'configure_aux_network', parentValue: true },
								type: 'boolean'
							},
							{
								display: 'Auxiliary Network Gateway',
								help: 'This will set the gateway for the auxiliary network',
								name: 'CBIS:subnets:aux:gateway',
								required: true,
								showIf: { parentName: 'configure_aux_gateway', parentValue: true },
								type: 'ip'
							},
							{
								default: '0.0.0.0/24',
								display: 'Tenant Network CIDR',
								name: 'CBIS:subnets:tenant:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '0.0.0.0/24',
								display: 'Storage Network CIDR',
								name: 'CBIS:subnets:storage:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '0.0.0.0/24',
								display: 'Storage Management Network CIDR',
								name: 'CBIS:subnets:storage_mgmt:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: '0.0.0.0/24',
								display: 'Internal API Network CIDR',
								name: 'CBIS:subnets:internal_api:network_address',
								required: true,
								type: 'cidr'
							},
							{
								default: 'vxlan,vlan',
								display: 'Default Order for Tenant Network Type',
								name: 'CBIS:openstack_deployment:tenant_network_tunnel_type',
								required: true,
								type: 'select',
								values: ['vxlan,vlan', 'vlan,vxlan']
							},
							{
								default: false,
								display: 'Enable OVS Native Firewall',
								help:
									'If enabled, a VM is attached to br_int directly without a Linux firewall bridge in between',
								name: 'CBIS:common:enable_ovs_native_firewall',
								readonly: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable VLAN Transparent Support in Neutron',
								help: 'This feature has to be enabled to support QnQ at hostgroup level',
								name: 'CBIS:common:enable_vlan_transparent',
								readonly: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable inherit DSCP from inner IP header to outer ip header',
								help:
									'Tech preview feature, please contact support to activate. If enabled DSCP field is copied from inner ip header to outer ip header',
								name: 'CBIS:common:enable_dscp_inherit',
								readonly: true,
								type: 'boolean'
							},
							{
								default: true,
								display: 'Infra QoS Enable Priority Code weight',
								help:
									'If Enabled, QoS Priority Weights will be configured on infra Interfaces (Mellanox Interfaces Only) .\nTo change the default values, use the Operation Manual',
								name: 'CBIS:common_network_config:configure_pcp_weights',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Infra QoS Enable Priority Code Tags',
								help:
									'If Enabled, QoS Priority Tags will be configured on infra Interfaces. \nTo change the default values, use the Operation Manual',
								name: 'CBIS:common_network_config:configure_pcp_tags',
								type: 'boolean'
							}
						],
						initialCollapse: true,
						name: 'networks_optional'
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
								default: true,
								display: 'Deploy Zabbix',
								name: 'CBIS:openstack_deployment:deploy_zabbix',
								showIf: { parentName: 'CBIS:openstack_deployment:deploy_elk', parentValue: '42' },
								type: 'boolean'
							},
							{
								default: 'Welcome to CBIS!',
								display: 'Message of the day',
								help:
									'This message will be displayed every time that the user performs SSH into the overcloud component',
								name: 'CBIS:openstack_deployment:message_of_the_day',
								required: true,
								type: 'text',
								validation: '^[A-Za-z\\s0-9!.#=_-]+$',
								validationDescription:
									"Only alphabet, numeric, '!', '.', '#', '=', '_', '-' and ' ' are allowed "
							},
							{
								default: true,
								display: 'Add NOVL validations for CMG',
								help: 'If enabled, validation tests for CMG will be displayed in NOVL',
								name: 'novl_cmg',
								type: 'boolean'
							}
						],
						initialCollapse: true,
						name: 'optional-general'
					},
					{
						display: 'Ceph Optional Configuration',
						fields: [
							{
								default: false,
								display: 'Install Hyper-converged Ceph',
								help: 'If enabled, Ceph will be installed on Nova computes.',
								name: 'CBIS:storage:ceph_hci',
								type: 'boolean'
							},
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
								default: 50,
								display: 'CephFS Share Point Size',
								help: 'Define CephFS Share Point size in GB',
								name: 'CBIS:storage:cephfs_share_point_size',
								restrictions: { max: 5120, min: 0 },
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
								display: 'Enable Ceph Radosgw (object storage)',
								name: 'CBIS:storage:ceph_rados_gw',
								type: 'boolean'
							},
							{
								default: '',
								display: 'Ceph Disks block.db and block.wal',
								help:
									'List of disks/block.db/block.wal that are used by Ceph.\nUse colon to separate the data disk block.db and block.wal, e.g.: /dev/sdb:/dev/sdk:/dev/sdk which means: sdb device uses sdk device as block.db and block.wal.\nIf colon is not used, the block.db and bloc.wal is on data disk, e.g.: /dev/sdc meaning: sdc device is both the disk and its block.db/wal.\nIf the value is left empty CBIS will automatically allocate available disks/block.db/blcok.wal for Ceph once the deployment starts. Therefore, you do not have to fill in this box, and it is recommended to leave it empty.',
								name: 'CBIS:storage:ceph_disks',
								required: false,
								type: 'host-list',
								validation:
									'^\\/dev\\/(mapper\\/)?[A-Za-z][A-Za-z0-9]+$|^\\/dev\\/(mapper\\/)?[A-Za-z][A-Za-z0-9]+:\\/dev\\/(mapper\\/)?[A-Za-z][A-Za-z0-9]+$|^\\/dev\\/(mapper\\/)?[A-Za-z][A-Za-z0-9]+$',
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
									{ pool_name: 'vms', pool_weight: 20 },
									{ pool_name: 'images', pool_weight: 12 },
									{ pool_name: 'metrics', pool_weight: 10 },
									{ pool_name: 'backups', pool_weight: 4 },
									{ pool_name: 'cephfs_data', pool_weight: 3 },
									{ pool_name: 'cephfs_metadata', pool_weight: 3 },
									{ pool_name: 'default.rgw.buckets.data', pool_weight: 3 },
									{ pool_name: 'default.rgw.control', pool_weight: 3 },
									{ pool_name: 'default.rgw.meta', pool_weight: 3 },
									{ pool_name: '.rgw.root', pool_weight: 3 },
									{ pool_name: 'default.rgw.log', pool_weight: 3 },
									{ pool_name: 'default.rgw.buckets.index', pool_weight: 3 }
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
									{ pool_name: 'vms', pool_weight: 20 },
									{ pool_name: 'images', pool_weight: 12 },
									{ pool_name: 'metrics', pool_weight: 10 },
									{ pool_name: 'backups', pool_weight: 10 },
									{ pool_name: 'cephfs_data', pool_weight: 9 },
									{ pool_name: 'cephfs_metadata', pool_weight: 9 }
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
								default: 'sda',
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
						name: 'elk'
					},
					{
						display: 'Backup Optional Configuration',
						fields: [
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
									'Backup storage location. This can be either a local folder on the Undercloud physical server, or an external NFS mount.',
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
								newItemDisplay: 'Add new notfication target',
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
				description: 'Customize Host Groups',
				display: 'Customize host groups',
				name: 'hostgroups',
				subSections: [
					{
						display: 'Monitoring',
						fields: [
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:Monitoring:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'Monitoring'
					},
					{
						display: 'SRIOV-Performance-Compute',
						fields: [
							{
								columns: [
									{
										display: 'Port Name',
										name: 'port_name',
										readonly: true,
										required: true,
										type: 'text',
										validation: '^[A-Z:a-z0-9_-]+$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'Number of VFs on port',
										name: 'vf_number',
										required: true,
										restrictions: { max: 95, min: 0 },
										type: 'number'
									},
									{
										default: false,
										display: 'Enable trust on port',
										name: 'enable_trust',
										required: true,
										type: 'boolean'
									},
									{
										display: ' Port to Physnet Mapping',
										name: 'physnet_mapping',
										required: true,
										type: 'select',
										values: [
											'none',
											'physnet1',
											'physnet2',
											'physnet3',
											'physnet4',
											'physnet5',
											'physnet6',
											'physnet7',
											'physnet8'
										]
									},
									{
										default: false,
										display: 'Allow Untagged traffic in VGT',
										name: 'allow_vgt_untagged',
										required: true,
										type: 'boolean'
									},
									{
										default: false,
										display: 'Allow infra VLANs in VGT',
										name: 'allow_vgt_infra',
										required: true,
										type: 'boolean'
									}
								],
								default: [
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_1_port_1',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_1_port_2',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_2_port_1',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_2_port_2',
										vf_number: 45
									}
								],
								display: 'SR-IOV per port configuration',
								editItemDisplay: 'Edit Sriov per port',
								emptyGridDisplay: 'Sriov Per Port configuration',
								help:
									"Configure the following for each\nPort Name in the 'Edit SR-IOV per port' screen:\n1. Number of VFs on port. \nPorts on the same physical NIC must have the same number of VFs\n2. Enable trust on port.\n3. Port to Physnet Mapping - Physnets 5 to 8 are Flat enabled physnets. Flat physnets allow usage of VLAN trunk ports. \n*none* in physnet dropdown,  means no SR-IOV will be configured for the port. \n4. Allow Untagged traffic in VGT - Disabled ensures that flat management network will not be accessible from the VMs utilizing VLAN trunk ports. \n5. Allow infra VLANs in VGT - Disabled ensures that infrastructure VLANs will not be accessible from the VMs utilizing VLAN trunk ports. \n \nNote: Vlan Guest Tagging (VGT)",
								name: 'SriovPerformanceCompute:sriov_per_port_config',
								newItemDisplay: 'Add new port',
								onlyRangeEnable: true,
								operations: { Add: false, Delete: false, Edit: true },
								readonly: false,
								required: false,
								type: 'grid'
							},
							{
								default: [
									{ name: 'nic_1_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_1_port_2', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_2_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_2_port_2', value: [{ end: 4095, isRange: true, start: 0 }] }
								],
								display: 'VGT allowed VLAN ranges',
								help:
									"For Flat physnets and Mellanox NICs, configure the VLAN ranges that can be utilized on VLAN Trunk ports.\nFor non-Flat physnets and other NIC vendors, configuration is not required and will be ignored.\n\nAllowing untagged traffic (VLAN '0') and  VLANs used by infrastructure networks, such as 'external', 'tenant', 'storage', 'storage management', 'internal' and others - is strongly discouraged for security reasons.\n\nIf you have to access some of those networks from VM, use  'Allow Untagged traffic in VGT' and 'Allow infra VLANs in VGT' switches in 'SR-IOV per port configuration.'",
								name: 'SriovPerformanceCompute:sriov__vgt',
								onlyRangeEnable: true,
								readonly: false,
								required: true,
								restrictions: { max: 4095, min: 0 },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:SriovPerformanceCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 'None',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:SriovPerformanceCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: 0.2,
								display: 'Memory Ratio for HugePages',
								help:
									'The ratio of memory allocated for huge pages.\nValid range is between 0.1 and 0.8, on both NUMAs. Per NUMA ratio will override the value set, if -1 is not set for them',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:memory_ratio_for_hugepages',
								readonly: false,
								required: true,
								restrictions: { max: 0.8, min: 0.1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name:
									'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: true,
								display: 'Enable LLDP on SRIOV hosts for Nuage installations',
								help:
									'On supported switches (such as WBX) Nuage can dynamically open a VTEP for SRIOV, with the aid of LLDP',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:lldp',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 10000,
								display: 'Change the txqueuelen for tap devices',
								help: 'Values between 1000 and 30000',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:tap_txqueuelen',
								readonly: false,
								required: true,
								restrictions: { max: 30000, min: 1000 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:SriovPerformanceCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:SriovPerformanceCompute:root_device',
								readonly: false,
								showIf: {
									parentName: 'CBIS:host_group_config:SriovPerformanceCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'SriovPerformanceCompute'
					},
					{
						display: 'Triple-NIC-SRIOV-Performance-Compute',
						fields: [
							{
								columns: [
									{
										display: 'Port Name',
										name: 'port_name',
										readonly: true,
										required: true,
										type: 'text',
										validation: '^[A-Z:a-z0-9_-]+$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'Number of VFs on port',
										name: 'vf_number',
										required: true,
										restrictions: { max: 95, min: 0 },
										type: 'number'
									},
									{
										default: false,
										display: 'Enable trust on port',
										name: 'enable_trust',
										required: true,
										type: 'boolean'
									},
									{
										display: ' Port to Physnet Mapping',
										name: 'physnet_mapping',
										required: true,
										type: 'select',
										values: [
											'none',
											'physnet1',
											'physnet2',
											'physnet3',
											'physnet4',
											'physnet5',
											'physnet6',
											'physnet7',
											'physnet8'
										]
									},
									{
										default: false,
										display: 'Allow Untagged traffic in VGT',
										name: 'allow_vgt_untagged',
										required: true,
										type: 'boolean'
									},
									{
										default: false,
										display: 'Allow infra VLANs in VGT',
										name: 'allow_vgt_infra',
										required: true,
										type: 'boolean'
									}
								],
								default: [
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_2_port_1',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_2_port_2',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_3_port_1',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_3_port_2',
										vf_number: 45
									}
								],
								display: 'SR-IOV per port configuration',
								editItemDisplay: 'Edit Sriov per port',
								emptyGridDisplay: 'Sriov Per Port configuration',
								help:
									"Configure the following for each\nPort Name in the 'Edit SR-IOV per port' screen:\n1. Number of VFs on port. \nPorts on the same physical NIC must have the same number of VFs\n2. Enable trust on port.\n3. Port to Physnet Mapping - Physnets 5 to 8 are Flat enabled physnets. Flat physnets allow usage of VLAN trunk ports. \n*none* in physnet dropdown,  means no SR-IOV will be configured for the port. \n4. Allow Untagged traffic in VGT - Disabled ensures that flat management network will not be accessible from the VMs utilizing VLAN trunk ports. \n5. Allow infra VLANs in VGT - Disabled ensures that infrastructure VLANs will not be accessible from the VMs utilizing VLAN trunk ports. \n \nNote: Vlan Guest Tagging (VGT)",
								name: 'TripleNicSriovPerformanceCompute:sriov_per_port_config',
								newItemDisplay: 'Add new port',
								onlyRangeEnable: true,
								operations: { Add: false, Delete: false, Edit: true },
								readonly: false,
								required: false,
								type: 'grid'
							},
							{
								default: [
									{ name: 'nic_2_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_2_port_2', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_3_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_3_port_2', value: [{ end: 4095, isRange: true, start: 0 }] }
								],
								display: 'VGT allowed VLAN ranges',
								help:
									"For Flat physnets and Mellanox NICs, configure the VLAN ranges that can be utilized on VLAN Trunk ports.\nFor non-Flat physnets and other NIC vendors, configuration is not required and will be ignored.\n\nAllowing untagged traffic (VLAN '0') and  VLANs used by infrastructure networks, such as 'external', 'tenant', 'storage', 'storage management', 'internal' and others - is strongly discouraged for security reasons.\n\nIf you have to access some of those networks from VM, use  'Allow Untagged traffic in VGT' and 'Allow infra VLANs in VGT' switches in 'SR-IOV per port configuration.'",
								name: 'TripleNicSriovPerformanceCompute:sriov__vgt',
								onlyRangeEnable: true,
								readonly: false,
								required: true,
								restrictions: { max: 4095, min: 0 },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 'None',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: 0.2,
								display: 'Memory Ratio for HugePages',
								help:
									'The ratio of memory allocated for huge pages.\nValid range is between 0.1 and 0.8, on both NUMAs. Per NUMA ratio will override the value set, if -1 is not set for them',
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:memory_ratio_for_hugepages',
								readonly: false,
								required: true,
								restrictions: { max: 0.8, min: 0.1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicSriovPerformanceCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: true,
								display: 'Enable LLDP on SRIOV hosts for Nuage installations',
								help:
									'On supported switches (such as WBX) Nuage can dynamically open a VTEP for SRIOV, with the aid of LLDP',
								name: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:lldp',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name:
									'CBIS:host_group_config:TripleNicSriovPerformanceCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 10000,
								display: 'Change the txqueuelen for tap devices',
								help: 'Values between 1000 and 30000',
								name: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:tap_txqueuelen',
								readonly: false,
								required: true,
								restrictions: { max: 30000, min: 1000 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:root_device',
								readonly: false,
								showIf: {
									parentName: 'CBIS:host_group_config:TripleNicSriovPerformanceCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'TripleNicSriovPerformanceCompute'
					},
					{
						display: 'Storage',
						fields: [
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:Storage:root_device',
								readonly: false,
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: false,
								display: 'Nic Separation Storage Networks',
								help: 'Will move Storage MNGMT network to NIC2',
								name: 'CBIS:host_group_config:Storage:storage_separation_network',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: true,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name: 'CBIS:host_group_config:Storage:storage_config:enable_ceph_storage',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: [
									'/dev/sdb',
									'/dev/sdc',
									'/dev/sdd',
									'/dev/sde',
									'/dev/sdf',
									'/dev/sdg',
									'/dev/sdh',
									'/dev/sdi',
									'/dev/sdj',
									'/dev/sdk',
									'/dev/sdl',
									'/dev/sdm'
								],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:Storage:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName: 'CBIS:host_group_config:Storage:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: [
									'/dev/nvme0n1',
									'/dev/nvme0n1',
									'/dev/nvme0n1',
									'/dev/nvme0n1',
									'/dev/nvme0n1',
									'/dev/nvme0n1',
									'/dev/nvme1n1',
									'/dev/nvme1n1',
									'/dev/nvme1n1',
									'/dev/nvme1n1',
									'/dev/nvme1n1',
									'/dev/nvme1n1'
								],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:Storage:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName: 'CBIS:host_group_config:Storage:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: true,
								display: 'Enable Ceph fast pool',
								help: 'Enable fast Ceph pool. The fast pool should be based on SSDs/NVMEs',
								name: 'CBIS:host_group_config:Storage:storage_config:enable_fast_pool',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/nvme0n1', '/dev/nvme1n1'],
								display: 'Fast pool device list',
								help:
									'If the fast pool is enabled, the following list will create new OSDs on each device(if space is available) to create a fast Ceph pool',
								name: 'CBIS:host_group_config:Storage:storage_config:fast_pool_device',
								readonly: false,
								required: true,
								showIf: {
									parentName: 'CBIS:host_group_config:Storage:storage_config:enable_fast_pool',
									parentValue: true
								},
								type: 'host-list',
								validation: '^[A-Za-z0-9/]*$',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'Storage',
						type: 'storage'
					},
					{
						display: 'SRIOVInfraVxlan-Performance-Compute',
						fields: [
							{
								columns: [
									{
										display: 'Port Name',
										name: 'port_name',
										readonly: true,
										required: true,
										type: 'text',
										validation: '^[A-Z:a-z0-9_-]+$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'Number of VFs on port',
										name: 'vf_number',
										required: true,
										restrictions: { max: 95, min: 0 },
										type: 'number'
									},
									{
										default: false,
										display: 'Enable trust on port',
										name: 'enable_trust',
										required: true,
										type: 'boolean'
									},
									{
										display: ' Port to Physnet Mapping',
										name: 'physnet_mapping',
										required: true,
										type: 'select',
										values: [
											'none',
											'physnet1',
											'physnet2',
											'physnet3',
											'physnet4',
											'physnet5',
											'physnet6',
											'physnet7',
											'physnet8'
										]
									},
									{
										default: false,
										display: 'Allow Untagged traffic in VGT',
										name: 'allow_vgt_untagged',
										required: true,
										type: 'boolean'
									},
									{
										default: false,
										display: 'Allow infra VLANs in VGT',
										name: 'allow_vgt_infra',
										required: true,
										type: 'boolean'
									}
								],
								default: [
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_1_port_1',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_1_port_2',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_2_port_1',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_2_port_2',
										vf_number: 45
									}
								],
								display: 'SR-IOV per port configuration',
								editItemDisplay: 'Edit Sriov per port',
								emptyGridDisplay: 'Sriov Per Port configuration',
								help:
									"Configure the following for each\nPort Name in the 'Edit SR-IOV per port' screen:\n1. Number of VFs on port. \nPorts on the same physical NIC must have the same number of VFs\n2. Enable trust on port.\n3. Port to Physnet Mapping - Physnets 5 to 8 are Flat enabled physnets. Flat physnets allow usage of VLAN trunk ports. \n*none* in physnet dropdown,  means no SR-IOV will be configured for the port. \n4. Allow Untagged traffic in VGT - Disabled ensures that flat management network will not be accessible from the VMs utilizing VLAN trunk ports. \n5. Allow infra VLANs in VGT - Disabled ensures that infrastructure VLANs will not be accessible from the VMs utilizing VLAN trunk ports. \n \nNote: Vlan Guest Tagging (VGT)",
								name: 'SriovInfraVxlanPerformanceCompute:sriov_per_port_config',
								newItemDisplay: 'Add new port',
								onlyRangeEnable: true,
								operations: { Add: false, Delete: false, Edit: true },
								readonly: false,
								required: false,
								type: 'grid'
							},
							{
								default: [
									{ name: 'nic_1_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_1_port_2', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_2_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_2_port_2', value: [{ end: 4095, isRange: true, start: 0 }] }
								],
								display: 'VGT allowed VLAN ranges',
								help:
									"For Flat physnets and Mellanox NICs, configure the VLAN ranges that can be utilized on VLAN Trunk ports.\nFor non-Flat physnets and other NIC vendors, configuration is not required and will be ignored.\n\nAllowing untagged traffic (VLAN '0') and  VLANs used by infrastructure networks, such as 'external', 'tenant', 'storage', 'storage management', 'internal' and others - is strongly discouraged for security reasons.\n\nIf you have to access some of those networks from VM, use  'Allow Untagged traffic in VGT' and 'Allow infra VLANs in VGT' switches in 'SR-IOV per port configuration.'",
								name: 'SriovInfraVxlanPerformanceCompute:sriov__vgt',
								onlyRangeEnable: true,
								readonly: false,
								required: true,
								restrictions: { max: 4095, min: 0 },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 'None',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: 0.2,
								display: 'Memory Ratio for HugePages',
								help:
									'The ratio of memory allocated for huge pages.\nValid range is between 0.1 and 0.8, on both NUMAs. Per NUMA ratio will override the value set, if -1 is not set for them',
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:memory_ratio_for_hugepages',
								readonly: false,
								required: true,
								restrictions: { max: 0.8, min: 0.1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								data: 'SRIOV host with vxlan (tenant vlan) on nic1',
								display: 'Description',
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:description',
								readonly: false,
								required: false,
								severity: 'info',
								type: 'message'
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: true,
								display: 'Enable LLDP on SRIOV hosts for Nuage installations',
								help:
									'On supported switches (such as WBX) Nuage can dynamically open a VTEP for SRIOV, with the aid of LLDP',
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:lldp',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name:
									'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 10000,
								display: 'Change the txqueuelen for tap devices',
								help: 'Values between 1000 and 30000',
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:tap_txqueuelen',
								readonly: false,
								required: true,
								restrictions: { max: 30000, min: 1000 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:root_device',
								readonly: false,
								showIf: {
									parentName:
										'CBIS:host_group_config:SriovInfraVxlanPerformanceCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'SriovInfraVxlanPerformanceCompute'
					},
					{
						display: 'Triple-NIC-SRIOVInfraVxlan-Performance-Compute',
						fields: [
							{
								columns: [
									{
										display: 'Port Name',
										name: 'port_name',
										readonly: true,
										required: true,
										type: 'text',
										validation: '^[A-Z:a-z0-9_-]+$',
										validationDescription: 'Regex invalid, look at the help for more information'
									},
									{
										display: 'Number of VFs on port',
										name: 'vf_number',
										required: true,
										restrictions: { max: 95, min: 0 },
										type: 'number'
									},
									{
										default: false,
										display: 'Enable trust on port',
										name: 'enable_trust',
										required: true,
										type: 'boolean'
									},
									{
										display: ' Port to Physnet Mapping',
										name: 'physnet_mapping',
										required: true,
										type: 'select',
										values: [
											'none',
											'physnet1',
											'physnet2',
											'physnet3',
											'physnet4',
											'physnet5',
											'physnet6',
											'physnet7',
											'physnet8'
										]
									},
									{
										default: false,
										display: 'Allow Untagged traffic in VGT',
										name: 'allow_vgt_untagged',
										required: true,
										type: 'boolean'
									},
									{
										default: false,
										display: 'Allow infra VLANs in VGT',
										name: 'allow_vgt_infra',
										required: true,
										type: 'boolean'
									}
								],
								default: [
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_2_port_1',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_2_port_2',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet1',
										port_name: 'nic_3_port_1',
										vf_number: 45
									},
									{
										allow_vgt_infra: false,
										allow_vgt_untagged: false,
										enable_trust: false,
										physnet_mapping: 'physnet2',
										port_name: 'nic_3_port_2',
										vf_number: 45
									}
								],
								display: 'SR-IOV per port configuration',
								editItemDisplay: 'Edit Sriov per port',
								emptyGridDisplay: 'Sriov Per Port configuration',
								help:
									"Configure the following for each\nPort Name in the 'Edit SR-IOV per port' screen:\n1. Number of VFs on port. \nPorts on the same physical NIC must have the same number of VFs\n2. Enable trust on port.\n3. Port to Physnet Mapping - Physnets 5 to 8 are Flat enabled physnets. Flat physnets allow usage of VLAN trunk ports. \n*none* in physnet dropdown,  means no SR-IOV will be configured for the port. \n4. Allow Untagged traffic in VGT - Disabled ensures that flat management network will not be accessible from the VMs utilizing VLAN trunk ports. \n5. Allow infra VLANs in VGT - Disabled ensures that infrastructure VLANs will not be accessible from the VMs utilizing VLAN trunk ports. \n \nNote: Vlan Guest Tagging (VGT)",
								name: 'TripleNicSriovInfraVxlanPerformanceCompute:sriov_per_port_config',
								newItemDisplay: 'Add new port',
								onlyRangeEnable: true,
								operations: { Add: false, Delete: false, Edit: true },
								readonly: false,
								required: false,
								type: 'grid'
							},
							{
								default: [
									{ name: 'nic_2_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_2_port_2', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_3_port_1', value: [{ end: 4095, isRange: true, start: 0 }] },
									{ name: 'nic_3_port_2', value: [{ end: 4095, isRange: true, start: 0 }] }
								],
								display: 'VGT allowed VLAN ranges',
								help:
									"For Flat physnets and Mellanox NICs, configure the VLAN ranges that can be utilized on VLAN Trunk ports.\nFor non-Flat physnets and other NIC vendors, configuration is not required and will be ignored.\n\nAllowing untagged traffic (VLAN '0') and  VLANs used by infrastructure networks, such as 'external', 'tenant', 'storage', 'storage management', 'internal' and others - is strongly discouraged for security reasons.\n\nIf you have to access some of those networks from VM, use  'Allow Untagged traffic in VGT' and 'Allow infra VLANs in VGT' switches in 'SR-IOV per port configuration.'",
								name: 'TripleNicSriovInfraVxlanPerformanceCompute:sriov__vgt',
								onlyRangeEnable: true,
								readonly: false,
								required: true,
								restrictions: { max: 4095, min: 0 },
								type: 'generic-range',
								validation: '^[A-Za-z\\s0-9._-]+$',
								validationDescription: "Only alphabet, numeric, '.', '_', ' ' and '-' are allowed "
							},
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 'None',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: 0.2,
								display: 'Memory Ratio for HugePages',
								help:
									'The ratio of memory allocated for huge pages.\nValid range is between 0.1 and 0.8, on both NUMAs. Per NUMA ratio will override the value set, if -1 is not set for them',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:memory_ratio_for_hugepages',
								readonly: false,
								required: true,
								restrictions: { max: 0.8, min: 0.1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								data: 'Infra, Tenant VxLAN and provider VLAN on NIC1',
								display: 'Description',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:description',
								readonly: false,
								required: false,
								severity: 'info',
								type: 'message'
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: true,
								display: 'Enable LLDP on SRIOV hosts for Nuage installations',
								help:
									'On supported switches (such as WBX) Nuage can dynamically open a VTEP for SRIOV, with the aid of LLDP',
								name: 'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:lldp',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 10000,
								display: 'Change the txqueuelen for tap devices',
								help: 'Values between 1000 and 30000',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:tap_txqueuelen',
								readonly: false,
								required: true,
								restrictions: { max: 30000, min: 1000 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name:
									'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:root_device',
								readonly: false,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicSriovInfraVxlanPerformanceCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'TripleNicSriovInfraVxlanPerformanceCompute'
					},
					{
						display: 'Triple-NIC-DPDK-Performance-Compute',
						fields: [
							{
								default: 4,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name:
									'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: '1G',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: 2,
								display: 'DPDK Dedicated CPUs Per NIC port',
								help:
									'The number of dedicated CPUs per DPDK NIC port. If hyperthreading is on, number of vCPUs must be even',
								name:
									'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:dpdk_dedicated_cpus_per_nic',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '4096,4096',
								display: 'Memory limit in MB for DPDK on NUMA0 and NUMA1',
								help:
									'The NUMA node that attaches the DPDK NIC will have the memory allocated for the specified size.\nIf the DPDK cores are reserved on both NUMA nodes, memory will be reserved on both NUMA nodes.',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:dpdk_reserved_memory',
								readonly: false,
								required: true,
								type: 'select',
								values: ['10240,10240', '8192,8192', '4096,4096']
							},
							{
								default: 4,
								display: 'Number of queues per DPDK port',
								help: 'Defaults to the number of cores reserved per DPDK NIC',
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:dpdk_queue_number',
								readonly: false,
								required: true,
								restrictions: { max: 8, min: 1 },
								type: 'number'
							},
							{
								default: 1000,
								display: 'Change OVS tx-flush-interval',
								help: 'Values between 0 and 1000000 usec',
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:tx_flush_interval',
								readonly: true,
								required: true,
								restrictions: { max: 1000000, min: 0 },
								type: 'number'
							},
							{
								default: 'active-backup',
								display: 'Tenant and Provider Bond Mode',
								help:
									'Selecting active-active requires that LACP is configured at the L2 switch for the tenant and provider bond. SLB is not applicable for AVRS',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:bond_mode',
								readonly: false,
								required: true,
								type: 'select',
								values: ['active-backup', 'active-active-lacp', 'active-active-slb']
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: true,
								display: 'Load based PMD RX queue rebalance enabled',
								name:
									'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:enable_pmd_rx_rebalance',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:root_device',
								readonly: false,
								showIf: {
									parentName: 'CBIS:host_group_config:TripleNicDpdkPerformanceCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'TripleNicDpdkPerformanceCompute',
						showIf: {
							parentName: 'sdn_integration',
							parentValue: ['cisco_ml2', 'None', 'nuage_ml2']
						}
					},
					{
						display: 'OVS-Compute',
						fields: [
							{
								default: 8,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name: 'CBIS:host_group_config:OvsCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:OvsCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:OvsCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:OvsCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 'None',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:OvsCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: 0.2,
								display: 'Memory Ratio for HugePages',
								help:
									'The ratio of memory allocated for huge pages.\nValid range is between 0.1 and 0.8, on both NUMAs. Per NUMA ratio will override the value set, if -1 is not set for them',
								name: 'CBIS:host_group_config:OvsCompute:memory_ratio_for_hugepages',
								readonly: false,
								required: true,
								restrictions: { max: 0.8, min: 0.1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:OvsCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name: 'CBIS:host_group_config:OvsCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:OvsCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:OvsCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name: 'CBIS:host_group_config:OvsCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name: 'CBIS:host_group_config:OvsCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:OvsCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:OvsCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name: 'CBIS:host_group_config:OvsCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:OvsCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:OvsCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:OvsCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:OvsCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: false,
								display: 'Hypervisor RPS (Receive Packet Steering) Enabled',
								help: 'Enable Hypervisor RPS for higher network throughput',
								name: 'CBIS:host_group_config:OvsCompute:enable_hypervisor_rps',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:OvsCompute:root_device',
								readonly: false,
								showIf: {
									parentName: 'CBIS:host_group_config:OvsCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:OvsCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 10000,
								display: 'Change the txqueuelen for tap devices',
								help: 'Values between 1000 and 30000',
								name: 'CBIS:host_group_config:OvsCompute:tap_txqueuelen',
								readonly: false,
								required: true,
								restrictions: { max: 30000, min: 1000 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:OvsCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:OvsCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							}
						],
						initialCollapse: true,
						name: 'OvsCompute'
					},
					{
						display: 'AVRS-Compute',
						fields: [
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name: 'CBIS:host_group_config:AvrsCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:AvrsCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: 6,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:AvrsCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: 0,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:AvrsCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: '1G',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:AvrsCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:AvrsCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name: 'CBIS:host_group_config:AvrsCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:AvrsCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: 2,
								display: 'DPDK Dedicated CPUs Per NIC port',
								help:
									'The number of dedicated CPUs per DPDK NIC port. If hyperthreading is on, number of vCPUs must be even',
								name: 'CBIS:host_group_config:AvrsCompute:dpdk_dedicated_cpus_per_nic',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name: 'CBIS:host_group_config:AvrsCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name: 'CBIS:host_group_config:AvrsCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:AvrsCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:AvrsCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name: 'CBIS:host_group_config:AvrsCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:AvrsCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:AvrsCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:AvrsCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:AvrsCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: 'active-backup',
								display: 'Tenant and Provider Bond Mode',
								help:
									'Selecting active-active requires that LACP is configured at the L2 switch for the tenant and provider bond. SLB is not applicable for AVRS',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:AvrsCompute:bond_mode',
								readonly: false,
								required: true,
								type: 'select',
								values: ['active-backup', 'active-active-lacp', 'active-active-slb']
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:AvrsCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:AvrsCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:AvrsCompute:root_device',
								readonly: false,
								showIf: {
									parentName: 'CBIS:host_group_config:AvrsCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'AvrsCompute',
						showIf: { parentName: 'sdn_integration', parentValue: 'nuage' }
					},
					{
						display: 'Controller',
						fields: [
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:Controller:root_device',
								readonly: false,
								showIf: {
									parentName: 'CBIS:host_group_config:Controller:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:Controller:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							}
						],
						initialCollapse: true,
						name: 'Controller'
					},
					{
						display: 'Triple-NIC-AVRS-VtepPerNuma-Compute',
						fields: [
							{
								default: 6,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: '1G',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								data:
									'For VTEP per NUMA, dual uplink AVRS. optional LACP on NIC 2 and on NIC 3 (separately), with a VLAN on each',
								display: 'Description',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:description',
								readonly: false,
								required: false,
								severity: 'info',
								type: 'message'
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: 2,
								display: 'DPDK Dedicated CPUs Per NIC port',
								help:
									'The number of dedicated CPUs per DPDK NIC port. If hyperthreading is on, number of vCPUs must be even',
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:dpdk_dedicated_cpus_per_nic',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name:
									'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: 'active-backup',
								display: 'Tenant and Provider Bond Mode',
								help:
									'Selecting active-active requires that LACP is configured at the L2 switch for the tenant and provider bond. SLB is not applicable for AVRS',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:bond_mode',
								readonly: false,
								required: true,
								type: 'select',
								values: ['active-backup', 'active-active-lacp', 'active-active-slb']
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:root_device',
								readonly: false,
								showIf: {
									parentName: 'CBIS:host_group_config:TripleNicAvrsVtepPerNumaCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							}
						],
						initialCollapse: true,
						name: 'TripleNicAvrsVtepPerNumaCompute',
						showIf: { parentName: 'sdn_integration', parentValue: 'nuage' }
					},
					{
						display: 'DPDK-Performance-Compute',
						fields: [
							{
								default: 4,
								display: 'Hypervisor Dedicated CPUs',
								help:
									"The number of CPUs dedicated to the hypervisor operation must be the sum of the per NUMA CPUs allocation (if they are not set to default). If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:hypervisor_dedicated_cpus',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: 1,
								display: 'CPU Isolation Scheme',
								help:
									'Configuration for the CPU isolation scheme: 0 (isolcpus based) or 1 (systemd based)',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:cpu_isolation_scheme',
								readonly: false,
								required: true,
								type: 'select',
								values: [0, 1]
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 0',
								help:
									"The number of CPUs dedicated to Numa 0. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's. At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:cpu_isolation_numa_0',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: -1,
								display: 'Number of Hypervisor Dedicated CPUs for Numa 1',
								help:
									"The number of CPUs dedicated to NUMA 1. If the value is left as -1, CBIS will automatically allocate the isolated CPUs (specified in Hypervisor Dedicated CPUs) among the NUMA's.  At least one CPU (or 2 vCPUs) will be set, but a value of 0 is not allowed. If the values on all the NUMA's dedicated CPUs is not equal the value configured in Hypervisor Dedicated CPUs the system will auto correct to the isolated CPUs allocation only.",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:cpu_isolation_numa_1',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: -1 },
								type: 'number'
							},
							{
								default: '1G',
								display: 'HugePages Size',
								help: 'HugePages size for libvirt virtual machines on the compute',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:hugepages_size',
								readonly: false,
								required: true,
								type: 'select',
								values: ['None', '2M', '1G']
							},
							{
								default: -1,
								display: 'Memory Ratio for HugePages on NUMA 0',
								help:
									'Valid range is between 0 and 0.8. The value -1 means that the user does not need to specify on which NUMA to allocate the hugepages',
								ipmiFactor: false,
								multiple: false,
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:memory_ratio_for_hugepages_numa_0',
								readonly: false,
								required: true,
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
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:memory_ratio_for_hugepages_numa_1',
								readonly: false,
								required: true,
								type: 'select',
								values: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
							},
							{
								default: 1.0,
								display: 'CPU Allocation Ratio',
								help: 'Libvirt CPU allocation ratio',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:cpu_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: 4,
								display: 'DPDK Dedicated CPUs Per NIC port',
								help:
									'The number of dedicated CPUs per DPDK NIC port. If hyperthreading is on, number of vCPUs must be even',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:dpdk_dedicated_cpus_per_nic',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							},
							{
								default: true,
								display: 'Enable local ARP responder',
								help:
									'Enables the switch (when supporting an overlay) to respond to an ARP request locally without performing a costly ARP broadcast to the overlay',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:arp_responder',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Local storage backend',
								help:
									'If enabled, the VM operating system will be stored within the compute local disk instead of the Ceph cluster or the external storage disks.',
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_local_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Local storage devices',
								help:
									"Compute devices that are used for local storage backend. I.E. the devices on which the VMs' operating system will be stored. Input example: /dev/vda",
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:local_storage_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_local_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/]dev[/][a-z][a-z0-9:/]*$',
								validationDescription:
									"Only low case alphabet, numeric, ':' and '/' are allowed Should start with '/dev/' "
							},
							{
								default: false,
								display: 'Enable software Raid1 (/dev/sda, /dev/sdb)',
								help:
									'If enabled, a software raid will be initiated in first two devices (sda and sdb)',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:enable_raid',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable Ceph storage',
								help: 'If enabled, this host group will have Ceph OSDs installed',
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_ceph_storage',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: ['/dev/sdb'],
								display: 'Devices',
								help:
									"The corresponding journal devices are configured in the 'Dedicated Devices' field below.\nThis configuration will override any other devices configuration.",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:osds:devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: ['/dev/sdb'],
								display: 'Dedicated Devices',
								help:
									"The corresponding devices are configured in the 'Devices' field above.\nThis configuration will override any other dedicated devices configuration.",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:osds:dedicated_devices',
								readonly: false,
								required: true,
								showIf: {
									parentName:
										'CBIS:host_group_config:DpdkPerformanceCompute:storage_config:enable_ceph_storage',
									parentValue: true
								},
								type: 'host-list',
								unique: false,
								validation: '^[/][A-Za-z0-9:/]*[A-Za-z0-9]+$',
								validationDescription:
									"Only alphabet, numeric, ':' and '/' are allowed Should start with '/' Should not end with '/'"
							},
							{
								default: '4096,4096',
								display: 'Memory limit in MB for DPDK on NUMA0 and NUMA1',
								help:
									'The NUMA node that attaches the DPDK NIC will have the memory allocated for the specified size.\nIf the DPDK cores are reserved on both NUMA nodes, memory will be reserved on both NUMA nodes.',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:dpdk_reserved_memory',
								readonly: false,
								required: true,
								type: 'select',
								values: ['10240,10240', '8192,8192', '4096,4096']
							},
							{
								default: 4,
								display: 'Number of queues per DPDK port',
								help: 'Defaults to the number of cores reserved per DPDK NIC',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:dpdk_queue_number',
								readonly: false,
								required: true,
								restrictions: { max: 8, min: 1 },
								type: 'number'
							},
							{
								default: 1000,
								display: 'Change OVS tx-flush-interval',
								help: 'Values between 0 and 1000000 usec',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:tx_flush_interval',
								readonly: true,
								required: true,
								restrictions: { max: 1000000, min: 0 },
								type: 'number'
							},
							{
								default: 'active-backup',
								display: 'Tenant and Provider Bond Mode',
								help:
									'Selecting active-active requires that LACP is configured at the L2 switch for the tenant and provider bond. SLB is not applicable for AVRS',
								ipmiFactor: false,
								multiple: false,
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:bond_mode',
								readonly: false,
								required: true,
								type: 'select',
								values: ['active-backup', 'active-active-lacp', 'active-active-slb']
							},
							{
								default: 0.85,
								display: 'RAM Allocation Ratio',
								help: 'RAM allocation ratio for libvirt',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:ram_allocation_ratio',
								readonly: false,
								required: true,
								restrictions: { max: 10, min: 0 },
								type: 'number'
							},
							{
								default: false,
								display: 'Enable Realtime KVM',
								help:
									'This is an advanced feature and should be considered for host latency sensitive applications.\nThis feature cannot be changed after installation',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:enable_realtime',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: true,
								display: 'Load based PMD RX queue rebalance enabled',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:enable_pmd_rx_rebalance',
								readonly: false,
								required: true,
								type: 'boolean'
							},
							{
								default: false,
								display: 'Enable QnQ Support',
								help: 'A QinQ frame has 2 VLAN 802.1Q headers (double-tagged)',
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:enable_qnq',
								readonly: true,
								required: true,
								type: 'boolean'
							},
							{
								default: '',
								display: 'Select OS root device hint',
								help:
									"Select on which device root file system will reside. If left empty, the first device identified as sda will be selected for root FS, One exception is hp-c7kg10_sep_controller's Controllers where it will be nvme0n1. This field has to be in a JSON format following ironic hint format: {'key':'value'}. The key is the identifier of the disk, E.G {\"by_path\": \"/dev/disk/by-path/pci-0000:00:1f.2-ata-2.1\"}. It is recommended that the identifier will be 'by_path'",
								name: 'CBIS:host_group_config:DpdkPerformanceCompute:root_device',
								readonly: false,
								showIf: {
									parentName: 'CBIS:host_group_config:DpdkPerformanceCompute:enable_raid',
									parentValue: false
								},
								type: 'text',
								validation: '^{(\\".*\\")[:]\\s(\\".*\\")}',
								validationDescription: 'Regex invalid, look at the help for more information'
							},
							{
								default: 2,
								display: 'DPDK Dedicated CPUs Per NIC port on the default NUMA node',
								help:
									'The number of CPUs to isolate for the default numa node that attaches the DPDK NIC. The value -1 means all on the default NUMA node',
								name:
									'CBIS:host_group_config:DpdkPerformanceCompute:dpdk_dedicated_cpus_per_nic_default_numa',
								readonly: false,
								required: true,
								restrictions: { max: 128, min: 0 },
								type: 'number'
							}
						],
						initialCollapse: true,
						name: 'DpdkPerformanceCompute',
						showIf: {
							parentName: 'sdn_integration',
							parentValue: ['cisco_ml2', 'None', 'nuage_ml2']
						}
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
						display: 'Define Availability Zones',
						fields: [],
						name: 'defineZones',
						validation: '^(?!internal$)[A-Z:a-z0-9_-]+$'
					},
					{
						default: [
							'/dev/sdb',
							'/dev/sdc',
							'/dev/sdd',
							'/dev/sde',
							'/dev/sdf',
							'/dev/sdg',
							'/dev/sdh',
							'/dev/sdi',
							'/dev/sdj',
							'/dev/sdk',
							'/dev/sdl',
							'/dev/sdm',
							'/dev/nvme0n1',
							'/dev/nvme1n1'
						],
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
									{ display: 'Monitoring', name: 'Monitoring', noZones: true },
									{ display: 'SRIOV-Performance-Compute', name: 'SriovPerformanceCompute' },
									{
										display: 'Triple-NIC-SRIOV-Performance-Compute',
										name: 'TripleNicSriovPerformanceCompute'
									},
									{ display: 'Storage', name: 'Storage', noZones: true, pools: true, racks: true },
									{
										display: 'SRIOVInfraVxlan-Performance-Compute',
										name: 'SriovInfraVxlanPerformanceCompute'
									},
									{
										display: 'Triple-NIC-SRIOVInfraVxlan-Performance-Compute',
										name: 'TripleNicSriovInfraVxlanPerformanceCompute'
									},
									{
										display: 'Triple-NIC-DPDK-Performance-Compute',
										name: 'TripleNicDpdkPerformanceCompute'
									},
									{ display: 'OVS-Compute', name: 'OvsCompute' },
									{ display: 'AVRS-Compute', name: 'AvrsCompute' },
									{ display: 'Controller', name: 'Controller', noZones: true },
									{
										display: 'Triple-NIC-AVRS-VtepPerNuma-Compute',
										name: 'TripleNicAvrsVtepPerNumaCompute'
									},
									{ display: 'DPDK-Performance-Compute', name: 'DpdkPerformanceCompute' }
								]
							}
						],
						name: 'assignNodes'
					}
				],
				supported_hw_pools: true,
				supported_racks: true,
				type: 'ipmi'
			},
			{
				description: 'Select steps to perform during installation',
				display: 'Installation Steps',
				initialCollapse: true,
				name: 'steps',
				subSections: [
					{
						description: 'Enable/Disable installation steps',
						display: 'CBIS Installation Steps',
						fields: [
							{
								default: true,
								display: 'Install Undercloud',
								help:
									'If disabled, the deployment will assume that the Undercloud is already installed. Warning! If there is no pre-existing Undercloud, the deployment will fail',
								name: 'install_undercloud',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Hardware scan and introspection',
								help:
									'If enabled, the deployment will discover by ironic iLO provided and will register them into ironic DB',
								name: 'hw_scan_and_introspection',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Generate templates',
								help:
									'If enabled, the deployment will prepare the PXE boot requirements and generate the templates for the installation.',
								name: 'templates_generate',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Install Overcloud',
								help:
									'If enabled, the Overcloud will be installed. Warning! If the requirements are not met, the installation will fail',
								name: 'install_overcloud',
								type: 'boolean'
							},
							{
								default: false,
								display: 'Run Security Hardening Post Installation',
								help: 'If enabled, security hardening will be run at the end of the installation.',
								name: 'run_sec_hardening',
								type: 'boolean'
							},
							{
								default: true,
								display: 'Smoke test sanity check',
								help: 'If enabled, tests will be run at the end of the installation',
								name: 'run_smoke_tests',
								type: 'boolean'
							}
						],
						name: 'installation_steps'
					}
				]
			},
			{
				display: 'Deploy',
				name: 'deploy',
				subSections: [
					{ display: 'Fields Completion', exclude: [], name: 'validation', type: 'validation' },
					{
						buttons: [
							{
								beforeSend: { confirm: 'Are you sure you want to start the deployment?' },
								disabled: false,
								onSuccess: { message: 'Deployment Started!' },
								role: 'submit',
								text: 'Deploy',
								url: { method: 'POST', url: 'api/installation/deploy' }
							}
						],
						name: 'actions',
						showWarning: {
							expectedReturnValue: true,
							message:
								'Warning: Installation is already running, a new deployment will override the existing one.',
							url: { extract: 'active', method: 'GET', url: 'api/installation/isActive' }
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
						display: 'Installation Logs',
						name: 'installation-log',
						url: { url: 'log/deployment.log' }
					}
				],
				type: 'log'
			}
		]
	}
};
