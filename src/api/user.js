import request from '@/utils/request'
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    // eslint-disable-next-line no-template-curly-in-string
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
// 获取用户信息
export const userfor = () => {
  return request({
    // eslint-disable-next-line no-template-curly-in-string
    url: '/user'
  })
}
