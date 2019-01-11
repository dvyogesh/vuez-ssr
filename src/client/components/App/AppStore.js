import Vuex from 'vuex';
import Vue from 'vue';




Vue.use(Vuex)

// import data from '../Students';
// import state from './State';
// import getters from './Getters';
// import actions from './actions';
// import mutations from './Mutations';

const AppModule = {
	namespaced: true,
	// export default new Vuex.Store({
	// 	// state: { //data
	// 	// 	students: [],
	// 	// 	teamA: [],
	// 	// 	teamB: [],
	// 	// },

	// 	// getters: { // computed properties
	// 	// 	// first will state second will be another getters
	// 	// 	studentCount(state, getters){
	// 	// 		return state.students.length
	// 	// 	}

	// 	// },

	// 	// actions: { // methods
	// 	// 	// actions functions fist thing accepts context
	// 	// 	// data as params (like next addTeamMember function )
	// 	// 	getStudents(context) {
	// 	// 		// we can Acccess
	// 	// 		// context.state
	// 	// 		// context.getters
	// 	// 		// commit for mutate
	// 	// 		context.commit('setStudents')
	// 	// 	},
	// 	// 	addTeamMember(context, data) {
	// 	// 		// data is params
	// 	// 		console.log(data)
	// 	// 		context.commit('pushMemberToTeam', data)
	// 	// 	},
	// 	// 	removeTeamMember(context, data) {
	// 	// 		context.commit('removeMemberFromTeam', data)
	// 	// 	}

	// 	// },
	state: { //data
		reqBody:{},
		isLoading: false,
		isToastOpen: false,
		toastData: 'No data'
	},
	
	actions:{

		getReqBody(context, data) {
			// we can Acccess
			// context.state
			// context.getters
			// commit for mutate
			
			context.commit('setReqBody', data)

			// return new Promise(function(resolve, reject) {
			// 	const students =  data.getStudents()
			// 	if (students.length>0) {
			// 		resolve(context.commit('setStudents', students))
			// 	} else {
			// 		reject('unable to get students')
			// 	}
			// })
		},
		toggleLoading(context, data){
			context.commit('toggleLoading', data)
		},
		toggleToast(context, data=''){
			context.commit('toggleToast', data)
		}
	},
	mutations: { // used for changing state
		// actions functions fist thing accepts state
		// async setStudents(state) {
		// 	console.log('anotherCool')
		// 	console.log( data.getStudents())
		// 	return new Promise(function(resolve, reject) {
		// 		const students =  data.getStudents()
		// 		if (students.length>0) {
		// 			state.students =  students
		// 			resolve()
		// 		} else {
		// 			reject('unable to get students')
		// 		}
				
		// 	})
			
		// },
		// pushMemberToTeam(state, data){
		// 	if (data.type === 'A') {
		// 		state.teamA.push(state.students[data.index])
		// 		state.students[data.index].selected = true
		// 	} else {
		// 		state.teamB.push(state.students[data.index])
		// 		state.students[data.index].selected = true
		// 	}
			
		// },
		toggleLoading(state, data){
			state.isLoading = data
		},
		setReqBody(state, data){
			state.reqBody = data
		},
		toggleToast(state, data=''){
			state.isToastOpen = !state.isToastOpen
			state.toastData = data
		},
	}
	
}

export default AppModule