<template>
  <div>
    <vue-headful :title="doctitle" />
    <div class="container">
      <h1>Page Not Found</h1>
      <p>
        Sorry, dear, this was not found.
        <br />Were you up north or down south bound?
        <br />Unless you feel like an aimless roam,
        <br />we recommend you come back
        <router-link to="/">home 🏠</router-link>
      </p>
      <router-link to="/">
        <img src="/static/empty.jpg" alt="Empty white space with a single human walking" />
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
