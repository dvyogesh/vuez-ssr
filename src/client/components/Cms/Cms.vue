<template>
  <div class="container text-center ">
    <div class="hide">
      <h1>Students ({{ studentCount }})</h1>
      <ul>
        <li 
          v-for="(student, index) in students" 
          :key="student.id">
          <p>
            <span>{{ student.name }}</span>
            <i>{{ student.games.length }} he can play</i>
            <button 
              :disabled="student.selected" 
              @click="addTeamMember('A', index)">Team A</button>
            <button 
              :disabled="student.selected" 
              @click="addTeamMember('B', index)">Team B</button>
          </p>
				
        </li>
      </ul>

      <Team type="A">Team A</Team>
      <Team type="B">Team B</Team>
    </div>
    <div class="cms-maim">
      <div class="cms-inner">
        <div class="row">
          <div class="col-sm-2 left-bar-main">
            <div class="fixed-list">
              <div class="user-section">
                <h3><span class="glyphicon glyphicon-user user-icon"/> Hi Cms User</h3>
              </div>
              <ul class="list-unstyled text-left">
                <li 
                  v-for="(tab, index) in tabs" 
                  :key="tab.name"
                  class="active"
                  @click="activeThisTab(index)">
                  {{ tab.name }}
                </li>
          		  
              </ul>
            </div>
            
          </div>
          <div class="col-sm-9">
            <ul class="list-unstyled">
              <li v-show="tabs[0].isActive">
                <div>
                  <h1>{{ tabs[0].name }}</h1>
                  <CmsHome/>
                </div>
     
              </li>
              <li v-show="tabs[1].isActive">
                <div>
                  <h1>{{ tabs[1].name }}</h1>
                  
                </div>
          	  
              </li>
              <li v-show="tabs[2].isActive">
                <div>
                  <h1>{{ tabs[2].name }}</h1>
                </div>
          	  
              </li>
              <li v-show="tabs[3].isActive">
                <div>
                  <!--  <h1>{{ tabs[3].name }}</h1> -->
                  <Offers />
                </div>
              
              </li>
          	  
            </ul>
          </div>
        </div>
      </div>
    </div>

   
  </div>
  
</template>

<script>
//import data from './Students.js'
import Team from './Team';
import CmsHome from './CmsHome/CmsHome';
import Offers from './PageCreation/Offers/Offers'

//import store from '../../store';
import {mapGetters,mapActions, mapState } from 'vuex';

export default {
	// created() {
	// 	this.students = data.getStudents()
	// 	//console.log(getStudents)
	// },
	components: {
		Team,
		CmsHome,
		Offers
	},
	data() {
		return {
			tabs: [
				{
					name:'Home',
					isActive: true
				},
				{
					name:'MyOrders',
					isActive: false
				},
				{
					name:'SiteTicker',
					isActive: false
				},
				{
					name:'Create Page',
					isActive: false
				},

			]
		}
	},

	computed:{
		...mapState('Cms',{students:'students'}),
		...mapGetters('Cms',{studentCount:'studentCount'}),
		// ...mapActions('Cms',{
		// 	'getStudents': 'getStudents',
		// 	'addMember': 'addTeamMember'
		// }),
		// students(){

		// 	return this.$store.state.Cms.students
		// },
		
	},
	
	created() {
		this.getStudents()
		//action name
		//const cool = 
		//console.log(this.$store.state)
		//this.$store.dispatch('Cms/getStudents')
		//console.log(cool)
		//this.$store.dispatch('getStudents')
	},

	mounted() {
		//this.getStudents
	},
	methods: {
	
		...mapActions('Cms',{
			'getStudents': 'getStudents',
			'addMember': 'addTeamMember'
		}),
		
		addTeamMember: function(type, index){
			this.addMember({type, index})
		},
		activeThisTab: function(index) {
			//console.log(index)
			this.tabs.forEach((tab, current) => {
				current === index ? tab.isActive = true : tab.isActive = false
			            });
		}

	},

}

</script>

<style lang="scss" scoped>
.container{width: 100%}
.left-bar-main {
	padding: 0px;
}
.fixed-list {
		color: #fff;
		position: fixed;
		width: 100%;
		max-width: 235px;
		height: 100%;
		background-color: #000;
		top: 0;
		padding: 20px 0px;
		font-size: 20px;
		.user-section {
			padding-bottom: 20px;
			border-bottom: double;
			border-color: #fff;
		}
		.user-icon {
			border: thin solid #fff;
			border-radius: 100%;
			padding: 20px;
		}
	ul {
		padding: 0px;
		li {
			padding: 10px;
			border-bottom: thin solid #fff;
			cursor: pointer;
		}
	}
}
	button {
		font-size: 13px;
		padding: 3px;
		border-radius: 5px;
		border:1px solid #000;
	}

button:disabled,
button[disabled] {
	color:#eee;
 border:1px solid #eee;
}
</style>