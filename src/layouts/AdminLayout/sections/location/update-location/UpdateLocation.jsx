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
import Swal from 'sweetalert2'
import {
  getLocationDetailsAPI,
  updateLocationAPI,
} from '../../../../../apis/locationAPI'

const UpdateLocation = ({ locationInfor, handleClose }) => {
  const queryClient = useQueryClient()

  // Cập nhật phòng
  const { mutate: handleUpdateLocation, isPending } = useMutation({
    mutationFn: (payload) => {
      updateLocationAPI(payload)
    },
    onSuccess: () => {
      handleClose()

      // Hiển thị thông báo thành công (nếu cần)
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật vị trí thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-location')
        }
      })
    },
  })

  const { handleSubmit, register, control, setValue, watch } = useForm({
    defaultValues: {
      id: locationInfor.id || 0,
      tenViTri: locationInfor.tenViTri || '',
      tinhThanh: locationInfor.tinhThanh || '',
      quocGia: locationInfor.quocGia || '',
      hinhAnh: locationInfor.hinhAnh || '',
    },
  })

  useEffect(() => {
    // Set default values when data changes
    setValue('id', locationInfor.id || ''),
    setValue('tenViTri', locationInfor.tenViTri || ''),
    setValue('tinhThanh', locationInfor.tinhThanh || ''),
    setValue ('quocGia', locationInfor.quocGia || ''),
    setValue('hinhAnh', locationInfor.hinhAnh || undefined)
  }, [locationInfor, setValue, control])

  const onSubmit = (values) => {
    handleUpdateLocation(values)
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
                <TextField label="Mã vị trí" fullWidth disabled {...register('id')} />
                <TextField label="Tên vị trí" fullWidth {...register('tenViTri')} />
                <TextField label="Tỉnh thành" fullWidth {...register('tinhThanh')} />
                <TextField label="Quốc gia" fullWidth {...register('quocGia')} />

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Cập nhật vị trí
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default UpdateLocation
