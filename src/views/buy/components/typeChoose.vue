<template>
  <div class="choose-main">
    <div class="choose-item" v-for="(item, index) in data.type" :key="item.index"
      :class="{active: boxIndex === index}" @click="boxChoose(index, item)">
      <span class="text-item">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    boxIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {

    }
  },
  methods: {
    boxChoose(index, item) {
      this.boxIndex = index
      this.$emit('boxChoose', item)
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

