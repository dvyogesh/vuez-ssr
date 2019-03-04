<template>
  <div>
    <ul 
      class="list-inline" 
      data-cool="orders.length">
      <li 
        v-for="order in orders" 
        :key="order.id" 
        class="panel panel-default">
        <div class="panel-heading text-left">
          <div class="row order-header">
            <div class="col-sm-9">
              <span class="btn btn-info order-id">{{ order._id }}</span> 
              
            </div>
            <div class="col-sm-3">
              <span 
                v-if="order.status !== 'canceled' && order.status !== 'OutForDelivery' && order.status !== 'Rejected' && order.status !== 'Delivered'"
                class="cancel-my-order pull-right pointer" 
                @click="cancelReasonModel(order._id)">
                <span class="glyphicon glyphicon-remove-circle "/> Calcel
              </span>
              <span
                v-if="order.status === 'canceled' || order.status === 'Rejected' && order.status !== 'Delivered' " 
                class="pull-right">
                Order has {{ order.status === 'Rejected' ? 'Rejected' : 'Canceled' }} 
              </span>
            </div>
          </div>
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
                class="well pointer" 
                @click="openPayNowModel({OrderId:order._id, userId: order.userId, amount: order.totalToPay})">
                10% cash back on pre-pay clickhere
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
                :class="order.status === 'Placed' || order.status === 'Accepted' || order.status === 'OutForDelivery' || order.status === 'Delivered' || order.placedDate !== '' ? 'complete': 'disabled'"
                class="col-xs-3 bs-wizard-step">
                <div class="text-center bs-wizard-stepnum">Ordered</div>
                <div class="progress"><div class="progress-bar"/></div>
                <a 
                  href="#" 
                  class="bs-wizard-dot"/>
                <div class="bs-wizard-info text-center">
                  <p>Placed On{{ order.placedDate.split(' ').slice(1, 4).toString().replace(/,/g,'-') }}</p>
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
    <div 
      id="payment" 
      class="hide">
      <div>
        <p>select payment</p>
      </div>
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
        <div class="popup-header">
          <p v-if="popUpData.amount">Total Amount To Pay 
            <b>Rs. {{ popUpData.amount }} </b>
          </p><p 
            v-else 
            class="color-red"> You can not Pay because your paymet deal not conformed</p>
        </div>
        
        <div class="popup-body">
          <ul class="list-unstyled text-center wallet-icons-list">
            <li 
              class="pay text-center">
              <input 
                id="PAYTM" 
                type="radio" 
                name="wallet" 
                value="PAYTM" 
                label="PAYTM Wallet" >
              <label 
                for="PAYTM"
                @click="setWallet('PAYTM')" 
              >
                <img 
                  src="https://images1.voonik.com/wallets/paytm.jpg" 
                  alt="PAYTM">
              </label>
            </li>
          </ul>
        </div>
        
        
        <button
          v-if="walletName !== '' && popUpData.amount" 
          class="btn btn-warning" 
          @click="payNow">Continue to {{ walletName }} page</button>
        <p 
          v-else 
          class="color-red">select wallet</p>
        <button 
          class="btn btn-default" 
          @click="closeModel">Close</button>


      </div>
    </div>
  </div>

</template>
<script>
import {mapGetters,mapActions, mapState } from 'vuex';
const port = 3000;
const checksum_lib = require('./checksum.js');
//const app = express();
var PaytmConfig = {
	mid: "eNmGQD59071875602978",
	key: "SH5&CnPHf!#2lAuB",
	website: "DEFAULT"
}
export default {
	props:[
		'orders',
		'cancelReasonModel',
		'toggleModel',
		'cancelOrder'],
	data () {
		return {
			aboutText: 'About Component sd',
			showPay:false,
			isModelOpen: false,
			walletName: '',
			popUpData: {
				amount:''
			},
			params:{}
		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	mounted () {
		// console.log('this.$route.push("/")')
		// console.log(this.$route)
		//this.$router.push({ path: '/myorders' })
		// this.$router.push({ name: "Home" });
	},
	updated(){
		
	}, 
	methods:{
		openPayNowModel(data){
			this.isModelOpen = true
			this.popUpData = data
		},
		closeModel() {
			this.isModelOpen = false
		},
		setWallet(name) {
			this.walletName = name
		},
		payNow() {
			if (this.walletName){
				console.log(this.popUpData.amount.toFixed(2))
				this.toggleLoading(true)
				this.toggleToast(`Redirecting to ${this.walletName}`)
      
				this.showPay = true
				this.params['MID']           = PaytmConfig.mid;
				this.params['WEBSITE']       = PaytmConfig.website;
				this.params['CHANNEL_ID']      = 'WEB';
				this.params['INDUSTRY_TYPE_ID']  = 'Retail';
				this.params['ORDER_ID']      = `${this.popUpData.OrderId}_${new Date().getTime()}`;
				this.params['CUST_ID']       = this.popUpData.userId;
				this.params['TXN_AMOUNT']      = this.popUpData.amount.toFixed(2);
				this.params['CALLBACK_URL']    = 'http://localhost:'+port+'/api/payment/callback';
				this.params['EMAIL']       = 'yogesh.macet@gmail.com';
				this.params['MOBILE_NO']     = '9490424270';
				var form_fields = "";
				for(var x in this.params){
					form_fields += "<input type='hidden' name='"+x+"' value='"+this.params[x]+"' >";
				}
				checksum_lib.genchecksum(this.params, PaytmConfig.key, (err, checksum) => {

					const txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for staging
					// var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
                    
				
                  
					form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

					// res.writeHead(200, {'Content-Type': 'text/html'});
					const html= `<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="${txn_url}" name="paytmForm">${form_fields}</form></body></html>`;
					// res.end();
					document.getElementById('payment').innerHTML = html;
					switch(this.walletName){
					case 'PAYTM':
						if (this.showPay && document.paytmForm) {
							document.paytmForm.submit();
							document.paytmForm.reset()
							document.getElementById('payment').innerHTML = ''
						}
						break;
					default: ''
					}
				
				})
			} else {
				//this.toggleLoading(true)
				this.toggleToast('plese select any one wallet')
			}
		},
		...mapActions('App',{
			'toggleLoading': 'toggleLoading',
			'toggleToast': 'toggleToast'
		}),
   
	}
}
</script>
<style>
  ul.wallet-icons-list li {
    width: 65%;
    margin: 9px auto;
  }
  ul.wallet-icons-list li input[type=radio] {
    display: none;
}
ul.wallet-icons-list li label {
  margin-bottom: 0px;
    width: 100%;
    cursor: pointer;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.24), 0 0 2px 0 rgba(0,0,0,.12);
    border-style: solid;
    background-position: 60%;
    display: block;
        height: 55px;
        background-repeat: no-repeat;
    border-image-source: linear-gradient(180deg,hsla(0,0%,100%,.2),hsla(0,0%,100%,.1) 5%,hsla(0,0%,100%,0) 20%,hsla(0,0%,100%,0));
}

ul.wallet-icons-list li label img {
    width: 120px;
}
ul.wallet-icons-list li input[type=radio]:checked+label {
    border: 3px solid #79ac48;
    border-radius: 2px;
}
ul.wallet-icons-list li input[type=radio]:checked+label:after {
    content: "\2713";
    color: #fff;
    width: 24px;
    height: 24px;
    background-color: #79ac48;
    border: 3px solid #79ac48;
    border-radius: 100%;
    display: block;
    text-align: center;
    margin-left: 85%;
    margin-top: -34px;
}
</style>
