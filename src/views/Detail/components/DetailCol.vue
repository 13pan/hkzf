<template>
  <van-tabbar-item @click="changeCol">
    <template
      ><i><van-icon name="star-o" /></i> </template
    >收藏</van-tabbar-item
  >
</template>

<script>
import { changeCol } from '@/api/home'
export default {
  props: {
    houseCode: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
    async changeCol (houseCode) {
      try {
        const res = await changeCol(houseCode)
        console.log(res)
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
</style>
