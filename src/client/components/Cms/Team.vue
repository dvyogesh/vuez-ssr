<template>
  <div>
    <h1>Team {{ type }}</h1>
     
    <ul>
      <template v-if="type === 'A'">
        <li 
          v-for="(member, index) in teamA"
          :key="index">
          {{ member.name }}
          <button @click="removeTeamMember({type: type, id: member.id, index: index})">X</button>
        </li>
      </template>
      <template v-if="type === 'B'" >
        <li 
          v-for="(member, index) in teamB"
      
        
          :key="index">
          {{ member.name }}
          <button @click="removeTeamMember({type: type, id: member.id, index: index})">X</button>
        </li>
      </template>
    </ul>
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