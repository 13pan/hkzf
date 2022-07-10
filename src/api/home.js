import request from '@/utils/request'
export const gitImg = (body) => {
  return request({
    url: '/home/swiper'
  })
}
// 咨询小组
export const gitGroup = (body) => {
  return request({
    url: '/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
  })
}
// 热门
export const gitHot = (body) => {
  return request({
    url: '/area/hot'
  })
}
// 城市列表
export const gitCity = (body) => {
  return request({
    url: '/area/city?level=1'
  })
}
// 住房列表
export const gitHouse = (address) => {
  return request({
    url: `/houses?area=${address}`
  })
}
// 根据城市名获取城市信息
export const gitCitySms = (sms) => {
  return request({
    url: `/area/info?name=${sms}`
  })
}
// 房屋具体信息
export const detailHouse = (sms) => {
  return request({
    url: `/houses/${sms}`
  })
}
// 收藏
export const addCol = (houseCode) => {
  return request({
    method:'POST',
    url: `/user/favorites/${houseCode}`
  })
}
// 获取房屋查询条件
export const housecost = (houseCode) => {
  return request({
    url: `/houses/condition?id=${houseCode}`
  })
}
// 获取房屋发布条件
export const sendhouse = () => {
  return request({
    url: '/houses/params'
  })
}
// 上传图像
export const getimgs = (data) => {
  return request({
    method:'POST',
    url: '/houses/image',
    data
  })
}
// 发布房源
export const puthome = (data) => {
  return request({
    method:'POST',
    url: '/user/houses',
    data
  })
}
