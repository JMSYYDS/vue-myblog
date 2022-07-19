<template>
<div class="wai">
  <div class="detail">
    <h1>啥也没写------{{ id }}</h1>
  </div>
</div>
  
</template>

<script>

export default {
  props: ['id'],
  data() {
    return {
      
    }
  },
  created() {
    
  },
}
</script>

<style scoped>
    .wai{
      background-color: #EBEEF5;
    }
    .detail{
      margin: 15px;
      min-height: 300px;
      background-color: white;
    }
</style>