import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getRoomDetailsAPI } from '../../../apis/roomAPI'
import { Box, Container, Grid, Stack } from '@mui/material'

const RoomProfile = ({ roomID }) => {
  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['room-details', roomID],
    queryFn: () => getRoomDetailsAPI(roomID),
    enabled: !!roomID, // false | true, khi enabled là true thì queryFun mới được kích hoạt. Ngược lại là false thì sẽ không kích hoạt queryFun
  })

  return (
    <Container maxWidth="lg">
      <Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  )
}

export default RoomProfile
