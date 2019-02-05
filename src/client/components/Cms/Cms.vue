<template>
  <div class="container text-center cms-container">
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
                <h4 class="margin-0">
                  <span class="glyphicon glyphicon-user user-icon"/>
                  Hi Cms User
                </h4>
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
                  <CmsMyOrders />
                </div>
          	  
              </li>
              <li v-show="tabs[2].isActive">
                <div>
                  <h1>{{ tabs[2].name }}</h1>
                  <SiteTicker />
                </div>
          	  
              </li>
             
              <li v-show="tabs[3].isActive">
                <div>
                  <!--  <h1>{{ tabs[3].name }}</h1> -->
                  <Offers />
                </div>
              </li>
              <li v-show="tabs[4].isActive">
                <div>
                  <h1>{{ tabs[4].name }}</h1>
                  <Blog />
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
import Offers from './PageCreation/Offers/Offers';
import SiteTicker from './SiteTicker/SiteTicker';
import Blog from './PageCreation/Blog/Blog';
import CmsMyOrders from './CmsMyOrders/CmsMyOrders';

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
		Offers,
		SiteTicker,
		Blog,
		CmsMyOrders

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
					name:'Offers Pages',
					isActive: false
				},
				{
					name:'Blog',
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

<style lang="scss" >
@import 'Cms.scss'
</style>
