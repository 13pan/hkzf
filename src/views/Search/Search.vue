<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      shape="round"
      show-action
      background="#4fc08d"
      placeholder="请输入小区或地址"
    >
      <template #label>
        <form action="" @click="$router.push('/city')">
          <select name="" id="" aria-placeholder="北京">
            <option value="">{{ user.label }}</option></select
          ><span>|</span>
        </form>
      </template>
      <template #left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
      <template #action>
        <van-icon
          name="location-o"
          color="#fff"
          size="30"
          @click="$router.push('/map')"
        />
      </template>
    </van-search>
    <!-- 下拉框 -->
    <div class="xiala">
      <van-dropdown-menu>
        <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
        <van-dropdown-item title="区域" ref="item">
          <template>
            <van-picker title="标题" show-toolbar :columns="columns" />
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="item">
          <template>
            <van-picker title="标题" show-toolbar :columns="columns1" />
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="item">
          <template>
            <van-picker title="标题" show-toolbar :columns="columns2" />
          </template>
        </van-dropdown-item>
        <van-dropdown-item
          title="筛选"
          ref="item"
          @open="isChannelPanelShow = true"
        >
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 展示列表 -->
    <van-cell-group>
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
    </van-cell-group>
    <van-popup
      v-model="isChannelPanelShow"
      position="right"
      :style="{ height: '100%', width: '80%', paddingTop: '1rem' }"
      close-icon-position="top-left"
    >
      <div class="tan">
        <ChannelPannel
          :roomty="roomty"
          :characlis="characlis"
          :orientedlis="orientedlis"
          :floorlis="floorlis"
        ></ChannelPannel></div
    ></van-popup>
  </div>
</template>
<script>
import ChannelPannel from '@/components/ChannelPannel.vue'
import { gitHouse, housecost } from '@/api/home'
export default {
  created () {
    this.gitHouse(),
      this.housecost(),
      this.dellidt()
    // bus.$on('share', val => {
    //   this.address = val
    //   console.log(this.address)
    // })
  },
  data () {
    return {
      floorlis: [],
      orientedlis: [],
      characlis: [],
      roomty: [],
      showPicker: false,
      lab: '',
      lablis: {},
      user: JSON.parse(localStorage.getItem('hkzf_city')),
      // address: '',
      housList: '',
      isChannelPanelShow: false,
      show: true,
      value: '',
      columns: [
        {
          text: '区域',
          children: [
            {
              text: '',
              children: []
            }
          ]
        },
        {
          text: '地铁',
          children: [
            {
              text: '',
              children: []
            }
          ]
        }
      ],
      columns1: [],
      columns2: []

    }
  },
  methods: {
    onClickLeft () {
    },
    onConfirm () {
      this.$refs.item.toggle()
    },
    showPopup () {
      this.show = true
    },
    async gitHouse () {
      try {
        const users = JSON.parse(localStorage.getItem('hkzf_city'))
        // console.log(users.value)
        const res = await gitHouse(users.value)
        // console.log(res)
        this.housList = res.data.body.list
        // console.log(this.housList)
      } catch (err) { console.log(err) }
    },
    detilHouse ({ houseCode }) {
      console.log({ houseCode })
      localStorage.setItem('hkzf_zfxx', JSON.stringify({ houseCode }))
    },
    // 获取房屋查询条件
    async housecost () {
      try {
        const users = JSON.parse(localStorage.getItem('hkzf_city'))
        // console.log(users.value)
        const res = await housecost(users.value)
        this.lab = res.data.body
        console.log(this.lab)
        const { area, subway, rentType, price, roomType, characteristic, oriented, floor } = this.lab
        // 地域二级
        area.children.forEach((item, index) => {
          this.columns[0].children.push({ text: item.label, children: [] })
          console.log(this.columns[0].children)
          // 三级
          if (item.children === undefined) {
            this.columns[0].children[index].children.push({ text: '' })
          } else {
            item.children.forEach((item1) => {
              this.columns[0].children[index].children.push({ text: item1.label })
            })
          }
        })
        // 地铁
        subway.children.forEach((item, index) => {
          this.columns[1].children.push({ text: item.label, children: [] })
          if (item.children === undefined) {
            this.columns[1].children[index].children.push({ text: '' })
          } else {
            item.children.forEach((item1) => {
              this.columns[1].children[index].children.push({ text: item1.label })
            })
          }
        })
        //  this.lab.forEach((item, index) => {
        //  this.lablis[index] = item.label
        //  })
        //     console.log(this.lablis)
        // console.log(res)
        rentType.forEach(item => {
          this.columns1.push(item.label)
        })
        price.forEach(item => {
          this.columns2.push(item.label)
        })
        this.roomty = roomType
        this.characlis = characteristic
        this.orientedlis = oriented
        this.floorlis = floor
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ChannelPannel
  }
}
</script>

<style scoped lang='less'>
select {
  border: none;
}
// .van-cell{
//   display: none;
// }
.list {
  display: flex;
  .jies {
    padding-left: 20px;
    div {
      &:nth-child(1) {
        font-size: 30px;
        color: #394043;
        font-weight: 700;
      }
      &:nth-child(2) {
        margin-top: 0;
        font-size: 24px;
        color: #afb2b3;
      }
      &:nth-child(3) {
        color: #39becd;
        background: #e1f5f8;
        font-size: 24px;
        border-radius: 3px;
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
        width: 92px;
        height: 20px;
      }
      &:nth-child(4) {
        font-size: 34px;
        color: #fa5741;
        font-weight: 700;
        margin-top: 10px;
      }
    }
  }
}
.van-search {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
.xiala {
  margin-top: 100px;
}
</style>
