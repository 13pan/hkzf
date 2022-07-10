<template>
  <div class="main">
    <div>
      <div class="channel-container">
        <div class="title">
          <h3>户型</h3>
        </div>
        <van-row type="flex">
          <van-col
            span="12"
            v-for="(item, index) in roomty"
            :key="index"
            @click="getfenlist(item)"
            ><div class="inner">{{ item.label }}</div></van-col
          >
        </van-row>
      </div>
      <p></p>
      <div class="channel-container">
        <div class="title">
          <h3>朝阳</h3>
        </div>
        <van-row type="flex">
          <van-col
            span="12"
            v-for="(item, index) in orientedlis"
            :key="index"
            @click="getfenlist(item)"
            ><div class="inner">{{ item.label }}</div></van-col
          >
        </van-row>
      </div>
      <p></p>
      <div class="channel-container">
        <div class="title">
          <h3>楼层</h3>
        </div>
        <van-row type="flex">
          <van-col
            span="12"
            v-for="(item, index) in floorlis"
            :key="index"
            @click="getfenlist(item)"
            ><div class="inner">{{ item.label }}</div></van-col
          >
        </van-row>
      </div>
      <p></p>
      <div class="channel-container">
        <div class="title">
          <h3>房屋亮点</h3>
        </div>
        <van-row type="flex">
          <van-col
            span="12"
            v-for="(item, index) in characlis"
            :key="index"
            @click="getfenlist(item)"
            ><div class="inner">{{ item.label }}</div></van-col
          >
        </van-row>
      </div>
    </div>
    <div class="bot">
      <van-button type="default" class="btn">清除</van-button>
      <van-button type="primary" class="btu">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomty: {
      type: Array,
      required: true
    },
    characlis: {
      type: Array,
      required: true
    },
    orientedlis: {
      type: Array,
      required: true
    },
    floorlis: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
    getfenlist (sms) {
      console.log(sms.value)
      // const label = sms.labels
      // const value = sms.value
      // localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 28px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    break-inside: 6px;
    font-size: 28px;
    font-weight: 400;
    color: #888;
    text-align: center;
    line-height: 86px;
    background: #fff;
    border: 1px solid #ddd;
    // margin-left: 14px;
  }
}

.van-col {
  width: 70px;
  height: 32px;
  margin-bottom: 100px;
  margin-left: 100px;
  margin-right: 50px;
}
p {
  width: 420px;
  height: 2px;
  background-color: rgb(184, 179, 179);
  margin-left: 100px;
}
.main {
  padding-bottom: 50px;
}
.btu {
  width: 350px;
  height: 84px;
}
.btn {
  width: 250px;
  color: #07c160;
  height: 84px;
}
// .btn{
//    position: fixed;
//   bottom: 0;
//   height: 84px;

// }
</style>
