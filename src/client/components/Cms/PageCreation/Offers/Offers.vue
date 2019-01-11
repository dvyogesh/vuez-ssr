<template>
  <div class="offers-creation text-left">
    <p class="color-red"><b>{{ aboutText }}</b></p>
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
            :key="offerPage.offerParam + index" 
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
			this.aboutText = 'Edit here.......'
			console.log(this.offerPageInput)
			
		},
		updateOffer(pageId) {
			const inputToUpdate = {
				offerName: this.offerName,
				offerHtml: this.offerPageInput,
				offerImage: this.offerImage
			}
			axios
				.put(`/api/cms/offer/update/${pageId}`, inputToUpdate)
				.then(response => {
					console.log(response)
					this.toggleLoading(false)
					this.toggleToast('Offer Page Updated')
				})
				.catch(error => {
					console.log(error)
					this.toggleToast('Somthing went wrong please try again.')
				})    
		}
	}
}
</script>
<style lang="scss" scoped>
$font-color: #7A7572;
	.offers-creation{
		 h2.headding {
				padding-bottom: 15px;
			    border-bottom: thin solid #ccc;
			}
      .offer-text-area{
        height: 400px;
        width: 100%;
        resize: none;
      }
	}



.accordion {
  margin: 3em auto;
}

.toggle {
  display: none;
}

.option {
  position: relative;
  margin-bottom: 1em;
  label {
    position: relative;
    span{
      position: absolute;
      right: 7%;
    }
  }
}

.title,
.content {
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: all 0.2s;
}

.title {
  background: #fff;
  padding: 1em;
  display: block;
  color: $font-color;
  font-weight: bold;
  border: 1px solid #424242;
}
.title:after, .title:before {
  content: '';
  position: absolute;
  right: 1.25em;
  top: 1.25em;
  width: 2px;
  height: 0.75em;
  background-color: $font-color;
  transition: all 0.2s;
}
.title:after {
  transform: rotate(90deg);
}

.content {
  max-height: 0;
  overflow: hidden;
  background-color: #fff;
  p {
    margin: 0;
    padding: 0.5em 1em 1em;
    font-size: 0.9em;
    line-height: 1.5;
  }
}

.toggle:checked {
  & + .title,
  & + .title + .content {
    box-shadow: 3px 3px 6px #ddd, -3px 3px 6px #ddd;
  }
  & + .title + .content {
    max-height: 400px;
    overflow: scroll;
  }
  & + .title:before {
    transform: rotate(90deg) !important;
  }
}
    
</style>