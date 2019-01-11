<template>
  <div>
    <div class="home-container">
      <div 
        :style="backIm" 
        class="row margin-0 home-banner-container">
        <div class="col-sm-8">
          <div 
            v-if="slides && slides.length>0 " 
            class="curosel-left">
            <SlideShow :slides="slides"/>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="order-pannel"><OrderPannel /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import store from '../../store';
//import { createApp } from '../../../main.js'
import {mapGetters,mapActions, mapState } from 'vuex';
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import OrderPannel from './OrderPanel/OrderPanel.vue'
import SlideShow from '../Common/SlideShow/SlideShow.vue'

export default {
	components: {
		OrderPannel,
		SlideShow
	},
	data () {
		return {
			image: '',
			backIm:{},
			slides:[]// this.getImageStyle() //{
			// 'background-image':`url(${homeData.bannerUrl})`,
			// // 'url(https://images-eu.ssl-images-amazon.com/images/G/31/img18/DiwaliART/Wave2/GW/midnight/1day/GW-herotator_W2_3000-x-1200._CB480410071_.jpg)',
			// 'min-height': '500px'
			//}
		}
	},
	computed: {
		...mapState('Home',{homeData:'homeData'}),
		// slides(){
		// 	//return get(this.$store.state.homeData.slides.homePage,// homeData.slides.homePage
		// 	return this.$store.state.homeData.slides.homePage
		// }
		
	},

	mounted() {
		axios.get('/api/cms/home').then(
			response => {
				//console.log(response.data)
				//this.toggleLoading(false)
				console.log('cms response')
				const data = response.data[0]
				this.getHomeData(data)
				console.log('this.homeData')
				console.log(this.homeData)
				if(this.homeData) {
					this.backIm = {
						'background-image':`url(${this.homeData.banners.homePage.bannerUrl})`,
						// 'url(https://images-eu.ssl-images-amazon.com/images/G/31/img18/DiwaliART/Wave2/GW/midnight/1day/GW-herotator_W2_3000-x-1200._CB480410071_.jpg)',
						'min-height': '500px'
					}
					this.slides = this.homeData.slides.homePage
				}
				
				//this.cms = this.getCmsData(response.data);
			},
			error => {
				this.loading = false
			}
		)
	},

	methods: {
		...mapActions('Home',{getHomeData:'getHomeData'}),
		getImageStyle(){
			
			return {
				'background-image':`url(${this.homeData.banners.homePage.bannerUrl})`,
				'min-height': '500px'
			}
		}
	}
}
</script>
<style lang="scss" scoped>
@import 'Home.scss'
</style>
