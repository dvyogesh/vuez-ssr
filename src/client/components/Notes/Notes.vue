<template>
  <section>
    <h1>Dashboard</h1>
    <h1 v-if="!user">Getting user information...</h1>
    <h1 v-if="user">Hello, {{ user.username }}!! 👋</h1>
    <button 
      class="btn btn-primary" 
      @click="logout()">Logout</button>
    <br >
    <br >
    <button 
      class="btn btn-info" 
      @click="showForm = !showForm">Toggle Form</button>
    <form 
      v-if="showForm" 
      @submit.prevent="addNote()">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="newNote.title"
          type="text"
          class="form-control"
          aria-describedby="titleHelp"
          placeholder="Enter a title" 
          required>
        <small
          id="titleHelp"
          class="form-text text-muted">
          Enter a descriptive title for your note.
        </small>
      </div>
      <div class="form-group">
        <label for="note">Note</label>
        <textarea
          id="note"
          v-model="newNote.note"
          class="form-control"
          rows="3"
          placeholder="Enter your note" 
          required/>
      </div>
      <button 
        type="submit" 
        class="btn btn-success">Add Note</button>
    </form>
    <section class="row mt-3">
      <div
        v-for="note in notes"
        :key="note._id"
        class="col-6">
        <div class="card border-info mb-3">
          <div class="card-header"><h1>{{ note.title }}</h1></div>
          <div class="card-body">
            <p 
              class="card-text" 
              v-html="renderMarkDown(note.note)"/>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import MarkdownIt from 'markdown-it';
import MDemoji from 'markdown-it-emoji';
import axios from 'axios'
const md = new MarkdownIt();
md.use(MDemoji);
const API_URL = '/api2/notes';
export default {
	data: () => ({
		showForm: false,
		user: null,
		newNote: {
			title: '',
			note: '',
		},
		notes: [],
	}),
	created () {
		
	},
	mounted() {
		//if(typeof(Storage) !== "undefined") {
		// console.log(localStorage.getItem('jwtUser'))
		// axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
		// axios.get(`${API_URL}`)

		// // fetch(API_URL, {
		// //  headers: {
		// //    'authorization': `${HConfig.TOKEN_SECRET} ${localStorage.jwtUser}` //`Bearer ${localStorage.token}`,
		// //  },
		// // })
		// 	//.then(res => res.json())
		// 	.then((result) => {
		// 		if (result.user) {
		// 			this.user = 'result.user';
		// 			this.getNotes();
		// 		} else {
		// 			//this.logout();
		// 		}
		// 	});
		// 	this.user = 'result.user';
		// 	this.getNotes();
		// }
		this.getNotes();
	},
	methods: {
		renderMarkDown(note) {
			return md.render(note);
		},
		getNotes() {
			
			axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwtUser')}`
			axios.get(`${API_URL}`)
				.then((result)=>{
					
					this.notes = result.data;
					console.log(this.notes);
				})
				.catch((err)=>console.log(err))
			// fetch(`${API_URL}`, {
			// 	headers: {
			// 		'authorization': `Bearer ${localStorage.jwtUser}`//`Bearer ${localStorage.jwtUser}`,
			// 	},
			// }).then(res => res.json())
			// 	.then((notes) => {
			// 		this.notes = notes;
			// 	});
		},
		addNote() {
			fetch(`${API_URL}`, {
				method: 'post',
				body: JSON.stringify(this.newNote),
				headers: {
					'content-type': 'application/json',
					authorization: `barer ${localStorage.jwtUser}`//`Bearer ${localStorage.token}`,
				},
			}).then(res => res.json())
				// .then((note) => {
				// 	this.notes.push(note);
				// 	this.newNote = {
				// 		title: '',
				// 		note: '',
				// 	};
				// 	this.showForm = false;
				// });
				.catch((err)=>console.log(err))
		},
		logout() {
			localStorage.removeItem('jwtUser');
			this.$router.push('/login');
		},
	},
};
</script>

<style>
.card {
  height: 90%;
}
.card-text img {
  width: 100%;
}
</style>
