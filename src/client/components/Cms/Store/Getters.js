export default  { // computed properties
	// first will state second will be another getters
	studentCount(state, getters){
		return state.students.length
	}
}