<template>
  <div>
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="$router.back()"
      fixed
      z-index="5"
    />
    <van-index-bar :index-list="cityIndex" :highlight-color="yans">
       <van-index-anchor>当前城市</van-index-anchor>
      <van-cell
        title="杭州"
        @click="changecity(item)"
      />
      <van-index-anchor>热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="(item, index) in hot"
        :key="index"
        @click="changecity(item)"
      />
      <van-index-anchor
        :index="index"
        v-for="(value, key, index) in cityPai"
        :key="index"
      >
        <span>{{ key }}</span>
        <van-cell
          :title="item.label"
          v-for="(item, index) in value"
          :key="index"
         @click="changecity(item)"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { gitHot, gitCity, gitCitySms } from '@/api/home'
// eslint-disable-next-line camelcase
const House_CITY = ['北京', '上海', '广州', '深圳']
// 当前城市
// import { getCurrentCity} from '@/utils/city'
export default {
  created () {
    this.gitHot(),
    this.gitCity()
  },
  data () {
    return {
      address: '',
      cityzu: [],
      cityList: '',
      yans: 'green',
      hot: '',
      cityFen: {},
      cityIndex: [],
      cityPai: {}
    }
  },
  methods: {
    async gitHot () {
      try {
        const res = await gitHot()
        console.log(res)
        this.hot = res.data.body
        console.log(this.groups)
      } catch (err) {
        console.log('热门城市数据加载失败', err)
      }
    },
    async gitCity () {
      try {
        const res = await gitCity()
        console.log(res)
        this.cityList = res.data.body
        console.log(this.cityList)
        this.formatCityData(this.cityList)
      } catch (err) {
        console.log('城市列表数据加载失败', err)
      }
    },
    // 处理列表数据
    async formatCityData (list) {
      await list.forEach(item => {
        // 获取城市简写的首字母
        const first = item.short.substr(0, 1).toUpperCase()
        if (this.cityFen[first]) {
          this.cityFen[first].push(item)
        } else {
          this.cityFen[first] = [item]
        }
      })
      console.log(this.cityFen)
      // 获取首字母索引
      this.cityzu = Object.values(this.cityFen).sort()
      this.cityIndex = Object.keys(this.cityFen).sort()
      // 对分组后的数据进行排序
      this.cityIndex.forEach(item => {
        this.cityPai[item] = this.cityFen[item]
      })
      console.log(this.cityIndex)
      // 添加热门城市数据
      this.cityFen['热'] = this.hot
      this.cityIndex.unshift('热')
      // 获取当前定位城市
      // const curCity = await getCurrentCity()
      // 添加当前年城市数
      // this.cityFen['#'] = [curCity]
      // this.cityIndex.unshift('#')
      console.log(this.cityFen, this.cityIndex, this.cityzu, this.cityPai)
    },
    // 点击跳转到该城市列表
    async getcity (sms) {
      try {
        console.log(sms)
        const res = await gitCitySms(sms)
        this.address = res.data.body.value
        console.log(this.address)
        console.log(res)
        this.$store.commit('gotoCity', this.address)
        // 点击的城市数据给search
        // bus.$emit('share', this.addres)
      } catch (err) {
        console.log(err)
      }
    },
    // 判断该城市是否有房源信息
    changecity ({ label, value }) {
      if (House_CITY.indexOf(label) > -1) {
        localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
        this.$router.go(-1)
      } else {
        this.$toast.fail('该城市暂无房源信息')
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
.van-index-anchor {
  color: red;
}
.van-nav-bar {
  background-color: rgb(140, 223, 140);
  color: #ffffff !important;
}
.van-index-bar {
  margin-top: 90px;
}
</style>
