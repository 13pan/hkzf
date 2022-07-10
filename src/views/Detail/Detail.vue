<template>
  <div>
    <van-nav-bar
      :title="this.housmsg.community"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="main">
      <div class="lunbo">
        <van-swipe class="my-swipe" :autoplay="3000" :loop="false" height="212">
          <van-swipe-item
            v-for="(image, index) in housmsg.houseImg"
            :key="index"
          >
            <img
              class="imgtop"
              v-lazy="'http://liufusong.top:8080' + image"
              onerror="image"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- <div><img src="'http://liufusong.top:8080' + housmsg.houseImg" alt="" /></div> -->
      <van-cell-group>
        <van-cell :title="this.housmsg.title" :label="this.housmsg.tags" />
      </van-cell-group>
      <div>
        <van-grid :column-num="3">
          <van-grid-item
            ><h4>{{ housmsg.price }}<span>/月</span></h4>
            <p>租金</p></van-grid-item
          >
          <van-grid-item
            ><h4>{{ housmsg.roomType }}</h4>
            <p>房型</p></van-grid-item
          >
          <van-grid-item
            ><h4>{{ housmsg.size }}<span>平米</span></h4>
            <p>面积</p></van-grid-item
          >
        </van-grid>
        <van-grid :column-num="2" class="detal">
          <van-grid-item
            ><p>装修：<span>精装</span></p>
            <p>
              楼层:<span>{{ housmsg.floor }}</span>
            </p></van-grid-item
          >
          <van-grid-item
            ><p>
              朝向：<span>{{ housmsg.oriented&&housmsg.oriented[0] }}</span>
            </p>
            <p>类型:<span>普通住宅</span></p></van-grid-item
          >
        </van-grid>
      </div>
      <!-- 地图 -->
      <div class="mappic"><div id="container"></div></div>
      <div>
        <van-cell-group>
          <van-cell title="房屋配套" />
        </van-cell-group>
        <van-grid :column-num="5">
          <van-grid-item
            icon="cashier-o"
            :text="item"
            v-for="(item, index) in housmsg.supporting"
            :key="index"
          />
        </van-grid>
        <div>
          <h6>房源概况</h6>
          <hr />
          <van-cell title="王女士" icon="shop-o" label="已认证房主">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #icon>
              <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
            </template>
            <template #right-icon>
              <van-button plain type="primary" size="small">发消息</van-button>
            </template>
          </van-cell>
          <div class="contain">
            {{ housmsg.description }}
            1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
            2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
            3.人车分流，环境优美。
            4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
          </div>
        </div>
        <h6>猜你喜欢</h6>
        <!-- <van-cell-group>
          <van-cell
            title="路由跳转"
            to="/detail"
            size="large"
            v-for="(item, index) in housList"
            :key="index"
            @click="detilHouse(item)"
          >
            <template #title>
              <div class="list">
                <van-image
                  width="100"
                  height="100"
                  src="'http://liufusong.top:8080' + item.houseImg"
                />
                <div class="jies">
                  <div>{{ item.title }}</div>
                  <div>{{ item.desc }}</div>
                  <div>近地铁</div>
                  <div>{{ item.price }}<span>元/月</span></div>
                </div>
              </div>
            </template>
          </van-cell>
        </van-cell-group> -->
      </div>
    </div>
    <van-tabbar>
      <!-- <van-tabbar-item to="/home">
        <template #icon><i icon="star-o"></i> </template>收藏</van-tabbar-item
      > -->
      <DetailCol :houseCode="housmsg.houseCode"></DetailCol>
      <van-tabbar-item to="/home">在线咨询</van-tabbar-item>
      <van-tabbar-item class="ipon" to="/home">电话预约</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import DetailCol from '@/views/Detail/components/DetailCol.vue'
import { detailHouse } from '@/api/home'
export default {
  created () { this.detailHouse() },
  data () {
    return {
      housmsg: ''
    }
  },
  methods: {
    // 房屋信息
    async detailHouse () {
      try {
        const users = JSON.parse(localStorage.getItem('hkzf_zfxx'))
        console.log(users.houseCode)
        const res = await detailHouse(users.houseCode)
        console.log(res)
        this.housmsg = res.data.body
        console.log(this.housmsg)
        this.map()
      } catch (err) { console.log(err) }
    },
    // 地图
    map () {
      const { BMapGL } = window
      const map = new BMapGL.Map('container')
      const point = new BMapGL.Point(this.housmsg.coord.longitude, this.housmsg.coord.latitude)
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
      const content = this.housmsg.community
      const label = new BMapGL.Label(content, { // 创建文本标注
        position: point,
        offset: new BMapGL.Size(10, 20)
      })
      map.addOverlay(label)
      label.setStyle({ // 设置label的样式
       color: '#fff',
        fontSize: '14px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'pink',
        textAlign: 'center',
        lineHeight: '40px'
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { DetailCol }
}
</script>

<style scoped lang='less'>
.van-tabbar-item {
  font-size: 34px;
  color: #999;
}
.ipon {
  background-color: #21b97a;
  color: #fff;
}
h4 {
  margin-top: 0px;
  color: #fa5741;
  font-size: 36px;
}
p {
  margin-top: 0px;
  font-size: 28px;
  margin-bottom: 0px;
  color: #999;
}
.detal {
  p {
    margin-top: 10px;
    font-size: 28px;
    color: #999;
  }
  span {
    color: #333;
  }
}
.main {
  padding-bottom: 100px;
}
.imgtop {
  width: 100%;
  height: 100%;
}
img {
  width: 104px;
  height: 104px;
}
.contain {
  line-height: 1.6;
  padding: 0 10px;
  color: #333;
  font-size: 28px;
}
.mappic {
  width: 100%;
  height: 300px;
  margin: 0px;
  padding: 0px;
  #container {
    width: 100%;
    height: 100%;
  }
}
</style>
