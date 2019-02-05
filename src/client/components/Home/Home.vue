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
          <div class="who-how-wap">
            <WhoHowWhatsapp />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="order-pannel"><OrderPannel /></div>
        </div>
      </div>
      <div 
        id="how-we-work" 
        class="how-we-work text-center section-pad-mar">
        <HowWeWork />
      </div>
      <div 
        id="helth-articles" 
        class="helth-articles text-center section-pad-mar">
        <h3>Health Articles</h3>
        <div class="articl-section">
          <HealthArticles />
        </div>
      </div>
      <WhoWeAre/>
    </div>
    <HomeFooter />
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
import HealthArticles from '../Blog/HealthArticles'
import WhoHowWhatsapp from './HomeStatic/WhoHowWhatsapp'
import HowWeWork from './HomeStatic/HowWeWork'
import HomeFooter from './HomeStatic/HomeFooter'
import WhoWeAre from './HomeStatic/WhoWeAre'

export default {
	components: {
		OrderPannel,
		SlideShow,
		HealthArticles,
		WhoHowWhatsapp,
		HowWeWork,
		HomeFooter,
		WhoWeAre

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
		const body = { request: 'ew0KICAgIm1lcmNoYW50SWQiOiAiTTIzMDYxNjA0ODMyMjA2NzU1NzkxNDAiLCANCn0=' }
		axios.get('https://mercury-uat.phonepe.com/v3/debit',body,
			{
		      headers: { 
		      "x-verify": 'eyJtZXJjaGFudElkIjogIk0yMzA2MTYwNDgzMjIwNjc1NTc5MTQwIiwgIm1vYmlsZU51bWJlciI6ICI5NDkwNDI0MjcwIn0="/v3/debit"8289e078-be0b-484d-ae60-052f117f8deb###1',
		      'Access-Control-Allow-Origin' : '*',
		      },
		     }).then(function (response) {
		    // handle success
		    console.log(response);
		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		  });

		// var data = JSON.stringify({
		//   "request": "ew0KICAgIm1lcmNoYW50SWQiOiAiTTIzMDYxNjA0ODMyMjA2NzU1NzkxNDAiLCANCiAgICJtb2JpbGVOdW1iZXIiOiAiOTQ5MDQyNDI3MCIsDQogICAiZW1haWwiOiAiZHZ5b2dlc2gxMjNAZ21haWwuY29tIg0KfQ=="
		// });

		// var xhr = new XMLHttpRequest();
		// xhr.withCredentials = true;

		// xhr.addEventListener("readystatechange", function () {
		//   if (this.readyState === this.DONE) {
		//     console.log(this.responseText);
		//   }
		// });

		// xhr.open("POST", "https://mercury-uat.phonepe.com/v3/debit");
		// xhr.setRequestHeader("content-type", "application/json");
		// xhr.setRequestHeader("x-verify", "ew0KICAgIm1lcmNoYW50SWQiOiAiTTIzMDYxNjA0ODMyMjA2NzU1NzkxNDAiLCANCiAgICJtb2JpbGVOdW1iZXIiOiAiOTQ5MDQyNDI3MCIsDQogICAiZW1haWwiOiAiZHZ5b2dlc2gxMjNAZ21haWwuY29tIg0KfQ==\"/v3/debit\"8289e078-be0b-484d-ae60-052f117f8deb###1");

		// xhr.send(data);



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
						'background-image':`url(${this.homeData.homeBanner.bannerUrl})`,
						// 'url(https://images-eu.ssl-images-amazon.com/images/G/31/img18/DiwaliART/Wave2/GW/midnight/1day/GW-herotator_W2_3000-x-1200._CB480410071_.jpg)',
						'min-height': '500px'
					}
					this.slides = this.homeData.homeSlides
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
