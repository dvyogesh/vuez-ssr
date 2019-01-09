<template>
	
  <div>

    <div class="slideshow-container">
      
      <div class="mySlides fadein">
        <div class="numbertext">1 / 3</div>
        <img 
          src="//w3schools.com/howto/img_nature_wide.jpg" 
        >
        <div class="text">Caption Text</div>
      </div>

      <div class="mySlides fadein">
        <div class="numbertext">2 / 3</div>
        <img 
          src="//w3schools.com/howto/img_snow_wide.jpg" 
        >
        <div class="text">Caption Two</div>
      </div>

      <div class="mySlides fadein">
        <div class="numbertext">3 / 3</div>
        <img 
          src="//w3schools.com/howto/img_mountains_wide.jpg" 
        >
        <div class="text">Caption Three</div>
      </div>

      <a 
        class="prev" 
        @click="plusSlides(-1)">&#10094;</a>
      <a 
        class="next" 
        @click="plusSlides(1)">&#10095;</a>

    </div>
    <br>

    <div class="text-center">
      <span 
        class="dot" 
        @click="currentSlide(1)"/> 
      <span 
        class="dot" 
        @click="currentSlide(2)"/> 
      <span 
        class="dot" 
        @click="currentSlide(3)"/> 
    </div>

  </div>
</template>

<script>
export default {
	data () {
		return {
			aboutText: 'About Component sd',
			slideIndex: 1
		}
	},
	// created() {
	//   if (this.$route.push) {
	//     console.log(this.$route.push("/"));
	//   }
	// },
	mounted () {
		//const slideIndex = 1;
		this.showSlides(this.slideIndex);
		// console.log('this.$route.push("/")')
		// console.log(this.$route)
		//this.$router.push({ path: '/myorders' })
		// this.$router.push({ name: "Home" });
	},
	methods: {


		plusSlides: function (n) {
			this.showSlides(this.slideIndex += n);
		},

		currentSlide:function (n) {
			this.showSlides(this.slideIndex = n);
		},

		showSlides: function (n) {
			var i;
			var slides = document.getElementsByClassName("mySlides");
			var dots = document.getElementsByClassName("dot");
			if (n > slides.length) {this.slideIndex = 1}    
			if (n < 1) {this.slideIndex = slides.length}
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";  
			}
			for (i = 0; i < dots.length; i++) {
				dots[i].className = dots[i].className.replace(" active", "");
			}
			slides[this.slideIndex-1].style.display = "block";  
			dots[this.slideIndex-1].className += " active";
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'SlideShow.scss'
</style>