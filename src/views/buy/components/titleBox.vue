<template>
  <div class="type-main">
    <div class="type-title">
      收货地址
    </div>
    <slot></slot>
    <div class="type-bottom">
      测试说明文字
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .type-main{
    background: #fff;
    margin-bottom: 20px;
  }
  .type-title {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color:#333;
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 20px;
  }
  .type-bottom {
    color: #6d6d6d;
    font-size: 12px;
  }
</style>


