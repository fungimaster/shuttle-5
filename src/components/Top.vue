<template>
  <b-navbar toggleable="lg" fixed="top">
    <b-navbar-brand>
      <router-link class="" to="/"><svg style="width: 180px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 22.3" enable-background="new 0 0 122 22.3"><g><path d="M53.2
        2.6c-1.2.1-2 .1-2.5.7l-1.8 2.5h9.1l-1.1 1.6h-9.1s-1.6 2.2-1.8 2.6c-.4.7 0 1
        .6 1h11.8l-1.3 1.5h-10.9c-2.3 0-3.6-.4-3.9-1.3-.1-.3-.1-.7.1-1l4.7-7c.7-1.1
        2.1-1.8 3.7-2 .9-.1 1.8-.2 2.7-.2h11l-1.3 1.5h-10zM92.2 2.6c-1.2.1-2
        .1-2.5.7l-1.8 2.5h9.1l-1.1 1.6h-9.1s-1.6 2.2-1.8 2.6c-.4.7 0 1 .6
        1h11.8l-1.3 1.5h-10.9c-2.3 0-3.6-.4-3.9-1.3-.1-.3-.1-.7.1-1l4.7-7c.7-1.1
        2.1-1.8 3.7-2 .9-.1 1.8-.2 2.7-.2h11l-1.3 1.5h-10zM77.9 10.4c-.7 1.4-2.7
        2.1-5.9 2.1h-11.8l7.9-11.4h11.1c.8 0 1.4 0 2.1.2.8.2 1.9 1 1.3 2.1-.8 1-4.7
        7-4.7 7zm-.3-7.8h-7l-5.6 8.4h7.6c.8 0 1.4-.2 1.7-.6 0 0 4.3-6.4 4.7-7
        .4-.7-.8-.8-1.4-.8zM108.3 9.3l10.1-8.2h3.6l-14.1 11.3h-3.2l1.3-11.3h3.4l-1.1
        8.2zM52.2
        20.2h-.5c-.5.2-1.8.8-4.1.2-4-.9-5.6-3.1-7.5-7.9-.9-2.1-1.6-4.2-2.7-5.1h1.4c1.2
        0 2.2-.4 2.5-1.1.4-.7 1.7-2.9
        1.8-3.6.1-.7-.5-1.2-1.3-1.4-.6-.2-1.3-.2-2.1-.2h-11.2l-7.5
        11.4h3.8l3.2-5.1h4c.7 0 1.7.4 2.2 1 1.4 1.5 3.6 7.2 6.7 10.2 1.5 1.5 3.1 2.6
        4.8 3 1.5.4 3 .5 4.4.1 1.4-.3 2.2-.8 2.3-1.3 0 0
        0-.1-.2-.2zm-21.3-17.6h7.4c1.5 0 1.7.4 1.4.8-.3.5-1 1.5-1 1.5-.4.6-1
        .9-1.8.9h-7.9l1.9-3.2zM26.5.2h-3.1l-1.7 1c-.4-.1-.9-.1-1.5-.1 0 0-5-.1-6.3
        0-1.3.1-1.8.1-2.7.2-1.6.2-2.6.4-3.7 2-.8 1.2-4.7 7-4.7 7-.2.3-.2.6-.1 1
        .1.2.2.4.4.5l-2.9 1.6h3.1l1.8-1c.4 0 1 .1 1.5.1h6.4c3.2 0 4.9-.5 5.9-2.1 0 0
        4.4-6.8 4.5-7 .3-.6.2-1.1-.1-1.4l3.2-1.8zm-15.3 3.1c.4-.6 1.6-.7
        2.5-.7h5.5l-12.6 7.2c.9-1.3 4.6-6.5 4.6-6.5zm4.2
        7.1c-.3.4-.9.6-1.7.6h-6l11.9-6.8c-1.1 1.7-3.7 5.5-4.2 6.2z"></path></g>
      </svg>
    </router-link>
  </b-navbar-brand>

  <b-navbar-toggle target="nav-collapse"><i class="material-icons"></i></b-navbar-toggle>

  <b-collapse id="nav-collapse" is-nav class="text-center">
    <div class="d-lg-none mt-5 mb-2">
      <h1 class="theme">Psyched</h1>
      <p class="text-uppercase">6-8 Nov 2019 - Malmö, Sweden</p>
    </div>
    <b-navbar-nav class="ml-auto">
      <b-nav-item to="/tickets">Tickets</b-nav-item>
      <b-nav-item :to="{path: '/line-up', query: {tags:$route.query.tags, day:$route.query.day}}">Line-up</b-nav-item>
      <b-nav-item :to="{path: '/sessions', query: {tags:$route.query.tags, day:$route.query.day}}">Sessions</b-nav-item>
      <b-nav-item to="/info">Info</b-nav-item>
      <!--a class="nav-item nav-link text-dark show-search-button nav-link" href="#search" data-toggle="collapse" aria-expanded="false" aria-controls="search"><i class="material-icons mobile-search">search</i></a-->
      <b-nav-item to="/my-schedule"><i class="material-icons">calendar_today</i><span class="my-count text-center">{{ $store.state.count }}</span></b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
  export default {
    name: 'top',
    components: {
    },
    data () {
      return {}
    },
    methods: {
    },
    computed: {
      test() {
        return this.$store.dispatch('incrementAsync');
      }
    },
    updated: function() {
    },
    mounted:function(){

    },
    beforeMount: function() {
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .nav-item{
    font-size: 18px;
    line-height: 33px;
  }
  .material-icons{
    font-size: 35px;
  }
  .navbar-light .navbar-toggler .material-icons{
    font-size: 25px;
  }
  .navbar-light .navbar-toggler[aria-expanded="false"] .material-icons::after{
    content: "menu";
  }
  .navbar-light .navbar-toggler[aria-expanded="true"] .material-icons::after{
    content: "close";
  }
  .navbar-light .navbar-toggler {
    border: none !important;
    color: #000;
    font-size: 25px;
  }
  h1.theme {
    font-size: 1.7rem !important;
  }
  .navbar-collapse a.nav-link{
    @media (max-width: 991px) {
      margin: 0;
    }
  }
  .navbar-collapse.show{
      padding-bottom: 2rem;
  }

  .my-count {
    position: absolute;
    border: 1px solid $pink;
    border-radius: 50%;
    margin: -6px 0 0 0;
    right: 15px;
    width: 30px;
    height: 30px;
    line-height: 1.6rem;
    font-size: 1.1rem;
    font-weight: normal;
    background-color: $pink !important;
    color: #fff;
    @media (max-width: 992px) {
      margin-left: -15px;
      right: auto;
      left:auto;
    }
  }
</style>
