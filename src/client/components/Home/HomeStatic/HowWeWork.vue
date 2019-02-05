<template>
  <div class="how-we-work-inner container">
    <h3>How we works ?</h3>
    <div class="row">
      <div class="col-sm-6">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/uRCZEK24kO8" 
          frameborder="0" 
          title="medlife-video" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
      </div>
      <div class="col-sm-6 text-left">
        <h4>How to order medicines on Medlife? It’s Simple.</h4>
        <ul class="list-unstyled  order-steps">
          <li>
            <span>1</span>
            Upload valid Prescription
          </li>
          <li>
            <span>2</span>
            Receive a confirmation call
          </li>
          <li>
            <span>3</span>
            Delivery at your door step
          </li>
        </ul>
        <h4>Don’t have prescription? Don’t worry!</h4>
        <p>Simply search & add the medicines OR get consultation
        from Medlife doctor</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.how-we-work{
  h3{ margin-bottom: 30px;}
  iframe {
    height:250px;
  }
  .order-steps {
    li {
      margin: 20px 0px;
      span {
        margin-left: 15px;
          border: 2px solid red;
          border-radius: 100%;
          padding: 5px 10px;
      }
    }
  }
  
}

</style>
