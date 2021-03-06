import Vuex from 'vuex';
import Vue from 'vue';




Vue.use(Vuex)

// import data from '../Students';
// import state from './State';
// import getters from './Getters';
// import actions from './actions';
// import mutations from './Mutations';

const MyOrdersModule = {
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
		myOrders:[]
	},
	
	actions:{
		getMyOrders(context, data) {
			// we can Acccess
			// context.state
			// context.getters
			// commit for mutate
			
			context.commit('setOrders', data)

			// return new Promise(function(resolve, reject) {
			// 	const students =  data.getStudents()
			// 	if (students.length>0) {
			// 		resolve(context.commit('setStudents', students))
			// 	} else {
			// 		reject('unable to get students')
			// 	}
			// })
		},
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
		setOrders(state, data){
			state.myOrders = data
		}
	}
	
}

export default MyOrdersModule