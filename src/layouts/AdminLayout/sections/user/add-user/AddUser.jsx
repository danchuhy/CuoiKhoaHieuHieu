import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  MenuItem,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import Swal from 'sweetalert2'
import { addUserApi } from '../../../../../apis/userAPI'

const AddUser = ({ handleClose }) => {
  const queryClient = useQueryClient()
  const [gender, setGender] = useState('');
  const { handleSubmit, register, control, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      password: '',
      email: '',
      phone: '',
      gender: gender === 'female' ? true : false,
      role: '',
      birthday: ''
    },
  })

  const { mutate: handleAddUser, isPending } = useMutation({
    mutationFn: (payload) => {
      addUserApi(payload)
    },
    onSuccess: () => {
      handleClose()

      Swal.fire({
        icon: 'success',
        title: 'Thêm người dùng thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-user')
        }
      })
    },
  })
  const onSubmit = (userInfor) => {
    handleAddUser(userInfor)
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          spacing={3}
        >
          <Grid item md={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} direction={'column'}>
                <TextField label="Họ tên" fullWidth {...register('name')} />

                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup value={gender} onChange={handleGenderChange} row>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>

                <Controller
                  control={control}
                  name="birthday"
                  render={(field) => {
                    return (
                      <DatePicker
                        label="Ngày sinh"
                        format="DD/MM/YYYY"
                        views={[
                          'day',
                          'month',
                          'year'
                        ]}
                        onChange={(date) => {
                          const formattedDate = dayjs(date).format(
                            'DD/MM/YYYY'
                          )
                          setValue('birthday', formattedDate)
                        }}
                        {...field}
                      />
                    )
                  }}
                />

                <TextField label="Email" fullWidth {...register('email')} />
                <TextField
                  label="Số điện thoại"
                  fullWidth
                  {...register('phone')}
                />

                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => {
                    return (
                      <TextField
                        select
                        fullWidth
                        label="Loại người dùng"
                        {...field}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                      </TextField>
                    )
                  }}
                />

                <TextField
                  label="Mật khẩu"
                  type="password"
                  fullWidth
                  {...register('password')}
                />

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Thêm người dùng
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default AddUser
