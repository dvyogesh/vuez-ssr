export default { // used for changing state
	// actions functions fist thing accepts state
	setStudents(state) {
		state.students =  data.getStudents()
	},
	pushMemberToTeam(state, data){
		if (data.type === 'A') {
			state.teamA.push(state.students[data.index])
			state.students[data.index].selected = true
		} else {
			state.teamB.push(state.students[data.index])
			state.students[data.index].selected = true
		}
		
	},
	removeMemberFromTeam(state, data) {
		if (data.type === 'A') {
			state.teamA.splice(data.index, 1)
		} else {
			state.teamB.splice(data.index, 1)
		}
		state.students[data.id-1].selected = false
	}
}