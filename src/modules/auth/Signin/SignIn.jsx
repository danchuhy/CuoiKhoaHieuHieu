import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { signinAPI } from "../../../apis/userAPI";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../../contexts/UserContext/UserContext";
import { useState } from "react";
import Iconify from "../../../layouts/AdminLayout/components/iconify";
import { useTheme, alpha } from "@mui/material/styles";
import { bgGradient } from "../../../theme/css";
import "./sign-in.css";
const SignIn = () => {
  const { currentUser, handleSignin: handleSigninContext } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState(null);
  // Trong useForm nhận vào 1 obj, có key là defaultValues
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: handleSignin, isPending } = useMutation({
    mutationFn: (values) => signinAPI(values),
    onSuccess: (values) => {
      // console.log('🚀  values:', values)
      // localStorage.setItem(CURRENT_USER, JSON.stringify(values))
      // values là thông tin user
      if (values.response) {
        setErr(values.response.data.content);
      } else {
        window.location.reload();
        handleSigninContext(values);
        if (values.maLoaiNguoiDung === "USER") {
          Swal.fire({
            icon: "success",
            title: "Đăng ký thành công",
            showConfirmButton: true,
            timer: 1500,
          }).then((result) => {
            if (result.isConfirmed) {
              setErr(null);
              navigate(PATH.HOME);
            }
          });
        }
        if (values.maLoaiNguoiDung === "ADMIN") {
          Swal.fire({
            icon: "success",
            title: "Đăng ký thành công",
            showConfirmButton: true,
            timer: 1500,
          }).then((result) => {
            if (result.isConfirmed) {
              setErr(null);
              navigate(PATH.ADMIN);
            }
          });
        }
      }
    },
    onError: (error) => {
      console.log("🚀  error:", error);
    },
  });

  const onSubmit = (values) => {
    handleSignin(values); // {email: '', password: ''}
  };

  if (currentUser) {
    return <Navigate to={PATH.HOME} />;
  }

  return (
    <>
      <div id="sign-in" style={{ height: "80vh" }}>
        <Box
          sx={{
            ...bgGradient({
              color: alpha(theme.palette.background.default, 0.9),
            }),
          }}
        >
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
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
                      {err ? <Alert severity="error">{err}</Alert> : ""}
                      <TextField
                        label="Email"
                        fullWidth
                        email="email"
                        {...register("email")}
                      />

                      <TextField
                        email="password"
                        label="Mật khẩu"
                        type={showPassword ? "text" : "password"}
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
                                      ? "eva:eye-fill"
                                      : "eva:eye-off-fill"
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        {...register("password")}
                      />
                      {/* <TextField
              label="Mật khẩu"
              type="password"
              fullWidth
              email="password"
            /> */}
                      <LoadingButton
                        sx={{
                          borderColor: alpha(theme.palette.grey[500], 0.16),
                        }}
                        type="submit"
                        variant="contained"
                        loading={isPending}
                        style={{
                          backgroundColor: "#ff385c",
                          border: "1px solid #ff385c",
                        }}
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
      </div>
    </>
  );
};

export default SignIn;
