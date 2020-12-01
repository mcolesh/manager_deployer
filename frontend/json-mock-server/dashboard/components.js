module.exports = {
	components: [
		{
			description: 'Monitoring dashboard',
			display: 'Zabbix',
			status: 'installed',
			url: 'https://1.1.1.1/zabbix'
		},
		{
			description: 'Openstack dashboard',
			display: 'Horizon',
			status: 'installed',
			url: 'https://1.1.1.1'
		},
		{
			description: 'Logging dashboard',
			display: 'Kibana',
			status: 'installed',
			url: 'https://1.1.1.1/kibana'
		},
		{
			description: 'Ceph manager dashboard',
			display: 'Ceph',
			status: 'notInstalled',
			url: 'https://1.1.1.1:7001'
		}
	]
};
