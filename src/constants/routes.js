import asyncComponent from './modules/AsynComponent';

const routes = {
	HOME: {
		path: '/',
		component: asyncComponent(() => import('../pages/Home')),
	},
	RESULTS:{
		path: '/calculator',
		component: asyncComponent(() => import ('../pages/Results')),
	},
	// ERROR_404: {
	// 	path: '/404',
	// 	component: asyncComponent(() =>
	// 		import('../components/views/Errors/Error404'),
	// 	),
	// },
};
export default routes;