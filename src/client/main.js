import Vue from 'vue'
import Vuetify from 'vuetify'
import isEmpty from 'lodash/isEmpty';
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './router/router.js'
import store from './store';
import devConfig from './clientConfig'

import 'vuetify/dist/vuetify.min.css'


Vue.use(VueRouter)
Vue.use(Vuetify)

export function createApp () {
	//console.log(serverConfig)
	//const  clientConfig =  require('./clientConfig') ;
	const router = new VueRouter({
		mode: 'history',
		routes
	})


	router.beforeEach((to, from, next) => {
	  // redirect to login page if not logged in and trying to access a restricted page
	  console.log('clientConfig---')
	   
	  if(typeof(Storage) !== "undefined") {
	  	const publicPages = ['/login', '/signup', '/', '/offers', '/blog'];
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
