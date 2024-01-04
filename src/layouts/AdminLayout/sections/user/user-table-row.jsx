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
import { Button, TextField } from '@mui/material'
import ModalView from '../modal/modal'
import UserEdit from '../user/edit-user'
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  taiKhoan,
  hoTen,
  email,
  soDT,
  matKhau,
  maLoaiNguoiDung,
  handleClick,
}) {
  const userInfor = {
    taiKhoan,
    hoTen,
    email,
    soDT,
    matKhau,
    maLoaiNguoiDung,
  }
  const [open, setOpen] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{taiKhoan}</TableCell>

        <TableCell>{hoTen}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{soDT}</TableCell>

        <TableCell>{maLoaiNguoiDung}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Button fullWidth onClick={handleOpenModal}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </Button>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Button
            sx={{ color: 'error.main' }}
            fullWidth
            onClick={handleOpenModal}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </Button>
        </MenuItem>
      </Popover>
      <ModalView open={openModal} handleClose={handleCloseModal}>
        <UserEdit userInfor={userInfor} />
      </ModalView>
    </>
  )
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  maLoaiNguoiDung: PropTypes.any,
  matKhau: PropTypes.any,
  soDT: PropTypes.any,
  taiKhoan: PropTypes.any,
  hoTen: PropTypes.any,
  email: PropTypes.string,
}
