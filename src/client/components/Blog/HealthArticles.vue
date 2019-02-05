<template>
  <div class="article-list">
    <ul class="list-inline">
      <li 
        v-for="blogPage in blogPages" 
        :key="blogPage._id">
        <router-link :to="`/blog/${blogPage.blogParam}`">
          <div class="artiicle-inner">
            <img :src="blogPage.blogImage">
            <p><b>{{ blogPage.blogName }}</b></p>
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
			aboutText: 'About Component sd',
			blogPages:[]
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
	methods:{
		...mapActions('App',{
			'toggleLoading': 'toggleLoading'
		}),
	}
}
</script>

<style lang="scss" scoped>
	.article-list{
		ul {
			li{
				max-width: 300px;
			}
		}
	}
    
</style>
