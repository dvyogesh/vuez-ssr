<template>
  <div id="app">
    <div class="site-tikker text-center">
      <p>{{ siteTikker }}</p>
    </div>
    <div class="nav-bar-main row">
      <div class="nav-left col-sm-3 col-xs-12 text-center">
        <div class="nav-logo">
          <img src="https://www.medlife.com/images/medlife_logo3.svg" >
        </div>
      </div>
      <div class="nav-right col-sm-9 col-xs-12 text-center">
        <div class="nav-links">
          <ul class="list-inline nav-items">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/myorders">My Orders</router-link></li>
            <li class="hidden-xs"><router-link to="/cms">CMS</router-link></li>
            <li class="hidden-xs"><router-link to="/oms">OMS</router-link></li>
            <li>
              <button 
                v-if="userData.userName"
                class="btn btn-primary" 
                @click="logout()">Logout</button>
              <template v-else>
                <router-link to="/login">Login /</router-link>
                <router-link to="/signup"> Signup</router-link>
              </template>
              
            </li>
          </ul>
        </div>

      </div>
    </div>
    <div 
      v-show="location === '/myorders'" 
      class="breadcrumb-main">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li 
          v-show="location === '/myorders'"
          class="breadcrumb-item active" 
          aria-current="page">My Orders</li>
      </ol>
    </div>
    <router-view />
    <div 
      v-show="isLoading" 
      class="loader">
      <h2>Loading.....</h2>
    </div>
    <div 
      v-if="isToastOpen" 
      class="toast">
      <p>X</p>
      <Toast/>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import {mapGetters,mapActions, mapState } from 'vuex';
import Toast from './components/Common/Toast/Toast'


export default {
	components: {
		Toast
	},
	data () {
		return {
			siteTikker: '10% off on pre-paid orders',
			location: false,
			loginData:[]
		}
	},
	computed:{
		...mapState('User',{
			userData: 'userData'
		}),
		...mapState('App',{
			isLoading: 'isLoading',
			isToastOpen: 'isToastOpen',
		}),
	},

	
	mounted() {
		this.checkAuth();



		if (this.$router.currentRoute) {
			this.location = this.$router.currentRoute.path; 
		}
		this.$watch(
			function () {  return this.$route },
			function(route) {
				if (route) {
					console.log('this.location')
					console.log(route)
					this.location = route.path;
				}
			})
		
		
	},
	methods: {
  
		...mapActions('User',{
			'getUser': 'getUser',
			'setUser': 'setUser'
		}),
		...mapActions('App',{
			'toggleLoading': 'toggleLoading',
			'toggleToast': 'toggleToast'
		}),
		checkAuth() {
			const tocken = localStorage.getItem('jwtUser')
			if(!tocken) return false;
			this.toggleLoading(true)
			axios.defaults.headers.common['authorization'] = `Bearer ${tocken}`;

			//this.loading = true
			axios.get('/auth/check').then(
				response => {
					console.log(response.data)
					this.toggleLoading(false)
					this.loginData = response.data;
        
					this.getUser(response.data)
				},
				error => {
					this.toggleLoading(false);
					// push rout to error page
				}
			)
		},

		logout() {
			this.setUser({})
			localStorage.removeItem('jwtUser');
			this.$router.push('/login');
		},
	},
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

* {
  margin: 0px;
  padding: 0px;
}
p {
  margin: 0px;
}
.color-red{color:red;}
.text-center {
  text-align: center;
}
.site-tikker {
  background-color: #eee;
  padding: 10px 0px;
  border-bottom: 1px solid #ccc;
}
.nav-logo {
  margin-top: 5px;
}
.nav-bar-main {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
  display: inline-block;
  border-bottom: 1px solid #ccc;
  &.row{margin: 0px}

  .nav-left {
    img {
      max-height: 60px;
    }
  }
}
/*.nav-bar-main .nav-left,
.nav-bar-main .nav-right {
  float: left;
}
.nav-left {
  width: 20%;
}*/
.nav-right {
  /*width: 80%;*/
  margin-top: 15px;
  .nav-item {
    text-align: center;
  }
  .nav-links ul li {
    display: inline-block;
    background-color: #eee;
    padding: 1% 0% 1% 0%;
    width: 15%;
    text-align: center;
    @media only screen and (max-width: 600px) {
      & {
        font-size: 10px;
        width: 22%;
      }
    }
  }
  &:after {
    clear: both;
  }
}
img {
  max-width: 100%;
}
.list-inline {
  list-style: none;
  li {
    display: inline-block;
  }
}
.loader {
  position: fixed;
  top: 0;
  background-color: #000;
  color: #fff;
  width: 100%;
  text-align: center;
  z-index: 12345;
  height: 100%;
  pointer-events: visiblefill;
  touch-action: none;
  padding-top: 20%;
  opacity: 0.5;
}
:host { display: block; }   
</style>
