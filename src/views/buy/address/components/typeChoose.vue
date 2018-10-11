<template>
  <div class="choose-main">
    <div class="choose-item" v-for="(item, index) in 6" :key="item.index"
      :class="{active: boxIndex === index}" @click="boxChoose(index)">
      <span class="text-item">在线支付</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxIndex: -1
    }
  },
  methods: {
    boxChoose(index) {
      this.boxIndex = index
    }
  }
}
</script>

<style scoped>
  .choose-item{
    box-sizing: content-box;
    width: 120px;
    max-height: 32px;
    padding: 20px 30px;
    font-size: 14px;
    border: 1px solid #dfdfdf;
    cursor: pointer;
    display: inline-block;
    margin: 0 20px 20px 0;
  }
  .choose-item .text-item {
    display: inline-block;
    width: 120px;
    max-height: 32px;
    overflow: hidden;
  }
  .choose-item.active {
    background: #ff4646;
    color:#fff;
  }
  .choose-item.active:hover {
    background: #ff4646;
    color:#fff;
  }
  .choose-item:hover {
    background: #f0f0f0;
  }
</style>

