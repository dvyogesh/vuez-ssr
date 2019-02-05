<template>
  <div class="cms-site-ticker">
    <p 
      class="color-red pointer" 
      @click="reset"><b>{{ aboutText }}</b></p>
    <div class="siteticker-inputs">
      <div class="form-group">
        <label>Enter Offer Image Url</label>
        <input 
          v-model="promoLink" 
          type="text" 
          class="form-control" 
          placeholder="Enter Promo / SiteTicker Url">
      </div>
      <div class="form-group">
        <label>Enter Promo/SiteTicker HTML Input</label>
        <textarea 
          v-model="promoPageInput"
          class="offer-text-area form-control"
          placeholder="Enter Offer HTML Input, if you do not know HTML use this text editor to convert text to HTML https://html-online.com/editor/" />
       
      </div>
      <div class="form-group">
        <button 
          v-if="promoPageInput && isEditingId === false"
          class="btn btn-primary"
          @click="createSiteTicker">Submit</button>
        <button 
          v-if="isEditingId"
          class="btn btn-primary"
          @click="updateSiteTicker(isEditingId)">Update</button>
      </div>
    </div>
    <div class="output-html">
      <div v-html="promoPageInput"/>
    </div>

    <ul class="list-unstyled site-tkr-list">
      <li 
        v-for="(promoPage, index) in promoPages" 
        :key="promoPage._id + index">
        <div class="promo-html">
          <span
            class="btn text-right" 
            @click="editSiteTicker(index)"><a href="#">Edit</a></span>
          <span 
            class="btn text-right delete" 
            @click="deleteSiteTicker(index, promoPage._id)">Delete</span>
          <div v-html="promoPage.propmoHtml"/>
        </div>
        
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState, mapActions, mapGetters} from 'vuex';
import remove from 'lodash/remove';
export default {
	data () {
		return {
			promoLink: '',
			promoPages:[],
			promoPageInput: '',
			isEditingId: false,
			aboutText:''
		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	mounted () {
		axios.get('/api/cms/siteTicker/list').then(
			response => {
				console.log(response.data)
				this.toggleLoading(false)
				if (response.data) {
					this.promoPages = response.data
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
		createSiteTicker() {
			console.log('response')
			const inputToStore = {
				promoLink: this.promoLink,
				propmoHtml: this.promoPageInput
			}
			axios
				.post('/api/cms/siteTicker/create', inputToStore)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Offer Page Created')
					this.promoPages.push(
						{
							promoLink: this.promoLink,
							propmoHtml: this.promoPageInput,
							_id:response.data._id
						})
					this.reset()
				})
        
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				})
		},

		editSiteTicker(index){
			const editData = this.promoPages[index]
			this.promoPageInput = editData.propmoHtml
			this.promoLink = editData.promoLink
			this.isEditingId = editData._id
			this.aboutText = 'Edit here below.......or click here to create new'
			console.log(this.propmoHtml)
      
		},
		updateSiteTicker(pageId) {
			const inputToUpdate = {
				propmoHtml: this.propmoHtml,
				promoLink: this.promoLink,
			}
			axios
				.put(`/api/cms/siteTicker/${pageId}`, inputToUpdate)
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
		deleteSiteTicker(index, pageId) {
			axios
				.delete(`/api/cms/siteTicker/${pageId}`)
				.then(response => {
					this.toggleLoading(false)
					this.toggleToast('Offer Page Deleted')
					this.promoPages = remove(this.promoPages, function(n) {
						return n._id !== pageId;
					});
				})
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				}) 
		},
		reset() {
			this.promoLink = ""
			this.promoPageInput = ""
			this.isEditingId = ""
			this.aboutText = ""
		}
	}
}
</script>

<style lang="scss" scoped>
  .siteticker-inputs {
    padding: 10px;
  }
  .site-tkr-list li{
    margin-bottom: 10px;
  }
  .promo-html{
    position: relative;
    span {
      position: absolute;
      right: 7%;
    }
    .delete {
      right: 11%;
    }
  }

</style>
