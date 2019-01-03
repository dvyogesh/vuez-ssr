import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './router/router.js'
import isEmpty from 'lodash/isEmpty';
import store from './store';
Vue.use(VueRouter)
export function createApp () {
	const router = new VueRouter({
		mode: 'history',
		routes
	})


	router.beforeEach((to, from, next) => {
	  // redirect to login page if not logged in and trying to access a restricted page
	  
	  if(typeof(Storage) !== "undefined") {
	  	const publicPages = ['/login', '/signup', '/'];
	  	const authRequired = !publicPages.includes(to.path);
	  	const loggedIn = localStorage.getItem('jwtUser');
	  	console.log('from')
	  	console.log(to)
	  	// if (to.path === '/login' || to.path === '/signup' ) {
	  	// 	loggedInRedirectDashboard(to, from, next)
	  	// } else if (to.path === '/' ) {
	  	// 	next()
	  	// } else {
	  	// 	isLoggedIn(to, from, next)
	  	// }
	  	if (authRequired && isEmpty(loggedIn)) {
	  	  return next('/login');
	  	} else {
	  		next()
	  	}

	  	

	  }
	

	  function loggedInRedirectDashboard(to, from, next) {
	    if (localStorage.jwtUser) {
	      next('/');
	    } else {
	      next();
	    }
	  }

	  function isLoggedIn(to, from, next) {
	    if (localStorage.jwtUser) {
	      next();
	    } else {
	      next('/login');
	    }
	  }





	 next();
	})

	const app = new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')

	return { app, router }
}
