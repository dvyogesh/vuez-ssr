<template>
  <div class="cms-home text-left">
    <div 
      v-if="banner" 
      class="banner-section">
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
    <div class="slider-section">
      <h2 class="headding">Slides</h2>
      
      <div class="row">
        <div class="col-sm-3">
          <div class="form-group">
            <input 
              v-model="slideImgurl"
              type="text" 
              class="form-control"
              placeholder="Enter image Url">
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <input 
              v-model="slideActionlink" 
              type="text" 
              class="form-control"
              placeholder="Enter image on click Url">
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <input 
              v-model="textOnSlide" 
              type="text" 
              class="form-control"
              placeholder="Enter image on text">
          </div>
        </div>
        <div class="col-sm-3">
          <button 
            v-if="!isEditing"
            class="btn btn-primary"
            @click="addSlide">+ Add</button>
          <button 
            class="btn btn-primary"
            @click="toggleEdit">{{ isEditing ? 'Dissable Edit Mode': 'Enable Edit Mode' }}</button>
             
        </div>
      </div>
      
      <div class="list-slide">
        <div v-if="slides.length > 0">
          <SlideShow 
            :slides="slides" 
            :current-index="currentIndex"/>
        </div>
        <div class="upload-btn">

          <button 
            v-if="slides.length > 0 && !isEditing"
            class="btn btn-primary"
            @click="uploadSliders">Submit</button>
          <button 
            v-if="isEditing"
            class="btn btn-primary"
            @click="updateSliders">Update</button>
        </div>
        
      </div>

    </div>
    
    
  </div>
</template>
<script>

//import store from '../../store';
import axios from 'axios'
import {mapState, mapActions, mapGetters} from 'vuex';
import SlideShow from './CmsSlideShow';
	
export default {
	components: {SlideShow},
	props: ['type'],
	data(){
		return {
			banner: {
				bannerUrl: '',
				altText: '',
				actionLink: '',
				id: ''
			},
			slideImgurl:'',
			slideActionlink: '',
			textOnSlide:'',
			slides: [],
			isEditing: false,
			currentImage: 0
		}
	},
	computed: {
		...mapState('Cms',
			{teamA: 'teamA', teamB: 'teamB'},

		),
		
		// team(){
		// 	console.log(this)
		// 	//we will call props with this key word
		// 	return  ;

		// }
	},
	mounted() {
		axios.get('/api/cms/home').then(
			response => {
				//console.log(response.data)
				this.toggleLoading(false)
				console.log('cms response')
				if (response.data[0] && response.data[0].homeBanner) {
					this.banner = response.data[0].homeBanner
					this.banner.id = response.data[0]._id
					console.log('i think need to populate mongo get req')
				}
				if (response.data[0] && response.data[0].homeSlides) {
					console.log(response.data[0].homeSlides)
					this.slides = response.data[0].homeSlides
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
		...mapActions('Cms',{removeMember:'removeTeamMember'}),
		removeTeamMember: function(data){
			this.removeMember(data)
		},
		addSlide(){
			if (this.slideImgurl) {
				this.slides.push({
		         slideImgurl: this.slideImgurl,
		         actionLink: this.slideActionlink,
		         textOnSlide: this.textOnSlide
		       });
				this.slideImgurl=''
				this.slideActionlink=''
			}
		},
		removeSlide(index) {
			 this.slides.splice(index, 1);
		},

		uploadBanner() {
			this.toggleLoading(true)
			const data = {
				bannerUrl: this.banner.bannerUrl,
				altText: this.banner.altText,
				actionLink: this.banner.actionLink
			}
			axios
				.post('/api/cms/home/banner', data)
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
				.put('/api/cms/home/banner', data)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Updated Banner')
				})
				.catch(error => {
					console.log(error)
				})
		},
		uploadSliders() {
			const data = this.slides
			axios
				.post('/api/cms/home/slider', data)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Uploaded Slider')
				})
				.catch(error => {
					console.log(error)
				})
		},
		currentIndex(index) {
			
			
			this.currentImage = index;
			if (this.isEditing) {
				this.enableEdit()
			}
			
		},
		enableEdit(){
			console.log(this.slides.length)
			if (this.slides.length > 0 &&  this.isEditing) {
				console.log(this.currentImage)
				const {actionLink, slideImgurl, textOnSlide} = this.slides[this.currentImage -1]
				console.log(this.slides[this.currentImage -1])
				this.slideImgurl = slideImgurl
				this.slideActionlink = actionLink
				this.textOnSlide = textOnSlide
			} else {
				this.slideImgurl = ""
				this.slideActionlink = ""
				this.textOnSlide = ""
			}
			
		},
		toggleEdit(){
			this.isEditing = !this.isEditing
			//if (this.isEditing) {
			this.enableEdit()
			//}
		},
		updateSliders(){
			this.toggleLoading(true)
			this.slides[this.currentImage -1].slideImgurl = this.slideImgurl,
			this.slides[this.currentImage -1].actionLink = this.slideActionlink,
			this.slides[this.currentImage -1].textOnSlide = this.textOnSlide
			const data = this.slides
			axios
				.post('/api/cms/home/slider', data)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Uploaded Slider')
				})
				.catch(error => {
					console.log(error)
					this.toggleLoading(false)
				})
		}

		//this.$store.dispatch("removeTeamMember", {type, id, index})

		//}
	}
}
</script>


<style lang="scss" scoped>
	.cms-home {
		.list-slide ul{
			li{
				padding: 20px 0px;
				border-bottom: thin solid #ccc;
				img {
					width: 100%;
				}
			}
		}
		.bannerDisplay {
			padding: 10px;
		}
	}
    
</style>