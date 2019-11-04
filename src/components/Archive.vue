<template>
  <div class="archive">
  <vue-headful
  :title="doctitle"

  />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col>
          <h1>Archive</h1>
          <p>You can have a look at Øredev’s Conference previous years; from the fifth Øredev in 2009 up to the one last year. You can as well watch the videos from previous years.</p>
          <ul>
            <li><a href="https://oredev.org/2018">2018</a></li>
            <li><a href="https://oredev.org/2017">2017</a></li>
            <li><a href="https://oredev.org/2016">2016</a></li>
            <li><a href="https://oredev.org/2015">2015</a></li>
            <li><a href="https://oredev.org/2014">2014</a></li>
            <li><a href="https://oredev.org/2013">2013</a></li>
            <li><a href="https://oredev.org/2012">2012</a></li>
            <li><a href="https://oredev.org/2011">2011</a></li>
            <li><a href="https://oredev.org/2010">2010</a></li>
            <li><a href="https://oredev.org/2009">2009</a></li>
          </ul>
        </b-col>
        <b-col xl="1"></b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>

  export default {
    name: 'archive',
    data () {
      return {
      doctitle: 'Archive - ' + this.$store.state.conferencename

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
