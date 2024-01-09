import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  Checkbox
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import { GROUP_CODE } from '../../../../../constants'
import Swal from 'sweetalert2'
import {
  getRoomDetailsAPI,
  updateRoomAPI,
} from '../../../../../apis/roomAPI'

const UpdateRoom = ({ id, handleClose }) => {
  const queryClient = useQueryClient()

  // Cập nhật phòng
  const { mutate: handleUpdateRoom, isPending } = useMutation({
    mutationFn: (payload) => {
      updateRoomAPI(payload)
    },
    onSuccess: () => {
      handleClose()

      // Hiển thị thông báo thành công (nếu cần)
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật phòng thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-room')
        }
      })
    },
  })

  // Lấy dữ liệu phim cần cập nhật
  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['get-room-details', id],
    queryFn: () => getRoomDetailsAPI(id),
    enabled: !!id,
    // false | true, khi enabled là true thì queryFun mới được kích hoạt. Ngược lại là false thì sẽ không kích hoạt queryFun
  })

  const { handleSubmit, register, control, setValue, watch } = useForm({
    defaultValues: {
      id: data.id || 0,
      tenPhong: data.tenPhong || '',
      khach: data.khach || 0,
      phongNgu: data.phongNgu || 0,
      giuong: data.giuong || 0,
      phongTam: data.phongTam || '',
      moTa: data.moTa || '',
      giaTien: data.giaTien || '',
      mayGiat: data.mayGiat || false,
      banLa: data.banLa || false,
      tivi: data.tivi || false,
      dieuHoa: data.dieuHoa || false,
      wifi: data.wifi || false,
      bep: data.bep || false,
      doXe: data.doXe || false,
      hoBoi: data.hoBoi || false,
      banUi: data.banUi || false,
      maViTri: data.maViTri || 0,
      hinhAnh: data.hinhAnh || undefined,
    },
  })

  useEffect(() => {
    // Set default values when data changes
    setValue('id', data.id || ''),
    setValue('tenPhong', data.tenPhong || ''),
    setValue('khach', data.khach || 0),
    setValue ('phongNgu', data.phongNgu || 0),
    setValue('giuong', data.giuong || 0),
    setValue('phongTam', data.phongTam || ''),
    setValue('moTa', data.moTa || ''),
    setValue('giaTien', data.giaTien || ''),
    setValue('mayGiat', data.mayGiat || false),
    setValue('banLa', data.banLa || false),
    setValue('tivi', data.tivi || false),
    setValue('dieuHoa', data.dieuHoa || false),
    setValue('wifi', data.wifi || false),
    setValue('bep', data.bep || false),
    setValue('doXe', data.doXe || false),
    setValue('hoBoi', data.hoBoi || false),
    setValue('banUi', data.banUi || false),
    setValue('maViTri', data.maViTri || 0),
    setValue('hinhAnh', data.hinhAnh || undefined)
  }, [data, setValue, control])

  const onSubmit = (values) => {
    handleUpdateRoom(values)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          spacing={1}
        >
          <Grid item md={9}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} direction={'column'}>
                <TextField label="Tên phòng" fullWidth {...register('tenPhong')} />

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <TextField label="Khách tối đa" fullWidth {...register('khach')} />
                  <TextField label="Phòng ngủ" fullWidth {...register('phongNgu')} />
                </Stack>

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <TextField label="Giường" fullWidth {...register('giuong')} />
                  <TextField label="Phòng tắm" fullWidth {...register('phongTam')} />
                </Stack>

                <TextField label="Mô tả" fullWidth {...register('moTa')} />
                <TextField label="Giá tiền" fullWidth {...register('giaTien')} />


                <Stack direction={'row'} spacing={2} alignItems="center">
                  <Stack direction={'row'} spacing={1} alignItems="center">
                    <Typography component={'h2'}>Máy giặt</Typography>
                    <Controller
                      control={control}
                      name="mayGiat"
                      render={() => {
                        return (
                          <Checkbox
                            checked={watch('mayGiat')}
                            onChange={(event) => {
                              setValue('mayGiat', event.target.checked)
                            }}
                          />
                        )
                      }}
                    />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                    <Typography component={'h2'}>Bàn là</Typography>
                    <Controller
                      control={control}
                      name="banLa"
                      render={() => {
                        return (
                          <Checkbox
                            checked={watch('banLa')}
                            onChange={(event) => {
                              setValue('banLa', event.target.checked)
                            }}
                          />
                        )
                      }}
                    />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                    <Typography component={'h2'}>Tivi</Typography>
                    <Controller
                      control={control}
                      name="tivi"
                      render={() => {
                        return (
                          <Checkbox
                            checked={watch('tivi')}
                            onChange={(event) => {
                              setValue('tivi', event.target.checked)
                            }}
                          />
                        )
                      }}
                    />
                  </Stack>
                </Stack>

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Điều hoà</Typography>
                      <Controller
                        control={control}
                        name="dieuHoa"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('dieuHoa')}
                              onChange={(event) => {
                                setValue('dieuHoa', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Wifi</Typography>
                      <Controller
                        control={control}
                        name="wifi"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('wifi')}
                              onChange={(event) => {
                                setValue('wifi', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Bếp</Typography>
                      <Controller
                        control={control}
                        name="bep"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('bep')}
                              onChange={(event) => {
                                setValue('bep', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>
                </Stack>

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Đỗ xe</Typography>
                      <Controller
                        control={control}
                        name="doXe"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('doXe')}
                              onChange={(event) => {
                                setValue('doXe', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Hồ bơi</Typography>
                      <Controller
                        control={control}
                        name="hoBoi"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('hoBoi')}
                              onChange={(event) => {
                                setValue('hoBoi', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Bàn ủi</Typography>
                      <Controller
                        control={control}
                        name="banUi"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('banUi')}
                              onChange={(event) => {
                                setValue('banUi', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>
                </Stack>

                <TextField label="Mã vị trí" fullWidth {...register('maViTri')} />

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Cập nhật phòng
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default UpdateRoom
