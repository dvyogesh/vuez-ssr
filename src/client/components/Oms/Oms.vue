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
            <div class="col-sm-2">
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
            <div class="col-sm-8 order-status-panel">
              
              <div class="amount">
                <p v-if="order.totalToPay">Actual amount to pay Rs. <b> {{ order.totalToPay }}</b></p>
                <p v-if="order.editedPrice">edited price Rs. <b> {{ order.editedPrice }}</b></p>
                <br>
              </div>
              
              <OmsAccordian 
                v-if="order.isAccepted"
                :_id="order._id"
                :note="order.acceptNote"
                :done-by="order.acceptedBy"
                label-name="Accepted" />
              <OmsAccordian 
                v-if="order.isOutForDelivery"
                :_id="order._id"
                :note="order.outForDeliveryNote"
                :done-by="order.outForDeliveryBy"
                label-name="Out For Delivery" />
              <OmsAccordian 
                v-if="order.isDelivered"
                :_id="order._id"
                :note="order.deliveredNote"
                :done-by="order.deliveredConformed"
                label-name="Delivered" />
             
                <!-- <div 
                v-if="order.isOutForDelivery"
              >
                <input 
                  :id="`outForDelivery_${order._id}`"
                  type="radio"
                  name="name"  
                  class="hide">
                <label :for="`outForDelivery_${order._id}`">Out For Delivery 
                  <span class="glyphicon glyphicon-chevron-down"/>
                </label>
                <div class="text-left data-panel">
                  <p><b>Note:</b>{{ order.outForDeliveryNote }}</p>
                  <p 
                    v-for="(key, value) of order.outForDeliveryBy" 
                    :key="key+1">
                  <b>{{ value }}: </b> {{ key }}</p>
                </div>
              </div> -->

            </div>
            <div class="col-sm-2 order-actions " >
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
                  v-if="order.isAccepted === true && order.isOutForDelivery !== true && order.totalToPay" 
                  class="btn btn-info"
                  @click="openModel({imageUrl: order.imageUrl, OrderId:order._id, isPriceEdit: true, totalToPay:order.editedPrice ? order.editedPrice : order.totalToPay,})">
                  Edit price
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
          v-if="popUpData.isRejecting || popUpData.isAccepting || popUpData.isOutForDelivery || popUpData.isDelivered || popUpData.isPriceEdit" 
          class="form-group">
          <label v-if="popUpData.isAccepting || popUpData.isPriceEdit">
            Enter Amount
          </label>
          <br>
          <input 
            v-model="popUpData.totalToPay" 
            type="text">
          <br>
          <label for="usr">
            Enter 
            
            <span v-if="popUpData.isRejecting"> Rejecting Reason </span>
            <span v-if="popUpData.isAccepting"> Accepting Note </span>
            <span v-if="popUpData.isOutForDelivery"> Delivery details </span>
            <span v-if="popUpData.isDelivered"> Delivered details </span>
            <span v-if="popUpData.isPriceEdit">Price Edit reson</span>
            
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
          v-if="popUpData.isPriceEdit"
          class="btn btn-warning" 
          @click="editPrice(popUpData.OrderId)">Submit Edited Price</button>
        <button 
          class="btn btn-default" 
          @click="closeModel">Close</button>

      </div>
    </div>
  </div>
  

</template>
<script>
import {mapGetters,mapActions, mapState } from 'vuex';
import OmsAccordian from './OmsAccordian/OmsAccordian'
import axios from 'axios'
export default {
	components:{
		OmsAccordian
	},
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
			
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			const data = {note:this.note, isAccepting: true, totalToPay: this.popUpData.totalToPay}
			if (this.note && this.popUpData.totalToPay) {
				this.toggleLoading(true)
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
			} else {
				this.toggleToast('Fill all the input feilds')
			}
			
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
		editPrice(orderId){
			this.toggleLoading(true)
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			const data = {note:this.note, isPriceEdit: true, editedPrice: this.popUpData.totalToPay}
         
			axios.put(`/api/oms/orders/${orderId}`, data).then(
				response => {
					this.getOrders(findAndReplace(this.orders, orderId));
					function findAndReplace(order, find) {
						let i;
						for(i=0; i < order.length ; i++) {
							if (order[i]._id === find) {
								order[i].editedPrice = data.editedPrice
							}
						}
						return order
					}
					this.closeModel()

					this.toggleLoading(false)
					this.toggleToast('Order Price Edited Sucessfully')
             
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
      position: sticky;
      top: 0px;
      background-color: #fff;
      z-index: 12;
      padding-top: 10px;
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
    .data-panel{display: none;}
   input:checked ~ .data-panel {
    display: block;
    }
    .order-status-panel{
      label{
        background: #fff;
        padding: 5px;
        display: block;
        color: #7A7572;
        font-weight: bold;
        border: 1px solid #424242;
        position: relative;
        span{
          position: absolute;
          right:10px;
          top: 8px;
        }
      }
    }
  }
  
</style>
