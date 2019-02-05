<template>
  <div class="oms container">
    <div class="order-tabs">
      <ul class="list-inline text-left">
        <li 
          v-for="(tab, index) in tabs" 
          :key="tab.name"
          :class="{ active: tab.isActive }"
          class="pointer"
          @click="getOrderList(tab.name, index)">
          {{ `${tab.name === 'OutForDelivery' ? 'Out For Delivery' : tab.name } Orders` }}
          
        </li>
        <li>
          User canceled Orders
        </li>
      </ul>
    </div>
    <div class="orders-list-main">
      <ul class="orders-list list-unstyled">
        <li 
          v-for="order in orders" 
          :key="order.id" 
          class="panel panel-default">
          
          <div class="row">
            <div class="col-sm-3">
              <div 
                class="pointer" 
                @click="openModel({imageUrl: order.imageUrl})">
                <img 
                  :src="order.imageUrl" 
                  width="100px" 
                  height="100px">
                <p>click to view</p>
              </div>
             
            </div>
            <div class="col-sm-6">
              
              
              <div 
                class="row bs-wizard" 
                style="border-bottom:0;">
                              
            
                <div 
                  :class="order.status === 'OutForDelivery' || order.status === 'Delivered' ? 'complete': 'disabled' "
                  class="col-xs-3 bs-wizard-step"
                >
                  <!-- complete -->
                  <div class="text-center bs-wizard-stepnum">Out for Delivery</div>
                  <div class="progress"><div class="progress-bar"/></div>
                  <a 
                    href="#" 
                    class="bs-wizard-dot"/>
                  <div class="bs-wizard-info text-center">
                    Integer semper dolor ac auctor rutrum. bibendum 
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3 order-actions " >
              <div v-if="order.isRejected !== true">
                <button 
                  v-if="order.isAccepted !== true"
                  class="btn btn-warning"
                  @click="openModel({imageUrl: order.imageUrl, isRejecting:true, OrderId:order._id})">
                  Reject
                </button>
                <button 
                  v-if="order.isAccepted !== true"
                  class="btn btn-info" 
                  @click="openModel({imageUrl: order.imageUrl, isAccepting:true, OrderId:order._id})">
                  Accept
                </button>
                <button 
                  v-if="order.isAccepted === true && order.isOutForDelivery !== true" 
                  class="btn btn-primary "
                  @click="openModel({imageUrl: order.imageUrl, OrderId:order._id, isOutForDelivery: true})">
                  Out for Delivery
                </button>
                <button 
                  v-if="order.isOutForDelivery === true && order.isDelivered !== true " 
                  class="btn btn-success"
                  @click="openModel({imageUrl: order.imageUrl, OrderId:order._id, isDelivered: true})"
                >
                  Delivered
                </button>
                <h4 v-if="order.isDelivered === true">Order Has been Delivered</h4>
              </div>
              <div v-else>
                <h4>Order has bee rejected by</h4>
                <p>{{ order.rejectedBy && order.rejectedBy.userName }}</p>
              </div>
              
            </div>
          </div>
          <p><strong>Name: </strong>{{ order.userName }}</p>
          <p><strong>MobileNumber: </strong>{{ order.mobileNumber }}</p>
          <p><strong>Address: </strong>{{ order.fullAddress }}</p>

        </li>
      </ul>
    </div>
    <div 
      v-if="isModelOpen" 
      class="popup-main">
      <div class="popup-inner">
        <div class="close-btn">
          <h1 
            class="btn btn-warning" 
            @click="closeModel">X</h1>
        </div>
        
        <div 
          v-if="popUpData.imageUrl" 
          class="image-body text-center">
          <img :src="popUpData.imageUrl">
        </div>
        <div 
          v-if="popUpData.isRejecting || popUpData.isAccepting || popUpData.isOutForDelivery || popUpData.isDelivered" 
          class="form-group">
          <label for="usr">
            Enter 
            
            <span v-if="popUpData.isRejecting"> Rejecting Reason </span>
            <span v-if="popUpData.isAccepting"> Accepting Note </span>
            <span v-if="popUpData.isOutForDelivery"> Delivery details </span>
            <span v-if="popUpData.isDelivered"> Delivered details </span>
             
            
          </label>
          <textarea
            v-model="note"
            type="text" 
            class="form-control"/> 
          
        </div>
        
        <button 
          v-if="popUpData.isRejecting"
          class="btn btn-warning" 
          @click="rejectOrder(popUpData.OrderId)">Cancel Order</button>
        <button 
          v-if="popUpData.isAccepting"
          class="btn btn-warning" 
          @click="acceptOrder(popUpData.OrderId)">Accept Order</button>
        <button 
          v-if="popUpData.isOutForDelivery"
          class="btn btn-warning" 
          @click="outForDelivery(popUpData.OrderId)">Out For Delivery</button>
        <button 
          v-if="popUpData.isDelivered"
          class="btn btn-warning" 
          @click="delivered(popUpData.OrderId)">Delivered</button>
        <button 
          class="btn btn-default" 
          @click="closeModel">Close</button>

      </div>
    </div>
  </div>
  

