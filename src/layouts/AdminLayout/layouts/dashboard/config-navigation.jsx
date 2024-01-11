import SvgColor from '../../components/svg-color'

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin',
    // icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: 'user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'Thêm phim upload hình',
  //   path: 'add-room',
  // },
  {
    title: 'Danh sách phòng',
    path: 'list-room',
  },
  {
    title: 'Quản lý đặt phòng',
    path: 'booking',
  },
  {
    title: 'Danh sách vị trí',
    path: 'location',
  },
  {
    title: 'Not found',
    path: '404',
    // icon: icon('ic_disabled'),
  },
]

export default navConfig
