import { GROUP_CODE } from '../constants'
import fetcher from './fetcher'

export const getBannersAPI = async () => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayDanhSachBanner')
    // console.log('response', response)
    return response.data.content // []
  } catch (error) {}
}

export const getListRoomAPI = async () => {
  try {
    const response = await fetcher.get('/phong-thue', {
      // params: {
      //   maNhom: GROUP_CODE,
      // },
    })
    // console.log('response', response.data.content)
    return response.data.content
  } catch (error) {}
}

export const getRoomDetailsAPI = async (roomID) => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayThongTinPhim', {
      params: {
        MaPhim: roomID,
      },
    })
    // console.log('response', response)
    return response.data.content
  } catch (error) {}
}

// ADD room api
export const addRoomAPI = async (payload) => {
  try {
    const response = await fetcher.post(
      '/QuanLyPhim/ThemPhimUploadHinh',
      payload
    )
    // console.log('🚀  response:', response)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// DELETE room api
export const deleteRoomAPI = async (roomID) => {
  try {
    const response = await fetcher.delete('/QuanLyPhim/XoaPhim', {
      params: {
        MaPhim: roomID,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// UPDATE room api
export const updateRoomAPI = async (payload) => {
  try {
    const response = await fetcher.post(
      '/QuanLyPhim/CapNhatPhimUpload',
      payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
