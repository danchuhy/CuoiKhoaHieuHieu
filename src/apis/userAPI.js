import { GROUP_CODE } from '../constants'
import fetcher from './fetcher'

export const getListUser = async () => {
  try {
    const response = await fetcher.get(
      '/users',
      {
        // params: {
        //   maNhom: GROUP_CODE,
        // },
      }
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
export const signupAPI = async (payload) => {
  try {
    // console.log(payload)
    // payload: {taiKhoan: "", ...}
    const response = await fetcher.post('/auth/signup', payload)
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const signinAPI = async (payload) => {
  try {
    const response = await fetcher.post('/auth/signin', payload)
    // console.log('response: ', response)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const addUserApi = async (user) => {
  try {
    const response = await fetcher.post('/QuanLyNguoiDung/ThemNguoiDung', user)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
export const editUserApi = async (user) => {
  try {
    const response = await fetcher.post(
      '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
      user
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
export const infoUserAPI = async (userId) => {
  try {
    const response = await fetcher.post(
      '/QuanLyNguoiDung/LayThongTinNguoiDung',
      null,
      {
        params: {
          taiKhoan: userId,
        },
      }
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
