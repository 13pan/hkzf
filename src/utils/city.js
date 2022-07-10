import axios from 'axios'

// 当前城市函数
export const getCurrentCity = () => {
  // 判断本地存储中是否有定位城市
  const localCity = JSON.parse(localStorage.girItem('hkzf_city'))
  if (!localCity) {
    //  异步封装
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line new-cap
      const curCity = new window.ImageBitmap.localCity()
      curCity.get(async res => {
        try {
          const result = await axios.get(
            'http://'
          )
          localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
          //  成功返回resolve
          resolve(result.data.body)
        } catch (e) {
          // 失败返回reject
          reject(e)
        }
      })
    })
  }
  return Promise.resolve(localCity)
}
