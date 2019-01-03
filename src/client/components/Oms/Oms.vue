<template>
  <div class="oms container">
    <div class="tex-center">
      <h3>{{ aboutText }}</h3>
      <h3>{{ userName }}</h3>
    </div>
    <div class="orders-list-main">
      <ul class="orders-list list-unstyled">
        <li 
          v-for="order in orders" 
          :key="order.id" 
          class="panel panel-default">
          <div class="panel-heading text-left">
            <p>
              <b>Order Placed at {{ order.placedDate }}
                <span class="cancel-my-order pull-right">Calcel This Order</span>
              </b>
            </p>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <img 
                :src="order.imageUrl" 
                width="100px" 
                height="100px">
            </div>
            <div class="col-sm-9">
              <div class="pre-pay">
                <div 
                  v-if="order.status === 'Accepted' && order.status !== 'Delivered' " 
                  class="well">
                  10% cash back on pre-pay <router-link to="/payment">clickhere</router-link>
                </div>
              </div>
              <div
                v-show="order.status === 'Delivered'" 
                class="order-again text-right">
                <button class="btn btn-info">Order Again</button>
              </div>
              <div 
                class="row bs-wizard" 
                style="border-bottom:0;">
                              
                <div 
                  :class="order.status === 'Placed' || order.status === 'Accepted' || order.status === 'OutForDelivery' || order.status === 'Delivered' ? 'complete': 'disabled'"
                  class="col-xs-3 bs-wizard-step">
                  <div class="text-center bs-wizard-stepnum">Ordered</div>
                  <div class="progress"><div class="progress-bar"/></div>
                  <a 
                    href="#" 
                    class="bs-wizard-dot"/>
                  <div class="bs-wizard-info text-center">
                    Lorem ipsum dolor sit amet.
                  </div>
                </div>
                              
                <div
                  :class="order.status === 'Accepted' || order.status === 'OutForDelivery' || order.status === 'Delivered' ? 'complete': 'disabled' "
                  class="col-xs-3 bs-wizard-step"
                ><!-- complete -->
                  <div class="text-center bs-wizard-stepnum">Accepted</div>
                  <div class="progress"><div class="progress-bar"/></div>
                  <a 
                    href="#" 
                    class="bs-wizard-dot"/>
                  <div class="bs-wizard-info text-center">
                    Nam mollis tristique erat vel tristique. Aliquam erat volutpat.
                  </div>
                </div>
                              
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
                              
                <div 
                  :class="order.status === 'Delivered' ? 'complete': 'disabled' "
                  class="col-xs-3 bs-wizard-step"><!-- active -->
                  <div class="text-center bs-wizard-stepnum">Delivered</div>
                  <div class="progress"><div class="progress-bar"/></div>
                  <a 
                    href="#" 
                    class="bs-wizard-dot"/>
                  <div class="bs-wizard-info text-center">
                    Curabitur mollis magna at blandit vestibulum. 
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <p><strong>Name: </strong>{{ order.userName }}</p>
          <p><strong>MobileNumber: </strong>{{ order.mobileNumber }}</p>
          <p><strong>Address: </strong>{{ order.fullAddress }}</p>

        </li>
      </ul>
    </div>
  </div>
  

</template>
<script>
import {mapGetters,mapActions, mapState } from 'vuex';
import axios from 'axios'
export default {
	data () {
		return {
			aboutText: 'Oms Component',
			userName: ''
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
		this.getOrderList()
		// console.log('this.$route.puvalue_name: value,: value,sh("/")')
		// console.log(this.$route)
		//this.$router.push({ path: '/myorders' })
		// this.$router.push({ name: "Home" });
	},
	methods: {
		...mapActions('oms',{
			getOrders:'getOrders'
		}),
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
		getOrderList:function() {
			axios.get('/api/oms/orders').then(
				response => {
					//console.log(response.data)
					//this.loading = false
					console.log('oms-response')
					console.log(response)
					this.getOrders(response.data);
				},
				error => {
					//this.loading = false
				}
			)
		},

	},
	
}
</script>
