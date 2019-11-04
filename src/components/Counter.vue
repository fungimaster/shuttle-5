C<template>
  <div class="counter">
      <div class="total" :style="overflow?{color:'red'}:'inherit'">{{total}}</div>
      <button @click="$emit('increment', target)">+</button>
      <button @click="$emit('decrement', target)">-</button>
      <button @click="$emit('reset', target)">C</button>
    </div>
</template>

<script>
export default {
  name: "Counter",
  props: ["total", "overflow", "target"]
};
</script>

<style>
  .counter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #9999;
    border-radius: 10px;
    padding: 10px;
  }
  .counter button {
    width: 40px;
    margin: 10px;
  }
  .total {
    margin: 10px;
    font-size: 80px;
  }
</style>
