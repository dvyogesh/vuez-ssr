<template>
  <div 
    v-show="isToastOpen" 
    class="toast-main">
    <div class="toast-inner zoomInDown">
      <div class="row">
        <p 
          class="pull-right toast-close" 
          @click="toggleToast('')">X</p>
      </div>
     
      <h4 class="toast-msg text-center">{{ toastData }}</h4>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions, mapState } from 'vuex';
export default {
	props:['toastText'],
	// data () {
	// 	return {
	// 		aboutText: 'About Component sd'
	// 	}
	// },
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	computed:{
		
		...mapState('App',{
			isToastOpen: 'isToastOpen',
			toastData: 'toastData'
		}),
	},
	mounted () {
		// console.log('this.$route.push("/")')
		// console.log(this.$route)
		//this.$router.push({ path: '/myorders' })
		// this.$router.push({ name: "Home" });
		if (this.isToastOpen) {
			setTimeout(()=>{this.isToastOpen && this.toggleToast('')},7000)
		}
		
	},

	methods: {
		...mapActions('App',{
			'toggleToast': 'toggleToast'
		}),
	}
}
</script>
<style lang="scss" scoped>
	.toast-main {
		position: relative;
		margin: 0 auto;
		.toast-close{
			width: 30px;
		    background: #fff;
		    color: #000;
		    padding-left: 10px;
		    cursor: pointer;
		    border: 1px solid #424242;
		    border-radius: 100%;
		    padding: 5px 0px 5px 10px;
		    position: absolute;
		    right: -5px;
		    top: -10px;
		}
		.toast-inner {
			background-color: #423f3f;
		    position: fixed;
		    top: 50%;
		    width: 80%;
		    left: 10%;
		    padding: 15px;
		    color: #fff;
		    border: 5px solid #f19403;
		}
		.zoomInDown {
			  -webkit-animation-name: zoomInDown;
			  animation-name: zoomInDown;
			  -webkit-animation-duration: 1s;
			  animation-duration: 1s;
			  -webkit-animation-fill-mode: both;
			  animation-fill-mode: both;
		}
		@-webkit-keyframes zoomInDown {
		0% {
		  opacity: 0;
		  -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
		  transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
		  -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
		  animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
		}
		60% {
		  opacity: 1;
		  -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
		  transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
		  -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
		  animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
		  }
		}
		@keyframes zoomInDown {
		  0% {
			  opacity: 0;
			  -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
			  transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
			  -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
			  animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
			}
		  60% {
			  opacity: 1;
			  -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
			  transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
			  -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
			  animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
			}
		} 

		
	}
	
	
</style>