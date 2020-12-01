const pages = require('./dashboard/pages');
const componentsGetComponents = require('./dashboard/components');
const cbisInstallation = require('./categories/lifeCycleManagment/cbisInstallation');
const barmetal = require('./categories/lifeCycleManagment/bmContainer');
const novl = require('./categories/lifeCycleManagment/novl');
const patchManagement = require('./categories/cbis-operations/patchManegment');
const addNode = require('./categories/cbis-operations/addNode');
const test = require('./categories/cbis-operations/test');
const number = require('./categories/custom-mocks/number');
const managerData = require('./dashboard/manager');
const ipmiFactor = require('./categories/custom-mocks/ipmiFactor');
const manageMultiCbis = require('./categories/multi-cbis-operations/manageMultiCbis');
const validation = require('./categories/custom-mocks/validation');
const auth = require('./auth/auth');
module.exports = () => ({
	pages,
	components_getComponents: componentsGetComponents,
	...cbisInstallation,
	...barmetal,
	...novl,
	...patchManagement,
	...test,
	...addNode,
	...number,
	...managerData,
	...ipmiFactor,
	...manageMultiCbis,
	...validation,
	...auth
});
