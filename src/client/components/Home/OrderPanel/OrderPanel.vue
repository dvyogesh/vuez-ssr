<template>
  <div class="order-input-container text-center">
    <h2>Medicine Delivery Simplifiedd</h2>
    <form 
      @submit.prevent="orderNoww()">
      <div class="order-btn text-center">

        <label id="file-btn-style"> 
          Click to Upload Photo
          <input
            v-if="!image"
            class="file-btn"
            type="file"
            multiple="true"
            name="prescriptionImg"
            accept="image/*"
            @change="upload"
          >
        </label> 
      
        <div class="previw-uploaded-img">
          <div v-if="image">
            <img :src="image" >
            <button 
              class="remove btn btn-warning" 
              @click="removeImage">Remove</button>
          </div>
        </div>
      </div>
      <div class="order-inputs">
        <input 
          v-model="userData.userName" 
          :required="userData.userName" 
          :tabindex="1"
          class="form-control"
          type="text"
          placeholder="Enter Your Name*">
      </div>
      <div class="order-inputs">
        <input 
          v-model="userData.mobileNumber"
          :required="userData.mobileNumber"
          :tabindex="2"
          class="form-control"
          type="text" 
          placeholder="Enter Your MobileNumber">
      </div>
      <div class="order-inputs">
        <textarea
          v-model="userData.fullAddress"
          :required="userData.fullAddress"
          :tabindex="3"
          class="form-control" 
          placeholder="Enter Your Full Address"
        />
      </div>
      <button 
        class="order-upload-btn" 
      >
        Order Now
      </button>
  
      <div class="call-details">
        <strong class="call">Call 1860 1234 1234</strong>
        <p>To place order for your medicines</p>
      </div>
      <hr class="bottom-border" >
      <div class="download-app">
        <h2 id="download-text">Download mobile app</h2>
        <div class="app-download-btn">
          <a
            href="https://play.google.com/store/apps/details?id=com.medlife.customer&amp;hl=en"
            target="_blank"
          >
            <img
              alt="playstore"
              class="prescription-img-left"
              width="43%"
              src="https://www.medlife.com/images/appstore.png"
            >
          </a>
          <a
            href="https://itunes.apple.com/in/app/medlife-all-things-health/id1078091111?mt=8"
            target="_blank"
          >
            <img
              alt="appstore"
              class="prescription-img-right"
              width="43%"
              src="https://www.medlife.com/images/playstore.png"
            >
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
//import { createApp } from '../../../main.js'
import {mapGetters,mapActions, mapState } from 'vuex';
import isEmpty from "lodash/isEmpty";

export default {
	name: 'OrderPanel',
	data () {
		return {
			image: '',
			backIm: {
				'background-image':
          'url(https://images-eu.ssl-images-amazon.com/images/G/31/img18/DiwaliART/Wave2/GW/midnight/1day/GW-herotator_W2_3000-x-1200._CB480410071_.jpg)',
				'min-height': '500px'
			},
			orderData: {
				imageData: '',
				prescription: '',
				userName: '',
				mobileNumber: '',
				fullAddress: ''
			}
			
		}
	},
	computed:{
		...mapState('User',{userData:'userData'})

	},

	mounted(){
		//this.setUserData()
	},

	methods: {
		...mapActions('User',{setUser:'setUser'}),
		...mapActions('App',{
			'toggleLoading': 'toggleLoading'
		}),
		// setUserData:  function(){
		// 	if (this.userData.mobileNumber) {
		// 		this.orderData.mobileNumber = this.userData.mobileNumber
		// 	}
			 
		// },
		upload: function (e) {
			const files = e.target.files || e.dataTransfer.files
			// console.log(files);
			if (!files.length) return
			this.createImage(files[0]);
			this.orderData.imageData = event.target.files[0]
			//this.orderNow(e)
		},

		createImage: function (file) {
			var image = new Image()
			var reader = new FileReader()
			var vm = this

			console.log(vm)

			reader.onload = e => {
				vm.image = e.target.result
				// console.log(vm.image);
			}
			reader.readAsDataURL(file)
		},

		removeImage: function (e) {
			this.image = ''
		},

		orderNow: function (event) {
		
		},
		orderNoww: function(){
			const checkIWT = localStorage.getItem('jwtUser')
			this.toggleLoading(true)
			if (checkIWT) {
				const newUser = false
				this.orderNowExistingUser(newUser)
			} else {
				const newUser = true
				this.orderNowExistingUser(newUser)
				//this.orderNowNewUser()
			}
		},
		orderNowExistingUser: function(newUser) {
			console.log(isEmpty(this.orderData.imageData))
			console.log(isEmpty(this.userData.mobileNumber))
			console.log(isEmpty(this.userData.fullAddress))
			console.log(typeof this.userData.mobileNumber)
			const imgData = this.orderData.imageData !== '' && this.orderData.imageData !== null
			const dataCheck =  imgData === true && !isEmpty(this.userData.mobileNumber) && !isEmpty(this.userData.fullAddress);
			console.log(isEmpty(dataCheck) )
			if (dataCheck !== true) return false
			console.log('need to add validations alerts, to avoid url undefined.....etc errors')
		  const data = 	this.getFormData()
			const URL = '/api/orders/orderNow';
			let config = {
				header: {
					'Content-Type': 'image/png'
				}
			}
			console.log(newUser)
			console.log(this.userData.userName)
			const JWT = newUser ? 'newUserOrder' : localStorage.getItem('jwtUser');
			const USER = newUser ? this.userData.userName : false;
			axios.defaults.headers.common['newUser'] = `USER ${USER}`;
			axios.defaults.headers.common['authorization'] = `Bearer ${JWT}`

			axios
				.post(URL, data, config)
				.then(response => {
					console.log(response)
					if(typeof(Storage) !== "undefined") {
						if (localStorage && USER) {
							this.toggleLoading(false)
							localStorage.jwtUser = response.data.token;
							this.$router.push({ path: '/myorders' })
							setUser(response.data)
							console.log('image upload response > ', response)
						} else if (USER === false) {
							this.toggleLoading(false)
							this.$router.push({ path: '/myorders' })
							setUser(response.data)
							console.log('image upload response > ', response)
						} else {
							console.log('USER not available')
						}
					} else {
						this.toggleLoading(false)
						//err page
						document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
					}
                
				})
				.catch(error => {
					console.log(error)
				})
		},
		orderNowNewUser: function() {
			//this.orderNowExistingUser()
			console.log(this.userData.userName)
			console.log('Need to make new route for new user submitions because server side isLogined check is ther for const URL = /api/orders/orderNow;')
		},
		getFormData: function(){
			let data = new FormData();
			data.append('file', this.orderData.imageData)
		
			data.append('userName', this.userData.userName)
			data.append('mobileNumber', this.userData.mobileNumber)
			data.append('fullAddress', this.userData.fullAddress)
               
			return data;
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'OrderPanel.scss'
</style>
