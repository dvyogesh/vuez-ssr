// import Vuex from 'vuex';
// import Vue from 'vue';




// Vue.use(Vuex)

// import data from './components/Cms/Students';
// import state from './vuex/State';
// import getters from './vuex/Getters';
// import actions from './vuex/actions';
// import mutations from './vuex/Mutations';

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
// 	state,
// 	getters,
// 	actions,
// 	mutations: { // used for changing state
// 		// actions functions fist thing accepts state
// 		setStudents(state) {
// 			state.students =  data.getStudents()
// 		},
// 		pushMemberToTeam(state, data){
// 			if (data.type === 'A') {
// 				state.teamA.push(state.students[data.index])
// 				state.students[data.index].selected = true
// 			} else {
// 				state.teamB.push(state.students[data.index])
// 				state.students[data.index].selected = true
// 			}
			
// 		},
// 		removeMemberFromTeam(state, data) {
// 			if (data.type === 'A') {
// 				state.teamA.splice(data.index, 1)
// 			} else {
// 				state.teamB.splice(data.index, 1)
// 			}
// 			state.students[data.id-1].selected = false
// 		}
// 	}
	
// })



import Vue from 'vue'
import Vuex from 'vuex'

import CmsModule from './components/Cms/Store/Cms_Store'
import AppModule from './components/App/AppStore'
import AuthModule from './components/Auth/AuthStore'
import MyOrdersModule from './components/MyOrders/MyOrdersStore'
import OmsModule from './components/Oms/OmsStore'
import HomeModule from './components/Home/HomeStore'
// import PersonModule from './person_module'
// import MessageModule from './message_module'

// Make vue aware of Vuex
Vue.use(Vuex)

//const debug = process.env.NODE_ENV !== 'production'



const modules = {
	// Person: PersonModule,
	// Message: MessageModule
	Api: AppModule,
	App: AppModule,
	Cms: CmsModule,
	Home: HomeModule,
	User: AuthModule,
	orders: MyOrdersModule,
	oms: OmsModule,

	

}

// Combine the initial state and the mutations to create a Vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
	modules,
	
})
