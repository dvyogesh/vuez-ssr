<template>
  <div>
    <input 
      :id="`${labelName}_${_id}`"
      type="radio"
      name="name" 
      class="hide">
    <label 
      :for="`${labelName}_${_id}`" 
      class="pointer">{{ labelName }}
      <span class="glyphicon glyphicon-chevron-down"/>
    </label>
    <div class="text-left data-panel">
      <p><b>Note:</b>{{ note }}</p>
      <p 
        v-for="(key, value) of doneBy" 
        :key="key+`${labelName}_${_id}`">
      <b>{{ value }}: </b> {{ key }}</p>
    </div>
  </div>
</template>
<script>
export default {
	props:['_id', 'note', 'doneBy', 'labelName'],
	data () {
		return {
			aboutText: 'About Component sd'
		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	mounted () {
		// console.log('this.$route.push("/")')
		// console.log(this.$route)
		//this.$router.push({ path: '/myorders' })
		// this.$router.push({ name: "Home" });
	}
}
</script>
