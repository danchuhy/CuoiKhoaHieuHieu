import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getListRoomAPI } from '../../../apis/roomAPI'
import { getRoomShowTimes } from '../../../apis/cinemaAPI'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

const Cinema = () => {
  const navigate = useNavigate()

  const [room, setRoom] = useState('')
  const [cinema, setCinema] = useState('')
  const [date, setDate] = useState('')
  const {
    data: listRoom,
    isLoading: isLoadingListRoom,
    isError,
    error,
  } = useQuery({
    queryKey: ['cinema-list-room'],
    queryFn: getListRoomAPI,
  })

  const { data: showtimes, isLoading: isLoadingShowtimes } = useQuery({
    queryKey: ['cinema-room-showtimes', room],
    queryFn: () => getRoomShowTimes(room),
    enabled: !!room,
  })

  const cinemaSystems = showtimes?.heThongRapChieu || []

  const handleChangeRoom = (newRoom) => {
    setRoom(newRoom)
  }

  const handleChangeCinema = (newCinema) => {
    setCinema(newCinema)
  }

  const handleChangDate = (newDate) => {
    setDate(newDate)
  }

  const handleMuaVe = () => {
    if (room === '') {
      Swal.fire({
        title: 'Bạn chưa chọn phim',
        text: 'Vui lòng chọn phim',
        confirmButtonText: 'Đã hiểu',
      })
    } else if (cinema === '') {
      Swal.fire({
        title: 'Bạn chưa chọn rạp',
        text: 'Vui lòng chọn rạp',
        confirmButtonText: 'Đã hiểu',
      })
    } else if (date === '') {
      Swal.fire({
        title: 'Bạn chưa chọn ngày giờ chiếu',
        text: 'Vui lòng chọn ngày giờ chiếu',
        confirmButtonText: 'Đã hiểu',
      })
    } else {
      navigate(`ticket/${date}`)
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ m: 3 }} component={'div'}>
        <form
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <Stack direction={'row'} spacing={1}>
            <TextField
              select
              id="phim"
              fullWidth
              label="Phim"
            >
              {listRoom?.map((phim) => {
                return (
                  <MenuItem
                    key={phim.maPhim}
                    value={phim.tenPhim}
                    onClick={() => {
                      handleChangeRoom(phim.maPhim)
                    }}
                  >
                    {phim.tenPhim}
                  </MenuItem>
                )
              })}
            </TextField>

            <TextField
              id="rap"
              select
              fullWidth
              label="Rạp"
            >
              {cinemaSystems?.map((item) => {
                return item.cumRapChieu?.map((rap) => {
                  return (
                    <MenuItem
                      key={rap.maCumRap}
                      defaultValue="None"
                      value={rap.tenCumRap}
                      onClick={() => {
                        handleChangeCinema(rap.maCumRap)
                      }}
                    >
                      {rap.tenCumRap}
                    </MenuItem>
                  )
                })
              })}
            </TextField>

            <TextField
              id="outlined-select-currency"
              fullWidth
              select
              label="Ngày giờ chiếu"
            >
              {cinemaSystems.map((item) => {
                return item.cumRapChieu.map((rap) => {
                  if (rap.maCumRap === cinema) {
                    return rap.lichChieuPhim.map((ngayGio) => {
                      const times = dayjs(ngayGio.ngayChieuGioChieu).format(
                        'DD/MM/YYYY ~ HH:mm'
                      )
                      return (
                        <MenuItem
                          key={ngayGio.maLichChieu}
                          defaultValue={'None'}
                          value={times}
                          onClick={() => {
                            handleChangDate(ngayGio.maLichChieu)
                          }}
                        >
                          {times}
                        </MenuItem>
                      )
                    })
                  }
                })
              })}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              onClick={handleMuaVe}
            >
              Mua vé ngay
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}

export default Cinema
