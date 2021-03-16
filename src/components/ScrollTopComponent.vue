<template>
  <a @click="scrollTop" v-show="visible" class="bottom-right">
    <slot></slot>
  </a>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    scrollTop: function () {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId)
        }
        window.scroll(0, window.pageYOffset - 50)
      }, 10)
    },
    scrollListener: function () {
    
      this.visible = window.scrollY > 600
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.bottom-right {
    position:fixed;
    bottom:20px;
    right:20px;
    cursor:pointer;
    z-index:1000;
}

.btn-up {
    border:0px solid;
    border-color: none;
}

.btn-circle.btn-sm {
    width:30px;
    height:30px;
    padding:6px 0px;
    border-radius:15px;
    font-size:8px;
    text-align:center;
}

.btn-circle.btn-md {
    width:50px;
    height:50px;
    padding:6px 10px;
    border-radius:25px;
    font-size:12px;
    text-align:center;
    background: $blue !important;
    -webkit-box-shadow: 0px 0px 9px -2px #000000; 
box-shadow: 0px 0px 9px -2px #000000;
border:none;
}

.btn-circle.btn-xl {
    width:70px;
    height:70px;
    padding:10px;
    border-radius:35px;
    font-size:12px;
    text-align:center;
}

</style>
