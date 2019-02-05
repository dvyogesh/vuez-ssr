<template>
  <div class="offer-page-main">
    <ul class="list-inline text-center">
      <li 
        v-for="(blogPage, index) in blogPages" 
        :key="blogPage._id + index">
        <router-link :to="`/blog/${blogPage.blogParam}`">
          <div>
            <img :src="blogPage.blogImage">
            <p>{{ blogPage.blogName }}</p>
            <p>View More</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters,mapActions, mapState } from 'vuex';
import axios from 'axios'
export default {
	data () {
		return {
			blogPages: []

		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	mounted () {
		axios.get('/api/cms/blogs').then(
			response => {
				//console.log(response.data)
				this.toggleLoading(false)
				if (response.data) {
					this.blogPages = response.data
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
	.offer-page-main {
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

