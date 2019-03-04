<template>
  <div id="app">
    <div class="site-tikker text-center">
      <p>{{ siteTikker }}</p>
    </div>
    <div class="nav-bar-main">
      <div class="container">
        <div class="row">
          <div class="nav-left col-sm-3 col-xs-12 text-center">
            <div class="nav-logo">
              <router-link to="/">
                <img src="https://www.medlife.com/images/medlife_logo.svg" >
              </router-link>
            </div>
          </div>
          <div class="nav-right col-sm-9 col-xs-12 text-center">
            <div class="nav-links">
              <ul class="list-inline nav-items">
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/offers">Offers</router-link></li>
                <li><router-link to="/myorders">My Orders</router-link></li>
                <li><router-link to="/blog">Blog</router-link></li>
                <li class="hidden-xs "><router-link to="/cms">CMS</router-link></li>
                <li class="hidden-xs hide"><router-link to="/oms">OMS</router-link></li>
                <li class="my-account pointer">
                  My Account
                  <div class="drop-down">
                    <ul class="list-unstyled">
                      <li v-if="!userData.userName">
                          
                        <router-link to="/login">Login /</router-link>
                        <router-link to="/signup"> Signup</router-link>
                      </li>
                      <li v-else>
                        <p @click="logout()">Logout</p>
                      </li>
                      <li>
                        <router-link to="/myorders">My Orders</router-link>
                      </li>
                    </ul>
                  </div>
                  
                  
                </li>
              </ul>
            </div>
          </div>
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
    <div class="main">
      <router-view />
    </div>
    
    <div class="main-footer">
      <ul class="list-inline text-center">
        <li>
          <a 
            href="#" 
            class="icoFacebook" 
            title="Facebook">
          <i class="fa fa-facebook"/></a>
        </li>
        <li class="twt"><a 
          href="#" 
          class="icoTwitter" 
          title="Twitter">
          <i class="fa fa-twitter"/>
        </a>
        </li>
        <li class="gplus">
          <a 
            href="#" 
            class="icoGoogle" 
            title="Google +">
            <i class="fa fa-google-plus"/>
          </a>
        </li>
        <li class="insta">
          <a 
            href="#" 
            class="icoInstagram" 
            title="Instagram"><i 
              class="fa fa-instagram" 
              aria-hidden="true"/>
          </a>
        </li>
      </ul>
      <div class="text-center all-rights">
        <p>© 2019. All rights reserved.</p>
        <p>In compliance with Drug and Cosmetic Act and Rules, we don't process requests for Schedule X and other habit forming drugs.</p>
      </div>
      <div/>
    </div>
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
import Toast from './components/Common/Toast/Toast';
import devConfig from './clientConfig'


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
	// created(){
	// 	console.log('this.$parent')
	// 	console.log(this)
	// },
	mounted() {
		this.checkAuth();
		console.log('process.env.NODE_ENV')
		console.log(devConfig)
		console.log(process.env.ENV)
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
a{
  text-decoration: none;
}
.main{
  min-height: 60vh;
}
p, .margin-0{
  margin: 0px;
}
.pointer{
  cursor: pointer;
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
  .nav-links ul.nav-items > li {
    display: inline-block;
    padding: 1% 0% 1% 0%;
    width: 11%;
    font-size: 16px;
    font-weight: 500;
    a{
      color: #424242;
    }
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

.output-html{
    max-height: 500px;
    overflow: scroll;
    border: solid;
    padding: 10px;
    margin: 10px 0px;
}
.drop-down {
  display: none;
}
.my-account{
position: relative;

&:hover .drop-down {
  min-width: 130px;
  display: block;
  position: absolute;
  top: 35px;
  border: thin solid #ccc;
  z-index: 123;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  ul{
    background-color: #fff;
    li{
      width: 100%;
      border-bottom: thin solid #ccc;
      padding: 5px 0px;
    }
  }
}
}
.main-footer{
  position: relative;
  background-color: #042430;
  color: #fff;
  padding-top: 50px;
  min-height: 250px;
  ul li {
      border: 2px solid #fff;
      border-radius: 100%;
      font-size: 25px;
      padding: 10px 20px;
      margin: 5px;
      a{
        color: #fff;
      }
      &.twt{
        padding: 10px 16px;
      }
      &.gplus{
        padding: 10px 12px;
      }
      &.insta{
        padding: 10px 18px;
      }
    }
    .all-rights{
      padding: 20px;
    }
}  

.popup-main{
  overflow: scroll;
  position: fixed;
  background: #000;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 1234;
  pointer-events: visiblefill;
  touch-action: none;
}
.popup-inner{
  .close-btn{
    position: relative;
    h1{
      position: absolute;
      right: -5%;
      top: -40px;

    }
  }
  background-color: #fff;
  width: 40%;
  margin: 5% auto;
  position: relative;
  padding: 1%;
  .form-group{
    padding: 20px 10px;
  }
  textarea{
    width: 90%;
    height: 100px;
    margin: 0 auto;
    resize: none;
  }
  .btn{ margin-top: 10px;}
}
</style>
