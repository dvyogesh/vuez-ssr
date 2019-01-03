<template>
  <div
    class="my-orders my-orders-main text-center" >
    <div>
      <!-- <button 
          id="btn" 
          class="" 
          @click="getOrders">Get Jokes</button> -->
      
      
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="order-list">
          <ul 
            class="list-inline" 
            data-cool="orders.length">
            <li 
              v-for="order in myOrders" 
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
      <div class="col-sm-4 my-orders-order-now">
        <div :class="{ fixed: fixedOrderPanel }">
          <OrderPannel />
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters,mapActions, mapState } from 'vuex';
import OrderPannel from '../Home/OrderPanel/OrderPanel.vue'

export default {
	components: {
		OrderPannel
	},
	data () {
		return {
			loading: false,
			fixedOrderPanel: false
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
					this.orders = this.getOrdersList(response.data);
				},
				error => {
					this.loading = false
				}
			)
			
			
		},
		...mapActions('orders',{
			getOrdersList:'getMyOrders'
		}),
	},
}

</script>
<style lang="scss" scoped>

.my-orders-main {
  padding: 10px;
  .order-input-container {
    margin: 0;
    max-width: 100%;
  }
}
.fixed{
  position: fixed;
  top: 0px;
  padding: 1%;
  @media only screen and (max-width: 767px) {
    &{
      position: static;
    }
  }
}
.order-list {
  ul {
    li {
      max-width: 100%;
      border:thin solid #ddd;
      padding: 0px;
      display: block;
      margin-bottom: 1%;
      border-radius: 5px;
      .cancel-my-order {
        color: #2a8ae2;
      }
      img {
       
      }
      .row {
        margin:0px;
        padding: 2%;
      }
      .order-again {
        button {
          margin-top: -10px;
          margin-right: -20px;
          margin-bottom: 10px;
        }
      }
      bs-wizard {margin-top: 40px;}

      /*Form Wizard*/
      .bs-wizard {border-bottom: solid 1px #e0e0e0; padding: 0 0 10px 0;}
      .bs-wizard > .bs-wizard-step {padding: 0; position: relative;}
      .bs-wizard > .bs-wizard-step + .bs-wizard-step {}
      .bs-wizard > .bs-wizard-step .bs-wizard-stepnum {
        color: #595959; font-size: 16px; margin-bottom: 5px;
        @media only screen and (max-width: 600px) {
            &{font-size: 10px;}
          }
      }
      .bs-wizard > .bs-wizard-step .bs-wizard-info {color: #999; font-size: 14px;}
      .bs-wizard > .bs-wizard-step > .bs-wizard-dot {
        position: absolute; width: 30px; height: 30px; display: block; background: #fbe8aa; top: 45px; left: 50%; margin-top: -15px; margin-left: -15px; border-radius: 50%;
          @media only screen and (max-width: 600px) {
            &{top:36px;}
          }
      } 
      .bs-wizard > .bs-wizard-step > .bs-wizard-dot:after {content: ' '; width: 14px; height: 14px; background: #fbbd19; border-radius: 50px; position: absolute; top: 8px; left: 8px; } 
      .bs-wizard > .bs-wizard-step > .progress {position: relative; border-radius: 0px; height: 8px; box-shadow: none; margin: 20px 0;}
      .bs-wizard > .bs-wizard-step > .progress > .progress-bar {width:0px; box-shadow: none; background: #fbe8aa;}
      .bs-wizard > .bs-wizard-step.complete > .progress > .progress-bar {width:100%;}
      .bs-wizard > .bs-wizard-step.active > .progress > .progress-bar {width:50%;}
      .bs-wizard > .bs-wizard-step:first-child.active > .progress > .progress-bar {width:0%;}
      .bs-wizard > .bs-wizard-step:last-child.active > .progress > .progress-bar {width: 100%;}
      .bs-wizard > .bs-wizard-step.disabled > .bs-wizard-dot {background-color: #f5f5f5;}
      .bs-wizard > .bs-wizard-step.disabled > .bs-wizard-dot:after {opacity: 0;}
      .bs-wizard > .bs-wizard-step:first-child  > .progress {left: 50%; width: 50%;}
      .bs-wizard > .bs-wizard-step:last-child  > .progress {width: 50%;}
      .bs-wizard > .bs-wizard-step.disabled a.bs-wizard-dot{ pointer-events: none; }
      /*END Form Wizard*/
    }
  }
}
</style>
