import React from 'react'
import RoomProfile from './RoomProfile'
import ShowTimes from './RoomTimes'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

const Details = () => {
  const { roomID } = useParams()
  return (
    <Box>
      <RoomProfile roomID={roomID} />
      <ShowTimes roomID={roomID} />
    </Box>
  )
}

export default Details
