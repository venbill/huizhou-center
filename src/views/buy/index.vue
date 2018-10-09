<template>
    <div class="buy-content">
        <buy-header></buy-header>
        <buy-search></buy-search>
        <buy-banner></buy-banner>
        <buy-list></buy-list>
    </div>
</template>

<script>
import BuyHeader from './components/header'
import BuySearch from './components/search'
import BuyBanner from './components/buyBanner'
import BuyList from './components/buyList'
export default {
  components: {
    BuyHeader, BuySearch, BuyBanner, BuyList
  },
  data() {
    return {
      content: '',

      hotSearchs: [
        '新款连衣裙',
        '四件套',
        '男士外套',
        '墙纸',
        '行车记录仪',
        '新款男鞋',
        '耳机'
      ],
      types: [
        { id: 1, type: '女装' },
        { id: 2, type: '男装' },
        { id: 3, type: '内衣' },
        { id: 4, type: '鞋子' },
        { id: 5, type: '箱包' },
        { id: 6, type: '配件' },
        { id: 7, type: '童装玩具' },
        { id: 8, type: '孕产' },
        { id: 9, type: '用品' },
        { id: 10, type: '家电' },
        { id: 11, type: '数码' },
        { id: 12, type: '手机' },
        { id: 13, type: '美妆' },
        { id: 14, type: '洗护' },
        { id: 15, type: '保健品' },
        { id: 16, type: '珠宝' },
        { id: 17, type: '眼镜' },
        { id: 18, type: '手表' },
        { id: 20, type: '运动' },
        { id: 21, type: '户外' },
        { id: 22, type: '乐器' },
        { id: 23, type: '游戏' },
        { id: 24, type: '动漫' },
        { id: 25, type: '影视' },
        { id: 26, type: '美食' },
        { id: 27, type: '生鲜' },
        { id: 28, type: '零食' },
        { id: 29, type: '鲜花' },
        { id: 30, type: '宠物' }
      ]
    }
  },
  methods: {},

  mounted() {}
}
</script>

<style scoped>
    .buy-content{
        height:100%;
        padding:0;
        color: #666;
    }
</style>

