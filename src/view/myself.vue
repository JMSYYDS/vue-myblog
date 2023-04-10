<template>
  <div class="box1">
    <div class="box_in">1</div>
    <div class="box_in">2</div>
    <div class="box_in">3</div>
    <div class="box_in">4</div>
  </div>
</template>

<script>
import 'animate.css'

export default {

}
</script>

<style scoped>
  .box1 {
      width: 100%;
      height: 100%;
      position: absolute;
      background-image: url('../assets/9.jpg');
      background-size: 100% 100%;
      display: flex;
      justify-content: space-around;
  }
  .box1 div{
      width: 350px;
      height: 500px;
      background-color: rgb(231, 108, 231);
      margin-top: 60px;
      overflow: hidden;
  }


  .box_in{
    animation: box 2s;
    margin  : 5px;
  }
  @keyframes box{
    from{
      width: 0;
      height: 0;
    }
    to{
      width: 350px;
      height: 500px;
    }
  }
</style>