</template>
<script>
import {mapGetters,mapActions, mapState } from 'vuex';
import axios from 'axios'
export default {
	data () {
		return {
			userName: '',
			isModelOpen: false,
			note: '',
			popUpData: {},
			tabs: [
				{
					name:'Placed',
					isActive: true
				},
				{
					name:'Accepted',
					isActive: false
				},
				{
					name:'OutForDelivery',
					isActive: false
				},
				{
					name:'Delivered',
					isActive: false
				},
				{
					name:'Rejected',
					isActive: false
				},

			]
		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	computed: {
		...mapState('oms',{
			orders:'orders'
		}),
	},
	mounted () {
		this.checkSignIn();
		this.getOrderList('Placed', 0)
		// console.log('this.$route.puvalue_name: value,: value,sh("/")')
		// console.log(this.$route)
		//this.$router.push({ path: '/myorders' })
		// this.$router.push({ name: "Home" });
	},
	methods: {
		...mapActions('oms',{
			getOrders:'getOrders'
		}),
		openModel(data){
			this.popUpData = data
			this.isModelOpen = true
			console.log(this.popUpData)
		},
		closeModel() {
			this.isModelOpen = false
		},
		checkSignIn: function() {
		    if(typeof(Storage) !== "undefined") {
		        if (localStorage.omsUser) {
		           this.userName = localStorage.omsUser;
		        } else {
		            this.$router.push({ path: '/' })
		        }
		    } else {
		        document.getElementById("app").innerHTML = "Sorry, your browser does not support web storage...";
		    }
		},
		getOrderList(type, index) {
			this.toggleLoading(true)
			axios.get(`/api/oms/orders/${type}`).then(
				response => {
					//console.log(response.data)
					//this.loading = false
					console.log('oms-response')
					console.log(response)
					this.getOrders(response.data);
					this.toggleLoading(false)
					this.tabs.forEach((tab, current) => {
						current === index ? tab.isActive = true : tab.isActive = false
					});
				},
				error => {
					this.getOrders([]);
					this.toggleLoading(true)
					this.toggleToast('Some thing went wrong Please try again')
				}
			)
		},
		rejectOrder(orderId){
			this.toggleLoading(true)
			console.log('localStorage.getItem')
			console.log(localStorage.getItem('jwtUser'))
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			const data = {note:this.note}
			
			axios.put(`/api/oms/orders/${orderId}`, data).then(
				response => {
					this.getOrders(findAndReplace(this.orders, orderId));
					function findAndReplace(order, find) {
						let i;
						for(i=0; i < order.length ; i++) {
							if (order[i]._id === find) {
								order[i].isRejected = true
							}
						}
						return order
					}
					this.closeModel()

					this.toggleLoading(false)
					this.toggleToast('Order Rejected Sucessfully')
					
				},
				error => {
					this.toggleLoading(false)
					this.toggleToast('Some thing went wrong Please try again')
				}
			)
		},
		acceptOrder(orderId){
			this.toggleLoading(true)
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			const data = {note:this.note, isAccepting: true}
      
			axios.put(`/api/oms/orders/${orderId}`, data).then(
				response => {
					this.getOrders(findAndReplace(this.orders, orderId));
					function findAndReplace(order, find) {
						let i;
						for(i=0; i < order.length ; i++) {
							if (order[i]._id === find) {
								order[i].isAccepted = true
							}
						}
						return order
					}
					this.closeModel()

					this.toggleLoading(false)
					this.toggleToast('Order Accepted Sucessfully')
          
				},
				error => {
					this.toggleLoading(false)
					this.toggleToast('Some thing went wrong Please try again')
				}
			)
		},
		outForDelivery(orderId){
			this.toggleLoading(true)
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			const data = {note:this.note, isOutForDelivery: true}
      
			axios.put(`/api/oms/orders/${orderId}`, data).then(
				response => {
					this.getOrders(findAndReplace(this.orders, orderId));
					function findAndReplace(order, find) {
						let i;
						for(i=0; i < order.length ; i++) {
							if (order[i]._id === find) {
								order[i].isOutForDelivery = true
							}
						}
						return order
					}
					this.closeModel()

					this.toggleLoading(false)
					this.toggleToast('Order Out for Delivery Sucessfully')
          
				},
				error => {
					this.toggleLoading(false)
					this.toggleToast('Some thing went wrong Please try again')
				}
			)
		},
		delivered(orderId){
			this.toggleLoading(true)
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			const data = {note:this.note, isDelivered: true}
      
			axios.put(`/api/oms/orders/${orderId}`, data).then(
				response => {
					this.getOrders(findAndReplace(this.orders, orderId));
					function findAndReplace(order, find) {
						let i;
						for(i=0; i < order.length ; i++) {
							if (order[i]._id === find) {
								order[i].isDelivered = true
							}
						}
						return order
					}
					this.closeModel()

					this.toggleLoading(false)
					this.toggleToast('Order Out for Delivery Sucessfully')
          
				},
				error => {
					this.toggleLoading(false)
					this.toggleToast('Some thing went wrong Please try again')
				}
			)
		},
		...mapActions('App',{
			'toggleLoading': 'toggleLoading',
			'toggleToast': 'toggleToast'
		}),


	},
	
}
</script>
<style lang="scss" >
  .oms {
    .panel-default{ padding: 1%;}
    .order-tabs{
      border-bottom: thin solid #ccc;
      margin: 20px 0px;
      ul{margin: 0px}
      li{
        color: #0066c0;
        border-left: 1px solid #ccc;
        padding-left: 10px;
        padding-right: 10px;
        &.active{
          font-weight: 700;
          color: #000;
          border-bottom: 2px solid #e47911;
          padding-bottom: 5px;
        }
        &:first-child{border-left:0px;};
      }
    }
    .order-actions{
      .btn{
        display: block;
        margin: 5px auto;
        min-width: 130px;
      }
    }
  }
  
</style>
