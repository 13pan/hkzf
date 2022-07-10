<template>
  <div>
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="房源信息" />
      <van-cell title="小区名称" is-link value="请输入小区名称" />
      <van-field v-model="datas.price" label="租金" placeholder="请输入租金/月"
        ><template #extra>
          <span>￥/月</span>
        </template></van-field
      >
      <van-field
        v-model="datas.size"
        label="建筑面积"
        placeholder="请输入建筑面积"
        ><template #extra>
          <span>㎡</span>
        </template></van-field
      >
    </van-cell-group>
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      label="户型"
      @click="showType = true"
      ><template #extra>
        <span>请选择<van-icon name="arrow" /></span> </template></van-field
    ><van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showType = false"
      />
    </van-popup>
    <van-field
      readonly
      clickable
      name="picker"
      :value="value1"
      label="所在楼层"
      @click="showHight = true"
      ><template #extra>
        <span>请选择<van-icon name="arrow" /></span> </template></van-field
    ><van-popup v-model="showHight" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns1"
        @confirm="onConfirm1"
        @cancel="showHight = false"
      />
    </van-popup>
    <van-field
      readonly
      clickable
      name="picker"
      :value="value2"
      label="朝向"
      @click="showFace = true"
    >
      <template #extra>
        <span>请选择<van-icon name="arrow" /></span> </template></van-field
    ><van-popup v-model="showFace" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @confirm="onConfirm2"
        @cancel="showFace = false"
      />
    </van-popup>
    <p class="homeimg">房屋标题</p>
    <van-field
      v-model="datas.title"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入标题(列如：整租 小区名 2室 5000元)"
    />
    <p class="homeimg">房屋图像</p>
    <van-field name="uploader">
      <template #input>
        <van-uploader v-model="uploader" multiple :after-read="afterRead" />
      </template>
    </van-field>
    <p class="homeimg">房屋配置</p>
    <van-checkbox-group v-model="result">
      <van-grid :column-num="5">
        <van-checkbox
          v-for="(item, index) in suplist"
          :key="index"
          :name="item"
        >
          <template #icon="props">
            <van-grid-item :class="{ isactive: props.checked }">
              <span class="txt"
                ><van-icon name="cashier-o" /><br />
                {{ item }}</span
              >
            </van-grid-item>
          </template>
        </van-checkbox>
      </van-grid>
    </van-checkbox-group>
    <p class="homeimg">房屋描述</p>
    <van-field
      v-model="datas.description"
      rows="5"
      autosize
      type="textarea"
      placeholder="请输入房屋描述信息"
      show-word-limit
    />
    <van-tabbar>
      <van-tabbar-item class="del">取消</van-tabbar-item>
      <van-tabbar-item class="sure" @click="puthomes">提交</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { sendhouse, getimgs, puthome } from '@/api/home'
export default {
  created () { this.sendhouse() },
  data () {
    return {
      result: [],
      suplist: [],
      uploader: [],
      value: '',
      value1: '',
      value2: '',
      columns: [],
      columns1: [],
      columns2: [],
      showType: false,
      showFace: false,
      showHight: false,
      datas: {
        roomType: null,
        floor: null,
        oriented: null,
        title: null,
        description: null,
        supporting: null,
        price: null,
        size: null,
        community: null,
        houseImg: null
      },
      imgs:[]
    }
  },
  methods: {
    onConfirm (value) {
      this.value = value
      this.showType = false
    },
    onConfirm1 (value) {
      this.value1 = value
      this.showHight = false
    },
    onConfirm2 (value) {
      this.value2 = value
      this.showFace = false
    },
    // 发布房屋条件
    async sendhouse () {
      try {
        const res = await sendhouse()
        console.log(res)
        const { floor, oriented, roomType, supporting } = res.data.body
        floor.forEach(item => {
          this.columns1.push(item.label)
        })
        oriented.forEach(item => {
          this.columns2.push(item.label)
        })
        roomType.forEach(item => {
          this.columns.push(item.label)
        })
        supporting.forEach(item => {
          this.suplist.push(item.label)
        })
      } catch (err) { console.log(err) }
    },
    // 图片处理
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      const formdata = new FormData()
      formdata.append('file', file.file)
      const { data } = await getimgs(formdata)
      console.log('上传图片')
      console.log(data.body)
      this.imgs.push(data.body)
    },
    // 发布房屋
    async puthomes () {
      this.$toast.loading('发布中...')
      try {
        this.datas.supporting = this.result.join('|')
        this.datas.houseImg = this.imgs.join('|')
        if (this.imgs.length <= 0) {
          return this.$toast('请上传图片')
        }
        const { data } = await puthome(this.datas)
        if (data.status !== 200) {
          this.$toast.fail('发布失败，重新登录试试')
        } else {
          this.$dialog
            .confirm({
              title: '提示',
              message: '发布房源成功',
              confirmButtonText: '继续发布',
              cancelButtonText: '去查看'
            })
        }
        console.log('新增房源')
        console.log(data)
      } catch (err) {
        console.log(err)
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
.homeimg {
  color: #333;
  font-size: 28px;
  padding-left: 25px;
}
.van-tabbar {
  margin-top: 60px;
}
.del {
  color: #21b97a;
  font-size: 30px;
}
.sure {
  color: #fff;
  background-color: #21b97a;
  font-size: 30px;
}
/deep/ .van-checkbox-group {
  padding: 10px 0;
}
/deep/ .van-checkbox {
  padding: 5px 10px;
}
/deep/ .van-checkbox__icon {
  height: unset;
}
.txt {
  margin-bottom: 6px;
  .van-icon {
    font-size: 36px;
  }
  text-align: center;
  font-size: 15px;
}
</style>
