<template>
  <div id="app">
    <h1>个人财务管理应用</h1>
    <Home />
  </div>
</template>

<script setup>
import Home from './views/Home.vue';
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

</style>