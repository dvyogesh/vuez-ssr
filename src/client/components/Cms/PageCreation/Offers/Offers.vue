<template>
  <div class="offers-creation text-left">
    <p 
      class="color-red pointer" 
      @click="reset"><b>{{ aboutText }}</b></p>
    <h2 class="headding">Offer Page</h2>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label>Enter Offer Name</label>
          <input 
            v-model="offerName" 
            type="text" 
            class="form-control" 
            placeholder="Enter Offer Name">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label>Enter Offer Image Url</label>
          <input 
            v-model="offerImage" 
            type="text" 
            class="form-control" 
            placeholder="Enter Offer Image Url">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label>Enter Offer HTML Input</label>
          <textarea 
            v-model="offerPageInput"
            class="offer-text-area form-control"
            placeholder="Enter Offer HTML Input, if you do not know HTML use this text editor to convert text to HTML https://html-online.com/editor/" />
          <div class="output-html">
            <div v-html="offerPageInput"/>
          </div>

          <button 
            v-if="offerPageInput && isEditingId === false"
            class="btn btn-primary"
            @click="createPage">Submit</button>
          <button 
            v-if="isEditingId"
            class="btn btn-primary"
            @click="updateOffer(isEditingId)">Update</button>
            
        </div>
      </div>
    </div>
    <div class="offers-accordions">
      <h3>Existing Offers</h3>
      <div class="accordion">
        <form>
          <div 
            v-for="(offerPage, index) in offerPages" 
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
              {{ offerPage.offerName }}
              <span 
                class="text-right" 
                @click="editOffer(index, offerPage._id)"><a href="#">Edit</a></span>
              <span 
                class="text-right delete" 
                @click="deleteOffer(index, offerPage._id)">Delete</span>
            </label>
            <div class="content">
              <div class="output-html">
                <div v-html="offerPage.offerHtml"/>
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
			offerPages:[],
			offerPageInput: '',
			offerImage: '',
			offerName: '',
			isEditingId: false
		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	mounted () {
		axios.get('/api/cms/offer/pages').then(
			response => {
				console.log(response.data)
				this.toggleLoading(false)
				if (response.data) {
					this.offerPages = response.data
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
				offerName: this.offerName,
				offerHtml: this.offerPageInput,
				offerImage: this.offerImage
			}
			axios
				.post('/api/cms/offer/createPage', inputToStore)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Offer Page Created')
					this.offerPages.push(
						{
							offerName: this.offerName,
							offerPageInput: this.offerPageInput, 
							_id:response.data._id
						})
					this.reset()
				})
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				})
		},
		editOffer(index){
			const editData = this.offerPages[index]
			this.offerPageInput = editData.offerHtml
			this.offerImage = editData.offerImage
			this.offerName = editData.offerName
			this.isEditingId = editData._id
			this.aboutText = 'Edit here below.......or click here to create new'
			console.log(this.offerPageInput)
			
		},
		updateOffer(pageId) {
			const inputToUpdate = {
				offerName: this.offerName,
				offerHtml: this.offerPageInput,
				offerImage: this.offerImage
			}
			axios
				.put(`/api/cms/offer/${pageId}`, inputToUpdate)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.reset()
					this.toggleToast('Offer Page Updated')
				})
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				})    
		},
		deleteOffer(index, pageId) {
			
			axios
				.delete(`/api/cms/offer/${pageId}`)
				.then(response => {
					this.toggleLoading(false)
					this.toggleToast('Offer Page Deleted')
					this.offerPages = remove(this.offerPages, function(n) {
						return n._id !== pageId;
					});
				})
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				})  
		},
		reset() {
			this.offerName =""
			this.offerPageInput =""
			this.offerImage = ""
			this.aboutText = ""
		}
	}
}
</script>
<style lang="scss" scoped>
@import 'Offers.scss'
</style>