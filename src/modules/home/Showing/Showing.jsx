import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { getListRoomAPI } from '../../../apis/roomAPI'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from '@mui/material'

const Showing = () => {
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['list-room'],
    queryFn: getListRoomAPI,
  })
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    autoplay: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    autoplaySpeed: 2000,
  }

  return (
    // <Grid container spacing={4}>
    //   {data?.map((item) => {
    //     return (
    //       <Grid item xs={3} key={item.maPhim}>
    //         <Card>
    //           <CardMedia
    //             sx={{ height: 180 }}
    //             image={item.hinhAnh}
    //             title={item.tenPhim}
    //           />
    //           <CardContent>
    //             <Typography
    //               gutterBottom
    //               variant="h5"
    //               component="div"
    //               className="truncate"
    //             >
    //               {item.tenPhim}
    //             </Typography>
    //             <Typography
    //               variant="body2"
    //               color="text.secondary"
    //               className="truncate truncate--2"
    //             >
    //               {item.moTa}
    //             </Typography>
    //           </CardContent>
    //           <CardActions>
    //             <Button
    //               size="large"
    //               variant="contained"
    //               fullWidth
    //               onClick={() => {
    //                 navigate(`room/${item.maPhim}`)
    //               }}
    //             >
    //               Xem chi tiết
    //             </Button>
    //           </CardActions>
    //         </Card>
    //       </Grid>
    //     )
    //   })}
    // </Grid>
    <Container maxWidth="lg">
      <Slider {...settings}>
        {data?.map((item) => {
          return (
            <Grid sx={{ padding: '10px' }} key={item.maPhim}>
              <Grid item>
                <Card sx={{ width: 314 }}>
                  {/* <CardMedia
                    sx={{
                      minHeight: '100%',
                      width: '100%',
                    }}
                    image={item.hinhAnh}
                    title={item.tenPhim}
                  /> */}
                  <img
                    src={item.hinhAnh}
                    alt={item.tenPhim}
                    style={{
                      height: '314px',
                      width: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="truncate"
                    >
                      {item.tenPhim}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="truncate truncate--2"
                    >
                      {item.moTa}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        navigate(`room/${item.maPhim}`)
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          )
        })}
      </Slider>
    </Container>
  )
}

export default Showing
