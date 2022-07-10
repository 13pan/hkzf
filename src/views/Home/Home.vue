<template>
  <div class="header">
    <div class="search">
      <!-- 搜索 -->
      <form action="/" class="form">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入小区或地址"
        >
          <template #label >
            <form action="" @click="$router.push('/city')">
              <select name="" id="" aria-placeholder="北京">
                <option value="">北京</option>
                </select
              ><span>|</span>
            </form>
          </template>
          <template #action><van-icon name="location-o" color="#fff" size="25" @click="$router.push('/map')"/></template>
        </van-search>
      </form>
    </div>
    <!-- 轮播图 -->
    <div class="lunbo">
      <van-swipe class="my-swipe" :autoplay="3000" :loop="false" height="212">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img
            v-lazy="'http://liufusong.top:8080' + image.imgSrc"
            onerror="image.imgSrc"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 小图标链接 -->
    <div class="xiaotb">
      <van-grid clickable :column-num="4" :border="false">
  <van-grid-item default to="/search"><div> <p><van-icon name="wap-home-o" color="green" size="35" /></p>
          <h3>整租</h3></div></van-grid-item>
  <van-grid-item default to="/search"> <div><p><van-icon name="friends-o" color="green" size="35" /></p>
          <h3>合租</h3></div></van-grid-item>
  <van-grid-item default to="/map"> <div><p><van-icon name="location-o" color="green" size="35" /></p>
          <h3>地图找房</h3></div></van-grid-item>
  <van-grid-item default to="/lease"> <div><p><van-icon name="shop-o" color="green" size="35" /></p>
          <h3>去出租</h3></div></van-grid-item>
</van-grid>
      <!-- <ul>
        <li>
          <p><van-icon name="wap-home-o" color="green" size="35" /></p>
          <h3>整租</h3>
        </li>
        <li>
          <p><van-icon name="friends-o" color="green" size="35" /></p>
          <h3>合租</h3>
        </li>
        <li>
          <p><van-icon name="location-o" color="green" size="35" /></p>
          <h3>地图找房</h3>
        </li>
        <li>
          <p><van-icon name="shop-o" color="green" size="35" /></p>
          <h3>去出租</h3>
        </li>
      </ul> -->
    </div>
    <!-- 租房小组 -->
    <div class="rentteam">
      <div class="team">
        <h3>租房小组</h3>
        <a href="">更多</a>
      </div>
      <div class="rentab">
        <van-row type="flex" justify="space-between" gutter="10">
          <van-col span="12" v-for="(item, index) in groups" :key="index" class="tab"
            ><div><van-image
              width="50"
              height="50"
              lazy-load
              src="'http://liufusong.top:8080' + groups.imgSrc"
            /></div><div class="txt"><p>{{item.title}}</p><p>{{item.desc}}</p></div></van-col
          >
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import { gitImg, gitGroup } from '@/api/home'
Vue.use(Vant)
Vue.use(Lazyload)
export default {
  created () {
    this.goImg(),
    this.goGroup()
  },
  data () {
    return {
      images: '',
      value: '',
      groups: ''
    }
  },
  methods: {
    // 图片加载
    async goImg () {
      try {
        const res = await gitImg()
        console.log(res)
        this.images = res.data.body
        console.log(this.images)
      } catch (err) {
        console.log('图片加载失败', err)
      }
    },
    // 租房小组加载
    async goGroup () {
      try {
        const res = await gitGroup()
        console.log(res)
        this.groups = res.data.body
        console.log(this.groups)
      } catch (err) {
        console.log('图片加载失败', err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  // line-height: 150px;
  text-align: center;
}
img {
  width: 100%;
}
.header {
  // background-color: #f6f5f6;
  position: relative;
  .search {
    position: absolute;
    top: 30px;
    z-index: 1;
    margin-left: 60px;
  }
}
select {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #333;
}
.van-search {
  background-color: rgba(0, 0, 0, 0);
}
span {
  color: #d1d1d483;
}
.van-search__content {
  background-color: #fff;
}
.xiaotb {
  margin-bottom: 40px;
  background-color: #fff;
  height: 121px;
     div{
      text-align: center;
       h3 {
        font-size: 14px;
        color: #333;
        font-weight: 400;
      }
      p {
        width: 100px;
        height: 100px;
        border: 1px solid;
        border-radius: 50%;
        text-align: center;
        line-height: 100px;
        background-color: #f2fbf7;
        border-color: rgba(0, 0, 0, 0);
      }
     }
    }
.team {
  height: 50px;
  text-align: center;
  margin-top: 191px;
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: 15px;
  }
  a {
    font-size: 14px;
    color: #787d82;
  }
}
.rentab {
 .tab{
  // width: 172px;
  // height: 60px;
  background-color: #fff;
  display: flex;
  .txt{
    margin-left: 40px;
     p {
    font-size: 14px;
    color: #333;
  }
  }
 }
}
.rentteam{
  margin-top: 40px;
  background-color: #f6f5f6;
}
.van-grid-item__content{
  height: 121px;
}
</style>
