import { useState } from 'react'
import PropTypes from 'prop-types'

import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Label from '../../components/label'
import Iconify from '../../components/iconify'
import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteRoomAPI } from '../../../../apis/roomAPI'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ModalView from '../modal/modal'
import AddRoom from './add-room/AddRoom'
import UpdateRoom from './update-room/UpdateRoom'
import CreateTimeRoom from './create-time-room'

// ----------------------------------------------------------------------

export default function RoomTableRow({
  selected,
  id,
  tenPhong,
  hinhAnh,
  maViTri,
  khach,
  giaTien,
  handleClick,
}) {
  const [selectedModal, setSelectedModal] = useState(null)

  const [openMenu, setOpenMenu] = useState(null)

  const queryClient = useQueryClient()

  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (modalType) => {
    setOpenModal(true)
    setSelectedModal(modalType)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedModal(null)
  }

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenu(null)
  }

  const { mutate: deleteRoom, isPending } = useMutation({
    mutationFn: (roomID) => {
      deleteRoomAPI(roomID)
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Xóa phim thành công',
        confirmButtonText: 'Đồng ý',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-room')
        }
        return
      })
    },
    onError: (error) => {
      console.log('🚀  error:', error)
    },
  })

  const handleDeleteRoom = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc chắn muốn xóa phim này?',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      denyButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRoom(id)
      }
      return
    })
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell width={100}>{id}</TableCell>

        <TableCell>{tenPhong}</TableCell>

        <TableCell>
          <img
            src={hinhAnh}
            alt={tenPhong}
            style={{ width: 160, height: 50 }}
          />
        </TableCell>

        <TableCell>{maViTri}</TableCell>

        <TableCell>{khach}</TableCell>

        <TableCell>{giaTien}</TableCell>



        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openMenu}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Button
            fullWidth
            onClick={() => {
              handleOpenModal('update')
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Sửa
          </Button>
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Button
            fullWidth
            onClick={() => {
              handleOpenModal('create')
            }}
          >
            <Iconify icon="eva:plus-outline" sx={{ mr: 2 }} />
            Tạo lịch chiếu
          </Button>
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Button
            sx={{ color: 'error.main' }}
            fullWidth
            onClick={() => {
              handleDeleteRoom(id)
            }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Xóa
          </Button>
        </MenuItem>
      </Popover>

      <ModalView open={openModal} handleClose={handleCloseModal}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {selectedModal === 'update'
            ? 'Cập nhật phim upload hình'
            : `Tạo lịch chiếu cho phim: ${tenPhong}`}
        </Typography>
        {selectedModal === 'update' ? (
          <UpdateRoom id={id} handleClose={handleCloseModal} />
        ) : (
          <CreateTimeRoom handleClose={handleCloseModal} id={id} />
        )}
      </ModalView>
    </>
  )
}

RoomTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  maLoaiNguoiDung: PropTypes.any,
  matKhau: PropTypes.any,
  soDT: PropTypes.any,
  taiKhoan: PropTypes.any,
  hoTen: PropTypes.any,
  email: PropTypes.string,
}