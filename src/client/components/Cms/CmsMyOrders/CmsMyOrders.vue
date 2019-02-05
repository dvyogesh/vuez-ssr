<template>
  <div>
    <div 
      v-if="banner" 
      class="banner-section text-left">
      <h2 class="headding">Banner</h2>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="usr">Banner Image Url:</label>
            <input  
              v-model="banner.bannerUrl"
              type="text" 
              class="form-control">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="usr">On click Link:</label>
            <input 
              v-model="banner.actionLink"
              type="text" 
              class="form-control">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="usr">Alt text:</label>
            <input 
              v-model="banner.altText"
              type="text" 
              class="form-control">
          </div>
        </div>
      </div>
      <div 
        v-if="banner.id" 
        class="bannerDisplay">
        <a :href="banner.actionLink">
          <img 
            :src="banner.bannerUrl" 
            :alt="banner.altText">
        </a>
      </div>
      <div class="upload-btn">

        <button 
          v-if="!banner.id"
          class="btn btn-primary"
          @click="uploadBanner">Submit</button>
        <button 
          v-if="banner.id"
          class="btn btn-primary"
          @click="updateBanner">Submit</button>
      </div>
  	
    </div>
  </div>

</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import axios from 'axios'
export default {
	//props:['banner'],
	data () {
		return {
			banner: {
				bannerUrl: '',
				altText: '',
				actionLink: '',
				id: ''
			},
		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	mounted () {

		axios.get('/api/cms/myorders/banner').then(
			response => {
				//console.log(response.data)
				this.toggleLoading(false)
				console.log('cms response')
				if (response.data[0] && response.data[0].myOrdersPage) {
					this.banner = response.data[0].myOrdersPage
					this.banner.id = response.data[0]._id
				}
				
				
				
				
				//console.log(response.data[0].banners)
				//this.cms = this.getCmsData(response.data);
			},
			error => {
				this.loading = false
			}
		)
	},
	methods: {
		//removeTeamMember({type: type, id: id, index: index}){
		// by default mapActions will take one param so we need to pass one obj
		...mapActions('App',{
			'toggleLoading': 'toggleLoading',
			'toggleToast': 'toggleToast'
		}),
		
		uploadBanner() {
			this.toggleLoading(true)
			const data = {
				bannerUrl: this.banner.bannerUrl,
				altText: this.banner.altText,
				actionLink: this.banner.actionLink
			}
			axios
				.post('/api/cms/myorders/banner', data)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Uploaded Banner')
				})
				.catch(error => {
					console.log(error)
				})
		},
		updateBanner() {
			this.toggleLoading(true)
			const data = {
				bannerUrl: this.banner.bannerUrl,
				altText: this.banner.altText,
				actionLink: this.banner.actionLink,
				id: this.banner.id
			}
			axios
				.put('/api/cms/myorders/banner', data)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Updated Banner')
				})
				.catch(error => {
					console.log(error)
				})
		},
	}
}
</script>
