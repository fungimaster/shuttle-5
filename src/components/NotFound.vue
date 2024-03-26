<template>
  <div>
    <vue-headful :title="doctitle" />
    <div class="container mt-5 mb-5">
      <h2>No such page, try something else?</h2>
      <p>
        Couldn't find the requested page, go to 
        <router-link to="/">startpage</router-link>?
      </p>
      <router-link to="/">
         <p class="text-center mt-2 mb-3"></p> 
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      doctitle: `Not Found (404) — ${this.$store.state.conferencename}`
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";
h1 {
  margin-bottom: 1rem;
}
.container {
  text-align: center;
}
img {
  margin-top: 1rem;
  max-width: 100%;
}
p {
  font-style: italic;
}
</style>
