<template>
  <div class="ping">
    <vue-headful
    :title="doctitle"

    />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col class="col-12 mt-5 mb-3">
          <h1>Pikeér från PING</h1>
          <p class="mt-3">Tack vare vår sponsor PING förses alla deltagare med en piké när man anmält sitt lag! <strong>Värde 599: per styck.-</strong>
          </p>
          <p>
          Du väljer pikeér till ditt lag efter  <a href="/#register">registreringen</a>.
          </p>
        </b-col>

          <b-col class="col-12 mt-3 mb-5 text-center">
          <h3>HERR</h3>          
        </b-col>
           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/1.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/2.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/3.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/4.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/5.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/6.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/7.png"></b-img>             
           </b-col>        

          <b-col class="col-12 mt-5 mb-5 text-center">
          <h3>DAM</h3>          
        </b-col>
         <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/8.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/9.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/10.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/11.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/12.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/13.png"></b-img>             
           </b-col>        

           <b-col class="col-6 col-md-4">            
              <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/14.png"></b-img>             
           </b-col>   
      </b-row>
               
      
       <b-col xl="1"></b-col>
       </b-row>
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'ping',
    data () {
      return {
        doctitle: 'Pikeér från PING',
       shirts: [
      { name: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,c_scale/v1575307928/matchplay/ping/1.png' }     
    ]
      }
    },
      mounted: function () {
        //console.log("ROUTE", this.$route.query.resetpw)

        this.$store.dispatch('updateUserInfo');
  },
    methods: {
      
    }      
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width:100%;
}
</style>
