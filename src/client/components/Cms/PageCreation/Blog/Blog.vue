<template>
  <div class="offers-creation text-left">
    <p 
      class="color-red pointer" 
      @click="reset"><b>{{ aboutText }}</b></p>
    <h2 class="headding">Blog Page</h2>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label>Enter Blog Name</label>
          <input 
            v-model="blogName" 
            type="text" 
            class="form-control" 
            placeholder="Enter Offer Name">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label>Enter Blog Image Url</label>
          <input 
            v-model="blogImage" 
            type="text" 
            class="form-control" 
            placeholder="Enter Offer Image Url">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label>Enter Blog HTML Input</label>
          <textarea 
            v-model="blogPageInput"
            class="offer-text-area form-control"
            placeholder="Enter Offer HTML Input, if you do not know HTML use this text editor to convert text to HTML https://html-online.com/editor/" />
          <div class="output-html">
            <div v-html="blogPageInput"/>
          </div>

          <button 
            v-if="blogPageInput && isEditingId === false"
            class="btn btn-primary"
            @click="createPage">Submit</button>
          <button 
            v-if="isEditingId"
            class="btn btn-primary"
            @click="updateBlog(isEditingId)">Update</button>
            
        </div>
      </div>
    </div>
    <div class="offers-accordions">
      <h3>Existing Blogs</h3>
      <div class="accordion">
        <form>
          <div 
            v-for="(offerPage, index) in blogPages" 
            :key="offerPage._id" 
            class="option">
            <input 
              :id="`toggle${index}`" 
              type="radio"
              name="offer-radio" 
              class="toggle" >
              <label 
              :for="`toggle${index}`" 
              class="title">
              {{ offerPage.blogName }}
              <span 
                class="text-right" 
                @click="editBlog(index, offerPage._id)"><a href="#">Edit</a></span>
              <span 
                class="text-right delete" 
                @click="deleteBlog(index, offerPage._id)">Delete</span>
            </label>
            <div class="content">
              <div class="output-html">
                <div v-html="offerPage.blogHtml"/>
              </div>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState, mapActions, mapGetters} from 'vuex';
import get from 'lodash/get';
import remove from 'lodash/remove';
export default {
	data () {
		return {
			aboutText: '',
			blogPages:[],
			blogPageInput: '',
			blogImage: '',
			blogName: '',
			isEditingId: false
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
				console.log(response.data)
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
			'toggleLoading': 'toggleLoading',
			'toggleToast': 'toggleToast'
		}),
		createPage(){
			const inputToStore = {
				blogName: this.blogName,
				blogHtml: this.blogPageInput,
				blogImage: this.blogImage
			}
			axios
				.post('/api/cms/blogs', inputToStore)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Blog Page Created')
					this.blogPages.push(
						{
							blogName: this.blogName,
							blogPageInput: this.blogPageInput, 
							_id:response.data._id
						})
					this.reset()
				})
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				})
		},
		editBlog(index){
			const editData = this.blogPages[index]
			console.log(editData)
			this.blogPageInput = editData.blogHtml
			this.blogImage = editData.blogImage
			this.blogName = editData.blogName
			this.isEditingId = editData._id
			this.aboutText = 'Edit here below.......or click here to create new'
			console.log(this.blogPageInput)
			
		},
		updateBlog(pageId) {
			const inputToUpdate = {
				blogName: this.blogName,
				blogHtml: this.blogPageInput,
				blogImage: this.blogImage
			}
			axios
				.put(`/api/cms/blogs/${pageId}`, inputToUpdate)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.reset()
					this.toggleToast('Blog Page Updated')
				})
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				})    
		},
		deleteBlog(index, pageId) {
			
			axios
				.delete(`/api/cms/blogs/${pageId}`)
				.then(response => {
					this.toggleLoading(false)
					this.toggleToast('Blog Page Deleted')
					this.blogPages = remove(this.blogPages, function(n) {
						return n._id !== pageId;
					});
				})
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				})  
		},
		reset() {
			this.blogName =""
			this.blogPageInput = ""
			this.blogImage = ""
      		this.aboutText = ""
      		this.blogHtml = ""
      		this.isEditingId = false
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../Offers/Offers.scss'
</style>