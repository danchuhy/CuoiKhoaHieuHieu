import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signinAPI } from '../../../apis/userAPI'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'
import { LoadingButton } from '@mui/lab'
import { useAuth } from '../../../contexts/UserContext/UserContext'
import { useState } from 'react'
import Iconify from '../../../layouts/AdminLayout/components/iconify'
import { useTheme, alpha } from '@mui/material/styles'
import { bgGradient } from '../../../theme/css'

const SignIn = () => {
  const { currentUser, handleSignin: handleSigninContext } = useAuth()
  const theme = useTheme()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  // Trong useForm nhận vào 1 obj, có key là defaultValues
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate: handleSignin, isPending } = useMutation({
    mutationFn: (values) => signinAPI(values),
    onSuccess: (values) => {
      // console.log('🚀  values:', values)
      // localStorage.setItem(CURRENT_USER, JSON.stringify(values))
      // values là thông tin user
      handleSigninContext(values)
      if (values.maLoaiNguoiDung === 'USER') {
        navigate(PATH.HOME)
      }
      if (values.maLoaiNguoiDung === 'ADMIN') {
        navigate(PATH.ADMIN)
      }
    },
    onError: (error) => {
      console.log('🚀  error:', error)
    },
  })

  const onSubmit = (values) => {
    handleSignin(values) // {email: '', password: ''}
  }

  if (currentUser) {
    return <Navigate to={PATH.HOME} />
  }

  return (
    <>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: 'src/assets/background/overlay_4.jpg',
          }),
          height: 1,
        }}
      >
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          spacing={3}
        >
          <Grid item md={6}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: 1 }}
            >
              <Card
                sx={{
                  p: 5,
                  width: 1,
                  mt: 10,
                  maxWidth: 420,
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <TextField
                      label="Email"
                      fullWidth
                      email="email"
                      {...register('email')}
                    />

                    <TextField
                      email="password"
                      label="Mật khẩu"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              <Iconify
                                icon={
                                  showPassword
                                    ? 'eva:eye-fill'
                                    : 'eva:eye-off-fill'
                                }
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...register('password')}
                    />
                    {/* <TextField
                label="Mật khẩu"
                type="password"
                fullWidth
                email="password"
              /> */}
                    <LoadingButton
                      sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                      type="submit"
                      variant="contained"
                      loading={isPending}
                    >
                      Đăng nhập
                    </LoadingButton>
                  </Stack>
                </form>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default SignIn
