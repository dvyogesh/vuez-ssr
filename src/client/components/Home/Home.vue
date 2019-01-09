<template>
  <div>
    <div class="home-container">
      <div 
        :style="backIm" 
        class="row margin-0">
        <div class="col-sm-8">
          <div class="curosel-left">
            <SlideShow />
          </div>
        </div>
        <div class="col-sm-4">
          <div 
            class="home-banner-container">
            <div class="order-pannel"><OrderPannel /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import { createApp } from '../../../main.js'
import {mapGetters,mapActions, mapState } from 'vuex';
import isEmpty from "lodash/isEmpty";
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
			backIm:{}// this.getImageStyle() //{
			// 'background-image':`url(${homeData.bannerUrl})`,
			// // 'url(https://images-eu.ssl-images-amazon.com/images/G/31/img18/DiwaliART/Wave2/GW/midnight/1day/GW-herotator_W2_3000-x-1200._CB480410071_.jpg)',
			// 'min-height': '500px'
			//}
		}
	},
	computed: {
		...mapState('Home',{homeData:'homeData'})
		
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
				this.backIm = {
					'background-image':`url(${this.homeData.banners.homePage.bannerUrl})`,
					// 'url(https://images-eu.ssl-images-amazon.com/images/G/31/img18/DiwaliART/Wave2/GW/midnight/1day/GW-herotator_W2_3000-x-1200._CB480410071_.jpg)',
					'min-height': '500px'
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
