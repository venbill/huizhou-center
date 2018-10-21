<template>
  <div class="type-main">
    <div class="type-title">
      {{title}}
    </div>
    <slot></slot>
    <div class="type-bottom">
      {{foot}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    foot: ''
  }
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


