<template>
  <div class="blog-detail-page-main container">
    <div class="blog-banner">
      <img src="https://cdn-b.medlife.com/2018/09/medlife-offers-1130-60-3.png">
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="blog-left">
          <h1>{{ blogName }}</h1>
          <div v-html="blogHtml"/>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="blog-right">
          <div class="resently-posted">
            <h4>Resently Posted</h4>
            <ul class="list-unstyled resent-posted-list">
              <li>
                <b>
                  Haemorrhoids: Causes, Symptoms, Treatment, and Prevention
                  Can Good Gut Bacteria Affect Your Physical and Mental Health?
                </b>
              </li>
              <li>
                <b>12 Best Foods to Keep You Healthy During This Winter</b>
              </li>
              <li>
                <b>Places Body Stores Stress and The Way it Affects You</b>
              </li>
              <li>
                <b>
                  Haemorrhoids: Causes, Symptoms, Treatment, and Prevention
                  Can Good Gut Bacteria Affect Your Physical and Mental Health?
                </b>
              </li>
              <li>
                <b>12 Best Foods to Keep You Healthy During This Winter</b>
              </li>
              <li>
                <b>Places Body Stores Stress and The Way it Affects You</b>
              </li>
            </ul>
          </div>
        </div>
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
			blogPages: [],
			blogHtml:'',
			blogName: ''

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
		axios.get(`/api/cms/blogs/${paramsId}`).then(
			response => {
				//console.log(response.data)
				this.toggleLoading(false)
				if (response.data) {
					this.blogHtml = response.data.blogHtml
					this.blogName = response.data.blogName
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
	.blog-detail-page-main {
		.blog-banner{
			padding: 10px 0px;
		}
		.blog-right{
			
			h4 {
				font-weight: bold;
				padding-bottom: 10px;
    			border-bottom: 3px solid #ccc;
			}
	 		.resent-posted-list {
	 			li{
	 				
	 			    border-bottom: thin solid #cccccc5c;
	 			    margin-bottom: 10px;
	     			padding: 5px 0px;
	     			b{
	     				font-weight: 500;
	     				color: #444444;
	     			}
	 			}
	 		}
		}
		
	}
    
</style>

