export default { // methods
	// actions functions fist thing accepts context
	// data as params (like next addTeamMember function )
	getStudents({ commit, state }) {
		// we can Acccess
		// context.state
		// context.getters
		// commit for mutate
		console.log('cool')
		context.commit('setStudents')
	},
	addTeamMember({ commit, state }, data) {
		// data is params
		//console.log(data)
		context.commit('pushMemberToTeam', data)
	},
	removeTeamMember({ commit, state }, data) {
		context.commit('removeMemberFromTeam', data)
	}

}