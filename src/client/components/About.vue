<template>
  <div>{{ aboutText }}</div>
</template>
<script>
export default {
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
