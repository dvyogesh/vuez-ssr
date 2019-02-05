<template>
  <div
    class="my-orders my-orders-main text-center" >
    <div class="row">
      <div class="col-sm-8">
        <div class="order-tabs">
          <ul class="list-inline text-left">
            <li 
              v-for="(tab, index) in tabs" 
              :key="tab.name"
              :class="{ active: tab.isActive }"
              class="pointer"
              @click="activeThisTab(index, tab.name)">
              {{ tab.name }}
            </li>
          
          </ul>
        </div>
        <div 
          v-if="myOrders && myOrders.length>0" 
          class="order-list">

          <OrderList 
            :orders="myOrders"
            :cancel-reason-model="cancelReasonModel"
            :toggle-model="toggleModel"
            :cancel-order="cancelOrder"/>
        </div>
      </div>
      <div class="col-sm-4 my-orders-order-now">
        <div :class="{ fixed: fixedOrderPanel }">
          <OrderPannel />
        </div>
        
      </div>
    </div>
    <div 
      v-if="isModelOpen" 
      class="popup-main">
      <div class="popup-inner">
        <div class="image-body"/>
        <div class="form-group">
          <label for="usr">Enter cancellation Reason</label>
          <textarea
            v-model="cancelReason"
            type="text" 
            class="form-control"/> 
          <button 
            class="btn btn-warning" 
            @click="cancelOrder">Because Cancel This Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import filter from 'lodash/filter';
import {mapGetters,mapActions, mapState } from 'vuex';
import OrderPannel from '../Home/OrderPanel/OrderPanel.vue'
import OrderList from './OrderList'

export default {
	components: {
		OrderPannel,
		OrderList
	},
	data () {
		return {
			loading: false,
			fixedOrderPanel: false,
			isModelOpen: false,
			cancelReason: '',
			toBeCancelId:'',
			ordersToFilter:[],
			tabs: [
				{
					name:'MyOrders',
					isActive: true
				},
				{
					name:'Oppened',
					isActive: false
				},
				{
					name:'Canceled',
					isActive: false
				},

			]
		}
	},
	computed:{
		...mapState('orders',{
			myOrders: 'myOrders',
		}),
		...mapState('User',{
			userData: 'userData'
		}),
   
	},
	mounted () {
		this.getOrders()
		document.addEventListener('scroll',  this.handleScroll);
	},

	beforeDestroy () {
		console.log('before')
		document.removeEventListener('scroll', this.handleScroll);
	},
	
	destroyed: function () {
		//document.removeEventListener('scroll', this.handleScroll);
		
	},
	methods: {

		

		handleScroll: function(){
			const checkWindow = window !== undefined && window.scrollY;
			if (checkWindow && window.scrollY > 160) {
				console.log('dessa')
				this.fixedOrderPanel = true
			} else {
				this.fixedOrderPanel = false
			}
			const scrollFix = (scrolled) => {
				if (scrolled > 160) {
					console.log('dessa')
					this.fixedOrderPanel = true
				} else {
					this.fixedOrderPanel = false
				}
			}

		},
		getOrders: function () {
			console.log('localStorage.getItem')
			console.log(localStorage.getItem('jwtUser'))
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			this.loading = true
			axios.get('/api/orders').then(
				response => {
					//console.log(response.data)
					this.loading = false
					this.getOrdersList(response.data);
					this.ordersToFilter = this.myOrders
				},
				error => {
					this.loading = false
				}
			)
			
			
		},
		cancelReasonModel(orderId) {
			this.toBeCancelId = orderId
			this.toggleModel(true)
		},
		toggleModel(isOpen){
			this.isModelOpen = isOpen
		},
		cancelOrder(){
			this.toggleLoading(true)
			console.log('localStorage.getItem')
			console.log(localStorage.getItem('jwtUser'))
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			const orderId = this.toBeCancelId
			const data = {reason:this.cancelReason}
			axios.put(`/api/orders/${orderId}`, data).then(
				response => {
					//console.log(response.data)
					this.toggleModel(false)
					this.toggleLoading(false)
					this.toggleToast('Order canceled Sucessfully')
					// this.orders = this.getOrdersList(response.data);
				},
				error => {
					this.toggleLoading(false)
					this.toggleToast('Some thing went wrong Please try again')
				}
			)
		},
		activeThisTab: function(index, tabName) {
			this.tabs.forEach((tab, current) => {
				current === index ? tab.isActive = true : tab.isActive = false
			});
			if (tabName === 'Oppened') {
				const myOrders = filter(this.ordersToFilter, function(o) { return o.status == 'Placed'; });
				this.getOrdersList(myOrders);
			}
			if (tabName === 'Canceled') {
				const myOrders = filter(this.ordersToFilter, function(o) { return o.status == 'canceled'; });
				this.getOrdersList(myOrders);
			}
			if (tabName === 'MyOrders') {
				this.getOrdersList(this.ordersToFilter);
			}

		},
		...mapActions('orders',{
			getOrdersList:'getMyOrders'
		}),
		...mapActions('App',{
			'toggleLoading': 'toggleLoading',
			'toggleToast': 'toggleToast'
		}),
	},
}

</script>

<style lang="scss">
@import 'MyOrders.scss'
</style>
