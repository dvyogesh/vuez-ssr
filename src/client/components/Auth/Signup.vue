<template>
  <section class="container signup-pannel">
    <h1>Signup</h1>
    <div v-if="signingUp">
      <img src="../../../assets/pacman_loading.svg" >
    </div>
    <div 
      v-if="errorMessage" 
      class="alert alert-danger" 
      role="alert">
      {{ errorMessage }}
    </div>
    <form 
      v-if="!signingUp" 
      @submit.prevent="signup">
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
          Username must be longer than 2 characters and shorter than 30.
          Username can only contain alphanumeric characters and under_scores.
        </h5>
      </div>
      <div class="form-row row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="user.password"
            type="password"
            class="form-control"
            aria-describedby="passwordHelp"
            placeholder="Password" 
            required>
          <h5 
            id="passwordHelp" 
            class="form-text text-muted">
            Password must be 10 or more characters long.
          </h5>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="user.confirmPassword"
            type="password"
            class="form-control"
            aria-describedby="confirmPasswordHelp"
            placeholder="Password" 
            required>
          <h5 
            id="confirmPasswordHelp" 
            class="form-text text-muted">
            Please confirm your password.
          </h5>
        </div>
      </div>
      <button 
        type="submit" 
        class="btn btn-primary">Signup</button>
      Existing User ??  <router-link to="/login"> Login...</router-link>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';
const SIGNUP_URL = '/auth/signup';
const schema = Joi.object().keys({
	username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30)
		.required(),
	password: Joi.string().trim().min(9).required(),
	confirmPassword: Joi.string().trim().min(9).required(),
});
export default {
	data: () => ({
		signingUp: false,
		errorMessage: '',
		user: {
			username: '',
			password: '',
			confirmPassword: '',
		},
	}),
	watch: {
		user: {
			handler() {
				this.errorMessage = '';
			},
			deep: true,
		},
	},
	mounted() {
		if (window.localStorage.getItem("jwtUser") !== null && 
			window.localStorage.getItem("jwtUser") !== '' &&
		      this.$route.path == "/signup"
		    ) {
			this.$router.go(-1)
		      //this.$router.push("/"); // redirect to home, for example
		    }
		  
	},
	methods: {
		signup() {
			this.errorMessage = '';
			if (this.validUser()) {
				const body = {
					username: this.user.username,
					password: this.user.password,
				};
				this.signingUp = true;
				fetch(SIGNUP_URL, {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'content-type': 'application/json',
					},
				}).then((response) => {
					if (response.ok) {
						return response.json();
					}
					return response.json().then((error) => {
						throw new Error(error.message);
					});
				}).then((result) => {
					localStorage.jwtUser = result.token;
					setTimeout(() => {
						this.signingUp = false;
						this.$router.push('/');
					}, 1000);
				}).catch((error) => {
					setTimeout(() => {
						this.signingUp = false;
						this.errorMessage = error.message;
					}, 1000);
				});
			}
		},
		validUser() {
			if (this.user.password !== this.user.confirmPassword) {
				this.errorMessage = 'Passwords must match. 🙈';
				return false;
			}
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
.signup-pannel {
	max-width: 360px;
    border: thin solid #cccccc;
    border-radius: 5px;
    padding: 0% 1% 1% 1%;
    margin-top: 10px;
}
</style>