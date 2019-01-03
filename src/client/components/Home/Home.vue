<template>
  <div>
    <div class="home-container">
      <div 
        :style="backIm" 
        class="row">
        <div class="col-sm-8"/>
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
import OrderPannel from './OrderPanel/OrderPanel.vue'

export default {
	components: {
		OrderPannel
	},
	data () {
		return {
			image: '',
			backIm: {
				'background-image':
          'url(https://images-eu.ssl-images-amazon.com/images/G/31/img18/DiwaliART/Wave2/GW/midnight/1day/GW-herotator_W2_3000-x-1200._CB480410071_.jpg)',
				'min-height': '500px'
			}
		}
	},

	methods: {}
}
</script>
