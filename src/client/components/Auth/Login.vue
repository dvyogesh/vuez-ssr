<template>
  <section class="container login-pannel">
    <h1>Login</h1>
    <div v-if="loggingIn">
      <img src="../../../assets/pacman_loading.svg" >
    </div>
    <div 
      v-if="errorMessage" 
      class="alert alert-danger" 
      role="alert">
      {{ errorMessage }}
    </div>
    <form 
      v-if="!loggingIn" 
      @submit.prevent="login()">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="user.username"
          type="text"
          class="form-control"
          aria-describedby="usernameHelp"
          placeholder="Enter a username" 
          required>
        <h5 
          id="usernameHelp" 
          class="form-text text-muted">
          Enter your username to login.
        </h5>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="user.password"
          type="password"
          class="form-control"
          aria-describedby="passwordHelp"
          placeholder="Enter a password" 
          required>
        <h5 
          id="passwordHelp" 
          class="form-text text-muted">
          Enter your password to login.
        </h5>
      </div>
      <button 
        type="submit" 
        class="btn btn-primary">Login</button>

      New User ?? then <router-link to="/signup"> Signup..</router-link>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';
import {mapGetters,mapActions, mapState } from 'vuex';

const LOGIN_URL = '/auth/login';
const schema = Joi.object().keys({
	username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30)
		.required(),
	password: Joi.string().trim().min(9).max(9).required(),
});
export default {
	data: () => ({
		errorMessage: '',
		loggingIn: false,
		user: {
			username: '',
			password: '',
		},
	}),
	computed: {
		...mapState('User',{userData:'userData'})
	},
	created() {
		
	},

	beforeMount() {

		// console.log('this.userData')
		// console.log(this.userData)
		// if (this.userData && this.userData.userName) {
		// 	 this.$router.push("/");
		// }
		// console.log('this.$router')
		// console.log(this.$router)
		//if (window) return 
		if (window && window.localStorage.getItem("jwtUser") !== null && 
			window.localStorage.getItem("jwtUser") !== '' &&
		      this.$route.path == "/login"
		    ) {
			this.$router.go(-1)
		      //this.$router.push("/"); // redirect to home, for example
		    }
		  
	},
	methods: {
		...mapActions('User',{
			'getUser': 'getUser',
			'setUser': 'setUser'
		}),
		login() {
			this.errorMessage = '';
			if (this.validUser()) {
				this.loggingIn = true;
				const body = {
					username: this.user.username,
					password: this.user.password,
				};
				fetch(LOGIN_URL, {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify(body),
				}).then((response) => {
					console.log('response')
					console.log(response)
					if (response.ok) {
						return response.json();
					}
					return response.json().then((error) => {
						throw new Error(error.message);
					});
				}).then((result) => {
					console.log('result')
					console.log(result)
					if (result === 422){
						this.loggingIn = false;
						this.errorMessage = 'Username/Password is invalid. 😭'
						return false
					} 
					localStorage.jwtUser = result.token;
					this.setUser(result.user)
					setTimeout(() => {
						this.loggingIn = false;
						this.$router.push('/');
					}, 1000);
				}).catch((error) => {
					setTimeout(() => {
						this.loggingIn = false;
						this.errorMessage = error.message;
					}, 1000);
				});
			}
		},


		logout() {
			this.setUser()
			console.log('trigger')
			localStorage.removeItem('jwtUser');
			this.$router.push('/login');
		},
		validUser() {
			const result = Joi.validate(this.user, schema);
			if (result.error === null) {
				return true;
			}
			if (result.error.message.includes('username')) {
				this.errorMessage = 'Username is invalid. 😭';
			} else {
				this.errorMessage = 'Password is invalid. 🙈';
			}
			return false;
		},
	},
};
</script>

<style scoped>
.login-pannel {
	max-width: 360px;
    border: thin solid #cccccc;
    border-radius: 5px;
    padding: 0% 2% 1% 2%;
    margin-top: 10px;
}
</style>