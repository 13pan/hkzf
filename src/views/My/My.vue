<template>
  <div>
    <!-- 已登录 -->
    <div class="Login" v-if="user && user.token">
      <div class="header1">
        <div class="mast1">
          <div class="head1"></div>
          <div class="contain1">
            <p>好客_326436</p>
            <van-button type="primary" size="small" @click="logout"  v-if="user && user.token">退出</van-button>
            <h6>编辑个人资料</h6>
          </div>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="noLogin" v-else>
      <div class="header">
        <div class="mast">
          <div class="head"></div>
          <div class="contain">
            <p>游客</p>
            <van-button type="primary" size="small" to="/login"
              >去登录</van-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 列表选项 -->
    <div class="list">
      <van-grid :column-num="3" :border="false" :icon-size="23">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
        <van-grid-item icon="underway-o" text="看房记录" />
        <van-grid-item icon="idcard" text="成为房主" />
        <van-grid-item icon="user-o" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </div>
    <!-- 加入好客 -->
    <div class="pic">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { userfor } from '@/api/user'
import { mapState } from 'vuex'
export default {
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await userfor()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: { ...mapState(['user']) },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.noLogin {
  height: 600px;
  .header {
    width: 100%;
    height: 382px;
    background: url("http://liufusong.top:8080/img/profile/bg.png") no-repeat;
    background-size: cover;
    position: relative;
    .mast {
      width: 636px;
      height: 330px;
      background-color: #fff;
      position: absolute;
      top: 265px;
      left: 55px;
      position: relative;
      box-shadow: 0 0 10px 3px #ddd;
      .head {
        width: 140px;
        height: 140px;
        background: url("http://liufusong.top:8080/img/profile/avatar.png")
          no-repeat;
        background-size: contain;
        position: absolute;
        top: -70px;
        left: 242px;
        border: 15px solid #f5f5f5;
        border-radius: 100px;
        box-shadow: 0 2px 2px #bdbdbd;
      }
      .contain {
        position: absolute;
        top: 120px;
        left: 272px;
        text-align: center;
        p {
          font-size: 13px;
          color: #333;
        }
        h6 {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
.Login {
  height: 750px;
  .header1 {
    width: 750px;
    height: 750px;
    background: url("http://liufusong.top:8080/img/avatar.png") no-repeat;
    background-size: cover;
    .mast1 {
      width: 636px;
      height: 400px;
      background-color: #fff;
      position: absolute;
      top: 375px;
      left: 55px;
      position: relative;
      box-shadow: 0 0 10px 3px #ddd;
      .head1 {
        width: 140px;
        height: 140px;
        background: url("http://liufusong.top:8080/img/profile/avatar.png")
          no-repeat;
        background-size: contain;
        position: absolute;
        top: -70px;
        left: 242px;
        border: 15px solid #f5f5f5;
        border-radius: 100px;
        box-shadow: 0 2px 2px #bdbdbd;
      }
      .contain1 {
        position: absolute;
        top: 120px;
        left: 242px;
        text-align: center;
        p {
          font-size: 13px;
          color: #333;
        }
        h6{
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
.list {
  margin-top: 30px;
  .van-grid-item {
    font-size: 13px;
    color: #333;
  }
}
.pic {
  width: 690px;
  height: 168px;
  margin-left: 27px;
  margin-top: 20px;
  img {
    width: 100%;
  }
}
</style>
