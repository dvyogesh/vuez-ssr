<template>
  <div class="offer-detail-page-main">
    <div v-html="offerHtml"/>
  </div>
</template>
<script>
import {mapGetters,mapActions, mapState } from 'vuex';
import axios from 'axios'
export default {
	data () {
		return {
			offerPages: [],
			offerHtml:''

		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	mounted () {
		console.log('this.$route')
		console.log(this.$route)
		const paramsId = this.$route.params.id
		axios.get(`/api/cms/offer/${paramsId}`).then(
			response => {
				//console.log(response.data)
				this.toggleLoading(false)
				if (response.data) {
					this.offerHtml = response.data.offerHtml
				}
			},
			error => {
				this.loading = false
			}
		)
	},
	methods: {
		...mapActions('App',{
			'toggleLoading': 'toggleLoading'
		}),
	}
}
</script>


<style lang="scss" scoped>
	.offer-detail-page-main {
		ul {
			li{
				width: 46%;
			    padding: 5px;
			    vertical-align: top;
			    border: thin solid #cccccc5c;
			    margin: 1%;
		}
		}
	}
    
</style>

