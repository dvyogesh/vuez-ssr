<template>
  <div>
    <div class="form-group">
      <label for="usr">Name:</label>
      <input 
        id="usr" 
        type="text" 
        class="form-control">
    </div>
    
  </div>
</template>
<script>

//import store from '../../store';
import {mapState, mapActions, mapGetters} from 'vuex';
	
export default {
	props: ['type'],
	computed: {
		...mapState('Cms',
			{teamA: 'teamA', teamB: 'teamB'},

		),
		// team(){
		// 	console.log(this)
		// 	//we will call props with this key word
		// 	return  ;

		// }
	},
	methods: {
		//removeTeamMember({type: type, id: id, index: index}){
		// by default mapActions will take one param so we need to pass one obj
		...mapActions('Cms',{removeMember:'removeTeamMember'}),
		removeTeamMember: function(data){
			this.removeMember(data)
		}
		//this.$store.dispatch("removeTeamMember", {type, id, index})

		//}
	}
}
</script>