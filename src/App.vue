
<template>
  <div id="app">
    <Top></Top>
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

  import Top from "./components/Top"
  import Footer from "./components/Footer"

  export default {
    name: 'app',
    components: {
      'Top':Top,
      'Footer':Footer
    },
    methods: {
    },
    computed: {
    },
  }

</script>

<style lang="scss">
  @import "./styles/variables.scss";

  body {
    font-size: 1.3rem !important;
  }

  .pink {
    color: $pink !important;
  }
  .green {
    color: $green !important;
  }
  .green-bg {
    background: $green !important;
  }
  .green-light-bg {
    background: $green-light !important;
  }
  .orange {
    color: $orange !important;
  }
  .orange-bg {
    background-color: $orange !important;
  }
  .red {
    color: $red !important;
  }
  .red-bg {
    background-color: $red !important;
  }
  .content {
    margin-top: 100px;
    @media (max-width: 767px) {
      margin-top: 80px;
    }
  }
  h1, h2, h3, h4, h5, .btn {
    text-transform: uppercase;
  }
  h1 {
    color: $pink;
    @media (max-width: 767px) {
      font-size: 1.6rem !important;
    }
    @media (max-width: 576px) {
      font-size: 1.4rem !important;
    }
  }
  h2 {
    @media screen and (max-width: 767px) {
      font-size: 1.4rem !important;
    }
    @media screen and (max-width: 576px) {
      font-size: 1.2rem !important;
    }
  }
  h3 {
    @media (max-width: 767px) {
      font-size: 1.2rem !important;
    }
    @media (max-width: 576px) {
      font-size: 1.1rem !important;
    }
  }
  h4 {
    @media (max-width: 767px) {
      font-size: 1.1rem !important;
    }
    @media (max-width: 576px) {
      font-size: 1rem !important;
    }
  }
  h5 {
    @media (max-width: 767px) {
      font-size: 1rem !important;
    }
    @media (max-width: 576px) {
      font-size: 0.9rem !important;
    }
  }
  p, a, li, span, .btn {
    @media (max-width: 767px) {
      font-size: 0.9rem !important;
    }
  }
  .hidden {
    display: none !important;
  }
  a, a:visited {
    color: $green !important;
    text-decoration: none !important;
  }
  a:hover {

  }
  a.text-white {
    color: #fff !important;
  }
  .btn {
    cursor: pointer;
  }
  .btn-lg {
    padding: 20px;
  }
  /*================ MENU ===============*/
  nav {
    background: #fff;
    opacity: 0.75;
    @media (max-width: 991px) {
      opacity: 1;
      border-bottom: 1px solid #ddd;
    }
  }
  a.nav-link {
    text-transform: uppercase;
    font-weight: bold;
    color: #000 !important;
    margin-left: 30px;
  }
  .navbar-brand.router-link-exact-active {
    fill: $pink;

  }
  a.router-link-exact-active {
    fill: $pink !important;
  }
  a.router-link-active {
    color: $pink !important;
  }
  /*================ MENU END ===============*/
  /*================ TAGS ===============*/
  .tags-container .select {
    text-transform: uppercase;
    color: $green;
    cursor: pointer;
  }

  .tags-container .tags {
    margin: 0 0 2rem 0;
  }
  .tags-container .tags .col-xs-6 {
    @media (max-width: 576px) {
      width: 50%;
    }
  }
  .tag {
    font-size: 1rem;
    margin: 2px -13px;
    border: 2px solid $grey-light;
    height: 3em;
    line-height: 3em;
    text-transform: uppercase;
    padding: 0 10px;
    cursor: pointer;
    @media (max-width: 992px) {
      font-size: 0.9rem;
    }
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }
  .tags-container .select-all {
    margin: 9rem 0 0 0;
    @media (max-width: 576px) {
      margin-top: 0;
    }
  }
  .tags-container .select-all span {
    text-transform: uppercase;
    margin: 0 10px;
  }
  .tag.active, .tag-choosen.active {
    border-color: $pink;
  }
  .tag-choosen.active.speaker {
    background-color: $pink;
    color: #fff;
  }
  .tag-choosen {
    white-space: nowrap;
    display: inline-block;
    border: 1px solid #000;
    height: 45px;
    padding: 10px 5px 10px 20px;
    text-transform: uppercase;
    width: auto;
    margin: 0 2px 2px 0;
    cursor: pointer;
    @media (max-width: 992px) {
      padding: 7px 10px 7px 10px;
      height: 40px;
    }
    @media (max-width: 576px) {
      padding: 4px 10px 4px 10px;
      height: 35px;
    }
  }
  .tag-choosen, .tags-add  {
    font-size: 1rem;
  }
  .tag-choosen span {
    margin: 0 10px 0 0;
    @media (max-width: 991px) {
      font-size: 0.9rem;
    }
    @media (max-width: 576px) {
      font-size: 0.8rem;
      margin: 0 4px 0 0;

    }
  }
  .tag-choosen i{
    font-size: 1rem;
    vertical-align: middle;
    @media (max-width: 991px) {
      font-size: 0.9rem;
    }
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }
  .tags-add i {
    vertical-align: middle;
  }
  .tags-add {
    display: inline-block;
    border: 1px solid $green;
    width: 45px;
    height: 45px;
    padding: 10px;
    background-color: $green;
    color: #fff;
    cursor: pointer;
    @media (max-width: 991px) {
      padding: 7px;
      height: 40px;
      width: 40px;
    }
    @media (max-width: 576px) {
      padding: 4px;
      height: 35px;
      width: 35px;
    }
  }
  .loading-tags {
    margin: 10rem 0 60rem 0;
  }
  .tags-container .confirm-tags {
    margin: 1rem 0 60rem 0;
  }
  .btn.btn-circle.disabled {
    background-color: $grey-light !important;
  }
  .btn.btn-circle {
    background-color: $green !important;
    width: 100px;
    height: 100px;
    text-align: center;
    padding: 20px 0;
    font-size: 40px;
    font-weight: bold;
    line-height: 1.428571429;
    border-radius: 50% ;
    cursor: pointer;
  }
  .btn-circle .material-icons{
    color: #fff;
    font-weight: bold;
    font-size: 50px;
  }
  /*=================== TAGS END ==================*/
  /*=================== SESSIONS ==================*/
  .session .add-schedule{
    cursor: pointer;
  }
  .session.active .add-schedule i, .session.active .time{
    color: $pink;
  }
  .session.active .add-schedule i.remove{
    display: inline-block;
  }
  .session.active .add-schedule i.add{
    display: none;
  }
  .session .add-schedule i.remove{
    display: none;
  }
  .session .add-schedule i.add{
    display: inline-block;
  }
  .days span {
    color: #000;
    cursor: pointer;
  }
  .days span.active {
    color: $pink !important;
  }

  .session {
    margin: 0 5px 3em 5px;
  }
  .sessions-container .sessions {
    margin-bottom: 8rem;
  }
  .session .add-schedule i{
    padding-top: 15px;
  }
  .session .time h2 {
    font-size: 3.7rem;
    @media (max-width: 1199px) {
      font-size: 2.9rem;
      padding-top: 10px;
    }
    @media (max-width: 991px) {
      font-size: 2rem;
      padding-top: 18px;
    }
    @media (max-width: 767px) {
      font-size: 2.4rem !important;
    }
  }
  .session .main {
    padding-top: 10px;
  }

  .session .fold-icons, .session .session-title {
    display: inline-block;
  }
  .session .fold-icons{
    float:left;
    display: inline-block;
    width: 3%;
    @media (max-width: 1199px) {
      width: 4%;
    }
    @media (max-width: 991px) {
      width: 5%;
    }
  }
  .session .session-title {
    width: 97%;
    display: inline-block;
    padding: 3px 0 0 10px;
    @media (max-width: 1199px) {
      width: 96%;
    }
    @media (max-width: 991px) {
      width: 95%;
    }
  }

  .session .session-info {
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px dotted #555;
    cursor: pointer;
  }
  .session .session-text {
    margin: 10px 0 0 15px;
    @media (max-width: 576px) {
      font-size: 1rem;
    }
  }
  .session .speaker, .session .room, .session .material-icons {
    cursor: pointer;
    color: #888;
  }
  .session .speaker, .session .room {
    font-size: 13px;
  }
  .sessions-container .days {
    margin: 1em 0 3em 0 !important;
    @media (max-width: 576px) {
      margin-bottom: 0 !important;
    }
  }
  .sessions-container .days ul{

    padding: 0;
    list-style-type: none;
  }

  .sessions-container ul.conference, .sessions-container ul.workshop {
    list-style: none;
    display: inline-block;
  }
  .sessions-container .conference li, .sessions-container .workshop li{
    float: left;
    margin-right: 1em;
    text-transform: uppercase;
  }
  .sessions-container .days li{
    @media (max-width: 991px) {
      font-size: 1.2rem;
    }
    @media (max-width: 767px) {
      font-size: 1rem;
    }
    @media (max-width: 576px) {
      font-size: 0.7rem;
      margin-right: 0.1rem;
    }
  }
  .sessions-container .days li span{
    @media (max-width: 991px) {
      font-size: 1.5rem;
    }
    @media (max-width: 767px) {
      font-size: 1.2rem;
    }
    @media (max-width: 576px) {
      font-size: 0.9rem;
      margin-right: 0.5rem;
    }
  }
  .sessions-container .conference li.session-type, .sessions-container .workshop li.session-type {
    clear: both;
    color: #888;
    border-top: 1px dotted #888;
    width: 100%
  }
  /*=================== SESSIONS END==================*/
  /*=================== LINE-UP ==================*/
  .lineup .speaker-card{
    margin-bottom: 40px;
  }
  .lineup .speaker-card .speaker-company{
    font-size: 11px;
    color: #000;
  }
  .lineup .speaker-card .speaker-name {
    margin: 10px 0 0 0;
    text-transform: uppercase;
  }
  .speaker-single {
    margin-bottom: 150px;
  }
  .speaker-single h4 {
    margin-top: 20px;
  }
  /*=================== LINE-UP END==================*/
</style>
